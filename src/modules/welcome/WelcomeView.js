import React from 'react';
import {
  AppRegistry,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView
} from 'react-native';
import Router from '../AppRouter';
import * as COLORS from '../../constants/colors';
import * as ICONS from '../../constants/icons';
import * as WelcomeState from './WelcomeState';
import Container from '../../components/Container';
import Button from '../../components/Button';

import styles from './WelcomeStyles';


export default class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      password: '',
      tab: 0
    };
  }

  static route = {
    navigationBar: {
      title: 'Welcome',
      backgroundColor: COLORS.APP_HEADER
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
  render() {
    //TODO: LOGO
    //TODO: AUTH0
    //TODO: SIGNIN/UP switch
    return (
      <Container>
        <ScrollView>
        <View style={styles.logoWrapper}>
          <Image style={styles.logo} source={ICONS.LOGO_WHITE} ></Image>
        </View>
        <View style={styles.contentWrapper}>
          <Text style={styles.description}>
            Discover discounts for shops and brands in your local area, get deals and know in advance where to buy nice stuff.
        </Text>

          <View style={styles.tabSwitch}>
            <Text style={[styles.tab, this.state.tab == 0 && styles.tabHover]} onPress={() => this.changeTab()}>LOGIN</Text>
            <View style={styles.divider}></View>
            <Text style={[styles.tab, this.state.tab == 1 && styles.tabHover]} onPress={() => this.changeTab()}>REGISTER</Text>
          </View>
          <View style={styles.formWrapper}>
            <Text style={styles.label}>E-Mail</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => this.setState({ text })}
              value={this.state.text} />
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              onChangeText={(password) => this.setState({ password })}
              value={this.state.password}
              secureTextEntry={false} />
            {this.state.tab == 0 && <Button onPress={() => this.goToTabMenu()} text={'Sign In'} />}
            {this.state.tab == 1 && <Button onPress={() => this.goToTabMenu()} text={'Sing Up'} />}
          </View>
          </View>
        </ScrollView>


      </Container>
    );
  }
}