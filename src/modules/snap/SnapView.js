import * as SnapState from "./SnapState";
import React from "react";
import { View, Text, TouchableHighlight, Animated, ActivityIndicator } from "react-native";
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.results.toJSON().ready) {
      this.props.navigator.push(Router.getRoute("results"));
      this.props.dispatch(SnapState.hideResults());
    }
  }

  openCameraRoll() {
    this.props.navigator.push(Router.getRoute("imageBrowser"));
  }

  takePicture() {
    this.camera.capture({
      target: Camera.constants.CaptureTarget.cameraRoll
    }).then(data => this.props.dispatch(SnapState.uploadSnap(data.path)))
      .catch(err => console.error(err));
  }

  renderCameraOverlay() {
    // return null;
    return (
      <View style={{ opacity: this.props.uploading ? 0 : 1, flex: 1, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 20 }}>
        <CaptureButton onPress={() => this.takePicture()} />
        <TouchableHighlight onPress={ () => this.openCameraRoll()}>
          <Text style={{ color: 'white' }}>Choose from library</Text>
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
        >
        </Camera>

        <View style={[{
          justifyContent: this.props.uploading ? 'center' : 'flex-end'
        }, styles.actions]}>

          { this.props.uploading
            ? <ActivityIndicator color='white' style={{ opacity: this.props.uploading ? 1 : 0 }}/>
            : this.renderCameraOverlay()
          }
        </View>

      </Container>
    );
  }
}
