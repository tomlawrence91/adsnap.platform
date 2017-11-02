// import * as ChallengeDetailsState from '../challengeDetails/ChallengeDetailsState'
import { setCurrentChallenge } from '../snap/SnapState'
import React from 'react'
import MapView from 'react-native-maps';
import { TouchableOpacity, Text, ScrollView, View, Image, StyleSheet, Dimensions } from 'react-native'
import Container from '../../components/Container'
import SwitchView from '../../components/SwitchView'

const LATITUDE = 51.507351;
const LONGITUDE = -0.127758;
const LATITUDE_DELTA = 0.0122;
const LONGITUDE_DELTA = 0.0051;

export default class ChallengesView extends React.Component {

  static route = {
    navigationBar: {
      title: 'Challenges',
      renderLeft: (params) => {
        return <SwitchView />
      }
    },
  };

  state = {
    region: {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    },
  };

  startChallenge(challenge) {
    if (challenge.completed) {
      return;
    }
    this.props.dispatch(setCurrentChallenge(challenge));
    this.props.navigation.performAction(({ tabs }) => {
      tabs('main').jumpToTab('snap');
    })
  }

  render() {
    return(
      <Container>
        {this.props.activeView === 'list' ?
          <ScrollView
            style={{
              backgroundColor: 'white',
              paddingHorizontal: 10
            }}>
            {this.props.challenges.map(challenge =>
              <View key={challenge.id}
                    style={{
                      flexDirection: 'row',
                      // justifyContent: 'space-around',
                      alignItems: 'center',
                      marginBottom: 5,
                      marginTop: 5,
                      paddingVertical: 10,
                      paddingBottom: 20,
                      borderBottomWidth: 1,
                      borderBottomColor: '#EEE',
                      opacity: challenge.completed ? 0.25 : 1
                    }}>
                <Image
                  style={{width: 100, height: 100, marginRight: 12}}
                  source={challenge.campaignImgUrl}
                />
                <View style={{
                  flex: 1,
                  marginLeft: 5
                }}>
                  <Text style={{
                    color: '#464646',
                    fontSize: 22,
                    fontWeight: 'bold',
                  }}>{challenge.name}</Text>
                  <Text
                    // numberOfLines={1}
                    // ellipsizeMode='tail'
                    style={{
                      color: '#464646',
                      fontSize: 18,
                    }}>{challenge.description}</Text>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#ff1654',
                      height: 32,
                      marginTop: 10,
                      width: 150
                    }}
                    onPress={() => this.startChallenge(challenge)}>
                    <Text style={{
                      color: '#f7f7f7',
                      fontSize: 18,
                      marginVertical: 5,
                      textAlign: 'center'
                    }}>Start challenge</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </ScrollView>

          :

          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              }}>
              {this.props.challenges.map((challenge,idx) =>
                <MapView.Marker
                  testID={'1'}
                  key={idx}
                  coordinate={{ latitude: challenge.latitude, longitude: challenge.longitude }}
                >
                  <Image
                    style={{width: 48, height: 48, backgroundColor: 'white', borderRadius: 48}}
                    source={challenge.campaignImgUrl}
                  />
                  <MapView.Callout style={styles.plainView}
                    onPress={() => this.startChallenge(challenge)}>
                    <View>
                      <Text style={styles.calloutTitle}>{challenge.brandName}</Text>
                      <Text style={styles.calloutDescription}>{challenge.description}</Text>
                      <View
                        style={{
                          backgroundColor: '#ff1654',
                          // height: 16,
                          marginTop: 5,
                          // width: 75
                        }}>
                        <Text style={{
                          color: '#f7f7f7',
                          fontSize: 12,
                          marginVertical: 3,
                          textAlign: 'center'
                        }}>Start challenge</Text>
                      </View>
                    </View>
                  </MapView.Callout>
                </MapView.Marker>
              )}
            </MapView>
          </View>
        }
      </Container>
    )
  }
}

const styles = StyleSheet.create({
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
  }
});

