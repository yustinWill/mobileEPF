import React, { Component } from 'react';
import { View, Text, TouchableNativeFeedback, ViewPropTypes, ActivityIndicator } from 'react-native';

import { GrayColor, NunitoBold, PrimaryColor, WhiteColor } from '../GlobalConfig';
import PropTypes from 'prop-types';
import { delay } from '../GlobalFunction';

export default class CustomButton extends Component {
	static propTypes = {
		containerStyle: ViewPropTypes.style,
		style: ViewPropTypes.style,
		label: PropTypes.string,
		onPress: PropTypes.func,
	}

	constructor(props) {
		super(props)
		this.state = {
			focus: false,
			hideInput: props.isPassword ? true : false
		}
	}

	render() {
		const { label, onPress, ...props } = this.props;
		const buttonBox = {
			width: '100%',
			paddingHorizontal: 20,
			height: 70,
			justifyContent: 'center'
		}
		const buttonStyle = {
			alignItems: 'center',
			justifyContent: 'center',
			width: '100%',
			height: 40,
			borderRadius: 5,
		}
		const buttonShadowStyle = {
			backgroundColor: PrimaryColor,
			shadowColor: "#000",
			shadowOffset: {
				width: 0,
				height: 1,
			},
			shadowOpacity: 0.22,
			shadowRadius: 2.22,
			elevation: 3,
		}
		const buttonDisabledShadowStyle = {
			backgroundColor: GrayColor,
			shadowColor: "#000",
			shadowOffset: {
				width: 0,
				height: 1,
			},
			shadowOpacity: 0.20,
			shadowRadius: 1.41,

			elevation: 2,
		}
		const buttonText = {
			color: WhiteColor,
			fontFamily: NunitoBold,
			letterSpacing: 1
		}
		return (
			<View style={buttonBox}>
				<TouchableNativeFeedback disabled={props.isLoading} onPress={() => delay(100).then(onPress)} {...props}>
					<View style={[buttonStyle, props.disabled || props.isLoading ? buttonDisabledShadowStyle : buttonShadowStyle]}>
						{props.isLoading ?
							<ActivityIndicator color={WhiteColor} size='small' /> :
							<Text style={buttonText}>{String(label).toUpperCase()}</Text>}
					</View>
				</TouchableNativeFeedback>
			</View >
		)
	}
}