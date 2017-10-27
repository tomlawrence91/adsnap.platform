import { setCurrentChallenge } from '../snap/SnapState'
import React, { Component } from 'react'
import { Button, Text, ScrollView, AsyncStorage } from 'react-native'
import Container from '../../components/Container'

export default class ChallengeDetailsView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      progress: 0
    }
  }

  async componentDidMount() {
    this.setState({ progress: await AsyncStorage.getItem(this.props.challenge.name) || 0 })
  }

  static route = {
    navigationBar: { title: 'Challenge Details' }
  }

  goToSnap(challenge) {
    this.props.dispatch(setCurrentChallenge(challenge))
    this.props.navigation.performAction(({ tabs }) => {
      tabs('main').jumpToTab('snap');
    })
  }

  render() {
    return(
      <Container>
        <ScrollView>
          <Text>{this.props.challenge.name} Details</Text>
          <Text>{this.props.challenge.description}</Text>
          <Text>Progress: {this.state.progress}/{this.props.challenge.goal} snaps taken!</Text>
          <Button
            title={this.state.progress > 0 ? 'Continue Challenge' : 'Start Challenge'}
            onPress={() => this.goToSnap(this.props.challenge)}
            />
        </ScrollView>
      </Container>
    )
  }
}