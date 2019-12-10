import React from 'react'
import {
	Text,
	StyleSheet,
	View,
	TextInput,
	Dimensions,
	TouchableOpacity,
	Alert,
	ToastAndroid,
} from 'react-native'

import axios from 'axios'
import qs from 'qs'
import AsyncStorage from '@react-native-community/async-storage'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'

const { width, height } = Dimensions.get('window')
export default class LoginScreen extends React.Component {
	constructor() {
		super()
		this.state = {
			username: '',
			password: '',
			hidePass: true,
			press: false,
		}
	}
	hidePass = () => {
		if (this.state.press === false) {
			this.setState({
				hidePass: false,
				press: true,
			})
		} else {
			this.setState({
				hidePass: true,
				press: false,
			})
		}
	}
	handleSubmit = () => {
		const username = this.state.username
		const password = this.state.password
		const loginData = {
			username: username,
			password: password,
		}

		console.log(loginData)
		this.setState(
			{
				username: '',
				password: '',
			},
			console.log('reset data'),
		)
		this.getData(loginData)
			.then(res => {
				const token = res.result.authorization
				const user = res.message.substring(9, res.message.length)
				this.storeData(token, user)
					.then(resStore => {
						Alert.alert('Success Login', res.message)
						this.props.navigation.navigate('MainScreen')
					})
					.catch(errStore => {
						Alert.alert('error storing data')
					})
			})
			.catch(err => {
				console.log(err)
				const loginMessage =
					err.response.data.status + ', ' + err.response.data.message
				Alert.alert('Cannot Login', loginMessage)
			})
	}
	getData = async loginData => {
		const result = await axios({
			method: 'post',
			url: 'https://kerjarek.online/login',
			data: qs.stringify(loginData),
			headers: {
				'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
			},
		})
		return result.data
	}
	storeData = async (token, user) => {
		try {
			await AsyncStorage.setItem('token', token)
			await AsyncStorage.setItem('user', user)
		} catch (e) {
			// saving error
			console.log(e)
		}
	}
	cekToken = async () => {
		try {
			const token = await AsyncStorage.getItem('token')
			const user = await AsyncStorage.getItem('user')
			return { token, user }
		} catch (e) {
			console.log(e)
		}
	}
	componentDidMount() {
		this.cekToken()
			.then(tok => {
				if (tok.token !== null) {
					const msg = 'Login as ' + tok.user
					ToastAndroid.showWithGravityAndOffset(
						msg,
						ToastAndroid.LONG,
						ToastAndroid.BOTTOM,
						25,
						50,
					)
					// ToastAndroid.show(msg)
					this.props.navigation.navigate('MainScreen')
				}
			})
			.catch(err => {
				console.log(err)
			})
	}
	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.kerjarek}> KERJAREK! </Text>

				<View style={{ marginTop: 10 }}>
					<MaterialIcons
						name="person-outline"
						size={28}
						color={'rgba(255,255,255,0.7)'}
						style={styles.inputIcon}
					/>
					<TextInput
						style={styles.input}
						placeholder={'Username'}
						placeholderTextColor={'rgba(255,255,255,0.7)'}
						underlineColorAndroid="transparent"
						onChangeText={username => this.setState({ username })}
						value={this.state.username}
					/>
				</View>

				<View style={{ marginTop: 10 }}>
					<MaterialIcons
						name="lock-outline"
						size={28}
						color={'rgba(255,255,255,0.7)'}
						style={styles.inputIcon}
					/>
					<TextInput
						style={styles.input}
						placeholder={'Password'}
						secureTextEntry={this.state.hidePass}
						placeholderTextColor={'rgba(255,255,255,0.7)'}
						underlineColorAndroid="transparent"
						onChangeText={password => this.setState({ password })}
						value={this.state.password}
					/>

					<TouchableOpacity
						style={styles.btnEye}
						onPress={this.hidePass.bind(this)}>
						<Ionicons
							name={this.state.press === false ? 'md-eye' : 'md-eye-off'}
							size={26}
							color={'rgba(255,255,255,0.7)'}
						/>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.btnLogin}
						onPress={this.handleSubmit.bind(this)}>
						<Text style={styles.loginText}>Login</Text>
					</TouchableOpacity>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#097392',
		justifyContent: 'center',
		alignItems: 'center',
	},
	kerjarek: {
		color: 'white',
		fontSize: 20,
		fontWeight: '500',
		opacity: 0.5,
		marginBottom: 50,
	},
	input: {
		width: width - 55,
		height: 45,
		borderRadius: 25,
		fontSize: 16,
		paddingLeft: 45,
		backgroundColor: 'rgba(0,0,0,0.35)',
		color: 'rgba(255,255,255,0.7)',
		marginHorizontal: 25,
	},
	inputIcon: {
		position: 'absolute',
		top: 7,
		left: 37,
	},
	btnEye: {
		position: 'absolute',
		top: 8,
		right: 37,
	},
	btnLogin: {
		width: width - 55,
		height: 45,
		borderRadius: 25,
		// paddingLeft:45,
		marginHorizontal: 25,
		backgroundColor: 'white',
		opacity: 0.7,
		justifyContent: 'center',
		marginTop: 20,
	},
	loginText: {
		textAlign: 'center',
		fontSize: 16,
	},
})
