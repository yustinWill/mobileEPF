import React, { Component } from 'react';
import { Platform, StyleSheet, Text, Image, View, ActivityIndicator, Dimensions, ScrollView, Linking, TouchableOpacity, Picker, TextInput, Alert, FlatList } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { PrimaryColorDark, WhiteColor, NunitoBold, GrayColor, SafeArea, BlackColor, NunitoRegular, PrimaryColor, NunitoSemiBold, LightGrayColor } from '../../GlobalConfig';
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import DateTimePicker from '@react-native-community/datetimepicker';
import { getUserData, delay, toTitleCase } from '../../GlobalFunction';
import call from 'react-native-phone-call'

import { TabView, TabBar } from 'react-native-tab-view';
import { trimDDMMYYYY, idr } from '../../GlobalFunction';
import { APICategoryList, APIQuestionList, APIUpdateLocation, APIGenerateJB } from '../../APIConfig';
import CustomButton from '../../components/CustomButton';

const { width } = Dimensions.get('window')

class DetailCustomer extends Component {
	/**
	 * Open The Phone Default Dial Pad
	 * Autofill The Number with Received Params
	 */
	call = () => {
		let args = {
			number: this.props.customerData.customer_phone, // String value with the number to call
			prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call 
		}
		call(args).catch(console.error)
	}

	/**
	 * Open The Phone Google Maps Apps
	 * Autofill the Destination with Received Params
	 * for guideline : https://developers.google.com/maps/documentation/urls/guide#directions-action
	 */
	openMaps = () => {
		var lat = '-6.1956854'
		var long = '106.5838057'
		var url = `https://www.google.com/maps/dir/?api=1&travelmode=driving&destination=${lat},${long}`;
		Linking.canOpenURL(url).then(supported => {
			if (!supported) {
				console.log('Can\'t handle url: ' + url);
			} else {
				return Linking.openURL(url);
			}
		}).catch(err => console.error('An error occurred', err));
	}

