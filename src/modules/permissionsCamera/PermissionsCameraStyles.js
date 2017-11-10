import { StyleSheet, Dimensions } from 'react-native'
import * as COLORS from '../../constants/colors';

export default styles = StyleSheet.create({
  contentWrapper: {
    flex: 1,
    paddingHorizontal: 15,
    marginTop: 50,
  },
  logo: {
    height: 150,
    resizeMode: 'contain'
  },
  description: {
    backgroundColor: 'transparent',
    color: COLORS.WHITE,
    margin: 20,
    textAlign: 'center'
  },
  buttonWrapper: {
    marginVertical: 5,
  },
  backgroundImage: {
    flex: 1,
    width: Dimensions.get('window').width,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center'
  },
})