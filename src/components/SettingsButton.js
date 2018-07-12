import React from 'react';
import * as COLORS from '../constants/colors';
import * as FONTS from '../constants/fonts';
import * as ICONS from '../constants/icons';

import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native';
import {
  withNavigation,
} from '@exponent/ex-navigation';

@withNavigation
export default class SettingsButton extends React.Component {
  render() {
    return (
      <TouchableOpacity onPress={() => this.props.navigator.push(Router.getRoute('settings'))} style={styles.settings}>
        <Image style={styles.profile} source={ICONS.PROFILE} />
      </TouchableOpacity >
    )
  }
}

const styles = StyleSheet.create({
  profile: {
    height: 30,
    width: 100,
    resizeMode: 'contain',
  }
});
