import React from "react";
import {
  AppRegistry,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  Dimensions
} from "react-native";
import Router from '../AppRouter';
import * as COLORS from "../../constants/colors";
import * as COMMON_STYLES from "../../constants/commonStyles";
import * as ICONS from "../../constants/icons";
import * as WelcomeState from "./WelcomeState";
import Container from "../../components/Container";
import RectButton from "../../components/RectButton";
import SignUpModal from "../../components/SignUpModal";
import SignInModal from "../../components/SignInModal";
import styles from "./WelcomeStyles";
import AuthService from "../../services/AuthService";

export default class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signUpModalVisible: false,
      signInModalVisible: false,
      user: {
        email: "",
        password: ""
      }
    };
  }

  static route = {
    navigationBar: {
      visible: false,
      backgroundColor: COLORS.APP_HEADER
    }
  }

  setEmail(text) {
    this.setState({ user: { ...this.state.user, email: text } });
  }

  setPassword(text) {
    this.setState({ user: { ...this.state.user, password: text } });
  }

  confirmPassword(text) {
    if (this.state.user.password !== text) {
      this.props.navigator.showLocalAlert(
        `Passwords don't match.`,
        COMMON_STYLES.ALERT_STYLES_ERROR
      );
    }
  }

  goToTabMenu() {
    this.props.navigator.push(Router.getRoute('tabNavigation'));
  }

  login() {
    AuthService.login(this.state.user.email, this.state.user.password)
      .then(res => {
        this.setState({ signInModalVisible: false })
        this.goToTabMenu()
      })
      .catch(err => console.error(err))
  }

  signup() {
    AuthService.signup(this.state.user.email, this.state.user.password)
      .then(res => {
        this.setState({ signUpModalVisible: false })
        this.goToTabMenu()
      })
      .catch(err => console.error(err))
  }

  closeModal() {
    this.setState({ signUpModalVisible: false, signInModalVisible: false });
  }

  render() {
    const BUTTON_WIDTH = Dimensions.get("window").width - 30;
    const BUTTON_HEIGHT = 40;
    return (
      <Container>
        <Image style={styles.backgroundImage} source={ICONS.WELCOME_BG}>
          <Image style={styles.logo} source={ICONS.LOGO_WHITE} />
          <Text style={styles.description} />
          <View style={styles.buttonWrapper}>
            <RectButton
              onPress={() => this.setState({ signInModalVisible: true })}
              text={"Login"}
              width={COMMON_STYLES.BUTTON_WIDTH(Dimensions)}
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
          <View style={styles.buttonWrapper}>
            <RectButton
              onPress={() => this.setState({ signUpModalVisible: true })}
              text={"Sign up"}
              width={COMMON_STYLES.BUTTON_WIDTH(Dimensions)}
              height={COMMON_STYLES.BUTTON_HEIGHT}
              textColor={COLORS.WHITE}
              backgroundColor={COLORS.TRANSPARENT}
              border={{
                borderColor: COLORS.WHITE,
                borderStyle: "solid",
                borderWidth: 2
              }}
            />
          </View>
        </Image>

        <SignUpModal
          visible={this.state.signUpModalVisible}
          cancel={() => this.closeModal()}
          setEmail={text => this.setEmail(text)}
          setPassword={text => this.setPassword(text)}
          confirmPassword={text => this.confirmPassword(text)}
          onSignUpPress={() => this.signup()}
        />
        <SignInModal
          visible={this.state.signInModalVisible}
          cancel={() => this.closeModal()}
          setEmail={text => this.setEmail(text)}
          setPassword={text => this.setPassword(text)}
          onLoginPress={() => this.login()}
        />

      </Container>
    );
  }
}