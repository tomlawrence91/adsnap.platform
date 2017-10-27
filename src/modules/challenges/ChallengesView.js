import * as ChallengeDetailsState from '../challengeDetails/ChallengeDetailsState'
import React from 'react'
import { Button, Text, ScrollView, View } from 'react-native'
import Container from '../../components/Container'

export default class ChallengesView extends React.Component {
  static route = {
    navigationBar: { title: 'Challenges' }
  }

  startChallenge(challenge) {
    this.props.dispatch(ChallengeDetailsState.setChallenge(challenge))
    this.props.navigator.push(Router.getRoute('challengeDetails'));
  }

  render() {
    return(
      <Container>
        <ScrollView>
          {this.props.challenges.map(challenge =>
            <View key={challenge.id}>
              <Text>{challenge.name}</Text>
              <Text>{challenge.description}</Text>
              <Button
                title="See Challenge Details"
                onPress={() => this.startChallenge(challenge)} />
            </View>
          )}
        </ScrollView>
      </Container>
    )
  }
}