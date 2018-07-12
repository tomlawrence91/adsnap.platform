import React from 'react'
import { 
  TouchableOpacity, 
  Text, 
  ScrollView, 
  View, 
  Image 
} from 'react-native'
import MapView from 'react-native-maps';
import Container from '../../components/Container'
import SwitchView from '../switch/SwitchContainer'
import styles from './ChallengesStyles'
import { setCurrentChallenge } from '../snap/SnapState'

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
          <ScrollView style={styles.listContainer}>
            {this.props.challenges.map(challenge =>
              <View key={challenge.id}
                style={[
                  styles.listChallengeView,
                  { opacity: challenge.completed ? 0.25 : 1}
                ]}>
                <Image style={styles.listChallengeImage}
                  source={challenge.campaignImgUrl} />
                <View style={styles.listChallengeDetails}>
                  <Text style={styles.listChallengeDetailsTitle}>{challenge.name}</Text>
                  <Text style={styles.listChallengeDetailsDescription}>{challenge.description}</Text>
                  <TouchableOpacity
                    style={styles.listChallengeButtonWrapper}
                    onPress={() => this.startChallenge(challenge)}>
                    <Text style={styles.listChallengeButtonText}>Start challenge</Text>
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
                    style={styles.mapMarker}
                    source={challenge.campaignImgUrl}
                  />
                  <MapView.Callout style={styles.plainView}
                    onPress={() => this.startChallenge(challenge)}>
                    <View>
                      <Text style={styles.calloutTitle}>{challenge.brandName}</Text>
                      <Text style={styles.calloutDescription}>{challenge.description}</Text>
                      <View style={styles.detailsView}>
                        <Text style={styles.detailsCta}>Start challenge</Text>
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