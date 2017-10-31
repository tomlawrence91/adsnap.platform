import { StyleSheet, Dimensions } from 'react-native'
import * as COLORS from '../../constants/colors';
import * as FONTS from '../../constants/fonts';

export default styles = StyleSheet.create({
  contentWrapper: {
    flex: 1,
    paddingHorizontal: 15,
    marginTop: 50,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain'
  },
  description: {
    backgroundColor: 'transparent',
    color: COLORS.LIGHT_PINK,
    margin: 20,
    textAlign: 'center'
  },
  buttonWrapper: {
    marginVertical: 5,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  // resultsContainer: {
  //   padding: 12,
  //   flex: 1,
  //   justifyContent: 'flex-start',
  //   alignItems: 'flex-start',
  //   // height: Dimensions.get('window').height,
  //   width: Dimensions.get('window').width,
  // },
  // codeWrapper: {
  //   height: 200,
  //   //marginBottom: 35,
  // },
  // codeBox: {
  //   height: 40,
  //   marginTop: 12,
  //   marginBottom: 12,
  //   backgroundColor: 'transparent',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   alignSelf: 'center',
  //   paddingHorizontal: 20,
  //   borderWidth: 1,
  //   borderColor: COLORS.GREY
  // },
  // codeText: {
  //   backgroundColor: 'transparent',
  //   textAlign: 'center',
  //   color: COLORS.GREY,
  //   fontSize: FONTS.BIG_FONT_SIZE
  // },
  // backgroundImage: {
  //   flex: 1,
  //   resizeMode: 'cover',
  //   justifyContent: 'center',
  //   alignItems: 'center'
  // },
  // resultsHeadline: {
  //   marginTop: 24,
  //   marginBottom: 12,
  //   fontSize: 24
  // },
  // resultsSubHeadline: {
  //   marginBottom: 12,
  //   marginTop: 12,
  //   fontWeight: 'bold'
  // },
  // resultsSubHeadlineLink: {
  //   textDecorationLine: 'underline'
  // },
  // resultsText: {
  //   fontSize: 16
  // },
  // resultsImage: {
  //   width: Dimensions.get('window').width,
  //   // height: 100
  // }
})