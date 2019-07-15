import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Dimensions, Image, FlatList, SafeAreaView, TouchableOpacity, TouchableNativeFeedback, ActivityIndicator } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { PrimaryColor, InactiveColor, PrimaryColorDark, BlackColor, NunitoSemiBold, Gold, AccentColorGold, WhiteColor, NunitoBold, GrayColor } from '../../GlobalConfig';
import Shimmer from 'react-native-shimmer';
import { Actions } from 'react-native-router-flux';
import Modal from "react-native-modal"
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient'

const SafeArea = 15

const logoPath = '../../images/logo.png'

const menuList = [
	{
		text: 'Collection',
		icon: 'tasks',
		path: 'collection'
	},
	// {
	// 	text: 'Log',
	// 	icon: 'history',
	// 	path: ''
	// },
	// {
	// 	text: 'Report Summary',
	// 	icon: 'clipboard-check',
	// 	path: ''
	// },
	// {
	// 	text: 'Request Task Janji Bayar',
	// 	icon: 'handshake',
	// 	path: ''
	// },
	{
		text: 'Setting',
		icon: 'cog',
		path: ''
	}
]

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
			isLoading: false,
			isAnimating: true
		}
	}

	componentDidMount() {
		this.refreshWorkOrder()
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
				<TouchableNativeFeedback onPress={this.renderMenuPress(item.path)}>
					<View style={{
						flex: 1,
						backgroundColor: WhiteColor,
						justifyContent: 'center',
						alignItems: 'center',
						padding: 5,
						borderRadius: 10,
						shadowColor: "#000",
						shadowOffset: {
							width: 0,
							height: 2,
						},
						shadowOpacity: 0.25,
						shadowRadius: 3.84,
						elevation: 5,
					}}>
						<FontAwesome5
							style={{ marginBottom: 10 }}
							name={item.icon}
							size={24}
							color={PrimaryColor}
						/>
						<Text style={{ fontFamily: NunitoSemiBold, color: BlackColor, textAlign: 'center', fontSize: 12 }}>{item.text}</Text>
					</View>
				</TouchableNativeFeedback>
			</View>
		)
	}

	renderMenuPress = (path) => () => {
		switch (path) {
			case 'collection':
				Actions.collection()
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

	/**
	 * Action when user refresh the Work Order
	 */
	refreshWorkOrder = () => {
		this.setState({
			workOrderList: [],
			isLoading: true
		})
		setTimeout(() => {
			this.setState({
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
			})
		}, 2000)
	}

	render() {
		var role_name
		switch (this.state.user_role) {
			case "1":
				role_name = "CREDIT LOAN OFFICER (CLO)"
				break;
			default:

				break;
		}

		const listSeparator = () => {
			return <View style={{ width: '100%', height: 1, backgroundColor: GrayColor }} />
		}

		const listLoading = (
			<View style={{ width: '100%', alignItems: 'center', marginTop: '25%' }}>
				<ActivityIndicator color={PrimaryColorDark} />
				<Text style={{ fontFamily: NunitoBold, letterSpacing: 1, color: BlackColor, fontSize: 12 }}>Memuat Data</Text>
			</View>
		)

		const listEmpty = (
			<View style={{ width: '100%', alignItems: 'center', marginTop: '25%' }}>
				<Text style={{ fontFamily: NunitoBold }}>Daftar Work Order Kosong</Text>
			</View>
		)

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
						flexDirection: 'row',
						shadowColor: "#000",
						shadowOffset: {
							width: 0,
							height: 1,
						},
						shadowOpacity: 0.22,
						shadowRadius: 2.22,
						elevation: 3
					}}>
					<View style={{ flex: 1, marginRight: SafeArea }}>
						<Text numberOfLines={1} style={{ fontFamily: NunitoSemiBold, color: WhiteColor, fontSize: 16 }}>{this.state.user_code}</Text>
						<Text numberOfLines={1} style={{ fontFamily: NunitoSemiBold, color: WhiteColor, fontSize: 16 }}>{this.state.user_full_name}</Text>
						<Text numberOfLines={1} style={{ fontFamily: NunitoSemiBold, color: WhiteColor, fontSize: 12 }}>{role_name}</Text>
						<Text numberOfLines={1} style={{ fontFamily: NunitoSemiBold, color: WhiteColor, fontSize: 12 }}>{this.state.user_branch} - {this.state.user_sub_branch}</Text>
					</View>
					<View style={{ height: '100%', justifyContent: 'center' }}>
						<Shimmer
							animating={this.state.isAnimating}
							animationOpacity={0.2}
							duration={4000}
							pauseDuration={500}>
							<Image resizeMode='contain' resizeMethod='resize' source={require(logoPath)} style={{ width: 80, height: 80, tintColor: AccentColorGold }} />
						</Shimmer>
					</View>
				</LinearGradient>
				<Text style={{ fontFamily: NunitoSemiBold, color: BlackColor, fontSize: 16, marginLeft: SafeArea }}>Menu Utama</Text>
				<View style={{ marginBottom: 5, marginTop: 5, paddingLeft: 6, paddingRight: 3, width: '100%' }}>
					<FlatList
						scrollEnabled={false}
						keyExtractor={(item, index) => index}
						data={menuList}
						numColumns={3}
						renderItem={this.renderMenu}
					/>
				</View>
				<View style={{ width: '100%', height: 30, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: SafeArea }}>
					<View style={{ flexDirection: 'row', height: '100%', alignItems: 'center' }}>
						<Text style={{ fontFamily: NunitoSemiBold, color: BlackColor, fontSize: 16 }}>Sisa Work Order</Text>
						<View style={{ height: 15, width: 15, borderRadius: 10, backgroundColor: PrimaryColor, justifyContent: 'center', alignItems: 'center', marginLeft: 5, marginTop: 3 }}>
							<Text style={{ fontFamily: NunitoBold, color: WhiteColor, fontSize: 10 }}>{this.state.workOrderList.length}</Text>
						</View>
					</View>
					<TouchableOpacity
						style={{
							paddingHorizontal: 5,
							height: '100%',
							backgroundColor: PrimaryColor,
							borderRadius: 5,
							flexDirection: 'row',
							alignItems: 'center',
							shadowColor: "#000",
							shadowOffset: {
								width: 0,
								height: 1,
							},
							shadowOpacity: 0.22,
							shadowRadius: 2.22,
							elevation: 3
						}}
						onPress={this.refreshWorkOrder}>
						<MaterialIcons
							size={14}
							name="refresh"
							color={WhiteColor}
						/>
						<Text style={{ fontFamily: NunitoBold, color: WhiteColor, fontSize: 10, marginLeft: 5, paddingBottom: 2 }}>Muat Ulang</Text>
					</TouchableOpacity>
				</View>
				<FlatList
					ItemSeparatorComponent={listSeparator}
					ListEmptyComponent={this.state.isLoading ? listLoading : listEmpty}
					style={{ flex: 1 }}
					extraData={this.state.workOrderList}
					data={this.state.workOrderList}
					keyExtractor={item => item.order_NOPK}
					renderItem={this.renderWorkOrder}
				/>
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
