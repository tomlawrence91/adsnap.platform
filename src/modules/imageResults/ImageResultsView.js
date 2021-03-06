import React from "react";
import { View, Text, Image } from "react-native";
import Container from "../../components/Container";
import RectButton from "../../components/RectButton";

import * as DealsState from '../deals/DealsState';
import * as SnapState from '../snap/SnapState';

import styles from "./ImageResultsStyles";
import * as COLORS from "../../constants/colors";
import * as COMMON_STYLES from "../../constants/commonStyles";
import * as ICONS from "../../constants/icons";
import * as IMAGES from "../../constants/images";

export default class ImageResultsView extends React.Component {

  static route = {
    navigationBar: {
      title(params) {
        return params.success ? 'Great job!' : 'Oh no!'
      }
    }
  };

  nextAction() {

    if (this.props.results.reward.id) {
      const deal = this.props.deals.filter( deal => deal.id == this.props.results.reward.id );
      this.props.dispatch(DealsState.setActiveDeal(deal[0]));
      this.props.navigator.pop();
      return this.props.navigation.performAction(({ tabs }) => {
        tabs('main').jumpToTab('deals');
      });
    }

    if (this.props.results.match && this.props.results.type === 'deal') {
      const deal = this.props.deals.filter( deal => deal.id == this.props.results.brand);
      this.props.dispatch(DealsState.setActiveDeal(deal[0]));
      this.props.navigator.pop();
      return this.props.navigation.performAction(({ tabs }) => {
        tabs('main').jumpToTab('deals');
      });
    }

    if (this.props.results.match && this.props.challenge.name) {

      this.props.dispatch(SnapState.setCurrentChallenge({}));
      this.props.dispatch(SnapState.hideResults());

      const deal = this.props.deals.filter( deal => deal.id == this.props.challenge.id );
      this.props.dispatch(DealsState.setActiveDeal(deal[0]));
      this.props.navigator.pop();
      return this.props.navigation.performAction(({ tabs }) => {
        tabs('main').jumpToTab('deals');
      })
    }

    this.props.dispatch(DealsState.setActiveDeal({}));
    this.props.navigator.pop();
  }

  render() {

    const results = this.props.results;
    const challenge = this.props.challenge;

    console.log(results);

    return (

      <Container>

          {results.reward.id &&
            <View style={styles.container}>
              <Image style={styles.logo} source={{uri: 'https://www.finder.com/wp-content/uploads/sites/3/2017/09/Currys_PC_World_Logo_0.png'}} />
              <Text style={styles.description}>Congrats, you have reached <Text style={{fontWeight: 'bold'}}>200 points</Text> and unlocked a discount!</Text>
              <View style={styles.buttonWrapper}>
                <RectButton
                  onPress={ () => this.nextAction()}
                  text='Get your discount'
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

          {(results.match && !results.reward.id && results.type === 'deal') &&
          <View style={styles.container}>
            <Image style={styles.logo} source={IMAGES.BRANDS[results.brand.toUpperCase()]}/>
            <Text
              style={styles.description}>Get 1% off at your next purchase</Text>
            <View style={styles.buttonWrapper}>
              <RectButton
                onPress={() => this.nextAction()}
                text='Get discount now!'
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

          {(results.match && !results.reward.id && results.type !== 'deal') &&

            <View style={styles.container}>
              <Image style={styles.logo} source={{uri: results.file}}/>
              <Text
                style={styles.description}>{challenge.name ? `Congrats, you have unlocked ${challenge.name}` : `Well, done you have taken a photo of an ad`}</Text>
              <View style={styles.buttonWrapper}>
                <RectButton
                  onPress={() => this.nextAction()}
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
          }

          {(!results.match && !results.reward.id && results.type !== 'deal') &&

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
