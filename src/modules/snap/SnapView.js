import * as SnapState from "./SnapState";
import React from "react";
import { View, Text, Animated, ActivityIndicator } from "react-native";
import Button from '../../components/Button';
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
              target: Camera.constants.CaptureTarget.cameraRoll
            })
            .then(data => this.props.dispatch(SnapState.uploadSnap(data.path)))
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
    // return null;
    return <CaptureButton onPress={() => this.takePicture()} />;
    //return <Text style={styles.capture} onPress={() => this.takePicture()}>[CAPTURE]</Text>;
  }

  closeResults() {
    this.props.dispatch(SnapState.hideResults());
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
        >
          { results.ready
            ? <View style={styles.overlay}>
                <Text style={styles.overlayHeadline}>
                  Labels:
                </Text>
                {results.labels.map( (label, idx) => <Text key={idx} style={styles.overlayText}>{label}</Text> )}
                <Text style={styles.overlayHeadline}>
                  Texts:
                </Text>
                {results.texts.map( (text, idx) => <Text key={idx} style={styles.overlayText}>{text}</Text> )}

                <Button onPress={ () => this.closeResults()} style={{marginTop: 24}} text="Close results">Close</Button>
              </View>
            : <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                {this.props.uploading
                  ? <ActivityIndicator color='white' style={{bottom: 54}}/>
                  : this.renderCameraOverlay()
                }
              </View>
          }



        </Camera>
      </Container>
    );
  }
}
