import React, { Component } from 'react';
import { View, TextInput, Text, TouchableOpacity, Image, ViewPropTypes } from 'react-native';

import { PrimaryColorDark, GrayColor, SafeArea, BlackColor, NunitoBold, NunitoRegular } from '../GlobalConfig';
import PropTypes from 'prop-types';

const eyeClose = '../images/eye-close.png'
const eyeOpen = '../images/eye-open.png'

export default class CustomTextInput extends Component {
	static propTypes = {
		containerStyle: ViewPropTypes.style,
		style: ViewPropTypes.style,
		autoFocus: PropTypes.bool,
		editbale: PropTypes.bool,
		textColor: PropTypes.string,
		onChangeText: PropTypes.func,
		value: PropTypes.string,
		placeholder: PropTypes.string,
		label: PropTypes.string,
		isPassword: PropTypes.bool,
		maxLength: PropTypes.number
	}

	constructor(props) {
		super(props)
		this.state = {
			focus: false,
			hideInput: props.isPassword ? true : false
		}
	}

	/**
	 * Function called when Input box are focused
	 */
	onFocusInput = () => this.setState({ focus: true })

	/**
	 * Function called when Input box are not focused
	 */
	onEndFocusInput = () => this.setState({ focus: false })

	render() {
		const { label, ...props } = this.props;
		const labelStyle = {
			fontSize: 12,
			color: BlackColor,
			fontFamily: NunitoBold,
			marginLeft: 20
		};
		const inputBoxStyle = {
			width: '100%',
			height: 50,
			borderBottomWidth: 2,
			borderBottomColor: this.state.focus ? PrimaryColorDark : GrayColor,
			alignItems: 'center',
			flexDirection: 'row'
		};
		const textInputStyle = {
			flex: 1,
			paddingLeft: 0,
			color: BlackColor,
			fontFamily: NunitoRegular
		};
		const helperStyle = {
			fontSize: 10,
			fontFamily: NunitoRegular
		};
		const maxLengthStyle = {
			fontSize: 10,
			fontFamily: NunitoRegular,
			textAlign: 'right',
			width: 70
		};
		return (
			<View style={{ width: '100%', paddingRight: 20, marginBottom: SafeArea }}>
				<Text style={labelStyle}>{label}</Text>
				<View style={{ marginLeft: 20 }}>
					<View style={inputBoxStyle}>
						<TextInput
							{...props}
							secureTextEntry={this.state.hideInput}
							style={textInputStyle}
							placeholder={!this.state.focus ? props.placeholder : ''}
							placeholderTextColor={GrayColor}
							selectionColor={PrimaryColorDark}
							onFocus={this.onFocusInput}
							onEndEditing={this.onEndFocusInput}
						/>
						{props.isPassword ?
							<TouchableOpacity style={{ paddingHorizontal: SafeArea }} onPress={() => this.setState({ hideInput: !this.state.hideInput })}>
								<Image
									style={{ width: 25, height: 25, tintColor: BlackColor }}
									source={this.state.hideInput ? require(eyeClose) : require(eyeOpen)} />
							</TouchableOpacity> : null}
					</View>
					<View style={{ width: '100%', justifyContent: 'space-between', flexDirection:'row' }}>
						{props.helperText ? <Text style={helperStyle} numberOfLines={1}>{props.helperText}</Text> : <View />}
						{props.maxLength ? <Text style={maxLengthStyle}>{props.value.length} / {props.maxLength}</Text> : <View />}
					</View>
				</View>
			</View>
		)
	}
}