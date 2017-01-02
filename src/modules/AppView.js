import React from 'react';
import {
    AppRegistry,
    Text,
    View,
} from 'react-native';
import {
  StackNavigation,
  NavigationProvider
} from '@exponent/ex-navigation';
import Router from './AppRouter';

export default class AppView extends React.Component {
    render() {
        return (
            <NavigationProvider router={Router}>
                <StackNavigation initialRoute={Router.getRoute('welcome')} />
            </NavigationProvider>
        )
    }
}