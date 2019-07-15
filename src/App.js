import React, { Component } from 'react';

import { SafeAreaView } from 'react-native';
import { StatusBar } from 'react-native';
import NavigationRouter from './navigations/NavigationRouter';
import { PrimaryColorDark } from './GlobalConfig';

export default class App extends Component {
	render() {
		return (
			<SafeAreaView style={{ flex: 1 }}>
				<StatusBar backgroundColor={PrimaryColorDark} barStyle='light-content' />
				<NavigationRouter />
			</SafeAreaView>
		)
	}
}