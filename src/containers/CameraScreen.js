import React, { Component } from 'react';
import { Platform, StyleSheet, Text, Image, View, Dimensions, ActivityIndicator } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { PrimaryColorDark, PrimaryColorLight, WhiteColor, NunitoBold, GrayColor, SafeArea, BlackColor } from '../GlobalConfig';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { RNCamera } from 'react-native-camera';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';

const { width } = Dimensions.get('screen')

// Camera Option
const options = {
	quality: 1,
	width: width,
	fixOrientation: true,
	skipProcessing: true
};

export default class CameraScreen extends Component {
	constructor(props) {
		super(props)
		this.state = {
			cameraFront: false,
			cameraFlash: false,
			isLoadingCamera: true
		}
	}

	componentDidMount() {
		setTimeout(() => {
			this.setState({ isLoadingCamera: false })
		}, 1000)
	}

	takePicture = async () => {
		if (this.camera) {
			const data = await this.camera.takePictureAsync(options);
			// console.log(data.uri);
			if (this.props.locationSelfiePhoto) {
				Actions.pop()
				setTimeout(() => Actions.refresh({ locationSelfiePhoto: data.uri }), 0)
			}
			if (this.props.withCustomerPhoto) {
				Actions.pop()
				setTimeout(() => Actions.refresh({ withCustomerPhoto: data.uri }), 0)
			}
		}
	};

	render() {
		return (
			<View style={{ flex: 1, backgroundColor: WhiteColor }}>
				{this.state.isLoadingCamera ?
					<View style={{ flex: 1, backgroundColor: BlackColor, justifyContent: 'center', alignItems: 'center' }}>
						<ActivityIndicator color={PrimaryColorDark} />
						<Text style={{ fontFamily: NunitoBold, letterSpacing: 1, color: WhiteColor, fontSize: 12, marginTop: 10 }}>Memuat Kamera</Text>
					</View> :
					<RNCamera
						ref={ref => {
							this.camera = ref;
						}}
						style={{ flex: 1 }}
						captureAudio={false}
						type={this.state.cameraFront ? RNCamera.Constants.Type.front : RNCamera.Constants.Type.back}
						flashMode={this.state.cameraFlash ? RNCamera.Constants.FlashMode.on : RNCamera.Constants.FlashMode.off}
					>
						<View style={{ width: width, height: 100, position: 'absolute', bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
							<View style={{ width: width * 0.75, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
								<TouchableOpacity
									onPress={() => this.setState({ cameraFront: !this.state.cameraFront })}
									style={{
										borderRadius: 25,
										borderWidth: 1,
										borderColor: WhiteColor,
										height: 50,
										width: 50,
										justifyContent: 'center',
										alignItems: 'center',
									}}>
									<FontAwesome
										color={WhiteColor}
										size={20}
										name={`refresh`}
									/>
								</TouchableOpacity>
								<TouchableOpacity
									onPress={this.takePicture.bind(this)}
									style={{
										borderRadius: 30,
										borderWidth: 1,
										borderColor: WhiteColor,
										height: 60,
										width: 60,
										justifyContent: 'center',
										alignItems: 'center',
									}}>
									<FontAwesome
										color='#fff'
										size={24}
										name={`camera`}
									/>
								</TouchableOpacity>
								<TouchableOpacity
									onPress={() => this.setState({ cameraFlash: !this.state.cameraFlash })}
									style={{
										borderRadius: 25,
										borderWidth: 1,
										borderColor: WhiteColor,
										height: 50,
										width: 50,
										justifyContent: 'center',
										alignItems: 'center',
									}}>
									<MaterialCommunityIcons
										color={WhiteColor}
										size={20}
										name={this.state.cameraFlash ? `flash` : 'flash-off'}
									/>
								</TouchableOpacity>
							</View>
						</View>
					</RNCamera>
				}
				<View style={{ width: '100%', height: 100, justifyContent: 'center', alignItems: 'center' }}>
					<View style={styles.buttonBox}>
						<TouchableWithoutFeedback onPress={() => Actions.pop()} style={styles.buttonShadowStyle}>
							<View style={styles.buttonStyle}>
								<Text style={styles.buttonText}>Batal Foto</Text>
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