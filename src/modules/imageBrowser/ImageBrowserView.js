import React from "react";
import * as ImageBrowserState from "../imageBrowser/ImageBrowserState";
import * as SnapState from "../snap/SnapState";
import { View, ScrollView, TouchableHighlight, Image, CameraRoll } from "react-native";
import Container from "../../components/Container";
import { List } from "immutable";

import styles from "./ImageBrowserStyles";

export default class ImageBrowserView extends React.Component {

  static route = {
    navigationBar: {
      title: "Image Browser"
    }
  };

  componentWillMount() {
    CameraRoll.getPhotos({
      first: 50
    }).then((edges) => {
      this.props.dispatch(ImageBrowserState.addPhotos(edges));
    });
  }

  onPress(uri) {
    this.props.dispatch(SnapState.setReward({}));
    this.props.dispatch(SnapState.uploadSnap(uri));
    this.props.navigator.pop();
  }

  render() {
    const photos = this.props.photos.toJS();
    return (
      <Container>
        <ScrollView>
          <View style={styles.imageContainer}>
            {
              photos.edges && photos.edges.map( (edge, idx) => {
                return <TouchableHighlight key={idx} onPress={ () => this.onPress(edge.node.image.uri)}>
                  <Image source={{uri: edge.node.image.uri}} style={styles.image} />
                </TouchableHighlight>
              })
            }
          </View>
        </ScrollView>
      </Container>
    );
  }
}
