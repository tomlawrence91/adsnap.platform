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
    const results = this.props.results.toJS();
    const challenge = this.props.challenge.toJS();
    if (results.match && challenge.name) {
      this.props.navigator.pop();
      return this.props.navigation.performAction(({ tabs }) => {
        tabs('main').jumpToTab('deals');
      })
    }

    this.props.navigator.pop();
  }

  render() {
    const results = this.props.results.toJS();
    const challenge = this.props.challenge.toJS();

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

            <View style={styles.container}>

              <Image style={styles.logo} source={ICONS.SAD} />
              <Text style={styles.description}>{challenge.name ? `Oops, couldn't find a match for ${challenge.name}` : `Oops, that photo doesn't seem to contain any ad`}</Text>
              <View style={styles.buttonWrapper}>
                <RectButton
                  onPress={ () => this.nextAction()}
                  text={challenge.name ? 'Try again' : 'Try again'}
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
          }

      </Container>
    );
  }
}
