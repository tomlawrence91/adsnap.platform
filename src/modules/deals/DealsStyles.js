import { StyleSheet, Dimensions } from 'react-native'
import * as COLORS from '../../constants/colors';
import * as COMMON_STYLES from '../../constants/commonStyles';

export default styles = StyleSheet.create({
	table: {
		flexDirection: 'row',
		flexWrap: 'wrap'
	},
	tileWrapper: {
		flexDirection: 'row',
		flex: 1,
	},
	tile: {
		margin: 3,
	}
})