import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Dimensions, Image, FlatList, SafeAreaView, TouchableOpacity, TouchableNativeFeedback, ActivityIndicator } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { PrimaryColor, PrimaryColorDark, BlackColor, NunitoSemiBold, LightGrayColor, WhiteColor, NunitoBold, GrayColor } from '../../GlobalConfig';
import Shimmer from 'react-native-shimmer';
import { Actions } from 'react-native-router-flux';
import Modal from "react-native-modal"
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient'

const SafeArea = 15

const logoPath = '../../images/logo.png'

const { width } = Dimensions.get('screen')

export default class HomeScreen extends Component {
	constructor(props) {
		super(props)
		this.state = {
			user_code: "001EN",
			user_full_name: "ENDANG ABDUL SOBIRIN",
			user_role: "1",
			user_branch: "KARAWACI",
			user_sub_branch: "KRW",
			user_spv: "ADE IRFAN",
			workOrderList: [
				{
					'order_NOPK': '400000845',
					'order_customer_name': 'ETI ARYAWATI',
					'order_city': 'TANGERANG',
					'order_district': 'TANGERANG',
					'order_sub_district': 'KARAWACI BARU',
					'order_unit_type': 'TOYOTA CHEVROLET SPA',
					'order_license_plate': 'B1599COS',
					'order_time': '8:27',
					'order_action': '2'
				},
				{
					'order_NOPK': '400000557',
					'order_customer_name': 'NENENG',
					'order_city': 'TANGERANG',
					'order_district': 'JATIUWUNG',
					'order_sub_district': 'JATIUWUNG',
					'order_unit_type': 'NISSAN SEDAN',
					'order_license_plate': 'B1320CFN',
					'order_time': '8:25',
					'order_action': '2'
				},
				{
					'order_NOPK': '400000809',
					'order_customer_name': 'TUGINO',
					'order_city': 'TANGERANG',
					'order_district': 'CILEDUG',
					'order_sub_district': 'PENINGGILAN',
					'order_unit_type': 'TIMOR TIMOR',
					'order_license_plate': 'B8754CA',
					'order_time': '8:23',
					'order_action': '2'
				},
				{
					'order_NOPK': '000000120',
					'order_customer_name': 'YUDI WAHYUDI',
					'order_city': 'TANGERANG',
					'order_district': 'TANGERANG',
					'order_sub_district': 'KARAWACI BARU',
					'order_unit_type': 'HONDA BEBEK',
					'order_license_plate': 'B3659CBA',
					'order_time': '8:23',
					'order_action': '2'
				},
				{
					'order_NOPK': '400000122',
					'order_customer_name': 'YASIN FATAYASINA , ST',
					'order_city': 'TANGERANG',
					'order_district': 'PAKUHAJI',
					'order_sub_district': 'PAKUALAM',
					'order_unit_type': 'HONDA BEBEK',
					'order_license_plate': 'B3353NZD',
					'order_time': '8:22',
					'order_action': '2'
				}
			],
			isLoading: false
		}
	}

	componentDidMount() {
		setTimeout(() => this.state,100)
	}

	/**
	 * Render the Menu List
	 */
	renderMenu = ({ item, index }) => {
		return (
			<View style={{
				width: width * 0.3333 - 5,
				height: width * 0.3333 - 5,
				padding: 10,
				flexDirection: 'row'
			}}>
				<TouchableNativeFeedback disabled={item.disabled} onPress={this.renderMenuPress(item.path)}>
					<View style={[{
						flex: 1,
						justifyContent: 'center',
						alignItems: 'center',
						padding: 5,
						borderRadius: 10,
					}, item.disabled ? {
						shadowColor: "#000",
						shadowOffset: {
							width: 0,
							height: 1,
						},
						shadowOpacity: 0.20,
						shadowRadius: 1.41,
						elevation: 2,
						backgroundColor: LightGrayColor
					} : {
							shadowColor: "#000",
							shadowOffset: {
								width: 0,
								height: 2,
							},
							shadowOpacity: 0.25,
							shadowRadius: 3.84,
							elevation: 5,
							backgroundColor: WhiteColor
						}]}>
						<View style={{ height: 50, width: 50, justifyContent: 'center', alignItems: 'center' }}>
							<FontAwesome5
								style={{ marginBottom: 10 }}
								name={item.icon}
								size={24}
								color={PrimaryColor}
							/>
							{item.items ?
								<View style={{ height: 15, width: 15, borderRadius: 10, backgroundColor: PrimaryColor, justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 0, right: 0 }}>
									<Text style={{ fontFamily: NunitoBold, color: WhiteColor, fontSize: 10 }}>{item.items}</Text>
								</View> : null}
						</View>
						<Text style={{ fontFamily: NunitoSemiBold, color: BlackColor, textAlign: 'center', fontSize: 12 }}>{item.text}</Text>
					</View>
				</TouchableNativeFeedback>
			</View>
		)
	}

