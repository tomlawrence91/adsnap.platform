import {StyleSheet, Dimensions} from 'react-native'
import * as COLORS from '../../constants/colors';
import * as COMMON_STYLES from '../../constants/commonStyles';

export default styles = StyleSheet.create({
  preview: {
    flex: 3,
    width: Dimensions.get('window').width
  },
  actions: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    backgroundColor: COLORS.WHITE
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    // margin: 40
  },
  disable: {
    position: 'absolute',
    flex: 1,
    top: 12,
    right: 12,
    // width: 100,
    // height: 32,
    backgroundColor: COLORS.PINK,
    borderRadius: 12,
    padding: 6,
    paddingHorizontal: 12
  },
  disableText: {
    color: 'white'
  }
})