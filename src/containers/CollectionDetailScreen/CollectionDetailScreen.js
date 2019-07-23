import React, { Component } from 'react';
import { Platform, StyleSheet, Text, Image, View, ActivityIndicator, Dimensions, ScrollView, Linking, TouchableOpacity, Picker, TextInput, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { PrimaryColorDark, PrimaryColorLight, WhiteColor, NunitoBold, GrayColor, SafeArea, BlackColor, NunitoRegular, PrimaryColor, NunitoSemiBold, LightGrayColor } from '../../GlobalConfig';
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-community/async-storage';
import { TouchableNativeFeedback, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Geolocation from '@react-native-community/geolocation';

import { TabView, TabBar } from 'react-native-tab-view';
import { trimDDMMYYYY, idr } from '../../GlobalFunction';

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
			fieldChronology: '',
			fieldResult: '',
			selectedRawDueDate: new Date(),
			selectedDueDate: "",
			selectedResultPrediction: null,
			datePickerShow: false,
			dateChosen: false,
			locationLat: 0,
			locationLong: 0,
			isLoadingLocation : false,
			locationSelfiePhoto: this.props.locationSelfiePhoto,
			withCustomerPhoto: this.props.withCustomerPhoto
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

	/**
	 * On Date Chosen
	 */
	setDate = (event, date) => {
		if (date) {
			let indonesiaMonth = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'October', 'November', 'Desember']
			let day = date.getDate()
			let month = date.getMonth()
			let year = date.getFullYear()
			this.setState({
				datePickerShow: Platform.OS === 'ios' ? true : false,
				selectedRawDueDate: date,
				selectedDueDate: `${day} ${indonesiaMonth[month]} ${year}`,
				dateChosen: true
			});
		}
	}

	/**
	 * Show the Date Picker
	 */
	datepicker = () => {
		this.setState({
			datePickerShow: true
		});
	}

	onInputChange = field => value => this.setState({ [field]: value })

	renderFieldCondition = (item, index) => <Picker.Item label={item.text} value={item.id} key={index} />

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

	getCurrentLocation = () => {
		this.setState({ isLoadingLocation: true })
		setTimeout(() => {
			Geolocation.getCurrentPosition(position => {
				if (position.coords.latitude && position.coords.longitude) {
					this.setState({
						locationLat: position.coords.latitude,
						locationLong: position.coords.longitude,
						isLoadingLocation: false
					})
				}
			});
		}, 2000)
	}

	submitForm = () => {
		Alert.alert(
			'Kirim Laporan',
			'Kirim laporan?',
			[
				{
					text: 'Tidak',
					onPress: () => console.log('Cancel Pressed'),
					style: 'cancel',
				},
				{
					text: 'Ya',
					onPress: () => {
						Actions.pop()
						setTimeout(() => Actions.refresh({ lastUpdated: new Date() }), 0)
					}
				},
			],
			{ cancelable: false },
		);
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
						Actions.requestJB({
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
					}
				},
			],
			{ cancelable: false },
		);
	}

	render() {
		if (this.props.customerData) {
			return (
				<ScrollView style={{ flex: 1, backgroundColor: WhiteColor }}>
					<View style={{ paddingVertical: 10 }}>
						<View style={styles.informationBox}>
							<Text style={styles.formTitle}>Kondisi Lapangan</Text>
							<Picker
								selectedValue={this.state.selectedFieldCondition}
								style={{ height: 50, width: '100%' }}
								itemStyle={{ fontFamily: NunitoRegular }}
								onValueChange={this.onInputChange('selectedFieldCondition')}>
								<Picker.Item label="Pilih kondisi lapangan" value="" />
								{this.props.fieldCondition ? this.props.fieldCondition.map(this.renderFieldCondition) : null}
							</Picker>
						</View>
						<View style={styles.informationBox}>
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
						<View style={styles.informationBox}>
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
						</View>
						<View style={styles.informationBox}>
							<Text style={styles.formTitle}>Due Date</Text>
							{this.state.dateChosen ?
								<TextInput
									editable={false}
									style={{ height: 50, width: '100%', fontSize: 14, marginBottom: 10 }}
									placeholder="Pilih tanggal"
									placeholderTextColor={GrayColor}
									selectionColor={PrimaryColorDark}
									value={this.state.selectedDueDate} /> : null}
							<View style={[styles.buttonBox, { paddingHorizontal: 0 }]}>
								<TouchableNativeFeedback onPress={this.datepicker} style={styles.buttonShadowStyle}>
									<View style={styles.buttonStyle}>
										<Text style={styles.buttonText}>{this.state.dateChosen ? "Ubah Tanggal" : "Pilih Tanggal"}</Text>
									</View>
								</TouchableNativeFeedback>
							</View>
						</View>
						<View style={styles.informationBox}>
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
						<View style={styles.informationBox}>
							<Text style={styles.formTitle}>Prediksi Hasil</Text>
							<Picker
								selectedValue={this.state.selectedResultPrediction}
								style={{ height: 50, width: '100%' }}
								itemStyle={{ fontFamily: NunitoRegular }}
								onValueChange={this.onInputChange('selectedResultPrediction')}>
								<Picker.Item label="Pilih prediksi hasil" value="" />
								{this.props.resultPrediction ? this.props.resultPrediction.map(this.renderResultPrediction) : null}
							</Picker>
						</View>
						<View style={styles.informationBox}>
							<Text style={styles.formTitle}>Lokasi Saat Ini</Text>
							<View style={[styles.buttonBox, { paddingHorizontal: 0 }]}>
								<TouchableNativeFeedback onPress={this.getCurrentLocation} disabled={this.state.locationLat ? true : false} style={this.state.locationLat ? null : styles.buttonShadowStyle}>
									<View style={styles.buttonStyle}>
										{this.state.isLoadingLocation ?
										<ActivityIndicator color={WhiteColor} /> :
										<Text style={[styles.buttonText, this.state.locationLat ? { color: BlackColor } : null]}>{this.state.locationLat ? `${this.state.locationLat}, ${this.state.locationLong}` : "Dapatkan Lokasi Saat Ini"}</Text>}
									</View>
								</TouchableNativeFeedback>
							</View>
						</View>
						<View style={styles.informationBox}>
							<Text style={styles.formTitle}>Foto Pada Lokasi</Text>
							<View style={{ width: width - 30, height: width - 30, borderWidth: 2, borderColor: BlackColor }}>
								<Image source={{ uri: this.state.locationSelfiePhoto }} resizeMode="contain" style={{ flex: 1 }} />
							</View>
							<View style={[styles.buttonBox, { paddingHorizontal: 0 }]}>
								<TouchableNativeFeedback onPress={this.openTakePictureScreen('locationSelfie')} style={styles.buttonShadowStyle}>
									<View style={styles.buttonStyle}>
										<Text style={styles.buttonText}>{this.state.locationSelfiePhoto ? "Ambil Ulang Foto" : "Ambil Foto"}</Text>
									</View>
								</TouchableNativeFeedback>
							</View>
						</View>
						<View style={styles.informationBox}>
							<Text style={styles.formTitle}>Foto Dengan Customer</Text>
							<View style={{ width: width - 30, height: width - 30, borderWidth: 2, borderColor: BlackColor }}>
								<Image source={{ uri: this.state.withCustomerPhoto }} resizeMode="contain" style={{ flex: 1 }} />
							</View>
							<View style={[styles.buttonBox, { paddingHorizontal: 0 }]}>
								<TouchableNativeFeedback onPress={this.openTakePictureScreen('withCustomer')} style={styles.buttonShadowStyle}>
									<View style={styles.buttonStyle}>
										<Text style={styles.buttonText}>{this.state.withCustomerPhoto ? "Ambil Ulang Foto" : "Ambil Foto"}</Text>
									</View>
								</TouchableNativeFeedback>
							</View>
						</View>
						<View style={{ width: '100%', paddingHorizontal: SafeArea, marginBottom: SafeArea, marginTop: 5 }}>
							<View style={{ width: '100%', height: 2, backgroundColor: LightGrayColor }} />
						</View>
						<View style={styles.buttonBox}>
							<TouchableNativeFeedback onPress={this.submitForm} style={styles.buttonShadowStyle}>
								<View style={styles.buttonStyle}>
									<Text style={styles.buttonText}>Kirim Laporan</Text>
								</View>
							</TouchableNativeFeedback>
						</View>
						<View style={styles.buttonBox}>
							<TouchableNativeFeedback onPress={this.requestJanjiBayar} style={styles.buttonShadowStyle}>
								<View style={styles.buttonStyle}>
									<Text style={styles.buttonText}>Ajukan Janji Bayar</Text>
								</View>
							</TouchableNativeFeedback>
						</View>
					</View>
					{this.state.datePickerShow ?
						<DateTimePicker
							value={this.state.selectedRawDueDate}
							mode="date"
							display="calendar"
							onChange={this.setDate} /> : null}
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
			fieldCondition: [
				{ id: '1', text: 'A1 - Konsumen ada dan unit ada' },
				{ id: '2', text: 'A2 - Konsumen ada dan unit tidak ada' },
				{ id: '3', text: 'A3 - Konsumen tidak ada dan unit ada' },
				{ id: '4', text: 'A4 - Konsumen tidak ada dan unit tidak ada' }
			],
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

			// customer_nopk : '400000845',
			// customer_name : 'ETI ARYAWATI',
			// customer_phone : '085811182509',
			// customer_address : 'JL MUJAIR I NO 140 RT/RW 005/010 KEL KARAAWACI BARU KEC KARAWACI',
			// customer_actual_address : 'JL MUJAIR I NO 140 RT/RW 005/010 KEL KARAAWACI BARU KEC KARAWACI',
			// customer_city : 'TANGERANG',
			// customer_district : 'TANGERANG',
			// customer_sub_district : 'KARAWACI BARU',
			// customer_postal_code : '15118',
			// payment_jatuh_tempo_akhir : '2019-08-10',
			// payment_tenor : '18',
			// payment_angsuran_ke : '02',
			// payment_sisa_tenor : '16',
			// payment_kwitansi_tertunggak : '0',
			// payment_kwitansi : '',
			// payment_bucket_awal : '',
			// payment_telat_hari : '',
			// payment_bucket_akhir : '1. Current',
			// payment_installment : '666700',
			// payment_amount_due : '0',
			// payment_collected_all : '0',
			// payment_collected_due : '0',
			// payment_os_balance : '11333900',
			// payment_os_akhir : '10667200',
			// payment_denda_berjalan : '0',
			// history_payment_method_1 : 'KANTOR',
			// history_payment_date_1 : '2019-05-11',
			// history_payment_method_2 : '',
			// history_payment_date_2 : '',
			// history_payment_method_3 : '',
			// history_payment_date_3 : '',
			// history_payment_method_4 : '',
			// history_payment_date_4 : '',
			// unit_bkode : '2MBTT',
			// unit_no_polisi : 'B1599COS',
			// unit_no_mesin : '3NRH210312',
			// unit_no_rangka : 'MHKA6GJ6JJ066584',
			// unit_stnk : 'ETI ARYAWATI',
			// unit_jenis : 'TOYOTA CHEVROLET SPA',
			// unit_merk : 'CAYLA " 2018',
			// unit_year : '2018',
			customerData: null,
			isLoading: true,
			locationSelfiePhoto: null,
			withCustomerPhoto: null
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

	componentDidMount() {
		setTimeout(() => {
			this.setState({
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
			})
		}, 500)
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
									locationSelfiePhoto={this.state.locationSelfiePhoto}
									locationWithCustomerPhoto={this.state.locationWithCustomerPhoto}
									customerData={this.state.customerData}
									fieldCondition={this.state.fieldCondition}
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
	formTitle: {
		fontSize: 12,
		fontFamily: NunitoBold,
		marginBottom: 5
	},
});
