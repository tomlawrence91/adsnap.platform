import {StyleSheet, Dimensions} from 'react-native'
import * as COLORS from '../../constants/colors';
import * as COMMON_STYLES from '../../constants/commonStyles';

export default styles = StyleSheet.create({
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  overlay: {
    padding: 12,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  overlayHeadline: {
    marginTop: 24,
    marginBottom: 12,
    fontSize: 24
  },
  overlayText: {
    backgroundColor: 'black',
    color: 'white'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
})