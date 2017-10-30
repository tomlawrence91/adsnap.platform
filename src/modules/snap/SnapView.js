import * as SnapState from "./SnapState";
import React from "react";
import { View, Text, TouchableHighlight, ActivityIndicator, Platform } from "react-native";
import { PermissionsAndroid } from 'react-native';

import CaptureButton from "../../components/CaptureButton";
import Camera from "react-native-camera";

import styles from "./SnapStyles";

export default class SnapView extends React.Component {

  componentDidUpdate(prevProps) {
    const results = this.props.results.toJS();
    if (results.ready && results.match) {
      this.props.dispatch(SnapState.hideResults());
      const pointsGained = results.type === 'ad' ? 25 : 100;
      this.props.dispatch(SnapState.updatePoints(parseInt(this.props.points) + pointsGained));
      this.props.dispatch(SnapState.setCurrentChallenge({ ...this.props.currentChallenge.toJS(), completed: true }));
      this.props.navigator.push(Router.getRoute("results", {pointsUpdated: true }));
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
    const results = this.props.results.toJSON();
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <Camera
          ref={cam => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}
        />
        <View style={styles.actions}>
          {this.props.uploading
            ? <ActivityIndicator color='black' />
            : this.renderCameraOverlay()
          }
        </View>
      </View>
    );
  }
}
