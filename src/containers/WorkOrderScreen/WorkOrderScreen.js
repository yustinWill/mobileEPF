import React, { Component } from 'react';
import { Platform, Text, View, FlatList, TouchableOpacity, TextInput, ActivityIndicator, TouchableNativeFeedback } from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import { PrimaryColor, PrimaryColorDark, InactiveColor, BlackColor, NunitoBold, NunitoSemiBold, GrayColor, WhiteColor, NunitoRegular } from '../../GlobalConfig';
import AsyncStorage from '@react-native-community/async-storage';
import { Actions } from 'react-native-router-flux';

const SafeArea = 15

export default class CollectionScreen extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isModalVisible: false,
			isLoading: false,
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
			filteredWorkOrderList: [],
			search: '',
			lastUpdated: new Date()
		}
	}

	componentDidUpdate(prevProps) {
		if (prevProps.lastUpdated !== this.props.lastUpdated) {
			this.onRefresh()
		}
	}

	// static getDerivedStateFromProps(props, state) {
	// 	if (props.lastUpdated !== state.lastUpdated) {
	// 		return {
	// 			lastUpdated: props.lastUpdated
	// 		};
	// 	}
	// 	return null;
	// }

	componentDidMount() {
		this.onRefresh()
	}

	handleItemClick = (item) => {
		Actions.detailCollection({ collectionData: item })
	}

	/**
	 * Item Component on List
	 */
	renderList = ({ item, index }) => {
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
			<TouchableNativeFeedback onPress={() => this.handleItemClick(item)}>
				<View style={{ width: '100%', paddingVertical: 10, paddingHorizontal: SafeArea }}>
					<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
						<Text numberOfLines={1} style={{ fontFamily: NunitoSemiBold, fontSize: 12 }}>{item.order_NOPK}</Text>
						<Text numberOfLines={1} style={{ fontFamily: NunitoSemiBold, fontSize: 12, color: GrayColor, textAlign: 'right' }}>{item.order_time}</Text>
					</View>
					<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
						<Text numberOfLines={1} style={{ fontFamily: NunitoBold, fontSize: 12 }}>{item.order_customer_name}</Text>
						<Text style={{ fontFamily: NunitoSemiBold, fontSize: 12 }}>{action}</Text>
					</View>
					<View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
						<View style={{ paddingHorizontal: 5, paddingVertical: 2, borderRadius: 5, marginRight: 5, backgroundColor: BlackColor }}>
							<Text numberOfLines={1} style={{ fontFamily: NunitoBold, fontSize: 10, color: WhiteColor }}>{item.order_license_plate}</Text>
						</View>
						<Text numberOfLines={1} style={{ fontFamily: NunitoSemiBold, fontSize: 12 }}>{item.order_unit_type}</Text>
					</View>
					<View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
						<Entypo
							color={GrayColor}
							size={16}
							name={`location-pin`}
						/>
						<Text style={{ fontFamily: NunitoRegular, fontSize: 12 }}>{item.order_city} - {item.order_district}</Text>
					</View>
				</View>
			</TouchableNativeFeedback>
		)
	}

	/**
	 * Generate the new list depending on the keyword on search bar
	 */
	onTextChange = value => {
		let filteredList = []
		this.setState({ search: value })
		for (let i = 0; i < this.state.workOrderList.length; i++) {
			if (String(this.state.workOrderList[i].order_customer_name).includes(String(value).toUpperCase())) filteredList.push(this.state.workOrderList[i])
			if (i === this.state.workOrderList.length - 1) this.setState({ filteredWorkOrderList: filteredList })
		}
	}

	/**
	 * Clear Search Bar Text
	 * Reset the Temporary Work Order Lists
	 */
	clearText = () => {
		this.setState({
			search: '',
			filteredWorkOrderList: this.state.workOrderList
		})
	}

	/**
	 * Refresh the Filtered Lists
	 * and Clear the search bar
	 */
	onRefresh = () => {
		this.setState({
			isLoading: true,
			search: '',
			filteredWorkOrderList: []
		}, () => {
			setTimeout(() => {
				this.setState({
					filteredWorkOrderList: this.state.workOrderList,
					isLoading: false
				})
			}, 500)
		})
	}

	render() {
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
			<View style={{ flex: 1, backgroundColor: WhiteColor }}>
				<View style={{ paddingTop: SafeArea, width: '100%', backgroundColor: WhiteColor, elevation: 2 }}>
					<View style={{ width: '100%', paddingHorizontal: SafeArea, height: 60, paddingBottom: 10, justifyContent: 'center', marginLeft: -2, marginBottom: 10 }}>
						<View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, overflow: 'hidden', paddingRight: 10 }}>
							<View style={{ height: '100%', justifyContent: 'center', marginHorizontal: 10 }}>
								<SimpleLineIcons
									name='magnifier'
									size={18}
								/>
							</View>
							<TextInput
								placeholder='Cari nama customer disini..'
								placeholderTextColor={InactiveColor}
								value={this.state.search}
								style={{ flex: 1, fontSize: 14 }}
								onChangeText={this.onTextChange}
								returnKeyType='search'
							/>
							{this.state.search !== '' ?
								<TouchableOpacity onPress={this.clearText}>
									<View style={{ height: '100%', justifyContent: 'center', marginLeft: 10 }}>
										<EvilIcons
											name='close'
											size={24}
										/>
									</View>
								</TouchableOpacity> : null}
						</View>
					</View>
					<View style={{ height: 30, width: '100%', marginBottom: 10, paddingHorizontal: SafeArea, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
						<Text style={{ fontFamily: NunitoSemiBold, color: BlackColor, fontSize: 16 }}>{this.state.search ? `Menampilkan ${this.state.filteredWorkOrderList.length} dari ${this.state.workOrderList.length} data` : `Work Order ${this.state.filteredWorkOrderList.length} data`}</Text>
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
							onPress={this.onRefresh}>
							<MaterialIcons
								size={14}
								name="refresh"
								color={WhiteColor}
							/>
							<Text style={{ fontFamily: NunitoBold, color: WhiteColor, fontSize: 10, marginLeft: 5, paddingBottom: 2 }}>Muat Ulang</Text>
						</TouchableOpacity>
					</View>
				</View>
				<FlatList
					style={{ flex: 1 }}
					ItemSeparatorComponent={listSeparator}
					ListEmptyComponent={this.state.isLoading ? listLoading : listEmpty}
					extraData={this.state.filteredWorkOrderList}
					data={this.state.filteredWorkOrderList}
					keyExtractor={item => item.order_NOPK}
					renderItem={this.renderList}
				/>
			</View>
		);
	}
}
