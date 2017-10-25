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
  actions: {
    flex: 2,
    paddingBottom: 130,
    flexDirection:'column',
    alignItems: 'center',
    position: 'absolute',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
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