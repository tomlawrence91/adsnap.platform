import React from 'react';
import PropTypes from 'prop-types';
import {
	TouchableOpacity,
	StyleSheet,
	View,
	Text
} from 'react-native';
import * as COLORS from '../constants/colors';
import * as FONTS from '../constants/fonts';

const CaptureButton = (props) => (
	<TouchableOpacity
		onPress={() => props.onPress()}
		style={styles.button}
	/>
);

const styles = StyleSheet.create({
	button: {
		width: 50,
		height: 50,
		borderRadius: 40,
		borderWidth: 5,
		borderColor: '#888',
		backgroundColor: '#AAA',
		marginBottom: 15,
	}
});

CaptureButton.propTypes = {
	onPress: PropTypes.func.isRequired
};

export default CaptureButton;
