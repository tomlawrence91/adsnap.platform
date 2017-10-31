import React from 'react'
import { View, Text, Image, Platform, PermissionsAndroid } from 'react-native'
import Container from '../../components/Container'
import RectButton from "../../components/RectButton";
import * as COLORS from "../../constants/colors";
import * as COMMON_STYLES from "../../constants/commonStyles";
import * as ICONS from "../../constants/icons";

import styles from './PermissionsStyles';

export default class PermissionsView extends React.Component {

  async requestCameraPermission() {

    if (Platform.OS === 'ios') {
      this.props.navigator.push(Router.getRoute('tabNavigation'));
      return;
    }

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
        this.props.navigator.push(Router.getRoute('tabNavigation'));
      } else {
        this.props.navigator.push(Router.getRoute('permissionsDenied'));
      }
    } catch (err) {
      console.warn(err)
    }
  }

  render() {
    return(

      <Container>
        <Image style={styles.backgroundImage} source={ICONS.WELCOME_BG}>
          <Image style={styles.logo} source={ICONS.CAMERA} />
          <Text style={styles.description}>We’ll need access to your camera to work. </Text>
          <View style={styles.buttonWrapper}>
            <RectButton
              onPress={() => this.requestCameraPermission()}
              text={"Grant camera access"}
              width={240}
              height={COMMON_STYLES.BUTTON_HEIGHT}
              textColor={COLORS.WHITE}
              backgroundColor={COLORS.TRANSPARENT}
              borderColor={COLORS.WHITE}
              border={{
                borderColor: COLORS.WHITE,
                borderStyle: "solid",
                borderWidth: 2
              }}
            />
          </View>
        </Image>
      </Container>

    )
  }
}