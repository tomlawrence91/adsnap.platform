import React from 'react'
import { View, Text, Image, Platform, PermissionsAndroid } from 'react-native'
import Container from '../../components/Container'
import RectButton from "../../components/RectButton";
import * as COLORS from "../../constants/colors";
import * as COMMON_STYLES from "../../constants/commonStyles";
import * as ICONS from "../../constants/icons";

import styles from './HomeStyles';


export default class HomeView extends React.Component {

  goToNext() {
    if (Platform.OS === 'ios') {
      this.props.navigator.push(Router.getRoute('tabNavigation'));
    } else {
      const permissionCamera = PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA)
      const permissionStorage = PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE)
      const permissionGeolocation = PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)

      console.log(permissionCamera, permissionStorage, permissionGeolocation);

      Promise.all([permissionCamera, permissionStorage, permissionGeolocation])
        .then(res => {
          console.log(res)
          if (res[0] && res[1] && res[2]) {
            this.props.navigator.push(Router.getRoute('tabNavigation'));
          }
          else if (res[0] && res[1] && !res[2]) {
            this.props.navigator.push(Router.getRoute('permissionsGeolocation'))
          } else {
            this.props.navigator.push(Router.getRoute('permissions'))
          }
        })
        .catch(err => console.error(err))

    }
  }

  render() {
    return (
      <Container>
        <Image style={styles.backgroundImage} source={ICONS.WELCOME_BG}>
          <Image style={styles.logo} source={ICONS.LOGO_WHITE} />
          <Text style={styles.description}>Here you can exchange photos of adverts for discounts from your favourite brands!</Text>
          <View style={styles.buttonWrapper}>
            <RectButton
              onPress={() => this.goToNext()}
              text={"Start snapping"}
              width={200}
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