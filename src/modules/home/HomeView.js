import React from 'react'
import { Button, Text, ScrollView } from 'react-native'
import Container from '../../components/Container'

export default class HomeView extends React.Component {
  static route = {
    navigationBar: { title: 'Home' }
  }

  goToChallenges() {
    this.props.navigator.push(Router.getRoute('challenges'))
  }

  render() {
    return(
      <Container>
        <ScrollView>
          <Text>Welcome to AdSnap</Text>
          <Text>Finish challenges to unlock prizes.</Text>
          <Button
           title='See Challenges'
           onPress={() => this.goToChallenges()}
           />
        </ScrollView>
      </Container>
    )
  }
}