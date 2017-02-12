import React from 'react';
import * as COLORS from '../constants/colors';

import {
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  Text
} from 'react-native';


const CircleButton = React.createClass({
    propTypes: {
      onPress: React.PropTypes.func.isRequired,
      imageUrl:React.PropTypes.string,
      text: React.PropTypes.string,
      radius: React.PropTypes.number.isRequired,
      backgroundColor: React.PropTypes.string
    },

    render() {
      return(
        <TouchableOpacity style={[styles.buttonWrapper(this.props.radius),{backgroundColor:this.props.backgroundColor}]} onPress={()=>this.props.onPress()}>
            {this.props.text && <Text style={styles.buttonText}>{this.props.text.toUpperCase()}</Text>}
            {this.props.imageUrl && <Image style={styles.buttonIcon(this.props.radius)} source={this.props.imageUrl}/>}
        </TouchableOpacity>
      )
    }
});

const styles = {
    buttonWrapper:(radius)=> {
        return {
            backgroundColor: COLORS.BUTTON_BACKGROUND,
            borderRadius: radius,
            width: 2 * radius,
            height: 2 * radius,
            justifyContent: 'center',
            alignItems: 'center',
        }
    },
    buttonText:{
        color: COLORS.WHITE,
        fontWeight: 'bold',
        fontSize: 16,
    },
    buttonIcon:(radius)=>({
        flex:1,
        width: 2*radius,
        height: 2*radius,
        resizeMode: 'contain'
    })

}

export default CircleButton;
