import React from 'react';
import * as COLORS from '../constants/colors';
import * as FONTS from '../constants/fonts';

import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text
} from 'react-native';


const Button = React.createClass({
    propTypes: {
      onPress: React.PropTypes.func.isRequired,
      text: React.PropTypes.string.isRequired,
      width: React.PropTypes.number
    },

    render() {
      return(
        <TouchableOpacity style={[styles.buttonWrapper,{width:this.props.width}]} onPress={()=>this.props.onPress()}>
            <Text style={styles.buttonText}>{this.props.text}</Text>
        </TouchableOpacity>
      )
    }
});

const styles = StyleSheet.create({
  buttonWrapper:{
    height: 40,
    backgroundColor: 'transparent',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: COLORS.WHITE
  },
  buttonText:{
    backgroundColor:'transparent',
    textAlign: 'center',
    color: COLORS.WHITE,
    fontSize: FONTS.BUTTON_FONT_SIZE
  }
});

export default Button;
