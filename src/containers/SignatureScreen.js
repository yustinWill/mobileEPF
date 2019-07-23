import React, { Component } from 'react';
import { Platform, StyleSheet, Text, Image, View, Dimensions, ActivityIndicator } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { PrimaryColorDark, PrimaryColorLight, WhiteColor, NunitoBold, GrayColor, SafeArea, BlackColor, LightGrayColor } from '../GlobalConfig';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import SignatureCapture from 'react-native-signature-capture';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';

const { width } = Dimensions.get('screen')

export default class SignatureScreen extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isLoadingSignaturePad: true
		}
	}

	componentDidMount() {
		setTimeout(() => {
			this.setState({ isLoadingSignaturePad: false })
		}, 1000)
	}


	/**
	 * Save Signature Pad
	 */
	saveSign = () => {
		this.sign.saveImage();
	}

	/**
	 * Reset Signature Pad
	 */
	resetSign = () => {
		this.sign.resetImage();
	}

	/**
	 * Process the Signature Image here
	 * result.encoded - for the base64 encoded png
	 * result.pathName - for the file path name
	 * @param {Array} result 
	 */
	_onSaveEvent = (result) => {
		if (this.props.signatureCLO) {
			Actions.pop()
			setTimeout(() => Actions.refresh({ signatureCLO: result.encoded }), 0)
		}
		if (this.props.signatureCustomer) {
			Actions.pop()
			setTimeout(() => Actions.refresh({ signatureCustomer: result.encoded }), 0)
		}
		// console.log(result)
		// const formdata = new FormData();
		// formdata.append("user_id", this.state.data.user_id)
		// formdata.append("vehicle_id", this.state.data.vehicle_id)
		// formdata.append('signature_image', "data:image/jpeg;base64," + result.encoded)

		// console.log(formdata)

		// fetch(APIRoot+'inventory/verify_inventory/', {
		//     method: 'POST',
		//     headers: {
		//         "Accept": 'multipart/form-data',
		//         'Content-Type': 'multipart/form-data'
		//     },
		//     body: formdata
		// })
		// .then(response => {
		//     console.log(response)
		//     const statusCode = response.status;
		//     const res = response.json();
		//     return Promise.all([statusCode, res])
		// })
		// .then(([statusCode, result]) => {
		//     delay(2000)
		//     this.setState({
		//         visible: false
		//     })
		//     if (statusCode === 200){
		//         console.log(result)
		//         toastSuccess("Verification success!")

		//         AsyncStorage.getItem('usertoken')
		//         .then( data => {
		//             data = JSON.parse( data );
		//             console.log( data );

		//             data.verified = 1

		//             AsyncStorage.setItem( 'usertoken', JSON.stringify( data ) );
		//             Actions.refresh()
		//             this._signatureView.show(false);

		//         }).done()
		//     }
		//     else{
		//         this.setState ({
		//             isModalSignature: true,
		//             visible: false
		//         })
		//     }
		// })
		// .catch((error)=>{
		//     console.log(error);
		//     this.setState ({
		//         isModalSignature: true,
		//         visible: false
		//     })
		// })
	}

	render() {
		return (
			<View style={{ flex: 1, backgroundColor: WhiteColor }}>
				<View style={{ height: 50, width: '100%', justifyContent: "center" }}>
					<Text style={{ fontSize: 12, fontWeight: 'bold', color: '#000', textAlign: 'center' }}>Tanda tangan pada kotak dibawah ini </Text>
				</View>
				{this.state.isLoadingSignaturePad ?
					<View style={{ flex: 1, backgroundColor: WhiteColor, justifyContent: 'center', alignItems: 'center' }}>
						<ActivityIndicator color={PrimaryColorDark} />
						<Text style={{ fontFamily: NunitoBold, letterSpacing: 1, color: WhiteColor, fontSize: 12, marginTop: 10 }}>Memuat Kanvas</Text>
					</View> :
					<View style={{ flex: 1, paddingHorizontal: SafeArea }}>
						<View style={{ flex: 1, borderWidth: 2, borderColor: '#000', backgroundColor: '#fff' }}>
							<SignatureCapture
								style={{ flex: 1 }}
								ref={ref => this.sign = ref}
								onSaveEvent={this._onSaveEvent}
								saveImageFileInExtStorage={true}
								showNativeButtons={false}
								showTitleLabel={false}
								viewMode={"portrait"} />
						</View>
					</View>
				}
				<View style={{ width: '100%', paddingHorizontal: SafeArea, marginTop: SafeArea }}>
					<View style={{ width: '100%', height: 2, backgroundColor: LightGrayColor }} />
				</View>
				<View style={{ width: '100%', height: 160, justifyContent: 'space-evenly', alignItems: 'center' }}>
					<View style={styles.buttonBox}>
						<TouchableWithoutFeedback onPress={this.saveSign} style={styles.buttonShadowStyle}>
							<View style={styles.buttonStyle}>
								<Text style={styles.buttonText}>Simpan Tanda Tangan</Text>
							</View>
						</TouchableWithoutFeedback>
					</View>
					<View style={styles.buttonBox}>
						<TouchableWithoutFeedback onPress={() => Actions.pop()} style={styles.buttonShadowStyle}>
							<View style={styles.buttonStyle}>
								<Text style={styles.buttonText}>Batal Tanda Tangan</Text>
							</View>
						</TouchableWithoutFeedback>
					</View>
				</View>
			</View >
		);
	}
}

const styles = StyleSheet.create({
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
});