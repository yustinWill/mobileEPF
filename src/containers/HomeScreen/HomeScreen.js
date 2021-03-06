import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Dimensions, Image, FlatList, SafeAreaView, TouchableOpacity, TouchableNativeFeedback } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { PrimaryColor, PrimaryColorDark, BlackColor, NunitoSemiBold, LightGrayColor, WhiteColor, NunitoBold, GrayColor, PrimaryColorLight, AccentColorGold, NunitoRegular } from '../../GlobalConfig';
import Shimmer from 'react-native-shimmer';
import { Actions } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient'
import { getUserData, delay } from '../../GlobalFunction';
import { APIUpdateLocation } from '../../APIConfig';
import Geolocation from '@react-native-community/geolocation';
import { ProgressCircle } from 'react-native-svg-charts'

const SafeArea = 15

const logoPath = '../../images/logo.png'

const { width } = Dimensions.get('screen')

export default class HomeScreen extends Component {
	constructor(props) {
		super(props)
		this.state = {
			user_id: null,
			user_code: "001EN",
			user_full_name: "ENDANG ABDUL SOBIRIN",
			// user_full_name: "",
			user_role: "1",
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
			locationLat: 0,
			locationLong: 0,
			collectionPercentage: 93,
			user_rank: 1
		}
	}

	componentDidMount() {
		getUserData().then(res => {
			if (res) {
				this.setState({
					user_id: res.user_data.id,
					// user_code : res.user_data.user_employee_code,
					user_full_name: res.user_data.user_fullname
				})
				this.getCurrentLocation()
			}
		}).catch(err => console.log(err))
	}

	/**
	 * Get the current Lat & Long
	 * Pass it to Server to get the regency name
	 */
	getCurrentLocation = () => {
		// this.setState({ isLoadingLocation: true })
		setInterval(() => {
			Geolocation.getCurrentPosition(position => {
				if (position.coords.latitude && position.coords.longitude) {
					const formdata = new FormData()
					formdata.append('user_lat', position.coords.latitude)
					formdata.append('user_lng', position.coords.longitude)
					formdata.append('user_id', 1)
					// formdata.append('user_id', this.props.user_id)
					const headers = new Headers()
					headers.set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImE4ZTA3ZjcxMjE1MWY2NjNlYmY0YjNhYThjODBmMjY5ZmQyMjRmYTlmYTBjOGU5YzFmMTAzZDhlNTZiN2ZmYzc2NWVjZGYwN2ZlMzYxNWViIn0.eyJhdWQiOiIyIiwianRpIjoiYThlMDdmNzEyMTUxZjY2M2ViZjRiM2FhOGM4MGYyNjlmZDIyNGZhOWZhMGM4ZTljMWYxMDNkOGU1NmI3ZmZjNzY1ZWNkZjA3ZmUzNjE1ZWIiLCJpYXQiOjE1NjM4NjIwMzIsIm5iZiI6MTU2Mzg2MjAzMiwiZXhwIjoxNTk1NDg0NDMyLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.Y7OSPc3xBYCGn4I0w_aRkW2mg26Po700NVPtGFoDyrYAGJryzgqpQSJi9DjaK7v5BRh2ae7nVTlXdvVz4_r8gchtCY9d-ffTDOprU8SnxMOl9j9-Wq565FfnKGEY90kOXgVEEmTen0FKatbAgOqqTjFSudMe2qkAEXOSs5mythA9MW2utJf3UCTfzOQP32j88iulom5GBgDo16Rq85A_V2rsO5X6EZC4EW1Az4bKyvhfeVmkK_qggxzgU9U850ggCT5zomslZVcQt1aho_Pcex89OedBarvh2wKabmSieuuGFCvIzi96j2rPg50AYlIWIoN3VLYqBO-r8aa0lP1q8jxFgQoDQcmvftdwWdM7alRtdtjcNAu-TiYOcc-BKNYLyonLwS9gxgUPjzZbsDuRBzFXHiQ6L7ejnJvBu73eXh14pkCH_T0Yoh9CNIZOy-srBm4xzBgjULEmN4kqiI7LFptxFCsGyF-9TaKO6eh9bE27i6tLHwUMp_V2ypvts0Oo2H0UUErSCOGSID4SLN6yS6INi8e9ouLELZmzUcIqR7493F3SCDVesQ-KsvQVUDXl5cPTt8OaT08yXpNRjnxRdz1Jv3p_ecxxygl_3VDRhKkgsi0n9xUJwmsPDA_saRSIT51SVfrhtj5yo2LIQrrYStEehxq5x1gB4LVVnJcvyVY')
					// headers.set('Authorization', 'Basic ' + Base64.btoa(`${LoginKeyUserName}:${LoginKeyPassword}`))
					fetch(APIUpdateLocation, {
						method: 'POST',
						headers: headers,
						body: formdata
					})
						.then(res => {
							console.warn(position.coords.latitude)
						})
						.catch(err => console.log(err))
				}
			});
		}, 10000)
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
				<TouchableNativeFeedback disabled={item.disabled || this.state.isLoading} onPress={this.renderMenuPress(item.path)}>
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
		this.setState({ isLoading: true })
		delay(100).then(() => this.setState({ isLoading: false }))
		switch (path) {
			case 'workOrder':
				delay(100).then(() => Actions.workOrder())
				break;
			case 'setting':
				delay(100).then(() => Actions.setting())
				break;
			case 'changePercentage':
				if (this.state.collectionPercentage == 97) this.setState({ collectionPercentage: 93 })
				else this.setState({ collectionPercentage: 97 })
				break;
			default:
				break;
		}
	}

