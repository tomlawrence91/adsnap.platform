import React from "react";
// import * as ImageBrowserState from "../imageBrowser/ImageBrowserState";
import { Button, View, Text, Image } from "react-native";
import Container from "../../components/Container";
import RectButton from "../../components/RectButton";

import styles from "./ImageResultsStyles";
import * as COLORS from "../../constants/colors";
import * as COMMON_STYLES from "../../constants/commonStyles";
import * as ICONS from "../../constants/icons";

export default class ImageResultsView extends React.Component {

  static route = {
    // navigationBar: {
    //   title: ""
    // }
  };

  returnToSnap() {
    this.props.navigator.pop();
  }

  nextAction() {
    this.props.navigator.pop();
  }

  render() {
    const results = this.props.results.toJS();
    const challenge = this.props.challenge.toJS();

    console.log(results);

    return (

      <Container>

          {results.match ?

            <View style={styles.container}>
              <Image style={styles.logo} source={{uri: results.file}} />
              <Text style={styles.description}>{challenge.name ? `Congrats, you have unlocked ${challenge.name}` : `Well, done you have taken a photo of an ad`}</Text>
              <View style={styles.buttonWrapper}>
                <RectButton
                  onPress={ () => this.nextAction()}
                  text={challenge.name ? 'Get your discount' : 'Collect more points'}
                  width={240}
                  height={COMMON_STYLES.BUTTON_HEIGHT}
                  textColor={COLORS.LIGHT_PINK}
                  backgroundColor={COLORS.TRANSPARENT}
                  borderColor={COLORS.LIGHT_PINK}
                  border={{
                    borderColor: COLORS.LIGHT_PINK,
                    borderStyle: "solid",
                    borderWidth: 2
                  }}
                />
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
            </View>
          }

      </Container>
    );
  }
}
