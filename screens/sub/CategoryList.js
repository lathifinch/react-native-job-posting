import React from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'

import Category from './Category'

class CategoryList extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			cate: '',
			isSend: false,
		}
	}

	sendCallback() {
		this.setState(
			{
				isSend: false,
			},
			// const cate =
			this.props.parentCallback(this.state.cate),
			// console.log('send callback')
		)
	}

	render() {
		console.log(this.state.cate)
		if (this.state.isSend) {
			this.sendCallback()
		}
		// this.props.parentCallback(this.state.cate)
		return (
			<ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
				<TouchableOpacity
					onPress={event => {
						this.setState({ cate: '', isSend: true })
					}}>
					<Category
						imageUri={require('../../images/Get-All.jpg')}
						name="Get All"
					/>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={event => {
						this.setState({ cate: 'Pendidikan', isSend: true })
					}}>
					<Category
						imageUri={require('../../images/Pendidikan.jpg')}
						name="Pendidikan"
					/>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={event => {
						this.setState({ cate: 'Kuliner', isSend: true })
					}}>
					<Category
						imageUri={require('../../images/Kuliner.jpg')}
						name="Kuliner"
					/>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={event => {
						this.setState({ cate: 'IT', isSend: true })
					}}>
					<Category imageUri={require('../../images/IT.jpg')} name="IT" />
				</TouchableOpacity>
				<TouchableOpacity
					onPress={event => {
						this.setState({ cate: 'Desain', isSend: true })
					}}>
					<Category
						imageUri={require('../../images/Desain.jpg')}
						name="Desain"
					/>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={event => {
						this.setState({ cate: 'Olah Raga', isSend: true })
					}}>
					<Category
						imageUri={require('../../images/Olah-Raga.jpg')}
						name="Olah Raga"
					/>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={event => {
						this.setState({ cate: 'Kesenian', isSend: true })
					}}>
					<Category
						imageUri={require('../../images/Kesenian.jpg')}
						name="Kesenian"
					/>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={event => {
						this.setState({ cate: 'Programmer', isSend: true })
					}}>
					<Category
						imageUri={require('../../images/Programmer.jpg')}
						name="Programmer"
					/>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={event => {
						this.setState({ cate: 'Hukum', isSend: true })
					}}>
					<Category imageUri={require('../../images/Hukum.jpg')} name="Hukum" />
				</TouchableOpacity>
				<TouchableOpacity
					onPress={event => {
						this.setState({ cate: 'Administrasi', isSend: true })
					}}>
					<Category
						imageUri={require('../../images/Administrasi.jpg')}
						name="Administrasi"
					/>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={event => {
						this.setState({ cate: 'Manajemen', isSend: true })
					}}>
					<Category
						imageUri={require('../../images/Manajemen.jpg')}
						name="Manajemen"
					/>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={event => {
						this.setState({ cate: 'Matematika', isSend: true })
					}}>
					<Category
						imageUri={require('../../images/Matematika.jpg')}
						name="Matematika"
					/>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={event => {
						this.setState({ cate: 'Data', isSend: true })
					}}>
					<Category imageUri={require('../../images/Data.jpg')} name="Data" />
				</TouchableOpacity>
				<TouchableOpacity
					onPress={event => {
						this.setState({ cate: 'Ekonomi', isSend: true })
					}}>
					<Category
						imageUri={require('../../images/Ekonomi.jpg')}
						name="Ekonomi"
					/>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={event => {
						this.setState({ cate: 'Psikologi', isSend: true })
					}}>
					<Category
						imageUri={require('../../images/Psikologi.jpg')}
						name="Psikologi"
					/>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={event => {
						this.setState({ cate: 'Sosial', isSend: true })
					}}>
					<Category
						imageUri={require('../../images/Sosial.jpg')}
						name="Sosial"
					/>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={event => {
						this.setState({ cate: 'Otomotif', isSend: true })
					}}>
					<Category
						imageUri={require('../../images/Otomotif.jpg')}
						name="Otomotif"
					/>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={event => {
						this.setState({ cate: 'Kesehatan', isSend: true })
					}}>
					<Category
						imageUri={require('../../images/Kesehatan.jpg')}
						name="Kesehatan"
					/>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={event => {
						this.setState({ cate: 'Kedokteran', isSend: true })
					}}>
					<Category
						imageUri={require('../../images/Kedokteran.jpg')}
						name="Kedokteran"
					/>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={event => {
						this.setState({ cate: 'Peternakan', isSend: true })
					}}>
					<Category
						imageUri={require('../../images/Peternakan.jpg')}
						name="Peternakan"
					/>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={event => {
						this.setState({ cate: 'Pertanian', isSend: true })
					}}>
					<Category
						imageUri={require('../../images/Pertanian.jpg')}
						name="Pertanian"
					/>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={event => {
						this.setState({ cate: 'Transportasi', isSend: true })
					}}>
					<Category
						imageUri={require('../../images/Transportasi.jpg')}
						name="Transportasi"
					/>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={event => {
						this.setState({ cate: 'Lainnya', isSend: true })
					}}>
					<Category
						imageUri={require('../../images/Lainnya.jpg')}
						name="Lainnya"
					/>
				</TouchableOpacity>
			</ScrollView>
		)
	}
}

export default CategoryList
