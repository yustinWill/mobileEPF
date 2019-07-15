import React, { Component } from 'react';
import { Platform, StyleSheet, Text, Image, View, ScrollView, StatusBar, TouchableOpacity, Dimensions, ActivityIndicator, TextInput, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { PrimaryColorDark, SafeArea, WhiteColor, PrimaryColorLight, Version, NunitoBold, NunitoRegular, AccentColorGold } from '../../GlobalConfig';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
import Shimmer from 'react-native-shimmer';
import Toast from 'react-native-root-toast';

const logoPath = '../../images/logo.png'
const eyeClose = '../../images/eye-close.png'
const eyeOpen = '../../images/eye-open.png'

const { width } = Dimensions.get('screen')

export default class LoginScreen extends Component {
	constructor(props) {
		super(props)
		this.state = {
			userID: '',
			userPassword: '',
			isLoading: false,
			userIDFocus: false,
			passFocus: false,
			hidePass: true,
			errorMessage: '',
			isAnimating: true,
			visibleToast: false
		}
	}

	componentDidMount() {
		setTimeout(() => this.forceUpdate(), 100)
	}

	componentWillUnmount() {
		this.setState({ isAnimating: false })
	}

	/**
	 * Actions triggered when clicking login button
	 */
	login = () => {
		this.setState({ isLoading: true })
		// if (!this.state.userID) {
		// 	this.setState({
		// 		errorMessage: 'Kode Mitra kosong',
		// 		visibleToast: true
		// 	})
		// }
		// else if (!this.state.userPassword) {
		// 	this.setState({
		// 		errorMessage: 'Kata Sandi kosong',
		// 		visibleToast: true
		// 	})
		// }
		// else {
		// 	this.setState({
		// 		errorMessage: 'Berhasil masuk',
		// 		visibleToast: true,
		// 		isLoading: true
		// 	})
		// 	setTimeout(() => {
		// 		this.setState({ isLoading: false })
		// 		Actions.tab()
		// 		try {
		// 			AsyncStorage.setItem('credentials', '1')
		// 		} catch (e) {
		// 			console.warn(e)
		// 		}
		// 	}, 2000)
		// }
		setTimeout(() => {
			this.setState({
				isLoading: false
			})
			Actions.home()
			// try {
			// 	AsyncStorage.setItem('credentials', '1')
			// } catch (e) {
			// 	console.warn(e)
			// }
		}, 2000)
	}

	/**
	 * Function which called when onTextChange at the field
	 */
	onTextChange = field => value => {
		this.setState({
			[field]: value
		})
	}

	/**
	 * Function called when Input box are focused
	 */
	onFocusInput = (type) => {
		switch (type) {
			case 'ID':
				this.setState({ userIDFocus: true })
				break;
			case 'pass':
				this.setState({ passFocus: true })
				break;
		}
	}

	/**
	 * Function called when Input box are not focused
	 */
	onEndFocusInput = (type) => {
		switch (type) {
			case 'ID':
				this.setState({ userIDFocus: false })
				break;
			case 'pass':
				this.setState({ passFocus: false })
				break;
		}
	}

	render() {
		return (
			<LinearGradient colors={[PrimaryColorDark, PrimaryColorLight]} style={styles.container}>
				<StatusBar backgroundColor={PrimaryColorDark} barStyle='light-content' />
				<ScrollView
					keyboardShouldPersistTaps='handled'
					contentContainerStyle={{ flex: 1 }}>
					<View style={{ marginTop: 50, marginBottom: 25, width: '100%', alignItems: 'center' }}>
						<Image resizeMode='contain' resizeMethod='resize' source={require(logoPath)} style={{ width: 200, height: 100, tintColor: '#fff' }} />
					</View>
					<Shimmer
						animating={this.state.isAnimating}
						intensity={0.3}
						duration={4000}
						pauseDuration={500}
					>
						<Text style={styles.titleText}>EPF MOBILE</Text>
					</Shimmer>
					<View style={{ width: '90%', paddingHorizontal: 20, paddingVertical: 30, alignSelf: 'center' }}>
						<Text style={styles.inputText}>User</Text>
						<View style={{ width: '100%', height: 50, marginBottom: SafeArea }}>
							<View style={[styles.inputBox, this.state.userIDFocus ? null : { borderBottomColor: PrimaryColorDark }]}>
								<TextInput
									style={styles.inputText}
									placeholderTextColor={WhiteColor}
									selectionColor={WhiteColor}
									onFocus={() => this.onFocusInput('ID')}
									onEndEditing={() => this.onEndFocusInput('ID')}
									onChangeText={this.onTextChange('userID')}
									value={this.state.userID}
								/>
							</View>
						</View>
						<Text style={styles.inputText}>Kata Sandi</Text>
						<View style={{ width: '100%', height: 50, marginBottom: SafeArea * 2 }}>
							<View style={[styles.inputBox, this.state.userPassword ? null : { borderBottomColor: PrimaryColorDark }]}>
								<TextInput
									style={styles.inputText}
									selectionColor={WhiteColor}
									placeholderTextColor={WhiteColor}
									onFocus={() => this.onFocusInput('pass')}
									onEndEditing={() => this.onEndFocusInput('pass')}
									onChangeText={this.onTextChange('userPassword')}
									value={this.state.userPassword}
									secureTextEntry={this.state.hidePass}
								/>
								<TouchableOpacity style={{ paddingHorizontal: 10 }} onPress={() => this.setState({ hidePass: !this.state.hidePass })}>
									<Image
										style={{ width: 25, height: 25, tintColor: WhiteColor }}
										source={this.state.hidePass ? require(eyeClose) : require(eyeOpen)}
									/>
								</TouchableOpacity>
							</View>
						</View>
						<Button
							full
							disabled={this.state.isLoading}
							onPress={this.login}
							style={styles.loginButton}>
							{this.state.isLoading ?
								<ActivityIndicator color='#fff' size='small' /> :
								<Text style={styles.loginText}>MASUK</Text>}
						</Button>
					</View>
				</ScrollView>
				<Toast
					visible={this.state.visibleToast}
					position={50}
					children={<Text>{this.state.errorMessage}</Text>}
					animation
					onShown={() => setTimeout(() => this.setState({ visibleToast: false }), 2000)}
				/>
			</LinearGradient>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	titleText: {
		color: AccentColorGold,
		fontFamily: NunitoBold,
		textAlign: 'center',
		fontSize: 24,
		letterSpacing: 2
	},
	inputBox: {
		flex: 1,
		borderBottomWidth: 1,
		borderBottomColor: WhiteColor,
		alignItems: 'center',
		flexDirection: 'row'
	},
	inputText: {
		color: WhiteColor,
		fontFamily: NunitoRegular
	},
	loginButton: {
		backgroundColor: PrimaryColorDark,
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center',
		height: 50
	},
	loginText: {
		color: WhiteColor,
		fontFamily: NunitoBold,
		letterSpacing: 1
	},
	versionText: {
		fontSize: 10,
		textAlign: 'center',
		color: WhiteColor,
		fontFamily: NunitoBold,
		letterSpacing: 1
	},
});
