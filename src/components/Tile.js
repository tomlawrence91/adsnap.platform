import React from 'react';
import * as COLORS from '../constants/colors';
import * as FONTS from '../constants/fonts';

import {
    TouchableOpacity,
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native';

import Button from './Button';


const Tile = React.createClass({
    propTypes: {
        onPress: React.PropTypes.func.isRequired,
        amount: React.PropTypes.string.isRequired,
        description: React.PropTypes.string.isRequired,
        imgUrl: React.PropTypes.string.isRequired,
        brand: React.PropTypes.string.isRequired,
    },
    getInitialState(){
        return {}
    },

    render() {
        return (
            <TouchableOpacity style={styles.wrapper} onPress={()=>this.props.onPress()}>
             <Image
                    style={styles.backgroundImage}
                    source={{uri: "https://facebook.github.io/react/img/logo_og.png"}}>
                    <View style={styles.coloredOverlay}/>
                    <Text style={styles.text}>{this.props.amount}</Text>
                    <Text style={styles.text}>{this.props.description}</Text>
                    <View style={styles.buttonWrapper} onPress={()=>this.props.onPress()}>
                        <Text style={styles.text}>REDEEM NOW</Text>
                    </View>
                    <Text style={styles.text}>{this.props.brand}</Text>
                </Image>
            </TouchableOpacity>
        )
    }
});
const styles = StyleSheet.create({
    wrapper: {
        height: 200,
        flex:0.5,
        borderWidth: .5,
        borderColor: COLORS.WHITE
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center'
    },
    coloredOverlay: {
        opacity: 0.6,
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
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: COLORS.WHITE
    },
    amount: {
        fontSize: FONTS.BIG_FONT_SIZE,
        color: COLORS.WHITE,

    },
    text: {
        backgroundColor: 'transparent',
        textAlign: 'center',
        color: COLORS.WHITE,
        fontSize: FONTS.SMALL_FONT_SIZE
    }
});

export default Tile;