	renderMenuPress = (path) => () => {
		switch (path) {
			case 'workOrder':
				Actions.workOrder()
				break;
			case 'setting':
				Actions.setting()
				break;
			default:
				break;
		}
	}

	/**
	 * Render the Work Order List
	 */
	renderWorkOrder = ({ item, index }) => {
		var action = ""
		switch (item.order_action) {
			case "1":
				action = "Survey"
				break;
			case "2":
				action = "Collection"
				break;
			case "3":
				action = "Janji Bayar"
				break;
		}
		return (
			<TouchableNativeFeedback>
				<View style={{ width: '100%', paddingVertical: 10, paddingHorizontal: SafeArea }}>
					<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
						<Text numberOfLines={1} style={{ fontFamily: NunitoSemiBold, fontSize: 12 }}>{item.order_NOPK}</Text>
						<Text numberOfLines={1} style={{ fontFamily: NunitoSemiBold, fontSize: 12, color: GrayColor, textAlign: 'right' }}>{item.order_time}</Text>
					</View>
					<View style={{ height: 50, width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
						<View style={{ flex: 1, justifyContent: 'space-between' }}>
							<Text numberOfLines={1} style={{ fontFamily: NunitoSemiBold, fontSize: 14 }}>{item.order_customer_name}</Text>
							<Text numberOfLines={1} style={{ fontFamily: NunitoSemiBold, fontSize: 12 }}>{item.order_city} - {item.order_district}</Text>
							<Text numberOfLines={1} style={{ fontFamily: NunitoSemiBold, fontSize: 12 }}>{item.order_license_plate} - {item.order_unit_type}</Text>
						</View>
						<View style={{ height: '100%' }}>
							<Text style={{ fontFamily: NunitoBold, fontSize: 14 }}>{action}</Text>
						</View>
					</View>
				</View>
			</TouchableNativeFeedback>
		)
	}

	render() {
		const menuList = [
			{
				text: 'Work Order',
				icon: 'tasks',
				path: 'workOrder',
				disabled: false,
				items: 5
			},
			{
				text: 'Log',
				icon: 'history',
				path: '',
				disabled: true,
				items: 0
			},
			{
				text: 'Ringkasan Laporan',
				icon: 'clipboard-check',
				path: '',
				disabled: true,
				items: 0
			},
			// {
			// 	text: 'Request Task Janji Bayar',
			// 	icon: 'handshake',
			// 	path: '',
			// 	disabled: true,
			// 	items: 0
			// },
			{
				text: 'Pengaturan',
				icon: 'cog',
				path: 'setting',
				disabled: false,
				items: 0
			}
		]

		var role_name
		switch (this.state.user_role) {
			case "1":
				role_name = "CREDIT LOAN OFFICER (CLO)"
				break;
			default:

				break;
		}

		return (
			<SafeAreaView style={styles.container}>
				<LinearGradient
					colors={[PrimaryColorDark, PrimaryColor]}
					useAngle
					start={{ x: 0, y: 1 }}
					end={{ x: 1, y: 0 }}
					style={{
						width: '100%',
						height: 100,
						padding: SafeArea,
						marginBottom: 10,
						shadowColor: "#000",
						shadowOffset: {
							width: 0,
							height: 1,
						},
						shadowOpacity: 0.22,
						shadowRadius: 2.22,
						elevation: 3
					}}>
					<Text numberOfLines={1} style={{ fontFamily: NunitoSemiBold, color: WhiteColor, fontSize: 16 }}>{this.state.user_code}</Text>
					<Text numberOfLines={1} style={{ fontFamily: NunitoSemiBold, color: WhiteColor, fontSize: 16 }}>{this.state.user_full_name}</Text>
					<Text numberOfLines={1} style={{ fontFamily: NunitoSemiBold, color: WhiteColor, fontSize: 12 }}>{role_name}</Text>
					<Text numberOfLines={1} style={{ fontFamily: NunitoSemiBold, color: WhiteColor, fontSize: 12 }}>{this.state.user_branch} - {this.state.user_sub_branch}</Text>
				</LinearGradient>
				<Text style={{ fontFamily: NunitoSemiBold, color: BlackColor, fontSize: 16, marginLeft: SafeArea }}>Menu Utama</Text>
				<View style={{ marginBottom: 100, marginTop: 5, paddingLeft: 6, paddingRight: 3, width: '100%' }}>
					<FlatList
						scrollEnabled={false}
						keyExtractor={(item, index) => index}
						data={menuList}
						numColumns={3}
						renderItem={this.renderMenu}
					/>
				</View>
				<Shimmer
					animationOpacity={0.2}
					duration={4000}
					pauseDuration={500}>
					<Image resizeMode='contain' resizeMethod='resize' source={require(logoPath)} style={{ width: 100, height: 100 }} />
				</Shimmer>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: WhiteColor
	}
});
