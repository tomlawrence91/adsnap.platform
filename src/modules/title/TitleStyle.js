import { Dimensions, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  title: {
    width: Dimensions.get('window').width,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '500'
  }
})

export default styles