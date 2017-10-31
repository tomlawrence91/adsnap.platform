import React from 'react'
import { View, Text, Image } from 'react-native'
import OpenSettings from 'react-native-open-settings';
import Container from '../../components/Container'
import RectButton from "../../components/RectButton";
import * as COLORS from "../../constants/colors";
import * as COMMON_STYLES from "../../constants/commonStyles";
import * as ICONS from "../../constants/icons";

import styles from '../permissions/PermissionsStyles';

export default class PermissionsDeniedView extends React.Component {

  goToSettings() {
    OpenSettings.openSettings();
  }

  render() {
    return(

      <Container>
        <Image style={styles.backgroundImage} source={ICONS.WELCOME_BG}>
          <Image style={styles.logo} source={ICONS.CAMERA} />
          <Text style={styles.description}>Without access to your camera we can’t see the discount you want to capture ☹</Text>
          <View style={styles.buttonWrapper}>
            <RectButton
              onPress={() => this.goToSettings()}
              text={"Open settings"}
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