import React from 'react';
import * as COLORS from '../constants/colors';

import {
    TouchableOpacity,
    StyleSheet,
    View,
    Image,
    Text
} from 'react-native';


export default class GenderButton extends React.Component {
    render() {
        return (
            <TouchableOpacity style={[styles.buttonWrapper, this.props.selected ? styles.buttonWrapperActive : {}]} onPress={() => this.props.onPress()}>
                {this.props.activeIcon && <Image style={styles.image} source={this.props.selected ? this.props.activeIcon : this.props.inactiveIcon} />}
                <Text style={[styles.buttonText, this.props.selected ? styles.buttonTextActive : {}]}>{this.props.text}</Text>
            </TouchableOpacity>
        )
    }
}

GenderButton.propTypes = {
    onPress: React.PropTypes.func.isRequired,
    text: React.PropTypes.string.isRequired,
    selected: React.PropTypes.bool.isRequired,
    inactiveIcon: React.PropTypes.any,
    activeIcon: React.PropTypes.any
}

const styles = StyleSheet.create({
    image: {
        width: 50,
        margin: 10,
        height: 40,
        resizeMode: 'contain'
    },
    buttonWrapper: {
        borderColor: COLORS.TEXT_GRAY,
        borderWidth: 1,
        flex: 1,
        borderRadius: 5,
        margin: 10,
        alignItems: 'center'
    },
    buttonWrapperActive: {
        backgroundColor: COLORS.FF_ORANGE,
        borderColor: COLORS.FF_ORANGE
    },
    buttonText: {
        backgroundColor: 'transparent',
        textAlign: 'center',
        color: COLORS.TEXT_GRAY,
        fontSize: 16,
        padding: 6,
    },
    buttonTextActive: {
        color: COLORS.WHITE
    }
});

