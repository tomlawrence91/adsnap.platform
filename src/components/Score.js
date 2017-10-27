import React from 'react';
import * as COLORS from '../constants/colors';
import * as FONTS from '../constants/fonts';
import * as ICONS from '../constants/icons';

import {
  StyleSheet,
  View,
  Text,
  Animated
} from 'react-native';

export default class Score extends React.Component {

  render() {
    return (
      <View style={styles.points}>
        <Text style={styles.pointsText}>{this.props.points} points</Text>
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
