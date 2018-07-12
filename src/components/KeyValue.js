import React from 'react';
import PropTypes from 'prop-types';
import {
	TouchableOpacity,
	StyleSheet,
	View,
	Image,
	Text
} from 'react-native';
import * as COLORS from '../constants/colors';

const KeyValue = (props) => (
	<View style={styles.module}>
		<Text style={styles.key}>{props.name}</Text>
		<Text
			textDecorationLine={'underline'}
			style={styles.value(props.isLink)}>{props.value}</Text>
	</View>
);

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
};

KeyValue.propTypes = {
	name: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	isLink: PropTypes.bool
}

export default KeyValue