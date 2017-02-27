import React from 'react';
import * as COLORS from '../constants/colors';
import * as FONTS from '../constants/fonts';

import {
    TouchableOpacity,
    StyleSheet,
    View,
    Text
} from 'react-native';


export default class CaptureButton extends React.Component {

    render() {
        return (
            <TouchableOpacity
                onPress={() => this.props.onPress()}
                style={styles.button}
            />
        )
    }
}

const styles = StyleSheet.create({
    button: {
        width: 70,
        height: 70,
        borderRadius: 40,
        borderWidth: 5,
        borderColor: '#888',
        backgroundColor: '#AAA',
        marginBottom: 30,
    }
});

