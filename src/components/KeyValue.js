import React from 'react';
import * as COLORS from '../constants/colors';

import {
    TouchableOpacity,
    StyleSheet,
    View,
    Image,
    Text
} from 'react-native';

export default class KeyValue extends React.Component {
    render() {
        return (
            <View style={styles.module}>
                <Text style={styles.key}>{this.props.name}</Text>
                <Text
                    textDecorationLine={'underline'}//this.props.isLink ? 'underline' : 'none'}
                    style={styles.value(this.props.isLink)}>{this.props.value}</Text>
            </View>
        )
    }
}


const styles = {
    module: {
        flexDirection: 'row',
        marginBottom: 4,
    },
    key: {
        width: 90,
        fontWeight: 'bold'
    },
    value: isLink => ({
        flex: 1,
        color: isLink ? '#0000EE' : COLORS.GREY
    })


}