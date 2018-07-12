import React from 'react';
import { StatusBar } from 'react-native';
import {
	StackNavigation,
	NavigationProvider
} from '@exponent/ex-navigation';
import Router from './AppRouter';
import store from '../redux/store';
import AuthService from '../services/AuthService';

export default class AppView extends React.Component {
	constructor() {
		super();
		this.state = {
			initialRoute: 'home',
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
			this.setState({ isLoading: false, initialRoute: 'home' })
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