import React from 'react'
import { Text, StyleSheet, View, Button, ScrollView } from 'react-native'

import t from 'tcomb-form-native'

const Form = t.form.Form

const Job = t.struct({
	name: t.String,
	salary: t.Number,
	location: t.String,
	description: t.String,
	category: t.String,
})

const options = {
	fields:{
		name:{
			label:"Job's Name",
			// error:'Required'
		},
		salary:{
			// error:'Required'
		},
		location:{
			// error:'Required'
		},
		category:{
			factory: t.form.Select,
			options: [
				{value:'Pendidikan',text:'Pendidikan'},
				{value:'Kuliner',text:'Kuliner'},
				{value:'IT',text:'IT'},
				{value:'Desain',text:'Desain'},
				{value:'Olah Raga',text:'Olah Raga'},
				{value:'Kesenian',text:'Kesenian'},
				{value:'Programmer',text:'Programmer'},
				{value:'Hukum',text:'Hukum'},
				{value:'Administrasi',text:'Administrasi'},
				{value:'Manajemen',text:'Manajemen'},
				{value:'Matematika',text:'Matematika'},
				{value:'Data',text:'Data'},
				{value:'Ekonomi',text:'Ekonomi'},
				{value:'Psikologi',text:'Psikologi'},
				{value:'Sosial',text:'Sosial'},
				{value:'Otomotif',text:'Otomotif'},
				{value:'Kesehatan',text:'Kesehatan'},
				{value:'Kedokteran',text:'Kedokteran'},
				{value:'Pertanian',text:'Pertanian'},
				{value:'Peternakan',text:'Peternakan'},
				{value:'Transportasi',text:'Transportasi'},
				{value:'Lainnya',text:'Lainnya'}
			],
			nullOption: {value: null, text: 'Choose'},
			// normal: {
   //    	marginBottom: 4,
   //    	borderRadius: 4,
   //    	borderColor: 'black',
   //    	borderWidth: 1
   //  	},
			// template: require('..path/select')
			// error:'Required'
		},
		description:{
			label:"Job's Description",
			// error:'Required'
		}
	}
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
	constructor(){
		super()
		this.state = {
			name: null,
			location: null,
			logo: null,
			description: null,
		}
	}
	handleSubmit(){
		const value = this._form.getValue() // use that ref to get the form value
		console.log('value: ', value)
		if (value!==null){
			this.setState({
				name: null,
				location: null,
				logo: null,
				description: null,
			},
				console.log('reset value')
			)
		}
	}

	// getData = async (createData, resToken) => {
 //    const result = await axios({
 //  		method: 'post',
 //  		url: 'http://localhost:8080/jobs',
 //  		data: qs.stringify(createData),
 //  		headers: {
 //    		'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
 //    		'authorization': resToken,
 //        // 'Accept': 'application/json',
 //  		}
	// 	})
 //    return result.data
 //  }

	render() {
		return (
			<ScrollView style={styles.container}>
				<Form
					ref={c => this._form = c} // assign a ref
					type={Job}
					options={options}
					value={this.state}
					// formStyles={formStyles}
				/>
				<Button
					color={'#097392'}
					title='Submit'
					onPress={this.handleSubmit.bind(this)}
				/>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	container:{
		// justifyContent:'center',
		marginTop:30,
		padding:20,
		backgroundColor:'white',
	}
})