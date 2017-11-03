import * as SnapState from "./SnapState";
import * as DealsState from "../deals/DealsState";
import * as ChallengesState from "../challenges/ChallengesState";
import React from "react";
import { View, Text, TouchableHighlight, ActivityIndicator, Platform } from "react-native";
import { PermissionsAndroid } from 'react-native';

import Title from '../../components/Title';

import CaptureButton from "../../components/CaptureButton";
import Camera from "react-native-camera";

import * as IMAGES from '../../constants/images';

import styles from "./SnapStyles";

export default class SnapView extends React.Component {

  static route = {
    navigationBar: {
      renderTitle: (params) => {
        return <Title />
      }
    }
  };

  componentDidUpdate() {

    const results = this.props.results.toJS();

    if (results.type !== 'challenge' && results.ready && this.props.points === 175 && !results.reward.id) {
      this.props.dispatch(SnapState.hideResults());
      const pointsGained = 25;
      this.props.dispatch(SnapState.updatePoints(parseInt(this.props.points) + pointsGained));
      this.props.dispatch(SnapState.setReward({ id: '3'} ));
      this.props.dispatch(DealsState.enableDeal({ id: '3' }));
      this.props.navigator.push(Router.getRoute("results", {pointsUpdated: true, success: true }));
    }

    else if (results.ready && results.match && !results.reward.id) {

      this.props.dispatch(SnapState.hideResults());

      // if deal is set, add deal instead of enabling
      if (results.type === 'deal') {
        this.props.dispatch(DealsState.addDeal({
          'logoUrl': IMAGES.BRANDS[results.brand.toUpperCase()],
          'campaignImgUrl': IMAGES.BRANDS[results.brand.toUpperCase()],
          'id': results.brand,
          'amount': '1% OFF',
          'description': 'Get 1% off at your next purchase',
          'disclaimer': 'Get discount now',
          'brandName': results.brand,
          'code': 'Td34dJ',
          enabled: true
        }));
      }

      // if challenge, enable corresponding deal and set completed
      else if (results.type === 'challenge') {
        this.props.dispatch(DealsState.enableDeal({id: this.props.currentChallenge.toJS().id}));
        this.props.dispatch(ChallengesState.setCompleted({id: this.props.currentChallenge.toJS().id}));
        this.props.dispatch(SnapState.setCurrentChallenge({...this.props.currentChallenge.toJS(), completed: true}));
      }

      else {
        const pointsGained = 25;
        this.props.dispatch(SnapState.updatePoints(parseInt(this.props.points) + pointsGained));
        this.props.navigator.push(Router.getRoute("results", {pointsUpdated: true, success: true }));
        return;
      }

      this.props.navigator.push(Router.getRoute("results", {success: true}));
    }

    else if (results.ready && !results.match  && !results.reward.id) {
      this.props.dispatch(SnapState.hideResults());
      this.props.navigator.push(Router.getRoute("results", { success: false }));
    }

  }

  openCameraRoll() {
    if (Platform.OS === 'android') {
      return this.requestStoragePermission();
    }
    this.openCameraRollGranted()
  }

  openCameraRollGranted() {
    this.props.navigator.push(Router.getRoute("imageBrowser"));
  }

  async requestStoragePermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          'title': 'Cool Photo App Camera Permission',
          'message': 'Cool Photo App needs access to your camera ' +
          'so you can take awesome pictures.'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.openCameraRollGranted();
      } else {
        console.log("Camera roll permission denied")
      }
    } catch (err) {
      console.warn(err)
    }
  }

  takePicture() {
    this.camera.capture({
      target: Camera.constants.CaptureTarget.cameraRoll
    }).then(data => this.props.dispatch(SnapState.uploadSnap(data.path)))
      .catch(err => console.error(err))
  }

  disableChallenge() {
    this.props.dispatch(SnapState.setCurrentChallenge({}));
  }

  renderCameraOverlay() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <CaptureButton onPress={() => this.takePicture()} />
        <TouchableHighlight onPress={() => this.openCameraRoll()}>
          <Text style={{ color: 'black' }}>Choose from library</Text>
        </TouchableHighlight>
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <Camera
          ref={cam => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}
          captureQuality={Camera.constants.CaptureQuality.medium}
          captureTarget={Camera.constants.CaptureTarget.disk}
        />
        <View style={styles.actions}>
          {this.props.uploading
            ? <ActivityIndicator color='black' />
            : this.renderCameraOverlay()
          }
        </View>
        {this.props.currentChallenge.toJS().brandName &&
          <TouchableHighlight style={styles.disable} onPress={() => this.disableChallenge()}>
            <Text style={styles.disableText}>Discard challenge</Text>
          </TouchableHighlight>
        }
      </View>
    );
  }
}
