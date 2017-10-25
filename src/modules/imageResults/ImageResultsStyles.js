import { StyleSheet, Dimensions } from 'react-native'

export default styles = StyleSheet.create({
  resultsContainer: {
    padding: 12,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  resultsHeadline: {
    marginTop: 24,
    marginBottom: 12,
    fontSize: 24
  },
  resultsText: {
    fontSize: 16
  },
})