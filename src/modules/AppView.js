import React from 'react';
import {
    AppRegistry,
    Text,
    View,
    StatusBar
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
                <StatusBar
                    barStyle="light-content"
                />
                <StackNavigation initialRoute={Router.getRoute('welcome')} />
            </NavigationProvider>
        )
    }
}