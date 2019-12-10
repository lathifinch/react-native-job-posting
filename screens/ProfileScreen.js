import React from 'react'
import {
	Text,
	StyleSheet,
	View,
	TouchableOpacity,
	Dimensions,
	Alert,
} from 'react-native'

import AsyncStorage from '@react-native-community/async-storage'

const { width, height } = Dimensions.get('window')
export default class Profile extends React.Component {
	constructor() {
		super()
		this.state = {
			name: '',
		}
	}
	componentDidMount() {
		this.getData('user')
			.then(res => {
				this.setState({
					name: res,
				})
			})
			.catch(err => {
				console.log(err)
			})
	}
	getData = async key => {
		try {
			const value = await AsyncStorage.getItem(key)
			if (value !== null) {
				console.log(value)
				return value // value previously stored
			}
		} catch (e) {
			console.log('cannot get data') // error reading value
		}
	}
	removeStorage = async () => {
		await AsyncStorage.removeItem('token')
		await AsyncStorage.removeItem('user')
	}
	handleSubmit = () => {
		this.removeStorage()
			.then(() => {
				Alert.alert('Success Logout')
				this.props.navigation.navigate('LoginScreen')
			})
			.catch(err => {
				console.log(err)
				Alert.alert('Cannot Logout', err)
			})
	}
	render() {
		return (
			<View style={styles.container}>
				<Text style={{ fontSize: 16, fontWeight: 'bold' }}>
					{' '}
					{this.state.name}{' '}
				</Text>
				<TouchableOpacity
					style={styles.btnLogout}
					onPress={this.handleSubmit.bind(this)}>
					<Text style={styles.logoutText}>LOGOUT</Text>
				</TouchableOpacity>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// backgroundColor: '#097392',
		justifyContent: 'center',
		alignItems: 'center',
	},
	btnLogout: {
		width: width - 55,
		height: 45,
		borderRadius: 25,
		// paddingLeft:45,
		marginHorizontal: 25,
		backgroundColor: '#097392',
		opacity: 1,
		justifyContent: 'center',
		marginTop: 20,
	},
	logoutText: {
		textAlign: 'center',
		color: 'white',
		fontWeight: 'bold',
		fontSize: 16,
	},
})
