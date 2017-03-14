import React from 'react';
import * as COLORS from '../constants/colors';
import * as FONTS from '../constants/fonts';

import {
    TouchableOpacity,
    StyleSheet,
    View,
    Text,
    Image,
    Dimensions
} from 'react-native';

import Button from './Button';


const Tile = React.createClass({
    propTypes: {
        onPress: React.PropTypes.func.isRequired,
        amount: React.PropTypes.string.isRequired,
        // description: React.PropTypes.string.isRequired,
        imgUrl: React.PropTypes.string.isRequired,
        brand: React.PropTypes.string.isRequired,
        overlayColor: React.PropTypes.string,
    },
    getInitialState() {
        return {}
    },

    render() {
        return (
            <TouchableOpacity style={styles.wrapper} onPress={() => this.props.onPress()}>
                <Image
                    style={styles.backgroundImage}
                    source={{ uri: this.props.imgUrl }}>
                    <View style={[styles.coloredOverlay, { backgroundColor: this.props.overlayColor }]} />
                    <Text style={styles.amount}>{this.props.amount}</Text>
                    {/*<Text style={styles.text}>{this.props.description}</Text>*/}
                    <View style={styles.buttonWrapper} onPress={() => this.props.onPress()}>
                        <Text style={styles.buttonText}>REDEEM  NOW</Text>
                    </View>
                    <Text style={styles.brandText}>{this.props.brand}</Text>
                </Image>
            </TouchableOpacity >
        )
    }
});
const styles = StyleSheet.create({
    wrapper: {
        width: Dimensions.get('window').width / 2 - 0.25,
        height: Dimensions.get('window').width / 2 - 0.25,
        borderWidth: 0.5,
        borderColor: COLORS.WHITE,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },
    coloredOverlay: {
        opacity: 0.85,
        backgroundColor: COLORS.TRANSPARENT_PURPLE,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    buttonWrapper: {
        height: 40,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 5,
        borderWidth: 1,
        borderColor: COLORS.WHITE
    },
    amount: {
        backgroundColor: 'transparent',
        fontSize: 30,
        fontWeight: '500',
        color: COLORS.WHITE,
    },
    buttonText: {
        backgroundColor: 'transparent',
        fontSize: 15,
        fontWeight: 'bold',
        // fontFamily: 'Open Sans',
        color: COLORS.WHITE,
    },
    text: {
        backgroundColor: 'transparent',
        textAlign: 'center',
        color: COLORS.WHITE,
        fontSize: FONTS.SMALL_FONT_SIZE,
        marginVertical: 7,
    },
    brandText: {
        backgroundColor: 'transparent',
        textAlign: 'center',
        color: COLORS.WHITE,
        fontSize: FONTS.SMALL_FONT_SIZE,
        fontWeight: '500',

        marginVertical: 7,
    }
});

export default Tile;
