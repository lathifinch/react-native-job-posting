import React from 'react'
import { Text, StyleSheet, View, Button, ScrollView, Alert } from 'react-native'

import t from 'tcomb-form-native'

import AsyncStorage from '@react-native-community/async-storage';

import { connect } from 'react-redux';
import { addCompany, editCompany } from '../../redux/actions/company'

const mapStatetoProps = state => {
  return {
    user: state.user,
    company: state.company,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addCompany: (createData, resToken) => dispatch(addCompany(createData, resToken))//,
//    editCompany: (updateData, comId, resToken) => dispatch(editCompany(updateData, comId, resToken))
  }
}

const Form = t.form.Form

const Company = t.struct({
	name: t.String,
	location: t.String,
	logo: t.String,
	description: t.String,
})

const options = {
	fields:{
		name:{
			label:"Company's Name",
			// error:'Required'
		},
		location:{
			// error:'Required'
		},
		logo:{
			// error:'Required'
		},
		description:{
			label:"Company's Description",
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

class AddCompanyTab extends React.Component {
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
		const createData = {}
		if (value!==null){
			createData['name'] = value.name
      createData['description'] = value.description
      createData['logo'] = value.logo
      createData['location'] = value.location
      console.log(createData)
      this.getData('token')
			.then(res=>{
				this.props.addCompany(createData, res)
				Alert.alert('Success create company')
				this.setState({
					name: null,
					location: null,
					logo: null,
					description: null,
				},
					console.log('reset value')
				)
			})
			.catch(err=>{
				console.log(err)
			})
		}
	}
	getData = async (key) => {
  	try {
    	const value = await AsyncStorage.getItem(key)
    	if(value !== null) {
    		console.log(value)
      	return value // value previously stored
    	}
  	} catch(e) {
    	console.log('cannot get data from async-storage') // error reading value
  	}
	}
	render() {
		return (
			<ScrollView style={styles.container}>
				<Form
					ref={c => this._form = c} // assign a ref
					type={Company}
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

export default connect(mapStatetoProps, mapDispatchToProps)(AddCompanyTab);

const styles = StyleSheet.create({
	container:{
		// justifyContent:'center',
		marginTop:30,
		padding:20,
		backgroundColor:'white',
	}
})