import React, { Component } from 'react';
import { Platform, StyleSheet, Text, Image, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { PrimaryColorDark, WhiteColor, NunitoBold, BlackColor, GrayColor, SafeArea } from '../../GlobalConfig';
import { getUserData } from '../../GlobalFunction';
import Toast from 'react-native-root-toast';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import { delay } from '../../GlobalFunction';
import { APILogout } from '../../APIConfig';

export default class SettingScreen extends Component {
	constructor(props) {
		super(props)
		this.state = {
			toastMessage: '',
			visibleToast: false
		}
	}

	renderMenu = (type) => {
		var title, iconName, description, convertedValue, iconType, renderIcon, onClickFunction;
		switch (type) {
			case 'changePassword':
				iconName = "autorenew"
				iconType = "MaterialCommunityIcons"
				title = 'Ubah kata sandi'
				// onClickFunction = () => {
				// 	this.setState({
				// 		toastMessage: 'In Progress',
				// 		visibleToast: true
				// 	})
				// }
				onClickFunction = () => Actions.detailSetting({ title: 'Ubah Kata Sandi' })
				// description = "Ubah kata sandi"
				break;
			case 'about':
				iconName = "information-outline"
				iconType = "MaterialCommunityIcons"
				title = 'Tentang Aplikasi'
				// onClickFunction = () => {
				// 	this.setState({
				// 		toastMessage: 'In Progress',
				// 		visibleToast: true
				// 	})
				// }
				onClickFunction = () => Actions.detailSetting({ title: "Tentang Aplikasi" })
				break;
			case 'logout':
				iconName = "logout"
				iconType = "SimpleLineIcons"
				title = 'Keluar Akun'
				onClickFunction = () => {
					this.setState({
						toastMessage: 'Berhasil Keluar',
						visibleToast: true
					})
					getUserData().then(res => {
						if (res) {
							AsyncStorage.removeItem('user_data')
							const headers = new Headers()
							headers.set('Authorization', `${res.token_type} ${res.access_token}`)
							fetch(APILogout, {
								method: 'POST',
								headers: headers
							})
								.then(res => res.status == 200 ? this.setState({ toastMessage: 'Berhasil Keluar', visibleToast: true }) : this.setState({ toastMessage: 'Gagal Keluar', visibleToast: true }))
						}
					}).catch(err => console.log(err))
					delay(1000).then(() => Actions.splash())
				}
				break;
		}

		switch (iconType) {
			case 'MaterialCommunityIcons':
				renderIcon = (
					<View style={{ marginRight: SafeArea }}>
						<MaterialCommunityIcons
							name={iconName}
							size={24}
						/>
					</View>
				)
				break;
			case 'SimpleLineIcons':
				renderIcon = (
					<View style={{ marginRight: SafeArea + 4 }}>
						<SimpleLineIcons
							name={iconName}
							size={20}
						/>
					</View>
				)
				break;
		}

		return (
			<TouchableNativeFeedback onPress={() => delay(100).then(onClickFunction)}>
				<View style={styles.labelInformationBox}>
					{renderIcon}
					<View style={{ flex: 1 }}>
						<Text style={styles.labelInformationTitle}>{title}</Text>
						{description ? <Text style={styles.labelInformationDescription}>{description}</Text> : null}
					</View>
					<View style={{ marginHorizontal: SafeArea }}>
						{type != 'logout' ?
							<Entypo
								name="chevron-thin-right"
								size={20}
								color={GrayColor}
							/> : null}
					</View>
				</View>
			</TouchableNativeFeedback >
		)
	}

	render() {
		return (
			<View style={styles.container}>
				{this.renderMenu('changePassword')}
				{this.renderMenu('about')}
				{this.renderMenu('logout')}
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
		backgroundColor: WhiteColor,
	},
	labelInformationBox: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingRight: SafeArea,
		marginLeft: SafeArea,
		paddingVertical: SafeArea,
		borderBottomWidth: 0.4,
		borderBottomColor: GrayColor
	},
	labelInformationTitle: {
		fontSize: 16,
		fontFamily: NunitoBold
	},
	labelInformationDescription: {
		marginTop: 5,
		fontSize: 12,
		color: GrayColor
	}
});
