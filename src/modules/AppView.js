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

var _ = require('lodash');

export default class AppView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initialRoute: 'welcome',
            isLoading: false,
            accessToken: '',
        }
    }

    componentDidMount() {

    }

    async getAccessToken() {
        accessToken = await getStoredItem(STORAGE.ACCESS_TOKEN);
        this.setState({ isLoading: false, accessToken: accessToken });
    }

    render() {
        return (
            <NavigationProvider router={Router}>
                <StatusBar
                    barStyle="light-content" />
                <StackNavigation initialRoute={Router.getRoute('welcome')} />
            </NavigationProvider >
        )
    }
}