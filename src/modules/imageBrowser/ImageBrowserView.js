import React from "react";
import * as ImageBrowserState from "../imageBrowser/ImageBrowserState";
import { View, ScrollView, Image, CameraRoll } from "react-native";
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
      first: 20
    }).then((edges) => {
      this.props.dispatch(ImageBrowserState.addPhotos(edges));
    });
  }

  render() {
    const photos = this.props.photos.toJS();
    return (
      <Container>
        <ScrollView>
          <View style={styles.contentWrapper}>
            {
              photos.edges && photos.edges.map( (edge, idx) => {
                return <Image key={idx} source={{uri: edge.node.image.uri}} style={{width: 100, height: 100}} />
              })
            }
          </View>
        </ScrollView>
      </Container>
    );
  }
}
