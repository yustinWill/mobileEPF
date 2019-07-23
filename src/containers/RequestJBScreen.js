import React, { Component } from 'react';
import { Platform, StyleSheet, Text, Image, View, Dimensions, ActivityIndicator, Clipboard, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { PrimaryColorDark, GrayColor, WhiteColor, NunitoBold, SafeArea, BlackColor, PrimaryColor, LightGrayColor } from '../GlobalConfig';
import { WebView } from 'react-native-webview';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import Toast from 'react-native-root-toast';
import { TabView, TabBar } from 'react-native-tab-view';

const { width } = Dimensions.get('screen')

class DokumenJB extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isLoading: this.props.isLoading,
			docUrl: 'http://calibre-ebook.com/downloads/demos/demo.docx',
			errorMessage: '',
			visibleToast: false
		}
	}

	/**
	 * Copy Document URL to Clipboard
	 */
	copyLinkUrl = () => {
		Clipboard.setString(`https://docs.google.com/viewer?url=${this.state.docUrl}`)
		this.setState({
			errorMessage: 'Tautan dokumen berhasil dikopi',
			visibleToast: true
		})
	}

	render() {
		return (
			<View style={{ flex: 1, backgroundColor: WhiteColor }}>
				<View style={{ flex: 1, padding: SafeArea }}>
					{this.state.isLoading ?
						<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
							<ActivityIndicator color={PrimaryColorDark} />
							<Text style={{ fontFamily: NunitoBold, letterSpacing: 1, color: BlackColor, fontSize: 12, marginTop: 10 }}>Memuat Dokumen</Text>
						</View> :
						<WebView
							incognito
							source={{ uri: `https://docs.google.com/viewer?url=${this.state.docUrl}` }}
							style={{ flex: 1 }}
						/>}
				</View>
				<View style={{ width: '100%', paddingHorizontal: SafeArea, marginTop: 5 }}>
					<View style={{ width: '100%', height: 2, backgroundColor: LightGrayColor }} />
				</View>
				<View style={{ width: '100%', height: 100, justifyContent: 'center', alignItems: 'center' }}>
					<View style={styles.buttonBox}>
						<TouchableNativeFeedback onPress={this.copyLinkUrl} style={styles.buttonShadowStyle}>
							<View style={styles.buttonStyle}>
								<Text style={styles.buttonText}>Copy Link Dokumen</Text>
							</View>
						</TouchableNativeFeedback>
					</View>
				</View>
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

class SignatureJB extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isLoading: true,
			errorMessage: '',
			visibleToast: false,
			signatureCLO: this.props.signatureCLO,
			signatureCustomer: this.props.signatureCustomer
		}
	}

	componentDidUpdate(prevProps) {
		if (prevProps.signatureCLO !== this.props.signatureCLO) {
			console.log(this.props.signatureCLO)
			this.setState({ signatureCLO: this.props.signatureCLO })
		}
		if (prevProps.signatureCustomer !== this.props.signatureCustomer) {
			this.setState({ signatureCustomer: this.props.signatureCustomer })
		}
	}

	// static getDerivedStateFromProps(props, state) {
	// 	if (props.signatureCLO !== state.signatureCLO) {
	// 		return {
	// 			signatureCLO: props.signatureCLO,
	// 		};
	// 	}
	// 	if (props.signatureCustomer !== state.signatureCustomer) {
	// 		return {
	// 			signatureCustomer: props.signatureCustomer,
	// 		};
	// 	}
	// 	return null;
	// }

	confirmJanjiBayar = () => {
		this.setState({
			errorMessage: 'Pengajuan janji bayar telah berhasil dikirimkan',
			visibleToast: true
		})
		setTimeout(() => {
			Actions.popTo('workOrder')
			Actions.refresh({ lastUpdated: new Date() })
		}, 1000)
	}

	openTakeSignatureScreen = (field) => () => {
		switch (field) {
			case 'signatureCLO':
				Actions.signaturePad({ signatureCLO: true })
				break;
			case 'signatureCustomer':
				Actions.signaturePad({ signatureCustomer: true })
				break;
		}
	}

	render() {
		return (
			<ScrollView style={{ flex: 1, backgroundColor: WhiteColor }}>
				<View style={{ paddingTop: 10 }}>
					<View style={styles.informationBox}>
						<Text style={styles.formTitle}>Tanda Tangan CLO</Text>
						<View style={{ width: width - 30, height: width - 30, borderWidth: 2, borderColor: BlackColor }}>
							<Image source={{ uri: `data:image/png;base64,${this.state.signatureCLO}` }} resizeMode="contain" style={{ flex: 1 }} />
						</View>
						{this.state.signatureCLO ? null :
							<View style={[styles.buttonBox, { paddingHorizontal: 0 }]}>
								<TouchableNativeFeedback onPress={this.openTakeSignatureScreen('signatureCLO')} style={styles.buttonShadowStyle}>
									<View style={styles.buttonStyle}>
										<Text style={styles.buttonText}>Ambil Tanda Tangan</Text>
									</View>
								</TouchableNativeFeedback>
							</View>}
					</View>
					<View style={styles.informationBox}>
						<Text style={styles.formTitle}>Tanda Tangan Customer</Text>
						<View style={{ width: width - 30, height: width - 30, borderWidth: 2, borderColor: BlackColor }}>
							<Image source={{ uri: `data:image/png;base64,${this.state.signatureCustomer}` }} resizeMode="contain" style={{ flex: 1 }} />
						</View>
						{this.state.signatureCustomer ? null :
							<View style={[styles.buttonBox, { paddingHorizontal: 0 }]}>
								<TouchableNativeFeedback onPress={this.openTakeSignatureScreen('signatureCustomer')} style={styles.buttonShadowStyle}>
									<View style={styles.buttonStyle}>
										<Text style={styles.buttonText}>Ambil Tanda Tangan</Text>
									</View>
								</TouchableNativeFeedback>
							</View>}
					</View>
					<View style={{ width: '100%', paddingHorizontal: SafeArea, marginTop: 5 }}>
						<View style={{ width: '100%', height: 2, backgroundColor: LightGrayColor }} />
					</View>
					<View style={{ width: '100%', height: 100, justifyContent: 'center', alignItems: 'center' }}>
						<View style={styles.buttonBox}>
							<TouchableNativeFeedback onPress={this.confirmJanjiBayar} style={styles.buttonShadowStyle}>
								<View style={styles.buttonStyle}>
									<Text style={styles.buttonText}>Kirim Pengajuan Janji Bayar</Text>
								</View>
							</TouchableNativeFeedback>
						</View>
					</View>
					<Toast
						visible={this.state.visibleToast}
						position={50}
						children={<Text>{this.state.errorMessage}</Text>}
						animation
						onShown={() => setTimeout(() => this.setState({ visibleToast: false }), 2000)}
					/>
				</View>
			</ScrollView >
		);
	}
}

