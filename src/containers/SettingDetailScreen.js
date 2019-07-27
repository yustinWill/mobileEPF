import React, { Component } from 'react';
import { Platform, StyleSheet, Text, Image, View, ScrollView, Dimensions, FlatList } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Entypo from 'react-native-vector-icons/Entypo'
import { PrimaryColorDark, WhiteColor, NunitoBold, BlackColor, GrayColor, SafeArea, Version, LightGrayColor, NunitoSemiBold } from '../GlobalConfig';
import Toast from 'react-native-root-toast';
import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';
import { PatchNotes } from '../PatchNote';

const logoPath = '../images/logo.png'

const { width } = Dimensions.get('screen')

class ChangePassword extends Component {
	constructor(props) {
		super(props)
		this.state = {
			userID: '',
			userPassword: '',
			userNewPassword: '',
			userConfirmationPassword: '',
			isLoading: false,
			toastMessage: '',
			visibleToast: false
		}
	}

	/**
	 * Actions triggered when clicking Confirm Password button
	 */
	confirmNewPassword = () => {
		this.setState({ isLoading: true })
		setTimeout(() => {
			this.setState({
				isLoading: false,
				toastMessage: '',
				visibleToast: false
			})
			Actions.pop()
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

	render() {
		return (
			<View style={styles.container}>
				<ScrollView
					keyboardShouldPersistTaps='handled'
					style={{ flex: 1, paddingHorizontal: SafeArea, paddingVertical: 20 + SafeArea }}>
					<CustomTextInput
						label='Kata Sandi Lama'
						isPassword
						placeholder='Ketik disini'
						onChangeText={this.onTextChange('userPassword')}
						value={this.state.userPassword}
						maxLength={20}
					/>
					<CustomTextInput
						label='Kata Sandi Baru'
						isPassword
						placeholder='Ketik disini'
						onChangeText={this.onTextChange('userNewPassword')}
						value={this.state.userNewPassword}
						maxLength={20}
					/>
					<CustomTextInput
						label='Konfirmasi Kata Sandi Baru'
						placeholder='Ketik disini'
						onChangeText={this.onTextChange('userConfirmationPassword')}
						value={this.state.userConfirmationPassword}
						maxLength={20}
					/>
					<CustomButton
						label="UBAH KATA SANDI"
						isLoading={this.state.isLoading}
						onPress={this.confirmNewPassword}
					/>
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

class AboutApps extends Component {
	renderBulletList = (item, index) => {
		return (
			<View style={{ width: '100%', flexDirection: 'row' }} key={index}>
				<View style={{ marginLeft: -8 }}>
					<Entypo
						size={24}
						name="dot-single"
					/>
				</View>
				<View style={{ paddingTop: 4 }}>
					<Text style={{ fontSize: 12 }}>{item}</Text>

				</View>
			</View>
		)
	}

	renderPatchList = (item, index) => {
		return (
			<View style={{ width: '100%', paddingHorizontal: SafeArea, marginBottom: SafeArea }} key={index}>
				<Text>{item.patchHeader}</Text>
				{item.patchContent ? item.patchContent.map(this.renderBulletList) : null}
			</View>
		)
	}

	renderPatch = ({ item, index }) => {
		return (
			<View style={{ width: '100%', paddingBottom: SafeArea }}>
				<View style={{ width: '100%', height: 50, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', backgroundColor: LightGrayColor, paddingHorizontal: SafeArea }}>
					<Text style={{ fontSize: 16, fontFamily: NunitoSemiBold }}>Versi {item.version}</Text>
					<View>
						<Text style={{ fontSize: 10, textAlign: 'right', fontFamily: NunitoBold }}>Update {item.lastUpdated}</Text>
						<Text style={{ fontSize: 10, textAlign: 'right', fontFamily: NunitoBold }}>Oleh {item.updatedBy}</Text>
					</View>
				</View>
				<View style={{ padding: SafeArea }}>
					<Text style={{ fontSize: 12 }}>{item.patchShortDescription}</Text>
				</View>
				{item.patchList ? item.patchList.map(this.renderPatchList) : null}
			</View>
		)
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={{ width: '100%', height: 100, marginBottom: SafeArea, flexDirection: 'row', paddingHorizontal: SafeArea, alignItems: 'center' }}>
					<Image resizeMode='contain' resizeMethod='resize' source={require(logoPath)} style={{ width: 100, height: 75 }} />
					<View style={{ flex: 1, marginLeft: SafeArea }}>
						<Text style={styles.titleText}>EPF MOBILE</Text>
						<Text style={styles.versionText}>Versi Saat ini {Version}</Text>
					</View>
				</View>
				<FlatList
					ListHeaderComponent={() => {
						return (
							<View style={{ paddingLeft: SafeArea, paddingBottom: 10 }}>
								<Text style={{ fontSize: 14, fontFamily: NunitoBold }}>Patch List</Text>
							</View>
						)
					}}
					showsVerticalScrollIndicator
					data={PatchNotes}
					style={{ flex: 1 }}
					renderItem={this.renderPatch}
					keyExtractor={item => item.version}
				/>
			</View>
		);
	}
}

export default class SettingDetailScreen extends Component {
	constructor(props) {
		super(props)
		this.state = {
			toastMessage: '',
			visibleToast: false
		}
	}

	render() {
		switch (this.props.title) {
			case 'Ubah Kata Sandi':
				return (
					<View style={styles.container}>
						<ChangePassword />
					</View>
				);
			case 'Tentang Aplikasi':
				return (
					<View style={styles.container}>
						<AboutApps />
					</View>
				);
			default:

				break;
		}
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: WhiteColor
	},
	buttonBox: {
		width: '100%',
		paddingHorizontal: SafeArea,
		height: 70,
		justifyContent: 'center'
	},
	buttonStyle: {
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		height: 50
	},
	buttonShadowStyle: {
		backgroundColor: PrimaryColorDark,
		borderRadius: 5,
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
	titleText: {
		color: BlackColor,
		fontFamily: NunitoBold,
		fontSize: 24,
		letterSpacing: 2
	},
	versionText: {
		fontSize: 12,
		color: BlackColor,
		fontFamily: NunitoBold,
		letterSpacing: 1
	},
});
