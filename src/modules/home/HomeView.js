import React from 'react'
import { Button, Text, ScrollView, Platform, PermissionsAndroid } from 'react-native'
import Container from '../../components/Container'

export default class HomeView extends React.Component {
  static route = {
    navigationBar: { title: 'Home' }
  }

  componentDidMount() {
    if (Platform.OS === 'android') {
      return this.requestCameraPermission()
    }
  }

  toToTabs() {
    this.props.navigator.push(Router.getRoute('tabNavigation'))
  }

  async requestCameraPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          'title': 'Cool Photo App Camera Permission',
          'message': 'Cool Photo App needs access to your camera ' +
          'so you can take awesome pictures.'
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      } else {
        console.log("Camera permission denied")
      }
    } catch (err) {
      console.warn(err)
    }
  }

  render() {
    return(
      <Container>
        <ScrollView>
          <Text>Welcome to AdSnap</Text>
          <Text>Finish challenges to unlock prizes.</Text>
          <Button
           title='Start snapping'
           onPress={() => this.toToTabs()}
           />
        </ScrollView>
      </Container>
    )
  }
}