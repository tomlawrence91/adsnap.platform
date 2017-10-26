import * as SnapState from "./SnapState";
import React from "react";
import { View, Text, TouchableHighlight, ActivityIndicator, Platform } from "react-native";
import { PermissionsAndroid } from 'react-native';

import Container from "../../components/Container";
import CaptureButton from "../../components/CaptureButton";
import Camera from "react-native-camera";

import styles from "./SnapStyles";

export default class SnapView extends React.Component {

  cameraPermissionsGranted = false;

  static route = {
    navigationBar: {
      title: "Snap tests"
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.results.toJS().ready) {
      this.props.navigator.push(Router.getRoute("results"));
      return this.props.dispatch(SnapState.hideResults());
    }
  }

  componentDidMount() {
    this.requestCameraPermission();
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

  async requestCameraPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          'title': 'Cool Photo App Camera Permission',
          'message': 'Cool Photo App needs access to your camera ' +
          'so you can take awesome pictures.'
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.cameraPermissionsGranted = true;
        this.forceUpdate();
      } else {
        console.log("Camera permission denied")
      }
    } catch (err) {
      console.warn(err)
    }
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
    if (Platform.OS === 'android' && ! this.cameraPermissionsGranted ) {
      return this.requestCameraPermission()
    }

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
      <Container>
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
      </Container>
    );
  }
}
