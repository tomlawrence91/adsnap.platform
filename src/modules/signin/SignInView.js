import React from 'react';
import {
  AppRegistry,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import Router from '../AppRouter';
import * as COLORS from '../../constants/colors';
import * as COMMON_STYLES from '../../constants/commonStyles';
import * as ICONS from '../../constants/icons';
import * as SignInState from './SignInState';
import Container from '../../components/Container';
import RectButton from '../../components/RectButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import styles from './SignInStyles';


export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  static route = {
    navigationBar: {
      // backgroundColor: COLORS.TRANSPARENT
      translucent: true
    }
  }

  goToSignup() {
    this.props.navigator.push(Router.getRoute('tabNavigation'));
  }
  goToLogin() {
    this.props.navigator.push(Router.getRoute('tabNavigation'));
  }
  goToTabMenu() {
    this.props.navigator.push(Router.getRoute('tabNavigation'));
  }
  changeTab() {
    let tab = this.state.tab == 0 ? 1 : 0;
    this.setState({ 'tab': tab });
  }

  onEmailChange(text) {
    this.setState({email: text});
  }

  onPasswordChange(text) {
    this.setState({password:text});
  }


  login(email, password) {
    this.props.dispatch(SignInState.login(
      this.state.email,
      this.state.password,
      () => {
        this.goToTabMenu();
        this.props.navigator.showLocalAlert('Login succesful.', COMMON_STYLES.ALERT_STYLES_SUCCESS);
      },
      () => {
        this.props.navigator.showLocalAlert(`Email and password don't match.`, COMMON_STYLES.ALERT_STYLES_ERROR);
      }))
  }

  render() {
    return (
      <Container>

        <Image style={styles.backgroundImage} source={ICONS.WELCOME_BG}>

          <Image style={styles.logo} source={ICONS.LOGO_WHITE} ></Image>

          <Text style={styles.description}>Sign in</Text>

          <View style={styles.inputWrapper}>
            <TextInput
              underlineColorAndroid={COLORS.WHITE}
              keyboardType={'email-address'}
              autoCapitalize={'none'}
              placeholder={'Email'}
              onChangeText={(text) => this.onEmailChange(text)}
              placeholderTextColor={COLORS.SOFT_TRANSPARENT_WHITE}              
              style={styles.input} />
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              underlineColorAndroid={COLORS.WHITE}
              secureTextEntry={true}
              autoCapitalize={'none'}
              placeholderTextColor={COLORS.SOFT_TRANSPARENT_WHITE}
              placeholder={'Password'}
              onChangeText={(text) => this.onPasswordChange(text)}
              style={styles.input} />
          </View>

          {/*TODO: password reset*/}

          <View style={styles.buttonWrapper}>
            <RectButton
              onPress={() => this.login()}
              text={`Sign in`}
              width={COMMON_STYLES.BUTTON_WIDTH(Dimensions)}
              height={COMMON_STYLES.BUTTON_HEIGHT}
              textColor={COLORS.WHITE}
              backgroundColor={COLORS.TRANSPARENT}
              border={{ borderColor: COLORS.WHITE, borderStyle: 'solid', borderWidth: 2 }} />
          </View>
        </Image>

      </Container>
    );
  }
}