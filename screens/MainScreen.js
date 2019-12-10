import React from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { createBottomTabNavigator } from 'react-navigation-tabs'

import JobsScreen from './JobsScreen'
import CompaniesScreen from './CompaniesScreen'
import ProfileScreen from './ProfileScreen'
import AddScreen from './AddScreen'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
// import AntDesign from 'react-native-vector-icons/AntDesign'
// import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'

class MainScreen extends React.Component {
	render() {
		return <View />
	}
}

export default createBottomTabNavigator(
	{
		Jobs: {
			screen: JobsScreen,
			navigationOptions: {
				tabBarLabel: 'JOBS',
				tabBarIcon: ({ tintColor }) => (
					<MaterialIcons name="work" size={24} color={tintColor} />
				),
			},
		},
		Companies: {
			screen: CompaniesScreen,
			navigationOptions: {
				tabBarLabel: 'COMPANIES',
				tabBarIcon: ({ tintColor }) => (
					<MaterialCommunityIcons
						name="office-building"
						size={24}
						color={tintColor}
					/>
				),
			},
		},
		Add: {
			screen: AddScreen,
			navigationOptions: {
				tabBarLabel: 'ADD',
				tabBarIcon: ({ tintColor }) => (
					<MaterialIcons name="add-circle" size={24} color={tintColor} />
				),
			},
		},
		Profile: {
			screen: ProfileScreen,
			navigationOptions: {
				tabBarLabel: 'PROFILE',
				tabBarIcon: ({ tintColor }) => (
					<MaterialIcons name="person" size={24} color={tintColor} />
				),
			},
		},
	},
	{
		tabBarOptions: {
			activeTintColor: '#097392',
			inactiveTintColor: 'grey',
			style: {
				backgroundColor: 'white',
				borderTopWidth: 0,
				// shadowColor: 'black',
				// shadowOpacity: 0.5,
				elevation: 5,
			},
		},
	},
)

const styles = StyleSheet.create({})
