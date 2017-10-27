import { setCurrentChallenge } from '../snap/SnapState'
import React, { Component } from 'react'
import { Button, Text, ScrollView } from 'react-native'
import Container from '../../components/Container'

export default class ChallengeDetailsView extends Component {
  static route = {
    navigationBar: { title: 'Challenge Details' }
  }

  goToSnap(challenge) {
    this.props.dispatch(setCurrentChallenge(challenge))
    this.props.navigator.push(Router.getRoute('snap'))
  }

  render() {
    return(
      <Container>
        <ScrollView>
          <Text>{this.props.challenge.name} Details</Text>
          <Text>{this.props.challenge.description}</Text>
          <Button
            title='Start Challenge'
            onPress={() => this.goToSnap(this.props.challenge)}
            />
        </ScrollView>
      </Container>
    )
  }
}