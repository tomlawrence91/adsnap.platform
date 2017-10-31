// import * as ChallengeDetailsState from '../challengeDetails/ChallengeDetailsState'
import { setCurrentChallenge } from '../snap/SnapState'
import React from 'react'
import { TouchableOpacity, Text, ScrollView, View, Image } from 'react-native'
import Container from '../../components/Container'
import RectButton from '../../components/RectButton'

export default class ChallengesView extends React.Component {
  static route = {
    navigationBar: { title: 'Challenges' }
  }

  startChallenge(challenge) {
    // this.props.dispatch(ChallengeDetailsState.setChallenge({...challenge, completed: false}));
    // this.props.navigator.push(Router.getRoute('challengeDetails'));
    this.props.dispatch(setCurrentChallenge(challenge))
    this.props.navigation.performAction(({ tabs }) => {
      tabs('main').jumpToTab('snap');
    })
  }

  render() {
    return(
      <Container>
        <ScrollView
         style={{
          backgroundColor: '#e2e2e2',
          paddingHorizontal: 10
         }}>
          {this.props.challenges.map(challenge =>
            <View key={challenge.id}
              style={{ 
                flexDirection: 'row', 
                flexWrap: 'wrap',
                marginVertical: 10
                }}>
              <Image
                style={{ width: 100, height: 100 }}
                source={{ uri: challenge.campaignImgUrl }}
              />
              <View style={{
                marginLeft: 5,
                width: 250
              }}>
                <Text style={{
                  color: '#464646',
                  fontSize: 22,
                  fontWeight: 'bold',
                }}>{challenge.name}</Text>
                <Text style={{
                  color: '#464646',
                  fontSize: 18
                }}>{challenge.description}</Text>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#ff1654',
                    height: 32,
                    marginTop: 10,
                    width: 150
                  }}
                  onPress={() => this.startChallenge(challenge)} >
                  <Text style={{
                    color: '#f7f7f7',
                    fontSize: 18,
                    marginVertical: 5,
                    textAlign: 'center'
                  }}>go to challenge</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </ScrollView>
      </Container>
    )
  }
}
