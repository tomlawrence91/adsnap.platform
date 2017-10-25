import React from 'react';
import {
    AppRegistry,
    Text,
    View,
    StatusBar
} from 'react-native';
import {
    NavigationContext,
    StackNavigation,
    NavigationProvider
} from '@exponent/ex-navigation';
import Router from './AppRouter';
import store from '../redux/store';
import * as STORAGE from '../constants/storageNames';
import { getStoredItem } from '../utils/storageUtils';
import AuthService from '../services/AuthService';
const lodash = require('lodash');

export default class AppView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initialRoute: 'tabNavigation',
            isLoading: true,
            accessToken: '',
        }
    }

    componentWillMount() {
        this.getAccessToken().done();
    }

    async getAccessToken() {
        const token = await AuthService.getToken()
        if (token) {
            this.setState({ isLoading: false, initialRoute: 'tabNavigation' })
        }
        this.setState({ isLoading: false })
    }

    render() {
        return (
            <NavigationProvider router={Router}>
                <StatusBar
                    barStyle="light-content" />
                {
                    !this.state.isLoading && <StackNavigation
                        initialRoute={Router.getRoute(this.state.initialRoute)}
                        navigatorUID="mainNavigation" />
                }
            </NavigationProvider >
        )
    }
}