export default class RequestJBScreen extends Component {
	constructor(props) {
		super(props)
		this.state = {
			index: 0,
			routes: [
				{ key: 'dokumenJB', title: 'Dokumen Janji Bayar' },
				{ key: 'signatureJB', title: 'Tanda Tangan' }
			],
			isLoading: true,
			signatureCLO: null,
			signatureCustomer: null
		}
	}

	componentDidUpdate(prevProps) {
		if (prevProps.signatureCLO !== this.props.signatureCLO) {
			this.setState({ signatureCLO: this.props.signatureCLO })
		}
		if (prevProps.signatureCustomer !== this.props.signatureCustomer) {
			this.setState({ signatureCustomer: this.props.signatureCustomer })
		}
	}

	// static getDerivedStateFromProps(props, state) {
	// 	if (props.signatureCLO !== state.signatureCLO) {
	// 		return {
	// 			signatureCLO: props.signatureCLO,
	// 		};
	// 	}
	// 	if (props.signatureCustomer !== state.signatureCustomer) {
	// 		return {
	// 			signatureCustomer: props.signatureCustomer,
	// 		};
	// 	}
	// 	return null;
	// }

	componentDidMount() {
		setTimeout(() => {
			this.setState({ isLoading: false })
		}, 1000)
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
							case 'dokumenJB':
								return <DokumenJB isLoading={this.state.isLoading} />;
							case 'signatureJB':
								return <SignatureJB
									signatureCLO={this.state.signatureCLO}
									signatureCustomer={this.state.signatureCustomer}
								/>;
							default:
								return null;
						}
					}}
					onIndexChange={index => this.setState({ index })}
					initialLayout={{ width: width }}
				/>
			);
		}
	}
}

const styles = StyleSheet.create({
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
	formTitle: {
		fontSize: 12,
		fontFamily: NunitoBold,
		marginBottom: 5
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
});