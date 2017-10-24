import { StyleSheet, Dimensions } from 'react-native'

export default styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center'
  },
  contentWrapper: {
    paddingHorizontal: 15,
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap'
  },
  image: {
    height: Dimensions.get('window').width / 3,
    width: Dimensions.get('window').width / 3
  }
})