	render() {
		if (this.props.customerData) {
			return (
				<View style={{ flex: 1, backgroundColor: WhiteColor }}>
					<ScrollView style={{ flex: 1, backgroundColor: WhiteColor }}>
						<View style={{ paddingVertical: 10 }}>
							{renderInformation('customer_nopk', this.props.customerData.customer_nopk)}
							{renderInformation('customer_name', this.props.customerData.customer_name)}
							{renderInformation('customer_phone', this.props.customerData.customer_phone)}
							{renderInformation('customer_address', this.props.customerData.customer_address)}
							{renderInformation('customer_city', this.props.customerData.customer_city)}
							{renderInformation('customer_district', this.props.customerData.customer_district)}
							{renderInformation('customer_sub_district', this.props.customerData.customer_sub_district)}
							{renderInformation('customer_postal_code', this.props.customerData.customer_postal_code)}
							{renderInformation('customer_actual_address', this.props.customerData.customer_actual_address)}
						</View>
					</ScrollView>
					<View style={{
						height: 80,
						width: width,
						flexDirection: 'row',
						alignSelf: 'center',
						backgroundColor: '#fff',
						shadowColor: "#000",
						shadowOffset: {
							width: 0,
							height: -2,
						},
						shadowOpacity: 0.25,
						shadowRadius: 3.84,
						elevation: 5,
					}}>
						<TouchableOpacity
							onPress={this.call}
							style={{ flex: 1, borderRightColor: LightGrayColor, borderRightWidth: 2, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
							<Entypo
								color={PrimaryColor}
								size={24}
								name={`phone`}
							/>
							<Text style={{ fontSize: 10, marginLeft: 10, fontFamily: NunitoSemiBold }}>Telepon Pelanggan</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={this.openMaps}
							style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
							<MaterialCommunityIcons
								color={PrimaryColor}
								size={24}
								name={`google-maps`}
							/>
							<Text style={{ fontSize: 10, marginLeft: 10, fontFamily: NunitoSemiBold }}>Buka Alamat di Maps</Text>
						</TouchableOpacity>
					</View>
				</View>
			);
		}
		else {
			return <View />
		}
	}
}

class DetailPayment extends Component {
	render() {
		if (this.props.customerData) {
			return (
				<ScrollView style={{ flex: 1, backgroundColor: WhiteColor }}>
					<View style={{ paddingVertical: 10 }}>
						{renderInformation('payment_jatuh_tempo_akhir', this.props.customerData.payment_jatuh_tempo_akhir)}
						{renderInformation('payment_tenor', this.props.customerData.payment_tenor)}
						{renderInformation('payment_angsuran_ke', this.props.customerData.payment_angsuran_ke)}
						{renderInformation('payment_sisa_tenor', this.props.customerData.payment_sisa_tenor)}
						{renderInformation('payment_kwitansi_tertunggak', this.props.customerData.payment_kwitansi_tertunggak)}
						{renderInformation('payment_kwitansi', this.props.customerData.payment_kwitansi)}
						{renderInformation('payment_bucket_awal', this.props.customerData.payment_bucket_awal)}
						{renderInformation('payment_telat_hari', this.props.customerData.payment_telat_hari)}
						{renderInformation('payment_bucket_akhir', this.props.customerData.payment_bucket_akhir)}
						{renderInformation('payment_installment', this.props.customerData.payment_installment)}
						{renderInformation('payment_amount_due', this.props.customerData.payment_amount_due)}
						{renderInformation('payment_collected_all', this.props.customerData.payment_collected_all)}
						{renderInformation('payment_collected_due', this.props.customerData.payment_collected_due)}
						{renderInformation('payment_os_balance', this.props.customerData.payment_os_balance)}
						{renderInformation('payment_os_akhir', this.props.customerData.payment_os_akhir)}
						{renderInformation('payment_denda_berjalan', this.props.customerData.payment_denda_berjalan)}
					</View>
				</ScrollView>
			);
		}
		else {
			return <View />
		}
	}
}

class HistoryPayment extends Component {
	renderHistory(number) {
		var itemNumber;
		switch (number) {
			case 1:
				if (this.props.customerData.history_payment_method_4) {
					itemNumber = 4
				}
				else if (this.props.customerData.history_payment_method_3) {
					itemNumber = 3
				}
				else if (this.props.customerData.history_payment_method_2) {
					itemNumber = 2
				}
				else {
					itemNumber = 1
				}
				break;
			case 2:
				if (this.props.customerData.history_payment_method_4) {
					itemNumber = 3
				}
				else if (this.props.customerData.history_payment_method_3) {
					itemNumber = 2
				}
				else {
					itemNumber = 1
				}
				break;
			case 3:
				if (this.props.customerData.history_payment_method_4) {
					itemNumber = 2
				}
				else {
					itemNumber = 1
				}
				break;
			case 4:
				itemNumber = 1
				break;
		}
		return (
			<View style={{ marginTop: 10 }}>
				<Text style={styles.paymentHeaderText}>Pembayaran Ke - {itemNumber}</Text>
				{renderInformation(`history_payment_method_${number}`, this.props.customerData[`history_payment_method_${number}`])}
				{renderInformation(`history_payment_date_${number}`, this.props.customerData[`history_payment_date_${number}`])}
			</View>
		)
	}

	render() {
		if (this.props.customerData) {
			return (
				<ScrollView style={{ flex: 1, backgroundColor: WhiteColor }}>
					{this.props.customerData.history_payment_method_1 ? this.renderHistory(1) : null}
					{this.props.customerData.history_payment_method_2 ? this.renderHistory(2) : null}
					{this.props.customerData.history_payment_method_3 ? this.renderHistory(3) : null}
					{this.props.customerData.history_payment_method_4 ? this.renderHistory(4) : null}
				</ScrollView>
			);
		}
		else {
			return <View />
		}
	}
}

class KeteranganUnit extends Component {
	render() {
		if (this.props.customerData) {
			return (
				<ScrollView style={{ flex: 1, backgroundColor: WhiteColor }}>
					<View style={{ paddingVertical: 10 }}>
						{renderInformation('unit_bkode', this.props.customerData.unit_bkode)}
						{renderInformation('unit_no_polisi', this.props.customerData.unit_no_polisi)}
						{renderInformation('unit_no_mesin', this.props.customerData.unit_no_mesin)}
						{renderInformation('unit_no_rangka', this.props.customerData.unit_no_rangka)}
						{renderInformation('unit_stnk', this.props.customerData.unit_stnk)}
						{renderInformation('unit_jenis', this.props.customerData.unit_jenis)}
						{renderInformation('unit_merk', this.props.customerData.unit_merk)}
						{renderInformation('unit_year', this.props.customerData.unit_year)}
					</View>
				</ScrollView>
			);
		}
		else {
			return <View />
		}
	}
}

class LaporanLapangan extends Component {
	constructor(props) {
		super(props)
		this.state = {
			selectedFieldCondition: null,
			// fieldChronology: '',
			// fieldResult: '',
			selectedRawDueDate: new Date(),
			selectedDueDate: "",
			selectedRawJanjiBayarDate: new Date(),
			selectedJanjiBayarDate: "",
			selectedRawJanjiBayarTime: new Date(),
			selectedJanjiBayarTime: "",
			// selectedResultPrediction: null,
			datePickerDueDateShow: false,
			datePickerJanjiBayarShow: false,
			timePickerJanjiBayarShow: false,
			locationSelfiePhoto: this.props.locationSelfiePhoto,
			withCustomerPhoto: this.props.withCustomerPhoto,
			questionList: []
		}
	}

	static getDerivedStateFromProps(props, state) {
		if (props.locationSelfiePhoto !== state.locationSelfiePhoto) {
			return {
				locationSelfiePhoto: props.locationSelfiePhoto,
			};
		}
		if (props.withCustomerPhoto !== state.withCustomerPhoto) {
			return {
				withCustomerPhoto: props.withCustomerPhoto,
			};
		}
		if (props.questionList !== state.questionList) {
			console.log(props.questionList)
			return {
				questionList: props.questionList,
			};
		}
		return null;
	}

	/**
	 * On Date Chosen
	 */
	setDate = field => (event, date) => {
		if (date) {
			let indonesiaMonth = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'October', 'November', 'Desember']
			let day = date.getDate()
			let month = date.getMonth()
			let year = date.getFullYear()
			if (field == 'dueDate') {
				this.setState({
					selectedRawDueDate: date,
					selectedDueDate: `${day} ${indonesiaMonth[month]} ${year}`,
					datePickerDueDateShow: false
				});
			}
			else if (field == 'janjiBayar') {
				this.setState({
					selectedRawJanjiBayarDate: date,
					selectedJanjiBayarDate: `${day} ${indonesiaMonth[month]} ${year}`,
					datePickerJanjiBayarShow: false
				});
			}
		}
	}

	/**
	 * On Time Chosen
	 */
	setTime = field => (event, time) => {
		if (time) {
			if (field == 'janjiBayar') {
				this.setState({
					selectedRawJanjiBayarTime: time,
					selectedJanjiBayarTime: String(time),
					timePickerJanjiBayarShow: false
				});
			}
		}
	}

	/**
	 * Show the Date Picker
	 */
	datepicker = field => () => {
		switch (field) {
			case 'dueDate':
				this.setState({
					datePickerDueDateShow: true
				});
				break;
			case 'janjiBayar':
				this.setState({
					datePickerJanjiBayarShow: true
				});
				break;
		}
	}

	/**
	 * Show the Date Picker
	 */
	timepicker = field => () => {
		switch (field) {
			case 'janjiBayar':
				this.setState({
					timePickerJanjiBayarShow: true
				});
				break;
		}
	}

	onFormTypeChange = field => value => {
		if (this.state.selectedFieldCondition) {
			if(this.state.questionList[this.state.selectedFieldCondition]){
				for (let i = 0; i < this.state.questionList[this.state.selectedFieldCondition].length; i++) {
					this.setState({
						[`form_answer_${i}`]: null
					})
				}
			}
		}
		this.setState({ [field]: value })
	}

	onInputChange = field => value => this.setState({ [field]: value })

	renderFieldCondition = (item, index) => <Picker.Item label={item.category_text} value={item.category_code} key={index} />

	renderActionPlan = (item, index) => <Picker.Item label={item.text} value={item.id} key={index} />

	renderResultPrediction = (item, index) => <Picker.Item label={item.text} value={item.id} key={index} />

	openTakePictureScreen = (field) => () => {
		switch (field) {
			case 'locationSelfie':
				Actions.camera({ locationSelfiePhoto: true })
				break;
			case 'withCustomer':
				Actions.camera({ withCustomerPhoto: true })
				break;
		}
	}

	submitForm = () => {
		// Alert.alert(
		// 	'Kirim Laporan',
		// 	'Kirim laporan?',
		// 	[
		// 		{
		// 			text: 'Tidak',
		// 			onPress: () => console.log('Cancel Pressed'),
		// 			style: 'cancel',
		// 		},
		// 		{
		// 			text: 'Ya',
		// 			onPress: () => {
		// 				Actions.pop()
		// 				setTimeout(() => Actions.refresh({ lastUpdated: new Date() }), 0)
		// 			}
		// 		},
		// 	],
		// 	{ cancelable: false },
		// );
	}

	requestJanjiBayar = () => {
		Alert.alert(
			'Ajukan Janji Bayar',
			'Konfirmasi Pengajuan ?',
			[
				{
					text: 'Tidak',
					onPress: () => console.log('Cancel Pressed'),
					style: 'cancel',
				},
				{
					text: 'Ya', onPress: () => {
						const formdata = new FormData()
						formdata.append('date', '2019-08-01')
						formdata.append('time', '10:00')
						formdata.append('work_order_code', 'WO1907271054230070000')
						const headers = new Headers()
						headers.set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImE4ZTA3ZjcxMjE1MWY2NjNlYmY0YjNhYThjODBmMjY5ZmQyMjRmYTlmYTBjOGU5YzFmMTAzZDhlNTZiN2ZmYzc2NWVjZGYwN2ZlMzYxNWViIn0.eyJhdWQiOiIyIiwianRpIjoiYThlMDdmNzEyMTUxZjY2M2ViZjRiM2FhOGM4MGYyNjlmZDIyNGZhOWZhMGM4ZTljMWYxMDNkOGU1NmI3ZmZjNzY1ZWNkZjA3ZmUzNjE1ZWIiLCJpYXQiOjE1NjM4NjIwMzIsIm5iZiI6MTU2Mzg2MjAzMiwiZXhwIjoxNTk1NDg0NDMyLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.Y7OSPc3xBYCGn4I0w_aRkW2mg26Po700NVPtGFoDyrYAGJryzgqpQSJi9DjaK7v5BRh2ae7nVTlXdvVz4_r8gchtCY9d-ffTDOprU8SnxMOl9j9-Wq565FfnKGEY90kOXgVEEmTen0FKatbAgOqqTjFSudMe2qkAEXOSs5mythA9MW2utJf3UCTfzOQP32j88iulom5GBgDo16Rq85A_V2rsO5X6EZC4EW1Az4bKyvhfeVmkK_qggxzgU9U850ggCT5zomslZVcQt1aho_Pcex89OedBarvh2wKabmSieuuGFCvIzi96j2rPg50AYlIWIoN3VLYqBO-r8aa0lP1q8jxFgQoDQcmvftdwWdM7alRtdtjcNAu-TiYOcc-BKNYLyonLwS9gxgUPjzZbsDuRBzFXHiQ6L7ejnJvBu73eXh14pkCH_T0Yoh9CNIZOy-srBm4xzBgjULEmN4kqiI7LFptxFCsGyF-9TaKO6eh9bE27i6tLHwUMp_V2ypvts0Oo2H0UUErSCOGSID4SLN6yS6INi8e9ouLELZmzUcIqR7493F3SCDVesQ-KsvQVUDXl5cPTt8OaT08yXpNRjnxRdz1Jv3p_ecxxygl_3VDRhKkgsi0n9xUJwmsPDA_saRSIT51SVfrhtj5yo2LIQrrYStEehxq5x1gB4LVVnJcvyVY')
						fetch(APIGenerateJB, {
							method: 'POST',
							headers: headers,
							body: formdata
						})
							.then(res => res.json())
							.then(resJson => {
								Actions.requestJB({
									docUrl: resJson.data.webview_link,
									selectedFieldCondition: this.state.selectedFieldCondition,
									fieldChronology: this.state.fieldChronology,
									fieldResult: this.state.fieldResult,
									selectedRawDueDate: this.state.selectedRawDueDate,
									selectedDueDate: this.state.selectedDueDate,
									selectedResultPrediction: this.state.selectedResultPrediction,
									locationLat: this.state.locationLat,
									locationLong: this.state.locationLong,
									locationSelfiePhoto: this.state.locationSelfiePhoto,
									withCustomerPhoto: this.state.withCustomerPhoto
								})
							})
							.catch(err => alert('gagal membuat Janji Bayar'))
					}
				},
			],
			{ cancelable: false },
		);
	}

	toggleRadio = (i, bool) => () => this.setState({ [`form_answer_${i}`]: bool })

	renderQuestionList = ({ item, index }) => {
		switch (item.question_type) {
			case 1:
				return (
					<View style={styles.formBox}>
						<Text style={styles.formTitle}>{toTitleCase(item.question_text)}</Text>
						{item.question_text_helper ? <Text style={styles.formHelper}>{toTitleCase(item.question_text_helper)}</Text> : null}
						<Picker
							selectedValue={this.state[`form_answer_${index}`]}
							style={{ height: 50, width: '100%' }}
							itemStyle={{ fontFamily: NunitoRegular }}
							onValueChange={this.onInputChange(`form_answer_${index}`)}>
							<Picker.Item label="Pilih jawaban" value="" />
							{item.question_options.map((val, i) => <Picker.Item label={val} value={val} key={i} />)}
						</Picker>
					</View>
				)
			case 2:
				return (
					<View style={styles.formBox}>
						<Text style={styles.formTitle}>{toTitleCase(item.question_text)}</Text>
						{item.question_text_helper ? <Text style={styles.formHelper}>{toTitleCase(item.question_text_helper)}</Text> : null}
						<TextInput
							style={{ height: 50, width: '100%', fontSize: 14, borderBottomColor: BlackColor, borderBottomWidth: 0.5 }}
							placeholder="Isi jawaban disini.."
							placeholderTextColor={GrayColor}
							selectionColor={PrimaryColorDark}
							value={this.state[`form_answer_${index}`]}
							onChangeText={this.onInputChange(`form_answer_${index}`)} />
						<Text style={{ textAlign: 'right', fontSize: 10 }}>{this.state[`form_answer_${index}`] ? this.state[`form_answer_${index}`].length : '0'} / 5000</Text>
					</View>
				)
			case 3:
				return (
					<View style={styles.formBox}>
						<Text style={styles.formTitle}>{toTitleCase(item.question_text)}</Text>
						{item.question_text_helper ? <Text style={styles.formHelper}>{toTitleCase(item.question_text_helper)}</Text> : null}
						<View style={{ height: 50, width: '100%', flexDirection: 'row', alignItems: 'center' }}>
							<View style={{ height: 20, flexDirection: 'row', alignItems: 'center', marginRight: SafeArea }}>
								<TouchableOpacity style={{ marginRight: 10 }} onPress={this.toggleRadio(index, true)}>
									<MaterialCommunityIcons
										color={PrimaryColor}
										size={24}
										name={this.state[`form_answer_${index}`] ? `radiobox-marked` : `radiobox-blank`}
									/>
								</TouchableOpacity>
								<Text style={styles.formOption}>YA</Text>
							</View>
							<View style={{ height: 20, flexDirection: 'row', alignItems: 'center' }}>
								<TouchableOpacity style={{ marginRight: 10 }} onPress={this.toggleRadio(index, false)}>
									<MaterialCommunityIcons
										color={PrimaryColor}
										size={24}
										name={this.state[`form_answer_${index}`] == false ? `radiobox-marked` : `radiobox-blank`}
									/>
								</TouchableOpacity>
								<Text style={styles.formOption}>TIDAK</Text>
							</View>
						</View>
					</View>
				)
			default:
				break;
		}
	}

	render() {
		const listHeader = (
			<View style={styles.formBox}>
				<Text style={styles.formTitle}>Kondisi Lapangan</Text>
				<Picker
					selectedValue={this.state.selectedFieldCondition}
					style={{ height: 50, width: '100%' }}
					itemStyle={{ fontFamily: NunitoRegular }}
					onValueChange={this.onFormTypeChange('selectedFieldCondition')}>
					<Picker.Item label="Pilih kondisi lapangan" value="" />
					{this.props.fieldCondition ? this.props.fieldCondition.map(this.renderFieldCondition) : null}
				</Picker>
			</View>
		)
		if (this.props.customerData) {
			return (
				<ScrollView style={{ flex: 1, backgroundColor: WhiteColor }}>
					<View style={{ paddingVertical: 10 }}>
						<FlatList
							ListHeaderComponent={listHeader}
							data={this.state.questionList[this.state.selectedFieldCondition]}
							extraData={this.state.questionList[this.state.selectedFieldCondition]}
							keyExtractor={(item, index) => String(index)}
							renderItem={this.renderQuestionList}
						/>
						{/* <View style={styles.formBox}>
							<Text style={styles.formTitle}>Kronologis</Text>
							<TextInput
								multiline
								numberOfLines={3}
								style={{ height: 80, width: '100%', fontSize: 14, textAlignVertical: "bottom", borderBottomWidth: 1, borderBottomColor: GrayColor }}
								placeholder="Ketik kronologis selama di lapangan"
								placeholderTextColor={GrayColor}
								selectionColor={PrimaryColorDark}
								value={this.state.fieldChronology}
								maxLength={5000}
								onChangeText={this.onInputChange('fieldChronology')} />
							<Text style={{ textAlign: 'right', fontSize: 10 }}>{this.state.fieldChronology.length} / 5000</Text>
						</View>
						<View style={styles.formBox}>
							<Text style={styles.formTitle}>Hasil</Text>
							<TextInput
								multiline
								numberOfLines={3}
								style={{ height: 80, width: '100%', fontSize: 14, textAlignVertical: "bottom", borderBottomWidth: 1, borderBottomColor: GrayColor }}
								placeholder="Ketik hasil lapangan"
								placeholderTextColor={GrayColor}
								selectionColor={PrimaryColorDark}
								value={this.state.fieldResult}
								maxLength={5000}
								onChangeText={this.onInputChange('fieldResult')} />
							<Text style={{ textAlign: 'right', fontSize: 10 }}>{this.state.fieldResult.length} / 5000</Text>
						</View> */}
						<View style={styles.formBox}>
							<Text style={styles.formTitle}>Due Date</Text>
							{this.state.selectedDueDate ?
								<TextInput
									editable={false}
									style={{ height: 50, width: '100%', fontSize: 14, marginBottom: 10 }}
									placeholder="Pilih tanggal"
									placeholderTextColor={GrayColor}
									selectionColor={PrimaryColorDark}
									value={this.state.selectedDueDate} /> : null}
							<CustomButton
								label={this.state.selectedDueDate ? "Ubah Tanggal" : "Pilih Tanggal"}
								onPress={this.datepicker('dueDate')}
							/>
						</View>
						{/* <View style={styles.formBox}>
							<Text style={styles.formTitle}>Action Plan</Text>
							<Picker
								selectedValue={this.state.selectedActionPlan}
								style={{ height: 50, width: '100%' }}
								itemStyle={{ fontFamily: NunitoRegular }}
								onValueChange={this.onInputChange('selectedActionPlan')}>
								<Picker.Item label="Pilih action plan" value="" />
								{this.props.fieldCondition ? this.props.fieldCondition.map(this.renderFieldCondition) : null}
							</Picker>
						</View>
						<View style={styles.formBox}>
							<Text style={styles.formTitle}>Prediksi Hasil</Text>
							<Picker
								selectedValue={this.state.selectedResultPrediction}
								style={{ height: 50, width: '100%' }}
								itemStyle={{ fontFamily: NunitoRegular }}
								onValueChange={this.onInputChange('selectedResultPrediction')}>
								<Picker.Item label="Pilih prediksi hasil" value="" />
								{this.props.resultPrediction ? this.props.resultPrediction.map(this.renderResultPrediction) : null}
							</Picker>
						</View> */}
						<View style={styles.formBox}>
							<Text style={styles.formTitle}>Foto Pada Lokasi</Text>
							<View style={{ width: width - 30, height: width - 30, borderWidth: 2, borderColor: BlackColor }}>
								<Image source={{ uri: this.state.locationSelfiePhoto }} resizeMode="contain" style={{ flex: 1 }} />
							</View>
							<CustomButton
								label={this.state.locationSelfiePhoto ? "Ambil Ulang Foto" : "Ambil Foto"}
								onPress={this.openTakePictureScreen('locationSelfie')}
							/>
						</View>
						<View style={[styles.formBox, { borderBottomWidth: 0 }]}>
							<Text style={styles.formTitle}>Foto Dengan Customer</Text>
							<View style={{ width: width - 30, height: width - 30, borderWidth: 2, borderColor: BlackColor }}>
								<Image source={{ uri: this.state.withCustomerPhoto }} resizeMode="contain" style={{ flex: 1 }} />
							</View>
							<CustomButton
								label={this.state.withCustomerPhoto ? "Ambil Ulang Foto" : "Ambil Foto"}
								onPress={this.openTakePictureScreen('withCustomer')}
							/>
						</View>
						<View style={{ width: '100%', paddingHorizontal: SafeArea, marginBottom: SafeArea, marginTop: 5 }}>
							<View style={{ width: '100%', height: 2, backgroundColor: LightGrayColor }} />
						</View>
						<CustomButton
							disabled={this.state.selectedDueDate ? false : true}
							label="Kirim Laporan"
							onPress={this.submitForm}
						/>
						<View style={[styles.formBox, { paddingTop: 10, marginTop: 10, borderTopColor: GrayColor, borderTopWidth: 1, borderBottomWidth: 0 }]}>
							<Text style={styles.formTitle}>Tanggal Janji Bayar</Text>
							{this.state.selectedJanjiBayarDate ?
								<TextInput
									editable={false}
									style={{ height: 50, width: '100%', fontSize: 14, marginBottom: 10 }}
									placeholder="Pilih tanggal"
									placeholderTextColor={GrayColor}
									selectionColor={PrimaryColorDark}
									value={this.state.selectedJanjiBayarDate} /> : null}
							<CustomButton
								label={this.state.selectedJanjiBayar ? "Ubah Tanggal" : "Pilih Tanggal"}
								onPress={this.datepicker('janjiBayar')}
							/>
						</View>
						<View style={[styles.formBox, { paddingTop: 10, marginTop: 10, borderTopColor: GrayColor, borderTopWidth: 1, borderBottomWidth: 0 }]}>
							<Text style={styles.formTitle}>Waktu Janji Bayar</Text>
							{this.state.selectedJanjiBayarTime ?
								<TextInput
									editable={false}
									style={{ height: 50, width: '100%', fontSize: 14, marginBottom: 10 }}
									placeholder="Pilih tanggal"
									placeholderTextColor={GrayColor}
									selectionColor={PrimaryColorDark}
									value={this.state.selectedJanjiBayarTime} /> : null}
							<CustomButton
								label={this.state.selectedJanjiBayarTime ? "Ubah Waktu" : "Pilih Waktu"}
								onPress={this.timepicker('janjiBayar')}
							/>
						</View>
						<View style={{ width: '100%', paddingHorizontal: SafeArea, marginBottom: SafeArea, marginTop: 5 }}>
							<View style={{ width: '100%', height: 2, backgroundColor: LightGrayColor }} />
						</View>
						<CustomButton
							// disabled={this.state.selectedJanjiBayar && this.state.selectedRawJanjiBayarTime ? false : true}
							label="Ajukan Janji Bayar"
							onPress={this.requestJanjiBayar}
						/>
					</View>
					{this.state.datePickerDueDateShow ?
						<DateTimePicker
							value={this.state.selectedRawDueDate}
							mode="date"
							display="calendar"
							onChange={this.setDate('dueDate')} /> : null}
					{this.state.datePickerJanjiBayarShow ?
						<DateTimePicker
							value={this.state.selectedRawJanjiBayarDate}
							mode="date"
							display="calendar"
							onChange={this.setDate('janjiBayar')} /> : null}
					{this.state.timePickerJanjiBayarShow ?
						<DateTimePicker
							is24Hour
							value={this.state.selectedRawJanjiBayarTime}
							mode="time"
							display="spinner"
							onChange={this.setTime('janjiBayar')} /> : null}
				</ScrollView>
			);
		}
		else {
			return <View />
		}
	}
}

const renderInformation = (type, data) => {
	var title, convertedValue;
	switch (type) {
		case 'customer_nopk':
			title = 'NOPK'
			break;
		case 'customer_name':
			title = 'Nama Lengkap'
			break;
		case 'customer_phone':
			title = 'Nomor Telepon'
			break;
		case 'customer_address':
			title = 'Alamat'
			break;
		case 'customer_actual_address':
			title = 'Alamat Sesuai KTP'
			break;
		case 'customer_city':
			title = 'Kota'
			break;
		case 'customer_district':
			title = 'Kecamatan'
			break;
		case 'customer_sub_district':
			title = 'Kelurahan'
			break;
		case 'customer_postal_code':
			title = 'Kode Pos'
			break;
		case 'payment_jatuh_tempo_akhir':
			title = 'Jatuh Tempo Akhir'
			convertedValue = trimDDMMYYYY(data)
			break;
		case 'payment_tenor':
			title = 'Tenor'
			break;
		case 'payment_angsuran_ke':
			title = 'Angsuran Ke'
			break;
		case 'payment_sisa_tenor':
			title = 'Sisa Tenor'
			break;
		case 'payment_kwitansi_tertunggak':
			title = 'Kwitansi Tertunggak'
			break;
		case 'payment_kwitansi':
			title = 'Kwitansi'
			break;
		case 'payment_bucket_awal':
			title = 'Bucket Awal'
			break;
		case 'payment_telat_hari':
			title = 'Telat Hari'
			break;
		case 'payment_bucket_akhir':
			title = 'Bucket Akhir'
			break;
		case 'payment_installment':
			title = 'Installment'
			convertedValue = idr(data)
			break;
		case 'payment_amount_due':
			title = 'Amount Due'
			convertedValue = idr(data)
			break;
		case 'payment_collected_all':
			title = 'Collected All'
			convertedValue = idr(data)
			break;
		case 'payment_collected_due':
			title = 'Collected Due'
			convertedValue = idr(data)
			break;
		case 'payment_os_balance':
			title = 'OS Balance'
			convertedValue = idr(data)
			break;
		case 'payment_os_akhir':
			title = 'OS Akhir'
			convertedValue = idr(data)
			break;
		case 'payment_denda_berjalan':
			title = 'Denda Berjalan'
			convertedValue = idr(data)
			break;
		case 'history_payment_method_1':
			title = 'Metode Bayar'
			break;
		case 'history_payment_date_1':
			title = 'Tanggal Bayar'
			convertedValue = trimDDMMYYYY(data)
			break;
		case 'history_payment_method_2':
			title = 'Metode Bayar'
			break;
		case 'history_payment_date_2':
			title = 'Tanggal Bayar'
			convertedValue = trimDDMMYYYY(data)
			break;
		case 'history_payment_method_3':
			title = 'Metode Bayar'
			break;
		case 'history_payment_date_3':
			title = 'Tanggal Bayar'
			convertedValue = trimDDMMYYYY(data)
			break;
		case 'history_payment_method_4':
			title = 'Metode Bayar'
			break;
		case 'history_payment_date_4':
			title = 'Tanggal Bayar'
			convertedValue = trimDDMMYYYY(data)
			break;
		case 'unit_bkode':
			title = 'BKode'
			break;
		case 'unit_no_polisi':
			title = 'Nomor Polisi'
			break;
		case 'unit_no_mesin':
			title = 'Nomor Mesin'
			break;
		case 'unit_no_rangka':
			title = 'Nomor Rangka'
			break;
		case 'unit_stnk':
			title = 'Nama STNK'
			break;
		case 'unit_jenis':
			title = 'Jenis Kendaraan'
			break;
		case 'unit_merk':
			title = 'Merek Kendaraan'
			break;
		case 'unit_year':
			title = 'Tahun Kendaraan'
			break;
	}
	return (
		<View style={styles.labelInformationBox}>
			<Text style={styles.labelInformationTitle}>{title}</Text>
			<Text style={styles.labelInformationValue}>{convertedValue ? convertedValue : data ? data : '-'}</Text>
		</View>
	)
}

export default class CollectionDetailScreen extends Component {
	constructor(props) {
		super(props)
		this.state = {
			index: 0,
			routes: [
				{ key: 'detailCustomer', title: 'Detail Customer' },
				{ key: 'detailPayment', title: 'Detail Payment' },
				{ key: 'historyPayment', title: 'History Payment' },
				{ key: 'keteranganUnit', title: 'Keterangan Unit' },
				{ key: 'laporanLapangan', title: 'Laporan Lapangan' },
			],
			fieldCondition: [],
			actionPlan: [
				{ id: '1', text: 'i. Pemberian surat peringatan' },
				{ id: '2', text: 'ii. Surat peringatan 2 SPV turun mendampingi' },
				{ id: '3', text: 'iii. Surat peringatan 3 SPV mendampingi' },
				{ id: '4', text: 'iv. Tarik barang SPV turun / opsional BM turun' },
				{ id: '5', text: 'v. LP BM dan SPV wajib turun' }
			],
			resultPrediction: [
				{ id: '1', text: 'BAYAR' },
				{ id: '2', text: 'BELUM TAHU' },
				{ id: '3', text: 'TIDAK BAYAR' },
				{ id: '4', text: 'JANJI BAYAR' }
			],
			questionList: [],
			user_id: null,
			token_type: '',
			user_token: '',
			customerData: null,
			isLoading: true,
			locationSelfiePhoto: null,
			withCustomerPhoto: null,
			needLogin: false
		}
	}

