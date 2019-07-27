import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, ScrollView, StatusBar } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { PrimaryColorDark, SafeArea, WhiteColor } from '../../GlobalConfig';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-root-toast';
import { APILogin, LoginKeyUserName, LoginKeyPassword, LoginKeyGrantType, LoginKeyClientId, LoginKeyClientSecret } from '../../APIConfig';
import Base64 from '../../libraries/Base64';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';

const logoPath = '../../images/logo.png'

export default class LoginScreen extends Component {
	constructor(props) {
		super(props)
		this.state = {
			userID: '',
			userPassword: '',
			isLoading: false,
			toastMessage: '',
			visibleToast: false
		}
	}

	/**
	 * Actions triggered when clicking login button
	 */
	login = () => {
		this.setState({ isLoading: true })
		// if (!this.state.userID) {
		// 	this.setState({
		// 		toastMessage: 'Kode Mitra kosong',
		// 		visibleToast: true
		// 	})
		// }
		// else if (!this.state.userPassword) {
		// 	this.setState({
		// 		toastMessage: 'Kata Sandi kosong',
		// 		visibleToast: true
		// 	})
		// }
		// else {
		// 	this.setState({
		// 		toastMessage: 'Berhasil masuk',
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
		const formdata = new FormData()
		formdata.append('grant_type', LoginKeyGrantType)
		formdata.append('client_id', LoginKeyClientId)
		formdata.append('client_secret', LoginKeyClientSecret)
		formdata.append('username', "admin")
		formdata.append('password', "Password1*")
		const headers = new Headers()
		headers.set('Authorization', 'Basic ' + Base64.btoa(`${LoginKeyUserName}:${LoginKeyPassword}`))
		fetch(APILogin, {
			method: 'POST',
			headers: headers,
			body: formdata
		})
			.then(res => {
				if (res.status === 200) {
					return res.json()
				}
				else if (res.status === 400) {
					this.setState({
						toastMessage: 'User / Kata Sandi Salah',
						visibleToast: true,
						isLoading: false
					})
				}
				else {
					alert(`${this.state.userID}\n${res.status}\nMohon Screenshot dan Kirimkan ke Tim Dev`)
				}
			})
			.then(resJson => {
				if (resJson) {
					console.log(resJson)
					try {
						AsyncStorage.setItem('user_data', JSON.stringify(resJson.data))
					} catch (e) {
						console.log(e)
					}
					setTimeout(() => {
						this.setState({ isLoading: false })
						Actions.home()
					}, 1000)
				}
			})
			.catch(err => {
				alert(`${this.state.userID}\n${err}\nMohon Screenshot dan Kirimkan ke Tim Dev`)
				this.setState({
					isLoading: false
				})
			})
	}

	/**
	 * Function which called when onTextChange at the field
	 */
	onTextChange = field => value => {
		this.setState({
			[field]: value
		})
	}

	render() {
		return (
			<View style={styles.container}>
				<StatusBar backgroundColor={PrimaryColorDark} barStyle='light-content' />
				<ScrollView
					keyboardShouldPersistTaps='handled'
					style={{ flex: 1 }}>
					<View style={{ marginTop: 50, marginBottom: 25, width: '100%', alignItems: 'center' }}>
						<Image resizeMode='contain' resizeMethod='resize' source={require(logoPath)} style={{ width: 200, height: 100 }} />
					</View>
					<View style={{ width: '100%', paddingHorizontal: SafeArea, paddingVertical: 30, alignSelf: 'center' }}>
						<CustomTextInput
							label='User ID'
							placeholder='Ketik disini'
							onChangeText={this.onTextChange('userID')}
							value={this.state.userID}
						/>
						<CustomTextInput
							label='Kata Sandi'
							isPassword
							placeholder='Ketik disini'
							onChangeText={this.onTextChange('userPassword')}
							value={this.state.userPassword}
						/>
						<CustomButton
							label="MASUK"
							isLoading={this.state.isLoading}
							onPress={this.login}
						/>
					</View>
				</ScrollView>
				<Toast
					visible={this.state.visibleToast}
					position={50}
					children={<Text>{this.state.toastMessage}</Text>}
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
});
