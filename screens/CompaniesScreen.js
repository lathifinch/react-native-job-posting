import React from 'react'
import { Text, StyleSheet, View, ScrollView, Dimensions } from 'react-native'

import { connect } from 'react-redux';
import {getCompany} from '../redux/actions/company'

import Company from './sub/Company'

const mapStatetoProps = state => {
  return {
    company: state.company,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCompany: () => dispatch(getCompany())
  }
}

class CompaniesScreen extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			companyList:[],
			isLoading:true,
		}
	}
	componentDidMount(){
		console.log('com did mount')
		if (this.props.company.data.length === 0){
			this.props.getCompany()
			console.log('get data from api')
		}
		this.setState({
			isLoading:false,
		})
	}
	render() {
		const companyList = this.props.company.data
		return (
			<View style={styles.container}>
			<ScrollView>
			<View style={{ paddingHorizontal: 20, marginTop: 20, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
       	{companyList.map((i)=>(
          <View key={i.id}>
          <ScrollView
          	// horizontal={true}
            // showsHorizontalScrollIndicator={false}
          >
         		<Company width={width}
              fullData={i}
              name={i.name}
              location={i.location}
              description={i.description}
              njob={i.njob}
            />
          </ScrollView>
          </View>	
       	))}
      </View>
      </ScrollView>
      </View>
		)
	}
}

export default connect(mapStatetoProps, mapDispatchToProps)(CompaniesScreen);

const { height, width } = Dimensions.get('window')

const styles = StyleSheet.create({
	container:{
		flex:1,
		backgroundColor:'white', //#FFF0CE',
		// paddingTop:StatusBar.currentHeight,
		// paddingTop:25,
	},
})
