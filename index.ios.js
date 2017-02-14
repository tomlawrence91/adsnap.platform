/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import AppViewContainer from './src/modules/AppViewContainer';
import codePush from "react-native-code-push";

@codePush
export default class adsnap extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppViewContainer />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('adsnap', () => adsnap);
