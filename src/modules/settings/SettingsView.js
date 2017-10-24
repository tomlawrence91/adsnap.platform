import * as SettingsState from "./SettingsState";
import * as COLORS from "../../constants/colors";
import React from "react";
import { Image, Text, View, Dimensions, ScrollView } from "react-native";
import * as ICONS from "../../constants/icons";
import Container from "../../components/Container";
import KeyValue from "../../components/KeyValue";
import RectButton from "../../components/RectButton";
import Tile from "../../components/Tile";
import ListItemWithImage from "../../components/ListItemWithImage";
import * as COMMON_STYLES from "../../constants/commonStyles";
import * as STORAGE from "../../constants/storageNames";
import AuthService from "../../services/AuthService";
import { getStoredItem } from "../../utils/storageUtils";

import styles from "./SettingsStyles";

export default class SettingsView extends React.Component {
  static route = {
    navigationBar: {
      title: "Settings"
    }
  };
  async componentWillMount() {
    const user = await getStoredItem(STORAGE.USER);
    this.props.dispatch(SettingsState.setUser(JSON.parse(user)));
  }

  async logout() {
    console.log("Good bye, bro!");
    await AuthService.logout();
    this.props.navigation
      .getNavigatorByUID("mainNavigation")
      .immediatelyResetStack([Router.getRoute("welcome")], 0);
  }
  //TODO: fetch code
  //TODO: popup on remove
  renderSettings() {
    const settings = [
      { name: this.props.user.get("email"), icon: ICONS.ICON_AT_BLACK }
    ];
    const list = settings.map(setting => (
      <ListItemWithImage text={setting.name} icon={setting.icon} />
    ));
    console.log(list);
    return (
      <View>
        {list}
      </View>
    );
  }
  render() {
    console.log("settings props", this.props);
    return (
      <Container>
        <ScrollView>
          <View style={styles.contentWrapper}>
            {this.renderSettings()}
            {/*<Text>Email</Text>
            <Text>{this.props.user.get("email")}</Text>*/}

            <View style={styles.buttonWrapper}>
              <RectButton
                onPress={() => {}}
                text={"Save Settings"}
                width={COMMON_STYLES.BUTTON_WIDTH(Dimensions)}
                height={COMMON_STYLES.BUTTON_HEIGHT}
                textColor={COLORS.WHITE}
                backgroundColor={COLORS.DARK_GREY}
                borderColor={COLORS.BLACK}
              />
            </View>
            <View style={styles.buttonWrapper}>
              <RectButton
                onPress={() => this.logout()}
                text={"Logout"}
                width={COMMON_STYLES.BUTTON_WIDTH(Dimensions)}
                height={COMMON_STYLES.BUTTON_HEIGHT}
                textColor={COLORS.WHITE}
                backgroundColor={COLORS.DARK_GREY}
                borderColor={COLORS.BLACK}
              />
            </View>
          </View>
        </ScrollView>
      </Container>
    );
  }
}
