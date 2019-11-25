import React from 'react'
import { Text, StyleSheet, View } from 'react-native'

import AsyncStorage from '@react-native-community/async-storage';

export default class Profile extends React.Component {
	constructor(){
		super()
		this.state = {
			name:''
		}
	}
	componentDidMount(){
		this.getData('user')
		.then(res=>{
			this.setState({
				name:res
			})
		})
		.catch(err=>{
			console.log(err)
		})
	}
	getData = async (key) => {
  	try {
    	const value = await AsyncStorage.getItem(key)
    	if(value !== null) {
    		console.log(value)
      	return value // value previously stored
    	}
  	} catch(e) {
    	console.log('cannot get data') // error reading value
  	}
	}
	render() {
		return (
			<View>
				<Text> {this.state.name} </Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({})
