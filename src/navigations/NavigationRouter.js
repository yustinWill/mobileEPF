import React, { Component } from 'react';
import { Router, Scene, Stack, Tabs, Actions } from 'react-native-router-flux';
import { TouchableNativeFeedback, View, Text, Platform, TouchableWithoutFeedback, Alert, BackHandler } from 'react-native';

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'

import SplashScreen from '../containers/SplashScreen/SplashScreen'
import LoginScreen from '../containers/LoginScreen/LoginScreen'

import HomeScreen from '../containers/HomeScreen/HomeScreen'
// import WorkOrderScreen from '../containers/WorkOrderScreen/WorkOrderScreen'
import CollectionScreen from '../containers/CollectionScreen/CollectionScreen'
import { PrimaryColor, WhiteColor } from '../GlobalConfig';
import CollectionDetailScreen from '../containers/CollectionDetailScreen/CollectionDetailScreen';

export default class NavigationRouter extends Component {
	handleBack = () => {
		let screen = Actions.currentScene;
		switch (screen) {
			case '_home':
				Alert.alert(
					'Quit Application',
					'Are you sure you want to quit application?',
					[
						{
							text: 'Cancel',
							onPress: () => console.log('Cancel Pressed'),
							style: 'cancel',
						},
						{ text: 'Quit', onPress: () => BackHandler.exitApp() },
					],
					{ cancelable: false },
				);
				return true;
			case 'login':
				Alert.alert(
					'Quit Application',
					'Are you sure you want to quit application?',
					[
						{
							text: 'Cancel',
							onPress: () => console.log('Cancel Pressed'),
							style: 'cancel',
						},
						{ text: 'Quit', onPress: () => BackHandler.exitApp() },
					],
					{ cancelable: false },
				);
				return true;
			case 'splash':
				Alert.alert(
					'Quit Application',
					'Are you sure you want to quit application?',
					[
						{
							text: 'Cancel',
							onPress: () => console.log('Cancel Pressed'),
							style: 'cancel',
						},
						{ text: 'Quit', onPress: () => BackHandler.exitApp() },
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
			<View style={[{ width: 200 }, Platform.OS == 'android' ? { marginLeft: 4 } : { marginLeft: 10 }]}>
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
				backAndroidHandler={() => {
					let screen = Actions.currentScene;
					Actions.pop();
					return true;
				}}
			>
				<Stack
					transitionConfig={transitionConfig}
					key='root'>
					<Scene
						initial
						type='reset'
						hideNavBar
						key='splash'
						component={SplashScreen} />
					<Scene
						// initial
						type='reset'
						hideNavBar
						key='login'
						component={LoginScreen} />
					<Scene
						// initial
						type='reset'
						hideNavBar
						key='home'
						component={HomeScreen} />
					<Scene
						back
						backButtonTintColor={WhiteColor}
						title="Collection"
						renderTitle={this.renderTitle}
						key='collection'
						component={CollectionScreen} />
					<Scene
						back
						backButtonTintColor={WhiteColor}
						title="Informasi Collection"
						renderTitle={this.renderTitle}
						key='collectionDetail'
						component={CollectionDetailScreen} />
				</Stack>
			</Router>
		);
	}
}
