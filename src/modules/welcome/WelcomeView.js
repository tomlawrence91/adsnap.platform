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
import * as WelcomeState from './WelcomeState';
import Container from '../../components/Container';
import RectButton from '../../components/RectButton';
import SignUpModal from '../../components/SignUpModal';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import styles from './WelcomeStyles';


export default class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signUpModalVisible: false,
    };
  }

  static route = {
    navigationBar: {
      visible: false,
      backgroundColor: COLORS.APP_HEADER
    }
  }

  openSignUpModal() {
    // this.props.navigator.push(Router.getRoute('signup'));
    this.setState({ signUpModalVisible: true })
  }
  closeSignUpModal() {
    console.log("clicked")
    this.setState({ signUpModalVisible: false })
  }
  goToSignin() {
    this.props.navigator.push(Router.getRoute('signin'));
  }
  goToTabMenu() {
    this.props.navigator.push(Router.getRoute('tabNavigation'));
  }
  changeTab() {
    let tab = this.state.tab == 0 ? 1 : 0;
    this.setState({ 'tab': tab });
  }

  render() {
    const BUTTON_WIDTH = Dimensions.get('window').width - 30;
    const BUTTON_HEIGHT = 40;
    return (
      <Container>

        <Image style={styles.backgroundImage} source={ICONS.WELCOME_BG}>

          <Image style={styles.logo} source={ICONS.LOGO_WHITE} ></Image>

          <Text style={styles.description}>Use Adsnap for something and save money and especially give us your data. 'Cause data is money and mo money is mo money.</Text>

          <View style={styles.buttonWrapper}>
            <RectButton
              onPress={() => this.facebookSignin()}
              text={'Log in with Facebook'}
              width={COMMON_STYLES.BUTTON_WIDTH(Dimensions)}
              height={COMMON_STYLES.BUTTON_HEIGHT}
              textColor={COLORS.WHITE}
              backgroundColor={COLORS.FACEBOOK_BLUE}
              borderColor={COLORS.FACEBOOK_DARK_BLUE} />
          </View>
          <View style={styles.buttonWrapper}>
            <RectButton
              onPress={() => this.goToSignin()}
              text={'Sign in with Email'}
              width={COMMON_STYLES.BUTTON_WIDTH(Dimensions)}
              height={COMMON_STYLES.BUTTON_HEIGHT}
              textColor={COLORS.WHITE}
              backgroundColor={COLORS.NAVIGATION_PINK}
              borderColor={COLORS.DARK_PINK} />
          </View>
          <View style={styles.buttonWrapper}>
            <RectButton
              onPress={() => this.openSignUpModal()}
              text={'Sign up'}
              width={COMMON_STYLES.BUTTON_WIDTH(Dimensions)}
              height={COMMON_STYLES.BUTTON_HEIGHT}
              textColor={COLORS.WHITE}
              backgroundColor={COLORS.TRANSPARENT}
              border={{ borderColor: COLORS.WHITE, borderStyle: 'solid', borderWidth: 2 }} />
          </View>
        </Image>

        <SignUpModal visible={this.state.signUpModalVisible} cancel={() => this.closeSignUpModal()} />

      </Container>
    );
  }
}
/*
*/