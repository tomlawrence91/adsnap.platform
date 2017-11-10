import React from 'react';
import PropTypes from 'prop-types';
import {
	TouchableOpacity,
	View,
	Image,
	Text
} from 'react-native';
import * as COLORS from '../constants/colors';

const RectButton = (props) => (
	<TouchableOpacity style={[
			styles.buttonWrapper(props.width, props.height), 
			{ backgroundColor: props.backgroundColor, 
			borderColor: props.borderColor, 
			...props.border }]} 
			onPress={() => props.onPress()}>
		{props.text && <Text style={[styles.buttonText, { color: props.textColor }]}>{props.text}</Text>}
	</TouchableOpacity>
)
		
RectButton.propTypes = {
	onPress: PropTypes.func.isRequired,
	imageUrl: PropTypes.string,
	text: PropTypes.string,
	width: PropTypes.number.isRequired,
	heigth: PropTypes.number,
	backgroundColor: PropTypes.string,
	textColor: PropTypes.string,
	borderColor: PropTypes.string,
	border: PropTypes.object,
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
		fontSize: 19,
	}
}

export default RectButton