	static getDerivedStateFromProps(props, state) {
		if (props.locationSelfiePhoto !== state.locationSelfiePhoto) {
			return {
				locationSelfiePhoto: props.locationSelfiePhoto,
			};
		}
		if (props.withCustomerPhoto !== state.withCustomerPhoto) {
			return {
				withCustomerPhoto: props.withCustomerPhoto,
			};
		}
		return null;
	}

	toLogin = () => {
		Actions.login()
	}

	componentDidMount() {
		getUserData().then(res => {
			if (res) {
				this.setState({
					user_id: res.user_id,
					token_type: res.token_type,
					user_token: res.access_token
				})
				console.log(res)
				const headers = new Headers()
				headers.set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImE4ZTA3ZjcxMjE1MWY2NjNlYmY0YjNhYThjODBmMjY5ZmQyMjRmYTlmYTBjOGU5YzFmMTAzZDhlNTZiN2ZmYzc2NWVjZGYwN2ZlMzYxNWViIn0.eyJhdWQiOiIyIiwianRpIjoiYThlMDdmNzEyMTUxZjY2M2ViZjRiM2FhOGM4MGYyNjlmZDIyNGZhOWZhMGM4ZTljMWYxMDNkOGU1NmI3ZmZjNzY1ZWNkZjA3ZmUzNjE1ZWIiLCJpYXQiOjE1NjM4NjIwMzIsIm5iZiI6MTU2Mzg2MjAzMiwiZXhwIjoxNTk1NDg0NDMyLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.Y7OSPc3xBYCGn4I0w_aRkW2mg26Po700NVPtGFoDyrYAGJryzgqpQSJi9DjaK7v5BRh2ae7nVTlXdvVz4_r8gchtCY9d-ffTDOprU8SnxMOl9j9-Wq565FfnKGEY90kOXgVEEmTen0FKatbAgOqqTjFSudMe2qkAEXOSs5mythA9MW2utJf3UCTfzOQP32j88iulom5GBgDo16Rq85A_V2rsO5X6EZC4EW1Az4bKyvhfeVmkK_qggxzgU9U850ggCT5zomslZVcQt1aho_Pcex89OedBarvh2wKabmSieuuGFCvIzi96j2rPg50AYlIWIoN3VLYqBO-r8aa0lP1q8jxFgQoDQcmvftdwWdM7alRtdtjcNAu-TiYOcc-BKNYLyonLwS9gxgUPjzZbsDuRBzFXHiQ6L7ejnJvBu73eXh14pkCH_T0Yoh9CNIZOy-srBm4xzBgjULEmN4kqiI7LFptxFCsGyF-9TaKO6eh9bE27i6tLHwUMp_V2ypvts0Oo2H0UUErSCOGSID4SLN6yS6INi8e9ouLELZmzUcIqR7493F3SCDVesQ-KsvQVUDXl5cPTt8OaT08yXpNRjnxRdz1Jv3p_ecxxygl_3VDRhKkgsi0n9xUJwmsPDA_saRSIT51SVfrhtj5yo2LIQrrYStEehxq5x1gB4LVVnJcvyVY')
				// headers.set('Authorization', `${res.token_type} ${res.access_token}`)
				fetch(APICategoryList, {
					method: 'GET',
					headers: headers
				})
					.then(res => res.json())
					.then(resJson => this.setState({ fieldCondition: resJson.data.categories }))
					.catch(err => console.log(err))
				fetch(APIQuestionList, {
					method: 'GET',
					headers: headers
				})
					.then(res => res.json())
					.then(resJson => this.setState({ questionList: resJson.data.questions }))
					.catch(err => console.log(err))
			}
		}).catch(err => this.setState({ needLogin: true }))
		delay(500).then(() => this.setState({
			customerData: {
				customer_nopk: '400000557',
				customer_name: 'NENENG',
				customer_phone: '081289662229',
				customer_address: 'KP JATI RT/RW 003/001 KEL JATIUWUNG KEC CIBODAS',
				customer_actual_address: 'KP JATI RT/RW 003/001 KEL JATIUWUNG KEC CIBODAS',
				customer_city: 'JATIUWUNG',
				customer_district: 'JATIUWUNG',
				customer_sub_district: 'TANGERANG',
				customer_postal_code: '15138',
				payment_jatuh_tempo_akhir: '2019-07-21',
				payment_tenor: '12',
				payment_angsuran_ke: '04',
				payment_sisa_tenor: '8',
				payment_kwitansi_tertunggak: '1',
				payment_kwitansi: '05-05',
				payment_bucket_awal: '1. Current',
				payment_telat_hari: '',
				payment_bucket_akhir: '1. Current',
				payment_installment: '4264200',
				payment_amount_due: '4264200',
				payment_collected_all: '4264200',
				payment_collected_due: '4264200',
				payment_os_balance: '38377800',
				payment_os_akhir: '34113600',
				payment_denda_berjalan: '191900',
				history_payment_method_1: 'TRANSFER',
				history_payment_date_1: '2019-06-27',
				history_payment_method_2: 'TRANSFER',
				history_payment_date_2: '2019-05-24',
				history_payment_method_3: 'TRANSFER',
				history_payment_date_3: '2019-04-22',
				history_payment_method_4: 'TRANSFER',
				history_payment_date_4: '2019-03-21',
				unit_bkode: '2SNNN',
				unit_no_polisi: 'B1320CFN',
				unit_no_mesin: 'HR15973150A',
				unit_no_rangka: 'MHB1CG1ABJ053883',
				unit_stnk: 'SERLI YUNITA WIJAYA',
				unit_jenis: 'NISSAN SEDAN',
				unit_merk: 'GRAND LIVINA',
				unit_year: '2011'
			},
			isLoading: false
		}))
	}

