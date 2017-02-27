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
import * as snapshotUtil from '../utils/snapshot';
import store from '../redux/store';
import * as STORAGE from '../constants/storageNames';
import {getItem} from '../services/storageService';

var _ = require('lodash');

export default class AppView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initialRoute: 'welcome',
            isLoading: true,
            accessToken: '',
        }
    }

    componentDidMount() {
        this.loadStoredState().done();
    }

    async loadStoredState() {
        let storedState = await snapshotUtil.resetSnapshot();

        const {dispatch} = this.props;

        if (storedState) {
            const key = STORAGE.ACCESS_TOKEN

        }
    }

    async getAccessToken() {
        accessToken = await getItem(STORAGE.ACCESS_TOKEN);
        this.setState({isLoading:false, accessToken: accessToken});
    }

    render() {
        const access_token = this.getAccessToken().done()

        return (
            <NavigationProvider router={Router}>
                <StatusBar
                    barStyle="light-content"/>
                    {
                        !this.state.isLoading && _.isNil(this.state.accessToken)
                        ? <StackNavigation initialRoute={Router.getRoute('welcome')} />
                        : <StackNavigation initialRoute={Router.getRoute('tabNavigation')} />
                    }

            </NavigationProvider >
        )
    }
}