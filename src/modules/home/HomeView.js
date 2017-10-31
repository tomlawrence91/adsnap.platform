import React from 'react'
import { View, Text, Image} from 'react-native'
import Container from '../../components/Container'
import RectButton from "../../components/RectButton";
import * as COLORS from "../../constants/colors";
import * as COMMON_STYLES from "../../constants/commonStyles";
import * as ICONS from "../../constants/icons";

import styles from './HomeStyles';


export default class HomeView extends React.Component {

  goToNext() {
    this.props.navigator.push(Router.getRoute('permissions'))
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