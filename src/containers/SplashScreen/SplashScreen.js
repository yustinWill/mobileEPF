import React, { Component } from 'react';
import { Platform, StyleSheet, Text, Image, View, StatusBar, PermissionsAndroid, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { PrimaryColorDark, PrimaryColorLight, WhiteColor, NunitoBold, Version } from '../../GlobalConfig';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import Shimmer from 'react-native-shimmer';

const logoPath = '../../images/logo.png'

const { width } = Dimensions.get('screen')

export default class SplashScreen extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isAnimating: true
		}
	}

	/**
	 * Get Account Credential
	 * If the Driver has login open the Main Screen
	 * else open the login screen
	 */
	getCredentialStatus = async () => {
		// try {
		// 	const value = await AsyncStorage.getItem('credentials')
		// 	if (value == '1') {
		// 		setTimeout(() => Actions.tab(), 2000)
		// 	}
		// 	else {
		// 		setTimeout(() => Actions.login(), 2000)
		// 	}
		// } catch (e) {
		// }
		// setTimeout(() => {
		// 	Actions.login()
		// }, 2500)
		setTimeout(() => Actions.home(), 2500)
	}

	requestGPSPermission = async () => {
		try {
			const granted = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
				{
					'title': 'Geolocation Permission',
					'message': 'Delivery Tracking Apps needs access to your GPS'
				}
			)
			if (granted === PermissionsAndroid.RESULTS.GRANTED) {
				console.log("Geolocation permission allowed")
			} else {
				this.requestGPSPermission()
				console.log("Geolocation permission denied!")
			}
		} catch (err) {
			console.warn(err)
		}
	}

	requestCameraPermission = async () => {
		try {
			const granted = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.CAMERA,
				{
					'title': 'Camera Permission',
					'message': 'Delivery Tracking Apps needs access to your Camera'
				}
			)
			if (granted === PermissionsAndroid.RESULTS.GRANTED) {
				console.log("Camera permission allowed")
			} else {
				this.requestCameraPermission()
				console.log("Camera permission denied!")
			}
		} catch (err) {
			console.warn(err)
		}
	}

	componentDidMount = async () => {
		// await this.requestImeiPermission()
		await this.requestCameraPermission()
		await this.requestGPSPermission()
		this.getCredentialStatus()
	}

	render() {
		return (
			<LinearGradient colors={[PrimaryColorDark, PrimaryColorLight]} style={styles.container}>
				<StatusBar backgroundColor={PrimaryColorDark} barStyle='light-content' />
				<Shimmer
					animating={this.state.isAnimating}
					style={{ elevation: 5 }}
					animationOpacity={0.8}
					duration={1000}
					pauseDuration={500}>
					<Image resizeMode='contain' resizeMethod='resize' source={require(logoPath)} style={{ width: 150, height: 75, tintColor: WhiteColor }} />
				</Shimmer>
				<View style={{ position: 'absolute', bottom: 50, width: width }}>
					<Text style={styles.versionText}>Version {Version}</Text>
				</View>
			</LinearGradient>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	versionText: {
		fontSize: 10,
		textAlign: 'center',
		color: WhiteColor,
		fontFamily: NunitoBold,
		letterSpacing: 1
	},
});
