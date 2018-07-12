import React from 'react'
import { View, Text, Image, Platform, PermissionsAndroid } from 'react-native';
import Container from '../../components/Container';
import RectButton from '../../components/RectButton';
import * as COLORS from '../../constants/colors';
import * as COMMON_STYLES from '../../constants/commonStyles';
import * as ICONS from '../../constants/icons';
import styles from './PermissionsGeolocationStyle';

export default class PermissionsGeolocationView extends React.Component {

  async requestGeolocationPermission() {
    if (Platform.OS === 'ios') {
      this.props.navigator.push(Router.getRoute('tabNavigation'));
      return;
    }

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);

      if (granted) {
          this.props.navigator.push(Router.getRoute('tabNavigation'));
      } else {
        this.props.navigator.push(Router.getRoute('permissionsDenied'));
      }
    } catch (err) {
      console.error(err)
    }
  }
  render() {
    return (

      <Container>
        <Image style={styles.backgroundImage} source={ICONS.WELCOME_BG}>
          <Image style={styles.logo} source={ICONS.GEOLOCATION} />
          <Text style={styles.description}>We’ll need access to your geolocation to work. </Text>
          <View style={styles.buttonWrapper}>
            <RectButton
              onPress={() => this.requestGeolocationPermission()}
              text={"Grant geolocation access"}
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