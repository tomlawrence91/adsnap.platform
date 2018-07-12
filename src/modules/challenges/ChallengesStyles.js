import { StyleSheet, Dimensions } from 'react-native'

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 10
  },
  listChallengeView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 5,
    paddingVertical: 10,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE'
  },
  listChallengeImage: { 
    width: 100, 
    height: 100, 
    marginRight: 12 
  },
  listChallengeDetails: {
    flex: 1,
    marginLeft: 5
  },
  listChallengeDetailsTitle: {
    color: '#464646',
    fontSize: 22,
    fontWeight: 'bold'
  },
  listChallengeDetailsDescription: {
    color: '#464646',
    fontSize: 18
  },
  listChallengeButtonWrapper: {
    backgroundColor: '#ff1654',
    height: 32,
    marginTop: 10,
    width: 150
  },
  listChallengeButtonText: {
    color: '#f7f7f7',
    fontSize: 18,
    marginVertical: 5,
    textAlign: 'center'
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  mapMarker: {
    width: 48, 
    height: 48, 
    backgroundColor: 'white', 
    borderRadius: 48
  },
  plainView: {
    width: 150,
    padding: 12
  },
  calloutTitle: {
    fontWeight: 'bold',
    fontSize: 16
  },
  calloutDescription: {
    fontSize: 12
  },
  detailsView: {
    backgroundColor: '#ff1654',
    marginTop: 5
  },
  detailsCta: {
    color: '#f7f7f7',
    fontSize: 12,
    marginVertical: 3,
    textAlign: 'center' 
  }
})

export default styles