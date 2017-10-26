import * as SnapState from '../snap/SnapState'
import React from 'react'
import { Button, Text, ScrollView, View } from 'react-native'
import Container from '../../components/Container'

export default class DealsView extends React.Component {
  static route = {
    navigationBar: { title: 'Challenges' }
  }

  startChallenge(challenge) {
    this.props.dispatch(SnapState.setCurrentChallenge(challenge))
    this.props.navigator.push(Router.getRoute('snap'));
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
                title="Go to Challenge"
                onPress={() => this.startChallenge(challenge)} />
            </View>
          )}
        </ScrollView>
      </Container>
    )
  }
}