	render() {
		if (this.state.isLoading) {
			return (
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<ActivityIndicator color={PrimaryColorDark} />
					<Text style={{ fontFamily: NunitoBold, letterSpacing: 1, color: BlackColor, fontSize: 12, marginTop: 10 }}>Memuat Data</Text>
				</View>
			)
		}
		else if (this.state.needLogin) {
			return (
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<Text style={{ fontFamily: NunitoBold, letterSpacing: 1, color: BlackColor, fontSize: 12, marginTop: 10 }}>Kredensial Kadaluarsa</Text>
					<CustomButton
						label="Masuk Ulang"
						onPress={this.toLogin}
					/>
				</View>
			)
		}
		else {
			return (
				<TabView
					navigationState={this.state}
					renderTabBar={props =>
						<TabBar
							{...props}
							scrollEnabled
							tabStyle={{ width: 'auto' }}
							style={{ backgroundColor: WhiteColor }}
							activeColor={PrimaryColor}
							inactiveColor={GrayColor}
							indicatorStyle={{ backgroundColor: PrimaryColor }}
							renderLabel={({ route, focused, color }) => (
								<Text style={{ color, margin: 8, fontFamily: NunitoBold }}>
									{route.title}
								</Text>
							)}
						/>
					}
					renderScene={({ route }) => {
						switch (route.key) {
							case 'detailCustomer':
								return <DetailCustomer customerData={this.state.customerData} />;
							case 'detailPayment':
								return <DetailPayment customerData={this.state.customerData} />;
							case 'historyPayment':
								return <HistoryPayment customerData={this.state.customerData} />;
							case 'keteranganUnit':
								return <KeteranganUnit customerData={this.state.customerData} />;
							case 'laporanLapangan':
								return <LaporanLapangan
									user_id={this.state.user_id}
									token_type={this.state.token_type}
									user_token={this.state.access_token}
									locationSelfiePhoto={this.state.locationSelfiePhoto}
									locationWithCustomerPhoto={this.state.locationWithCustomerPhoto}
									customerData={this.state.customerData}
									fieldCondition={this.state.fieldCondition}
									questionList={this.state.questionList}
									actionPlan={this.state.actionPlan}
									resultPrediction={this.state.resultPrediction}
									isLoading={this.state.isLoading} />;
							default:
								return null;
						}
					}}
					onIndexChange={index => this.setState({ index })}
					initialLayout={{ width: width }}
				/>
			)
		}
	}
}

const styles = StyleSheet.create({
	labelInformationBox: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingRight: SafeArea,
		marginLeft: SafeArea,
		paddingVertical: 10,
		borderBottomWidth: 0.4,
		borderBottomColor: GrayColor
	},
	labelInformationTitle: {
		fontSize: 12,
		fontFamily: NunitoBold
	},
	labelInformationValue: {
		fontSize: 12,
		textAlign: 'right',
		width: 150,
		marginRight: SafeArea,
		color: BlackColor
	},
	informationBox: {
		width: '100%',
		paddingHorizontal: SafeArea,
		marginBottom: 10
	},
	informationTitle: {
		fontSize: 12,
		fontFamily: NunitoBold
	},
	informationValue: {
		fontSize: 20,
		color: BlackColor
	},
	paymentHeaderText: {
		fontSize: 16,
		fontFamily: NunitoBold,
		color: BlackColor,
		marginBottom: 10,
		marginLeft: SafeArea
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
	buttonText: {
		color: WhiteColor,
		fontFamily: NunitoBold,
		letterSpacing: 1
	},
	formBox: {
		width: '100%',
		paddingHorizontal: SafeArea,
		paddingBottom: 10,
		borderBottomWidth: 1,
		borderBottomColor: GrayColor,
		marginBottom: 10
	},
	formTitle: {
		fontSize: 16,
		fontFamily: NunitoBold,
		marginBottom: 5
	},
	formHelper: {
		fontSize: 12,
		fontFamily: NunitoRegular,
		marginBottom: 5,
		color: GrayColor
	},
	formOption: {
		fontSize: 12,
		fontFamily: NunitoBold,
		color: BlackColor
	}
});
