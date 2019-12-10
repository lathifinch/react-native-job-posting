import React from 'react'
import { Text, StyleSheet, View, Button, ScrollView, Alert } from 'react-native'

import axios from 'axios'
import qs from 'qs'

import AsyncStorage from '@react-native-community/async-storage'

import t from 'tcomb-form-native'

const Form = t.form.Form

// var Company = t.enums({
// M: 'Male',
// F: 'Female',
// })

// mtr = {}

// res.forEach(a=>{
//   mtr[a.id] = a.name
// })

const Job = t.struct({
	company_id: t.String,
	name: t.String,
	salary: t.Number,
	location: t.String,
	description: t.String,
	category: t.String,
})

const options = {
	fields: {
		company_id: {
			label: "Company's ID",
		},
		name: {
			label: "Job's Name",
			// error:'Required'
		},
		salary: {
			// error:'Required'
		},
		location: {
			// error:'Required'
		},
		category: {
			factory: t.form.Select,
			options: [
				{ value: 'Pendidikan', text: 'Pendidikan' },
				{ value: 'Kuliner', text: 'Kuliner' },
				{ value: 'IT', text: 'IT' },
				{ value: 'Desain', text: 'Desain' },
				{ value: 'Olah Raga', text: 'Olah Raga' },
				{ value: 'Kesenian', text: 'Kesenian' },
				{ value: 'Programmer', text: 'Programmer' },
				{ value: 'Hukum', text: 'Hukum' },
				{ value: 'Administrasi', text: 'Administrasi' },
				{ value: 'Manajemen', text: 'Manajemen' },
				{ value: 'Matematika', text: 'Matematika' },
				{ value: 'Data', text: 'Data' },
				{ value: 'Ekonomi', text: 'Ekonomi' },
				{ value: 'Psikologi', text: 'Psikologi' },
				{ value: 'Sosial', text: 'Sosial' },
				{ value: 'Otomotif', text: 'Otomotif' },
				{ value: 'Kesehatan', text: 'Kesehatan' },
				{ value: 'Kedokteran', text: 'Kedokteran' },
				{ value: 'Pertanian', text: 'Pertanian' },
				{ value: 'Peternakan', text: 'Peternakan' },
				{ value: 'Transportasi', text: 'Transportasi' },
				{ value: 'Lainnya', text: 'Lainnya' },
			],
			nullOption: { value: null, text: 'Choose' },
			// normal: {
			//    	marginBottom: 4,
			//    	borderRadius: 4,
			//    	borderColor: 'black',
			//    	borderWidth: 1
			//  	},
			// template: require('..path/select')
			// error:'Required'
		},
		description: {
			label: "Job's Description",
			// error:'Required'
		},
	},
}

// const formStyles = {
//   ...Form.stylesheet,
//   controlLabel: {
//     normal: {
//       color: '#097392',
//       fontSize: 18,
//       marginBottom: 7,
//       fontWeight: '600'
//     },
//     error: {
//       color: '#097392',
//       fontSize: 18,
//       marginBottom: 7,
//       fontWeight: '600'
//     }
//   }
// }

export default class AddJobTab extends React.Component {
	constructor() {
		super()
		this.state = {
			name: null,
			location: null,
			logo: null,
			description: null,
			// myJob: null,
		}
	}

	// componentDidMount() {
	// 	this.setState({
	// 		myJob: Job.extend({
	// 			lathif: t.String,
	// 		})
	// 	})
	// }

	handleSubmit() {
		const value = this._form.getValue() // use that ref to get the form value
		console.log('value: ', value)
		if (value !== null) {
			this.getToken()
				.then(token => {
					this.createData(value, token)
						.then(() => {
							Alert.alert('Success create company')
							this.setState(
								{
									name: null,
									location: null,
									logo: null,
									description: null,
								},
								console.log('reset value'),
							)
						})
						.catch(err => {
							console.log(err)
						})
				})
				.catch(err => {
					console.log(err)
				})
		}
	}

	createData = async (createData, resToken) => {
		const result = await axios({
			method: 'post',
			url: 'https://kerjarek.online/jobs',
			data: qs.stringify(createData),
			headers: {
				'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
				authorization: resToken,
				// 'Accept': 'application/json',
			},
		})
		return result.data
	}

	getToken = async () => {
		try {
			const value = await AsyncStorage.getItem('token')
			if (value !== null) {
				console.log(value)
				return value // value previously stored
			}
		} catch (e) {
			console.log('cannot get token from async-storage') // error reading value
		}
	}

	render() {
		return (
			<ScrollView contentContainerStyle={styles.container}>
				<Form
					ref={c => (this._form = c)} // assign a ref
					type={Job}
					options={options}
					value={this.state}
					// formStyles={formStyles}
				/>
				<Button
					color={'#097392'}
					title="Submit"
					onPress={this.handleSubmit.bind(this)}
				/>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		// justifyContent:'center',
		marginTop: 30,
		padding: 20,
		paddingBottom: 60,
		backgroundColor: 'white',
	},
})
