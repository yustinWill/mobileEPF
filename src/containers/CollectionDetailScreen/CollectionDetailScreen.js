import React, { Component } from 'react';
import { Platform, StyleSheet, Text, Image, View, StatusBar, PermissionsAndroid, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { PrimaryColorDark, PrimaryColorLight, WhiteColor, NunitoBold, Version } from '../../GlobalConfig';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import Shimmer from 'react-native-shimmer';

const logoPath = '../../images/logo.png'

const { width } = Dimensions.get('screen')

export default class CollectionDetailScreen extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isAnimating: true
		}
	}

	componentDidMount(){

	}

	render() {
		
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});
