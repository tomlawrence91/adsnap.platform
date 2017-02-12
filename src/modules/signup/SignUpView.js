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
import * as SignUpState from './SignUpState';
import Container from '../../components/Container';
import RectButton from '../../components/RectButton';
import GenderButton from '../../components/GenderButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import styles from './SignUpStyles';
let moment = require('moment');
// import t from 'tcomb-form-native'
// const Form = t.form.Form


export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      gender: '',
      termsAgreed: false,
    };
  }

  static route = {
    navigationBar: {
      // backgroundColor: COLORS.TRANSPARENT
      translucent: true
    }
  }

  goToTabMenu() {
    this.props.navigator.push(Router.getRoute('tabNavigation'));
  }

  onEmailChange(text) {
    this.setState({ email: text });
  }

  onFirstNameChange(text) {
    this.setState({ firstName: text });
  }
  onLastNameChange(text) {
    this.setState({ lastName: text });
  }

  onPasswordChange(text) {
    this.setState({ password: text });
  }

  onBirthdayChange(text) {
    this.setState({ birthday: text });
  }

  toggleSelect() {
    this.setState({ termsAgreed: !this.state.termsAgreed });
  }

  openTerms() {
    Linking.openURL('http://adsnap.co.uk')
  }

  openPrivacy() {
    Linking.openURL('http://adsnap.co.uk')
  }

  setGender(text) {
    this.setState({ gender: text });
  }

  signup(email, password) {
    this.props.dispatch(SignUpState.signup(
      {
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        gender: this.state.gender,
        termsAgreed: this.state.termsAgreed,
      },
      () => {
        this.goToTabMenu();
        this.props.navigator.showLocalAlert('Signup succesful.', COMMON_STYLES.ALERT_STYLES_SUCCESS);
      }))
  }

  render() {
    return (
      <Container>

        <Image style={styles.backgroundImage} source={ICONS.WELCOME_BG}>

          <Image style={styles.logo} source={ICONS.LOGO_WHITE} ></Image>

          <Text style={styles.description}>Sign in</Text>

          <ScrollView style={styles.scrollView}>
            <View style={styles.form}>
              <Text style={styles.title}>Your name</Text>
              <View style={styles.multiInputContainer}>
                <TextInput
                  style={[styles.input, styles.multiInput]}
                  placeholder={'First name'}
                  onChangeText={(text) => onFirstNameChange(text)}
                />
                <TextInput
                  style={[styles.input, styles.multiInput]}
                  placeholder={'Last name'}
                  onChangeText={(text) => { dispatch(setLastname(text)) }}
                />
              </View>
            </View>
            <View style={styles.form}>
              <Text style={styles.title}>Login credentials</Text>
              <TextInput
                keyboardType={'email-address'}
                style={styles.input}
                placeholder={'E-Mail'}
                onChangeText={(text) => onEmailChange(text)}
              />
              <TextInput
                style={styles.input}
                placeholder={'Password'}
                secureTextEntry={true}
                onChangeText={(text) => onPasswordChange(text)}
              />
              <TextInput
                style={styles.input}
                placeholder={'Repeat Password'}
                secureTextEntry={true}
              />
            </View>
            <View style={styles.form}>
              <Text style={styles.title}>Gender</Text>
              <View style={styles.buttonWrapper}>
                <GenderButton
                  text={'Female'}
                  onPress={this.setGender('FEMALE')}
                  selected={this.props.gender == 'FEMALE'}
                  inactiveIcon={ICONS.FEMALE_INACTIVE}
                  activeIcon={ICONS.FEMALE_ACTIVE}
                />
                <GenderButton
                  text={'Male'}
                  onPress={this.setGender('MALE')}
                  selected={this.props.gender == 'MALE'}
                  inactiveIcon={ICONS.MALE_INACTIVE}
                  activeIcon={ICONS.MALE_ACTIVE}
                />
                <GenderButton
                  text={'Other'}
                  onPress={this.setGender('OTHER')}
                  selected={this.props.gender == 'OTHER'}
                  inactiveIcon={ICONS.OTHER_INACTIVE}
                  activeIcon={ICONS.OTHER_ACTIVE}
                />
              </View>
            </View>
            {/*<View style={styles.form}>
              <Text style={styles.title}>Date of birth</Text>
              <Form
                stylesheet={formStyleSheet}
                ref="birthday"
                type={birthday}
                options={options}
                value={this.props.birthday}
                onChange={(value) => this.onBirthdayChange(value)}
              />
            </View><View style={styles.termsAgree}>
              <CheckboxField
                label={''}
                onSelect={() => this.toggleSelect()}
                selected={this.props.termsAgreed}
                defaultColor={'transparent'}
                selectedColor={COLORS.GREEN}
                containerStyle={styles.containerStyle}
                labelStyle={styles.labelStyle}
                checkboxStyle={styles.checkboxStyle}
                labelSide="right">
              </CheckboxField>
              <View style={styles.agreeText}>
                <Text style={styles.termsText}>I have read and accept the </Text>
                <TouchableOpacity onPress={this.openTerms}><Text style={styles.touchText}>terms and conditions</Text></TouchableOpacity>
                <Text style={styles.termsText}>and the</Text>
                <TouchableOpacity onPress={this.openPrivacy}><Text style={styles.touchText}>privacy policy</Text></TouchableOpacity>
                <Text style={styles.termsText}>of adsnap.</Text>
              </View>
            </View>*/}
            <View style={styles.buttonWrapper}>
              <RectButton
                onPress={() => this.signup()}
                text={`Sign up`}
                width={COMMON_STYLES.BUTTON_WIDTH(Dimensions)}
                height={COMMON_STYLES.BUTTON_HEIGHT}
                textColor={COLORS.WHITE}
                backgroundColor={COLORS.TRANSPARENT}
                border={{ borderColor: COLORS.WHITE, borderStyle: 'solid', borderWidth: 2 }} />
            </View>
          </ScrollView>
        </Image>
      </Container>
    );
  }
}