	renderRank = () => {
		if (this.state.user_rank && this.state.user_rank == 1) {
			return (
				<View style={{ width: 60, height: 25, marginRight: 5 }}>
					<Shimmer
						tilt={-30}
						duration={1000}
						pauseDuration={2000}>
						<View style={{ width: 60, borderRadius: 5, justifyContent: 'center', height: 25, backgroundColor: AccentColorGold }}>
						</View>
					</Shimmer>
					<View style={{ position: 'absolute', top: 0, width: 60, height: 25, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
						<Text style={{ color: WhiteColor, fontSize: 12, fontFamily: NunitoBold }}>No. {this.state.user_rank} </Text>
						<FontAwesome5
							name={'crown'}
							size={12}
							color={WhiteColor}
						/>
					</View>
				</View>
			)
		}
		if (this.state.user_rank && this.state.user_rank < 6) {
			return (
				<View style={{ width: 50, height: 25, marginRight: 5 }}>
					<Shimmer
						tilt={-30}
						duration={1000}
						pauseDuration={2000}>
						<View style={{ width: 50, borderRadius: 5, justifyContent: 'center', height: 25, backgroundColor: AccentColorGold }}>
						</View>
					</Shimmer>
					<View style={{ position: 'absolute', top: 0, width: 50, height: 25, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
						<Text style={{ color: WhiteColor, fontSize: 12, fontFamily: NunitoBold }}>No. {this.state.user_rank} </Text>
					</View>
				</View>
			)
		}
		else if (this.state.user_rank && this.state.user_rank < 11) {
			return (
				<View style={{ width: 50, height: 25, marginRight: 5 }}>
					<Shimmer
						tilt={-30}
						duration={1000}
						pauseDuration={2000}>
						<View style={{ width: 50, borderRadius: 5, justifyContent: 'center', height: 25, backgroundColor: LightGrayColor }}>
						</View>
					</Shimmer>
					<View style={{ position: 'absolute', top: 0, width: 50, height: 25, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
						<Text style={{ color: WhiteColor, fontSize: 12, fontFamily: NunitoBold }}>No. {this.state.user_rank} </Text>
					</View>
				</View>
			)
		}
		else if (this.state.user_rank && this.state.user_rank > 10) {
			return (
				<View style={{ width: 50, height: 25, marginRight: 5 }}>
					<View style={{ width: 50, borderRadius: 5, justifyContent: 'center', height: 25, backgroundColor: BlackColor }}>
					</View>
					<View style={{ position: 'absolute', top: 0, width: 50, height: 25, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
						<Text style={{ color: WhiteColor, fontSize: 12, fontFamily: NunitoBold }}>No. {this.state.user_rank} </Text>
					</View>
				</View>
			)
		}
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
			},
			{
				text: 'Ubah Koleksi (Demo)',
				icon: 'exchange-alt',
				path: 'changePercentage',
				disabled: false,
				items: 0
			},
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
					colors={[PrimaryColorDark, PrimaryColorLight]}
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						backgroundColor: WhiteColor,
						width: '100%',
						height: 140,
						padding: SafeArea,
						shadowColor: "#000",
						shadowOffset: {
							width: 0,
							height: 1,
						},
						shadowOpacity: 0.22,
						shadowRadius: 2.22,
						elevation: 3
					}}>
					<View style={{ flex: 1, justifyContent: 'center' }}>
						{/* <Text numberOfLines={1} style={{ fontFamily: NunitoSemiBold, color: WhiteColor, fontSize: 16 }}>{this.state.user_code}</Text> */}
						<Text numberOfLines={1} style={{ fontFamily: NunitoRegular, color: WhiteColor, fontSize: 12 }}>Selamat beraktivitas</Text>
						<Text numberOfLines={1} style={{ fontFamily: NunitoSemiBold, color: WhiteColor, fontSize: 16 }}>{this.state.user_full_name}</Text>
						<View style={{ flexDirection: 'row', width: '100%', height: 25, alignItems: 'center', marginTop: 10 }}>
							{this.renderRank()}
							<Text numberOfLines={1} style={{ fontFamily: NunitoSemiBold, color: WhiteColor, fontSize: 12 }}>{role_name}</Text>
						</View>
					</View>
					<View style={{ height: '100%', width: 80, justifyContent: 'center' }}>
						<Text style={{ fontFamily: NunitoSemiBold, color: WhiteColor, fontSize: 12, textAlign: 'center' }}>Persentase Koleksi</Text>
						<View style={{ height: 60, width: '100%', marginVertical: 5 }}>
							<ProgressCircle
								style={{ height: 60 }}
								startAngle={0}
								endAngle={Math.PI * 2}
								progress={this.state.collectionPercentage / 100}
								progressColor={this.state.collectionPercentage > 95 ? AccentColorGold : BlackColor}
								strokeWidth={3}
							/>
							<View style={{ position: 'absolute', top: 20, width: 80, alignItems: 'center' }}>
								<Text style={{ fontFamily: NunitoBold, color: WhiteColor, fontSize: 14 }}>{this.state.collectionPercentage}%</Text>
							</View>
						</View>
						<Text style={{ fontFamily: NunitoBold, color: WhiteColor, fontSize: 16, textAlign: 'center', letterSpacing: 1 }}>{this.state.collectionPercentage > 95 ? 'BAGUS' : 'KURANG'}</Text>
					</View>
				</LinearGradient>
				<Text style={{ fontFamily: NunitoSemiBold, color: BlackColor, fontSize: 16, marginLeft: SafeArea, marginVertical: SafeArea }}>Menu Utama</Text>
				<View style={{ marginBottom: 50, paddingLeft: 6, paddingRight: 3, width: '100%' }}>
					<FlatList
						scrollEnabled={false}
						keyExtractor={(item, index) => index}
						data={menuList}
						numColumns={3}
						renderItem={this.renderMenu}
					/>
				</View>
				<Shimmer
					tilt={30}
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
