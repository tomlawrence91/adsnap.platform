import React from "react";
// import * as ImageBrowserState from "../imageBrowser/ImageBrowserState";
import { View, Text, Image, TouchableHighlight, ScrollView } from "react-native";
import Container from "../../components/Container";

import styles from "./ImageResultsStyles";
// import Button from "../../components/Button";

export default class ImageResultsView extends React.Component {

  static route = {
    navigationBar: {
      title: "AdSnap image analysis"
    }
  };

  render() {
    const results = this.props.results.toJS();

    return (
      <Container>
        <ScrollView>

          {results.match ?

            <View>
              <View style={styles.codeWrapper}>
                <Image style={styles.backgroundImage} source={{ uri: results.file }} />
              </View>
              <View style={styles.resultsContainer}>
                <Text style={styles.resultsHeadline}>Congrats, you have unlocked this challenge</Text>
                <Text style={styles.resultsSubHeadline}>The following coupon code has been added to your rewards.</Text>
                <View style={styles.codeBox}><Text style={styles.codeText}>Kd57GF</Text></View>
                {/*<TouchableHighlight>*/}
                  {/*<Text style={[styles.resultsSubHeadline, styles.resultsSubHeadlineLink]}>See rewards</Text>*/}
                {/*</TouchableHighlight>*/}
              </View>
            </View>

            :

            <View style={styles.resultsContainer}>

              <Text style={styles.resultsHeadline}>Unfortunately, there hasn't been a match</Text>
              <Text style={styles.resultsSubHeadline}>Please make sure that your photo contains one of the following terms:</Text>
              {results.termsMatching && results.termsMatching.map( (term, idx) => <Text key={idx} style={styles.resultsText}>{term}</Text> )}

              <Text style={styles.resultsSubHeadline}>However, your photo has been annotated with the following terms:</Text>
              {results.terms && results.terms.map( (term, idx) => <Text key={idx} style={styles.resultsText}>{term}</Text> )}

            </View>
          }
        </ScrollView>
      </Container>
    );
  }
}
