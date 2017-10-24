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
import Router from "../AppRouter";
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
import Auth0Lock from "react-native-lock";
import AuthService from "../../services/AuthService";

export default class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signUpModalVisible: false,
      signInModalVisible: false,
      user: {
        email: "",
        password: "",
        gender: ""
      }
    };
  }

  static route = {
    navigationBar: {
      visible: false,
      backgroundColor: COLORS.APP_HEADER
    }
  };

  setEmail(text) {
    this.setState({ user: { ...this.state.user, email: text } });
    console.log(this.state);
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

  setGender(text) {
    this.setState({ user: { ...this.state.user, gender: text } });
  }

  login() {
    const successCallback = () => {
      this.goToTabMenu();
      this.closeModal();
      this.props.navigator.showLocalAlert(
        "Login succesful.",
        COMMON_STYLES.ALERT_STYLES_SUCCESS
      );
    };

    const errorCallback = error => {
      return this.props.navigator.showLocalAlert(
        `Email and password don't match.`,
        COMMON_STYLES.ALERT_STYLES_ERROR
      );
    };

    this.props.dispatch(
      WelcomeState.login(
        this.state.user.email,
        this.state.user.password,
        successCallback,
        errorCallback
      )
    );
  }

  // facebookLogin() {
  //   this.props.dispatch(WelcomeState.facebookLogin());
  // }

  signup() {
    const user = this.state.user;
    if (!user.email || !user.password || !user.gender) {
      this.props.navigator.showLocalAlert(
        `Please check if all fields are filled in correctly.`,
        COMMON_STYLES.ALERT_STYLES_ERROR
      );
    }

    const successCallback = error => {
      this.goToTabMenu();
      this.closeModal();
      return this.props.navigator.showLocalAlert(
        "Signup succesful. You will receive a confirmation email to activate your account.",
        COMMON_STYLES.ALERT_STYLES_SUCCESS
      );
    };

    const errorCallback = error => {
      return this.props.navigator.showLocalAlert(
        `${error.description}`,
        COMMON_STYLES.ALERT_STYLES_ERROR
      );
    };
    this.props.dispatch(
      WelcomeState.signup(this.state.user, successCallback, errorCallback)
    );
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
  goToSignin() {
    this.props.navigator.push(Router.getRoute("signin"));
  }
  goToTabMenu() {
    this.props.navigator.push(Router.getRoute("tabNavigation"));
  }
  changeTab() {
    let tab = this.state.tab == 0 ? 1 : 0;
    this.setState({ tab: tab });
  }

  openLock() {
    const lock = new Auth0Lock({
      clientId: "ajOlns38DT3Sa3Iiahp3I4fzJY6TdrdP",
      domain: "adsnap.eu.auth0.com",
      disableSignUp: true
    });

    lock.show({ closable: true }, async (err, profile, token) => {
      if (err) {
        console.error(err);
        return;
      }
      // Authentication worked!
      console.log("Logged in with Auth0!");
      console.log(token);
      console.log(profile);

      await AuthService.login(profile, token.idToken);
      this.goToTabMenu();
    });
  }

  render() {
    const BUTTON_WIDTH = Dimensions.get("window").width - 30;
    const BUTTON_HEIGHT = 40;
    return (
      <Container>
        <Image style={styles.backgroundImage} source={ICONS.WELCOME_BG}>

          <Image style={styles.logo} source={ICONS.LOGO_WHITE} />

          <Text style={styles.description} />
          {/* <View style={styles.buttonWrapper}>
            <RectButton
              onPress={() => this.openLock()}
              text={'Log in with Facebook'}
              width={COMMON_STYLES.BUTTON_WIDTH(Dimensions)}
              height={COMMON_STYLES.BUTTON_HEIGHT}
              textColor={COLORS.WHITE}
              backgroundColor={COLORS.FACEBOOK_BLUE}
              borderColor={COLORS.FACEBOOK_DARK_BLUE} />
          </View>*/}
          <View style={styles.buttonWrapper}>
            <RectButton
              onPress={() => this.openLock()}
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
          setGender={text => this.setGender(text)}
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
/*
*/
