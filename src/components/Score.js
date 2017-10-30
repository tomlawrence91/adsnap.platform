import React from 'react';
import * as COLORS from '../constants/colors';
import * as FONTS from '../constants/fonts';
import * as ICONS from '../constants/icons';

import {
  StyleSheet,
  View,
  Animated,
} from 'react-native';

export default class Score extends React.Component {

  state = {
    textScale: new Animated.Value(1)
  };

  animateText() {
    Animated.sequence(
      [
        Animated.timing(this.state.textScale, {
          toValue: 2,
          duration: 250
        }),
        Animated.timing(this.state.textScale, {
          toValue: 1,
          duration: 250
        })
      ]
    ).start();
  }

  componentDidUpdate() {
    if (this.props.pointsUpdated) {
      setTimeout( () => {
        this.animateText();
      }, 500)
    }
  }

  render() {
    return (
      <View style={styles.points}>
        <Animated.Text style={[styles.pointsText, { transform: [ {scale: this.state.textScale }]}]}>{this.props.points} points</Animated.Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  points: {
    flex: 1,
    paddingRight: 12,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  pointsText: {
    color: 'white'
  }
});
