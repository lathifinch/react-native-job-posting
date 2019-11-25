import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

export default class ListScreen1 extends React.Component {
	render() {
		return (
			<View style={style.wraper}>
				<Text
				style={style.text}
				onPress={()=>this.props.navigation.navigate('MainScreen')}> List Screen 1 </Text>
			</View>
		)
	}
}

const style = StyleSheet.create({
	wraper:{
		flex:1,
		justifyContent:'center',
		alignItems: 'center',
	},
	text:{
		fontSize:20,
		fontWeight: 'bold',
		color: '#00f',
	}
})