import React, { Component } from 'react';
import { Platform, StyleSheet, Text, Image, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { PrimaryColorDark, WhiteColor, NunitoBold, BlackColor, GrayColor, SafeArea } from '../GlobalConfig';
import Toast from 'react-native-root-toast';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

export default class SettingDetailScreen extends Component {
	constructor(props) {
		super(props)
		this.state = {
			errorMessage: '',
			visibleToast: false
		}
	}

	renderMenu = (type) => {
		var title, iconName, description, convertedValue, iconType, renderIcon, onClickFunction;
		switch (type) {
			case 'changePassword':
				iconName = "autorenew"
				iconType = "MaterialCommunityIcons"
				title = 'OK'
				onClickFunction = () => Actions.detailSetting({ title: 'Ubah Kata Sandi'})
				// description = "Ubah kata sandi"
				break;
			case 'about':
				iconName = "information-outline"
				iconType = "MaterialCommunityIcons"
				title = 'Tentang Aplikasi'
				onClickFunction = () => Actions.detailSetting({ setting: "about" })
				break;
			case 'logout':
				iconName = "logout"
				iconType = "SimpleLineIcons"
				title = 'Keluar Akun'
				onClickFunction = () => {
					Actions.login()
				}
				break;
		}

		switch (iconType) {
			case 'MaterialCommunityIcons':
				renderIcon = (
					<View style={{ marginRight: 20 }}>
						<MaterialCommunityIcons
							name={iconName}
							size={24}
						/>
					</View>
				)
				break;
			case 'SimpleLineIcons':
				renderIcon = (
					<View style={{ marginRight: 24 }}>
						<SimpleLineIcons
							name={iconName}
							size={20}
						/>
					</View>
				)
				break;
		}

		return (
			<TouchableNativeFeedback onPress={() => setTimeout(onClickFunction, 100)}>
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
								size={24}
								color={GrayColor}
							/> : null}
					</View>
				</View>
			</TouchableNativeFeedback>
		)
	}

	render() {
		return (
			<View style={styles.container}>
				{/* {this.renderMenu('changePassword')}
				{this.renderMenu('about')}
				{this.renderMenu('logout')} */}
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
