import React, { Component } from 'react';
import { View, TextInput, Animated } from 'react-native';

import { PrimaryColorDark, PrimaryColorLight, WhiteColor, NunitoBold, GrayColor, SafeArea, BlackColor, NunitoRegular, PrimaryColor, NunitoSemiBold, LightGrayColor } from '../GlobalConfig';

class FloatingLabelInput extends Component {
	state = {
		isFocused: false,
	};

	componentWillMount() {
		this._animatedIsFocused = new Animated.Value(0);
	}

	componentDidUpdate() {
		Animated.timing(this._animatedIsFocused, {
			toValue: this.state.isFocused ? 1 : 0,
			duration: 200
		}).start();
	}

	handleFocus = () => this.setState({ isFocused: true });
	handleBlur = () => this.setState({ isFocused: false });

	render() {
		const { label, ...props } = this.props;
		const labelStyle = {
			position: 'absolute',
			zIndex: 1,
			backgroundColor: WhiteColor,
			fontFamily: NunitoBold,
			paddingHorizontal: 3,
			left: this._animatedIsFocused.interpolate({
				inputRange: [0, 1],
				outputRange: [15, 5],
			}),
			top: this._animatedIsFocused.interpolate({
				inputRange: [0, 1],
				outputRange: [28, 10],
			}),
			fontSize: this._animatedIsFocused.interpolate({
				inputRange: [0, 1],
				outputRange: [20, 12],
			}),
			color: this._animatedIsFocused.interpolate({
				inputRange: [0, 1],
				outputRange: [GrayColor, PrimaryColor],
			}),
		};
		return (
			<View style={{ paddingTop: 18 }}>
				<Animated.Text style={labelStyle}>
					{label}
				</Animated.Text>
				<TextInput
					{...props}
					style={[{ height: 50, width: '100%', fontSize: 20, color: '#000', borderWidth: 1, borderRadius: 10 }, this.state.isFocused ? { borderColor: PrimaryColor } : { borderColor: GrayColor }]}
					onFocus={this.handleFocus}
					onBlur={this.handleBlur}
					blurOnSubmit
				/>
			</View>
		);
	}
}