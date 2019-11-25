import React from 'react'
import { Text, View, StyleSheet, ScrollView, Image } from 'react-native'
import { Card } from 'native-base'

import { Ionicons } from '@expo/vector-icons';

export default class MainScreen extends React.Component {
	constructor(){
		super()
		this.state = {
    "result": [
        {
            "id": "09c4cb81-963c-4851-bbe6-4cd2b6711825",
            "jobs": "AI Engineer",
            "description": "Minimal S2 di bidang matematika, menguasai bahasa pemrograman python.",
            "category": "Matematika",
            "salary": 15000000,
            "location": "Jakarta",
            "company": "Kata AI",
            "date_added": "2019-11-08T03:30:12.000Z",
            "date_updated": "2019-11-08T03:30:12.000Z"
        },
        {
            "id": "103d72c9-ecf0-4cc6-9c49-ee6e8715239e",
            "jobs": "Data Scientist",
            "description": "Mempunyai kemampuan matematika yang baik, mampu menangkap dan menyajikan informasi dari data yang tidak beraturan.",
            "category": "Matematika",
            "salary": 10000000,
            "location": "Jakarta",
            "company": "Bukalapak",
            "date_added": "2019-11-08T03:19:28.000Z",
            "date_updated": "2019-11-08T03:19:28.000Z"
        },
        {
            "id": "22d01f2c-282c-4779-9e8c-b4cba2d49ed0",
            "jobs": "HRD",
            "description": "Pendidikan minimal S2 di bidang psikologi.",
            "category": "Psikologi",
            "salary": 12000000,
            "location": "Jakarta",
            "company": "Gojek",
            "date_added": "2019-11-08T03:58:57.000Z",
            "date_updated": "2019-11-08T03:58:57.000Z"
        },
        {
            "id": "32430781-92bf-4c18-89bb-53b6fc2de1b3",
            "jobs": "Security",
            "description": "Mempunyai tinggi badan minimum 180 CM dan berat badan antara 70 - 90 KG.",
            "category": "Lainnya",
            "salary": 5000000,
            "location": "Surabaya",
            "company": "Gudang Garam",
            "date_added": "2019-11-08T03:28:46.000Z",
            "date_updated": "2019-11-08T03:28:46.000Z"
        },
        {
            "id": "3a6f69c6-9ccb-4ad4-8aeb-0e1a70e8dc63",
            "jobs": "Back End Programmer",
            "description": "Menguasai bahasa pemrograman python dan javascript.",
            "category": "Programmer",
            "salary": 5000000,
            "location": "Yogyakarta",
            "company": "Qiscus",
            "date_added": "2019-11-08T03:42:56.000Z",
            "date_updated": "2019-11-08T03:42:56.000Z"
        },
        {
            "id": "4c6f4891-406e-4737-bf4a-989e6e246306",
            "jobs": "Pramugari",
            "description": "Wanita dengan tinggi minimal 170 CM.",
            "category": "Transportasi",
            "salary": 7500000,
            "location": "Jakarta",
            "company": "Garuda Indonesia",
            "date_added": "2019-11-08T03:41:33.000Z",
            "date_updated": "2019-11-08T03:41:33.000Z"
        },
        {
            "id": "4cc511ec-ed06-4590-b336-f481dec90078",
            "jobs": "Data Engineer",
            "description": "Menguasai SQL, mampu menemukan fitur-fitur yang berharga dalam data.",
            "category": "Data",
            "salary": 8000000,
            "location": "Yogyakarta",
            "company": "Bukalapak",
            "date_added": "2019-11-08T03:23:56.000Z",
            "date_updated": "2019-11-08T03:23:56.000Z"
        },
        {
            "id": "6888d971-badd-496b-b1c1-67bec0b0bdfe",
            "jobs": "Manajer",
            "description": "Mampu melaksanakan tugas dan memimpin dengan baik.",
            "category": "Manajemen",
            "salary": 8000000,
            "location": "Yogyakarta",
            "company": "Bank Mandiri",
            "date_added": "2019-11-07T16:12:19.000Z",
            "date_updated": "2019-11-07T16:12:19.000Z"
        },
        {
            "id": "a184f1da-8fa7-4d7c-be2a-3b26b549bc18",
            "jobs": "Front End Programmer",
            "description": "Menguasai react-js dan react-native.",
            "category": "Programmer",
            "salary": 5000000,
            "location": "Yogyakarta",
            "company": "Qiscus",
            "date_added": "2019-11-08T03:44:29.000Z",
            "date_updated": "2019-11-08T03:44:29.000Z"
        },
        {
            "id": "ad016149-3885-4c39-ac49-c3f52e266227",
            "jobs": "Driver",
            "description": "Ahli mengendarai motor, mempunyai SIM C.",
            "category": "Transportasi",
            "salary": 5000000,
            "location": "Jakarta",
            "company": "Grab",
            "date_added": "2019-11-08T03:25:17.000Z",
            "date_updated": "2019-11-08T03:40:38.000Z"
        }
    	]
    }
	}

