import {StyleSheet, Dimensions} from 'react-native'
import * as COLORS from '../../constants/colors';
import * as COMMON_STYLES from '../../constants/commonStyles';

export default styles = StyleSheet.create({
  preview: {
    // flex: 1,
    // justifyContent: 'flex-end',
    // alignItems: 'center',
    height: Dimensions.get('window').height - 200,
    width: Dimensions.get('window').width
  },
  actions: {
    marginBottom: 0,
    flexDirection:'column',
    justifyContent: 'center',
    alignItems: 'center',
    // position: 'absolute',
    height: 120,
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
  }
})