import * as SnapState from "./SnapState";
import React from "react";
import { View, Text, TouchableHighlight, ActivityIndicator, Platform } from "react-native";
import { PermissionsAndroid } from 'react-native';

import Container from "../../components/Container";
import CaptureButton from "../../components/CaptureButton";
import Camera from "react-native-camera";

import styles from "./SnapStyles";

export default class SnapView extends React.Component {

  // componentDidMount() {
  //     if (this.props.uploading) {
  //        this.updateAnimation();
  //     }
  // }

  static route = {
    navigationBar: {
      title: "Snap"
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.results.toJSON().match === true) {
      this.props.navigator.push(Router.getRoute("match"));
      this.props.dispatch(SnapState.hideResults());
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

  async requestCameraPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          'title': 'Cool Photo App Camera Permission',
          'message': 'Cool Photo App needs access to your camera ' +
          'so you can take awesome pictures.'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.takePictureGranted();
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
        console.log("Camera permission denied")
      }
    } catch (err) {
      console.warn(err)
    }
  }

  takePicture() {
    if (Platform.OS === 'android') {
      return this.requestCameraPermission();
    }
    this.takePictureGranted()
  }

  takePictureGranted() {
    this.camera.capture({
      target: Camera.constants.CaptureTarget.cameraRoll
    }).then(data => this.props.dispatch(SnapState.uploadSnap(data.path)))
      .catch(err => console.error(err));
  }

  renderCameraOverlay() {
    // return null;
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <CaptureButton onPress={() => this.takePicture()} />
        <TouchableHighlight onPress={ () => this.openCameraRoll()}>
          <Text style={{ color: 'black' }}>Choose from library</Text>
        </TouchableHighlight>
      </View>
    );
    //return <Text style={styles.capture} onPress={() => this.takePicture()}>[CAPTURE]</Text>;
  }

  // updateAnimation() {
  //   setInterval(
  //     () => {
  //       console.log("I do not leak!");
  //       this.props.dispatch(SnapState.updateAnimation());
  //     },
  //     400
  //   );
  // }
  //
  // renderUploadingAnimation() {
  //   // return null;
  //   this.updateAnimation();
  //   return <Text style={styles.capture} onPress={() => { }}>{this.props.animationValue}</Text>;
  // }

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
          { this.props.uploading
            ? <ActivityIndicator color='black' />
            : this.renderCameraOverlay()
          }
        </View>

      </Container>
    );
  }
}