	static navigationOptions = {
		headerLeft: () => (
			<Ionicons name="md-menu" style={{paddingLeft:10}} size={28} color="#000" /> // "#F1ECE3"
		),
		headerRight: () => (
			<Ionicons name="md-search" style={{paddingRight:10}} size={28} color="#000" />
		),
    // title: 'Kerjarek',
    headerStyle: {
      backgroundColor: '#FFF', // '#362B32'
    },
    // headerTitleStyle: {
    //   color: '#F1ECE3',
    //   textAlign: 'left',
    //   flex:1,
    //   marginLeft:0,
    // },
  };

				// <View>
				// 	<Image
				// 		style={{width: 50, height: 50}}
				// 		source={{uri:'https://picsum.photos/200'}}
				// 	/>
				// </View>

	render() {
		// const a = this.data;
		return (
			<View style={styles.bgWrapper}>
 				<ScrollView>
 					{this.state.result.map((i)=>(
 						<View style={styles.cardWrapper} key={i.id.toString()}>
 							<Card style={styles.card}>
 								<View style={styles.cardContent}>
 									<Image
										style={{width: 50, height: 50}}
										source={{uri:'https://picsum.photos/200'}}
									/>
									<View style={styles.cardDesc}>
	 									<Text
 											style={styles.text}
 											onPress={()=>this.props.navigation.navigate('ListScreen2')}
 										> {i.jobs}
 										</Text>
	 									<Ionicons name="md-checkmark-circle" size={32} color="green" />
	 								</View>
 								</View>
 							</Card>
 						</View>
 					))}
 				</ScrollView>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	bgWrapper:{
		flex:1,
		backgroundColor:'#505050',//'#A2BACA',//'#362B32','#F1ECE3'
		// opacity:0.3,
	},
	// navbarHead:{
	// 	backgroundColor: 'red',
	// 	height:55,
	// 	elevation:3,
	// },
	// search_wrapper:{
	// 	flex:1,
	// 	justifyContent:'center',
	// 	backgroundColor:'#E6E2DE',
	// 	// alignItems: 'center',
	// 	// padding: 15,
	// },
	// wrapper:{
	// 	flex:1,
	// 	justifyContent:'center',
	// 	backgroundColor:'#E6E2DE',
	// 	// alignItems: 'center',
	// 	padding: 15,
	// },
	text:{
		fontSize:20,
		fontWeight: 'bold',
		color: '#00f',
	},
	cardWrapper:{
		paddingHorizontal:10,
	},
	cardContent:{
		flexDirection:'row',
	},
	cardDesc:{

	},
	card:{
		borderWidth:0,
		padding:7,
		// marginHorizontal:50,
		height:150,
		borderRadius:15,
    backgroundColor:'#FFF',//'#362B32',//'#F3906E',
    // opacity: 0.3,

		// width:50,
	}
})