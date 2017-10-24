import * as SnapState from "./SnapState";
import React from "react";
import { Text, Animated } from "react-native";
import BottomSheet from 'react-native-bottomsheet';
import { fromJS } from "immutable";

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

  takePicture() {
    BottomSheet.showBottomSheetWithOptions({
      options: ['Take a picture', 'Use an image from camera roll'],
      title: 'Demo Bottom Sheet',
      dark: true,
      cancelButtonIndex: 3,
    }, (value) => {
      switch (value) {
        case 0:
          console.log("taking picture.");
          // this.props.navigator.showLocalAlert(
          //   "Uploading Snap <(<°.°)",
          //   COMMON_STYLES.ALERT_STYLES_SUCCESS
          // );
          this.camera
            .capture({
              target: Camera.constants.CaptureTarget.disk
            })
            .then(data => this.props.dispatch(SnapState.uploadSnap(data)))
            .catch(err => console.error(err));
          console.log("snap snap");
          break;
        case 1:
          this.props.navigator.push(Router.getRoute("imageBrowser"));
          break;
      }
    });

  }

  renderCameraOverlay() {
    return <CaptureButton onPress={() => this.takePicture()} />;
    //return <Text style={styles.capture} onPress={() => this.takePicture()}>[CAPTURE]</Text>;
  }

  updateAnimation() {
    setTimeout(
      () => {
        console.log("I do not leak!");
        this.props.dispatch(SnapState.updateAnimation());
      },
      400
    );
  }

  renderUploadingAnimation() {
    return null;
    // this.updateAnimation();
    // return <Text style={styles.capture} onPress={() => { }}>{this.props.animationValue}</Text>;
  }

  render() {
    return (
      <Container>
        <Camera
          ref={cam => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}
        >
          {this.props.uploading
            ? this.renderUploadingAnimation()
            : this.renderCameraOverlay()}
        </Camera>
      </Container>
    );
  }
}
