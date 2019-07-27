import React, { Component } from 'react';
import { Platform, StyleSheet, Text, Image, View, StatusBar, PermissionsAndroid, Dimensions, YellowBox } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { PrimaryColorDark, WhiteColor, NunitoBold, Version, BlackColor } from '../../GlobalConfig';
import { getUserData, delay } from '../../GlobalFunction';

const logoPath = '../../images/logo.png'

const { width } = Dimensions.get('screen')

export default class SplashScreen extends Component {

	/**
	 * Get Account Credential
	 * else open the login screen
	 */
	getCredentialStatus = () => {
		delay(2000).then(() => {
			// Actions.home()
			getUserData().then(res => {
				Actions.home()
			}).catch(err => Actions.login())
		})
	}

	requestSignature = async () => {
		try {
			const granted = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
				{
					'title': 'Signature Permission',
					'message': 'Delivery Tracking Apps needs access to your Storage'
				}
			)
			if (granted === PermissionsAndroid.RESULTS.GRANTED) {
				console.log("Storage permission allowed")
			} else {
				this.requestGPSPermission()
				console.log("Storage permission denied!")
			}
		} catch (err) {
			console.warn(err)
		}
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
		await this.requestSignature()
		await this.requestCameraPermission()
		await this.requestGPSPermission()
		// console.disableYellowBox = true;
		this.getCredentialStatus()
	}

	render() {
		return (
			<View style={styles.container}>
				<StatusBar backgroundColor={PrimaryColorDark} barStyle='light-content' hidden />
				<Image resizeMode='contain' resizeMethod='resize' source={require(logoPath)} style={{ width: 150, height: 75, marginBottom: 20 }} />
				<Text style={styles.titleText}>EPF MOBILE</Text>
				<View style={{ position: 'absolute', bottom: 50, width: width }}>
					<Text style={styles.versionText}>Version {Version}</Text>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: WhiteColor,
		justifyContent: 'center',
		alignItems: 'center'
	},
	titleText: {
		color: BlackColor,
		fontFamily: NunitoBold,
		textAlign: 'center',
		fontSize: 24,
		letterSpacing: 2
	},
	versionText: {
		fontSize: 10,
		textAlign: 'center',
		color: WhiteColor,
		fontFamily: NunitoBold,
		letterSpacing: 1
	},
});
