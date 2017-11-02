import React from 'react';
import { connect } from 'react-redux'

import * as ChallengesState from '../modules/challenges/ChallengesState';

import * as COLORS from '../constants/colors';
import * as ICONS from '../constants/icons';

import {
  TouchableOpacity,
  StyleSheet,
  Text,
  Image
} from 'react-native';

class SwitchView extends React.Component {

  onPress() {
    const switchTo = this.props.activeView === 'list' ? 'map' : 'list';
    this.props.dispatch(ChallengesState.switchView(switchTo));
  }

  render() {
    return (
      <TouchableOpacity
        style={[
          styles.button,
          { ...this.props.style }
        ]}
        onPress={() => this.onPress()}>
        <Image style={styles.buttonIcon} source={this.props.activeView === 'map' ? ICONS.MAP : ICONS.LIST} />
        <Text style={styles.buttonText}>{this.props.activeView === 'map' ? 'List' : 'Map'}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    paddingLeft: 12,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  buttonIcon: {
    width: 24,
    height: 24,
    marginRight: 6
  },
  buttonText: {
    color: COLORS.WHITE,
    fontWeight: 'bold'
  }
});

export default connect(
  state => ({
    activeView: state.getIn(['challenges', 'activeView'])
  })
)(SwitchView);