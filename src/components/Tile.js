import React from 'react';
import PropTypes from 'prop-types';
import {
	TouchableOpacity,
	StyleSheet,
	View,
	Text,
	Image,
	Dimensions
} from 'react-native';
import * as COLORS from '../constants/colors';
import * as FONTS from '../constants/fonts';
import Button from './Button';

const Tile = (props) => (
	<TouchableOpacity style={styles.wrapper} onPress={() => props.onPress()}>
  	<Image
    	style={styles.backgroundImage}
      source={props.imgUrl}>
      <View style={[styles.coloredOverlay, { backgroundColor: props.overlayColor }]} />
      <Text style={styles.amount}>{props.amount}</Text>
      <View style={styles.buttonWrapper} onPress={() => props.onPress()}>
      	<Text style={styles.buttonText}>REDEEM  NOW</Text>
      </View>
      <Text style={styles.brandText}>{props.brand}</Text>
    </Image>
  </TouchableOpacity >
)

const styles = StyleSheet.create({
  wrapper: {
    width: Dimensions.get('window').width / 2 - 0.25,
    height: Dimensions.get('window').width / 2 - 0.25,
    borderWidth: 0.5,
    borderColor: COLORS.WHITE,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width / 2,
    height: Dimensions.get('window').width / 2
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
    color: COLORS.WHITE,
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

Tile.propTypes = {
	onPress: PropTypes.func.isRequired,
  amount: PropTypes.string.isRequired,
  brand: PropTypes.string.isRequired,
  overlayColor: PropTypes.string,
};

export default Tile;
