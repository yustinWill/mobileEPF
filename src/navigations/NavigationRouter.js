import React, { Component } from 'react';
import { Router, Scene, Stack, Tabs, Actions } from 'react-native-router-flux';
import { View, Text, Alert, BackHandler } from 'react-native';
import { PrimaryColor, WhiteColor } from '../GlobalConfig';

import SplashScreen from '../containers/SplashScreen/SplashScreen'
import LoginScreen from '../containers/LoginScreen/LoginScreen'

import HomeScreen from '../containers/HomeScreen/HomeScreen'
import WorkOrderScreen from '../containers/WorkOrderScreen/WorkOrderScreen'
import CollectionDetailScreen from '../containers/CollectionDetailScreen/CollectionDetailScreen';
import CameraScreen from '../containers/CameraScreen';
import RequestJBScreen from '../containers/RequestJBScreen';
import SignatureScreen from '../containers/SignatureScreen';
import SettingScreen from '../containers/SettingScreen/SettingScreen';
import SettingDetailScreen from '../containers/SettingDetailScreen';

export default class NavigationRouter extends Component {
	handleBack = () => {
		let screen = Actions.currentScene;
		switch (screen) {
			case 'home':
				Alert.alert(
					'Keluar Aplikasi',
					'Apakah Anda yakin untuk keluar aplikasi?',
					[
						{
							text: 'Tidak',
							onPress: () => console.log('Cancel Pressed'),
							style: 'cancel',
						},
						{ text: 'Ya', onPress: () => BackHandler.exitApp() },
					],
					{ cancelable: false },
				);
				return true;
			case 'login':
				Alert.alert(
					'Keluar Aplikasi',
					'Apakah Anda yakin untuk keluar aplikasi?',
					[
						{
							text: 'Tidak',
							onPress: () => console.log('Cancel Pressed'),
							style: 'cancel',
						},
						{ text: 'Ya', onPress: () => BackHandler.exitApp() },
					],
					{ cancelable: false },
				);
				return true;
			case 'splash':
				Alert.alert(
					'Keluar Aplikasi',
					'Apakah Anda yakin untuk keluar aplikasi?',
					[
						{
							text: 'Tidak',
							onPress: () => console.log('Cancel Pressed'),
							style: 'cancel',
						},
						{ text: 'Ya', onPress: () => BackHandler.exitApp() },
					],
					{ cancelable: false },
				);
				return true;
			case 'detailCollection':
				Alert.alert(
					'Batal Pengisian Form',
					'Apakah Anda yakin untuk membatalkan pengisian form?',
					[
						{
							text: 'Tidak',
							onPress: () => console.log('Cancel Pressed'),
							style: 'cancel',
						},
						{
							text: 'Ya', onPress: () => {
								Actions.pop()
								setTimeout(() => Actions.refresh({ lastUpdated: new Date() }), 0)
							}
						},
					],
					{ cancelable: false },
				);
				return true;
			case 'requestJB':
				Alert.alert(
					'Batal Pengisian Form',
					'Apakah Anda yakin untuk membatalkan pengisian form?',
					[
						{
							text: 'Tidak',
							onPress: () => console.log('Cancel Pressed'),
							style: 'cancel',
						},
						{ text: 'Ya', onPress: () => Actions.pop() },
					],
					{ cancelable: false },
				);
				return true;
			default:
				Actions.pop()
				return true;
		}
	}

	renderTitle = (props) => {
		return (
			<View style={{ width: 200 }}>
				<Text style={{ fontSize: 18, color: '#fff', letterSpacing: 1 }}>{props.title}</Text>
			</View >
		)
	}

	render() {
		const MyTransitionSpec = ({
			duration: 250
			// easing: Easing.bezier(0.2833, 0.99, 0.31833, 0.99),
			// timing: Animated.timing,
		});

		const transitionConfig = () => ({
			transitionSpec: MyTransitionSpec,
			screenInterpolator: sceneProps => {
				const { layout, position, scene } = sceneProps;
				const { index } = scene;
				const width = layout.initWidth;

				// right to left by replacing bottom scene
				return {
					transform: [{
						translateX: position.interpolate({
							inputRange: [index - 1, index, index + 1],
							outputRange: [width, 0, -width],
						}),
					}]
				};
			}
		});
		return (
			<Router
				navigationBarStyle={{ backgroundColor: PrimaryColor }}
				barButtonIconStyle={{ tintColor: WhiteColor }}
				backAndroidHandler={this.handleBack}
			>
				<Stack
					transitionConfig={transitionConfig}
					key='root'>
					<Scene
						// initial
						// type='reset'
						hideNavBar
						key='splash'
						component={SplashScreen} />
					<Scene
						// initial
						// type='reset'
						hideNavBar
						key='login'
						component={LoginScreen} />
					<Scene
						initial
						type='reset'
						hideNavBar
						key='home'
						component={HomeScreen} />
					<Scene
						// initial
						hideNavBar
						key='camera'
						component={CameraScreen} />
					<Scene
						// initial
						back
						backButtonTintColor={WhiteColor}
						title="Pengaturan"
						renderTitle={this.renderTitle}
						key='setting'
						component={SettingScreen} />
					<Scene
						// initial
						back
						backButtonTintColor={WhiteColor}
						title={this.props.title}
						renderTitle={this.renderTitle}
						key='detailSetting'
						component={SettingDetailScreen} />
					<Scene
						// initial
						hideNavBar
						key='signaturePad'
						component={SignatureScreen} />
					<Scene
						back
						backButtonTintColor={WhiteColor}
						title="Ajukan Janji Bayar"
						renderTitle={this.renderTitle}
						key='requestJB'
						component={RequestJBScreen} />
					<Scene
						// initial
						back
						backButtonTintColor={WhiteColor}
						title="Work Order"
						renderTitle={this.renderTitle}
						key='workOrder'
						component={WorkOrderScreen} />
					<Scene
						back
						backButtonTintColor={WhiteColor}
						title="Informasi Collection"
						renderTitle={this.renderTitle}
						key='detailCollection'
						component={CollectionDetailScreen} />
				</Stack>
			</Router>
		);
	}
}
