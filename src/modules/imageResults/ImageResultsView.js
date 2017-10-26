import React from "react";
// import * as ImageBrowserState from "../imageBrowser/ImageBrowserState";
import { Button, View, Text, Image, TouchableHighlight, ScrollView } from "react-native";
import Container from "../../components/Container";

import styles from "./ImageResultsStyles";
// import Button from "../../components/Button";

export default class ImageResultsView extends React.Component {

  static route = {
    navigationBar: {
      title: "AdSnap image analysis"
    }
  };

  goHome() {
    this.props.navigator.push(Router.getRoute('home'));
  }

  returnToSnap() {
    this.props.navigator.push(Router.getRoute('snap'));
  }

  render() {
    const results = this.props.results.toJS();
    const challenge = this.props.challenge.toJS()

    return (
      <Container>
        <ScrollView>

          {results.match ?

            <View>
              <View style={styles.codeWrapper}>
                <Image style={styles.backgroundImage} source={{ uri: results.file }} />
              </View>
              <View style={styles.resultsContainer}>
                <Text style={styles.resultsHeadline}>Congrats, you have unlocked {challenge.name}</Text>
                <Text style={styles.resultsSubHeadline}>The following coupon code has been added to your rewards.</Text>
                <View style={styles.codeBox}><Text style={styles.codeText}>{challenge.code}</Text></View>
                {/*<TouchableHighlight>*/}
                  {/*<Text style={[styles.resultsSubHeadline, styles.resultsSubHeadlineLink]}>See rewards</Text>*/}
                {/*</TouchableHighlight>*/}
                <Button
                  title="Go Home"
                  onPress={() => this.goHome()} />
              </View>
            </View>

            :

            <View style={styles.resultsContainer}>

              <Text style={styles.resultsHeadline}>Unfortunately, there hasn't been a match to {challenge.name}</Text>
              <Text style={styles.resultsSubHeadline}>Please make sure that your photo contains one of the following terms:</Text>
              {results.termsMatching && results.termsMatching.map( (term, idx) => <Text key={idx} style={styles.resultsText}>{term}</Text> )}

              <Text style={styles.resultsSubHeadline}>However, your photo has been annotated with the following terms:</Text>
              {results.terms && results.terms.map( (term, idx) => <Text key={idx} style={styles.resultsText}>{term}</Text> )}
              <Button 
                title="Try Again"
                onPress={() => this.returnToSnap()}/>
              <Button
                title="Go Home"
                onPress={() => this.goHome()} />
            </View>
          }
        </ScrollView>
      </Container>
    );
  }
}
