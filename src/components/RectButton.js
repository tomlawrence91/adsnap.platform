import React from 'react';
import * as COLORS from '../constants/colors';

import {
    TouchableOpacity,
    StyleSheet,
    View,
    Image,
    Text
} from 'react-native';

export default class RectButton extends React.Component {
    render() {
        return (
            <TouchableOpacity style={[styles.buttonWrapper(this.props.width, this.props.height), { backgroundColor: this.props.backgroundColor, borderColor: this.props.borderColor, ...this.props.border }]} onPress={() => this.props.onPress()}>
                {this.props.text && <Text style={[styles.buttonText, { color: this.props.textColor }]}>{this.props.text}</Text>}
            </TouchableOpacity>
        )
    }
}

RectButton.propTypes = {
    onPress: React.PropTypes.func.isRequired,
    imageUrl: React.PropTypes.string,
    text: React.PropTypes.string,
    width: React.PropTypes.number.isRequired,
    heigth: React.PropTypes.number,
    backgroundColor: React.PropTypes.string,
    textColor: React.PropTypes.string,
    borderColor: React.PropTypes.string,
    border: React.PropTypes.object,
};

const styles = {
    buttonWrapper: (width, height) => {
        return {
            backgroundColor: COLORS.BUTTON_BACKGROUND,
            width: width,
            height: height,
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomWidth: 2,
            borderRadius: 2,
            borderColor: COLORS.BUTTON_BACKGROUND,
        }
    },
    buttonText: {
        color: COLORS.DARK_TEXT,
        fontWeight: '500',
        fontSize: 20,
    }

}