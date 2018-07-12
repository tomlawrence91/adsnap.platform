import React from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text
} from 'react-native';
import * as COLORS from '../constants/colors';
import * as FONTS from '../constants/fonts';

const Button = (props) => (
  <TouchableOpacity
    style={[
      styles.buttonWrapper,
      { width: props.width },
      { ...props.style }
    ]}
    onPress={() => props.onPress()}>
    <Text style={styles.buttonText}>{props.text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  buttonWrapper: {
    height: 40,
    backgroundColor: 'transparent',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: COLORS.WHITE,
  },
  buttonText: {
    backgroundColor: 'transparent',
    textAlign: 'center',
    color: COLORS.WHITE,
    fontSize: FONTS.BUTTON_FONT_SIZE
  }
});

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  width: PropTypes.number,
  styles: PropTypes.object
};

export default Button;
