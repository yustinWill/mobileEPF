import React, { Component } from 'react';

import { SafeAreaView } from 'react-native';
import { StatusBar } from 'react-native';
import NavigationRouter from './navigations/NavigationRouter';
import { PrimaryColorDark } from './GlobalConfig';
import { setJSExceptionHandler, getJSExceptionHandler } from 'react-native-exception-handler';

export default class App extends Component {
	reporter = error => {
		// Logic for reporting to devs
		// Example : Log issues to github issues using github apis.
		console.log(error); // sample
	};

	errorHandler = (e, isFatal) => {
		if (isFatal) {
			this.reporter(e);
			Alert.alert(
				"Terdapat masalah",
				`
        Error: ${isFatal ? "Fatal:" : ""} ${e.name} ${e.message}

        Error telah dilaporkan kepada server, mohon buka aplikasi kembali
        `,
				[
					{
						text: "Tutup",
						onPress: () => {
							BackAndroid.exitApp();
						}
					}
				]
			);
		} else {
			console.log(e); // So that we can see it in the ADB logs in case of Android if needed
		}
	};

	setJSExceptionHandler = () => this.errorHandler;

	setNativeExceptionHandler = (errorString) => {
		this.reporter(errorString);
		//You can do something like call an api to report to dev team here
		//example
		// fetch('http://<YOUR API TO REPORT TO DEV TEAM>?error='+errorString);
		//
	};

	render() {
		return (
			<SafeAreaView style={{ flex: 1 }}>
				<StatusBar backgroundColor={PrimaryColorDark} barStyle='light-content' />
				<NavigationRouter />
			</SafeAreaView>
		)
	}
}