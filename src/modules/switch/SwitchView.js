import React from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity,
  Text,
  Image
} from 'react-native';
import styles from './SwitchStyle';
import * as ICONS from '../../constants/icons';
import * as ChallengesState from '../challenges/ChallengesState';

class SwitchView extends React.Component {
  constructor(props) {
    super(props)
  }

  onPress() {
    const switchTo = this.props.activeView === 'list' ? 'map' : 'list';
    this.props.dispatch(ChallengesState.switchView(switchTo));
  }

  render() {
    return(
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

SwitchView.propTypes = {
  style: PropTypes.object,
  activeView: PropTypes.string.isRequired
};

export default SwitchView