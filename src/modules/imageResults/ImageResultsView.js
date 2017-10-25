import React from "react";
// import * as ImageBrowserState from "../imageBrowser/ImageBrowserState";
import { View, Text, ScrollView } from "react-native";
import Container from "../../components/Container";

import styles from "./ImageResultsStyles";

export default class ImageResultsView extends React.Component {

  static route = {
    navigationBar: {
      title: "Image Results"
    }
  };

  render() {
    const results = this.props.results.toJS();
    console.log(results);
    return (
      <Container>
        <ScrollView>
          <View style={styles.resultsContainer}>

            <Text style={styles.resultsHeadline}>
              Labels:
            </Text>

            {results.labels && results.labels.map( (label, idx) => <Text key={idx} style={styles.resultsText}>{label}</Text> )}

            <Text style={styles.resultsHeadline}>
              Texts:
            </Text>

            {results.texts && results.texts.map( (text, idx) => <Text key={idx} style={styles.resultsText}>{text}</Text>)}

          </View>
        </ScrollView>
      </Container>
    );
  }
}
