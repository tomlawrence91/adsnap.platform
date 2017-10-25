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
import {
  KeyboardAwareScrollView
} from "react-native-keyboard-aware-scrollview";
import styles from "./WelcomeStyles";
import Auth0 from 'react-native-auth0'
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
    const auth0 = new Auth0(
      {
        domain: 'adsnap-app.eu.auth0.com',
        clientId: 'EFiUiAIIvyQ7DtInLammnPrP3SLc87QD'
      }
    );

    auth0
      .auth
      .passwordRealm({
        username: this.state.user.email,
        password: this.state.user.password,
        realm: 'Username-Password-Authentication'
      })
      .then(credentials => {
        console.log(credentials)
        auth0.auth.userInfo({ token: credentials.accessToken })
          .then(userProfile => {
            console.log(userProfile)
            // await AuthService.login(userProfile, credentials.accessToken);
            this.setState({ signInModalVisible: false })
            this.goToTabMenu();
          })
          .catch(err => console.error(err))
      })
      .catch(error => console.log(error));
  }

  signup() {
    const auth0 = new Auth0(
      {
        domain: 'adsnap-app.eu.auth0.com',
        clientId: 'EFiUiAIIvyQ7DtInLammnPrP3SLc87QD'
      }
    );

    auth0
      .auth
      .createUser({ 
        email: this.state.user.email, 
        password: this.state.user.password,
        connection: 'Username-Password-Authentication' 
      })
      .then(user => {
        console.log(user)
        this.setState({ signUpModalVisible: false })
        this.goToTabMenu();
      })
      .catch(console.error);
  }

  openSignUpModal() {
    this.setState({ signUpModalVisible: true });
  }
  openSignInModal() {
    this.setState({ signInModalVisible: true });
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
              onPress={() => this.openSignInModal()}
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
              onPress={() => this.openSignUpModal()}
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