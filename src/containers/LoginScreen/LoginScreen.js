import React, { Component } from 'react';
import { Platform, StyleSheet, Text, Image, View, ScrollView, StatusBar, TouchableOpacity, Dimensions, ActivityIndicator, TextInput, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { PrimaryColorDark, SafeArea, WhiteColor, PrimaryColorLight, Version, NunitoBold, NunitoRegular, AccentColorGold, BlackColor, GrayColor } from '../../GlobalConfig';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-root-toast';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import { APILogin, LoginKeyUserName, LoginKeyPassword, LoginKeyGrantType, LoginKeyClientId, LoginKeyClientSecret } from '../../APIConfig';

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
		// setTimeout(() => this.forceUpdate(), 100)
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
		// const formdata = new FormData()
		// formdata.append('grant_type', LoginKeyGrantType)
		// formdata.append('client_id', LoginKeyClientId)
		// formdata.append('client_secret', LoginKeyClientSecret)
		// formdata.append('username', "admin")
		// formdata.append('password', "Password1*")
		// fetch(APILogin, {
		// 	method: 'post',
		// 	headers: {
		// 		'Authorization': 'Basic ' + btoa(`${LoginKeyUserName}:${LoginKeyPassword}`),
		// 		'Content-Type': 'application/x-www-form-urlencoded'
		// 	},
		// 	body: formdata
		// })
		// 	.then(res => {
		// 		if (res.status === 200) {
		// 			Animated.timing(
		// 				this.animatedVerificiationForm,
		// 				{
		// 					toValue: 1,
		// 					duration: 500
		// 				},
		// 				{ useNativeDriver: true }
		// 			).start()
		// 		}
		// 		else {
		// 			this.setState({
		// 				isLoading: false
		// 			})
		// 			toastError("Nomor telepon telah terdaftar")
		// 		}
		// 	})
		// 	.catch(err => {
		// 		this.setState({
		// 			isLoading: false
		// 		})
		// 		toastError("Koneksi bermasalah")
		// 	})
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
			<View style={styles.container}>
				<StatusBar backgroundColor={PrimaryColorDark} barStyle='light-content' />
				<ScrollView
					keyboardShouldPersistTaps='handled'
					contentContainerStyle={{ flex: 1 }}>
					<View style={{ marginTop: 50, marginBottom: 25, width: '100%', alignItems: 'center' }}>
						<Image resizeMode='contain' resizeMethod='resize' source={require(logoPath)} style={{ width: 200, height: 100 }} />
					</View>
					<View style={{ width: '90%', paddingHorizontal: 20, paddingVertical: 30, alignSelf: 'center' }}>
						<Text style={styles.inputTitle}>User</Text>
						<View style={{ width: '100%', height: 50, marginBottom: SafeArea }}>
							<View style={[styles.inputBox, this.state.userIDFocus ? null : { borderBottomColor: GrayColor }]}>
								<TextInput
									style={styles.inputText}
									placeholderTextColor={GrayColor}
									selectionColor={PrimaryColorDark}
									onFocus={() => this.onFocusInput('ID')}
									onEndEditing={() => this.onEndFocusInput('ID')}
									onChangeText={this.onTextChange('userID')}
									value={this.state.userID}
								/>
							</View>
						</View>
						<Text style={styles.inputTitle}>Kata Sandi</Text>
						<View style={{ width: '100%', height: 50, marginBottom: SafeArea * 2 }}>
							<View style={[styles.inputBox, this.state.userPassword ? null : { borderBottomColor: GrayColor }]}>
								<TextInput
									style={styles.inputText}
									placeholderTextColor={GrayColor}
									selectionColor={PrimaryColorDark}
									onFocus={() => this.onFocusInput('pass')}
									onEndEditing={() => this.onEndFocusInput('pass')}
									onChangeText={this.onTextChange('userPassword')}
									value={this.state.userPassword}
									secureTextEntry={this.state.hidePass}
								/>
								<TouchableOpacity style={{ paddingHorizontal: 10 }} onPress={() => this.setState({ hidePass: !this.state.hidePass })}>
									<Image
										style={{ width: 25, height: 25, tintColor: BlackColor }}
										source={this.state.hidePass ? require(eyeClose) : require(eyeOpen)}
									/>
								</TouchableOpacity>
							</View>
						</View>
						<TouchableNativeFeedback
							style={styles.buttonShadowStyle}
							disabled={this.state.isLoading}
							onPress={this.login}>
							<View style={styles.buttonStyle}>
								{this.state.isLoading ?
									<ActivityIndicator color={WhiteColor} size='small' /> :
									<Text style={styles.loginText}>MASUK</Text>}
							</View>
						</TouchableNativeFeedback>
					</View>
				</ScrollView>
				<Toast
					visible={this.state.visibleToast}
					position={50}
					children={<Text>{this.state.errorMessage}</Text>}
					animation
					onShown={() => setTimeout(() => this.setState({ visibleToast: false }), 2000)}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: WhiteColor
	},
	inputTitle: {
		color: BlackColor,
		fontFamily: NunitoBold
	},
	inputBox: {
		flex: 1,
		borderBottomWidth: 1,
		borderBottomColor: PrimaryColorDark,
		alignItems: 'center',
		flexDirection: 'row'
	},
	inputText: {
		flex: 1,
		color: BlackColor,
		fontFamily: NunitoRegular
	},
	buttonStyle: {
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		height: 50
	},
	buttonShadowStyle: {
		backgroundColor: PrimaryColorDark,
		borderRadius: 10,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,

		elevation: 3,
	},
	loginText: {
		color: WhiteColor,
		fontFamily: NunitoBold,
		letterSpacing: 1
	},
	versionText: {
		fontSize: 10,
		textAlign: 'center',
		color: BlackColor,
		fontFamily: NunitoBold,
		letterSpacing: 1
	},
});
