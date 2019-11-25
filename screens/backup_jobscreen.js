import React from 'react'
import { Text, StyleSheet, View, TextInput, FlatList,
  StatusBar, ScrollView, Image, Dimensions, Animated
} from 'react-native'

import { Content, Form, Item, Picker } from 'native-base';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
// import { MaterialIcons } from '@expo/vector-icons'

import CategoryList from './sub/CategoryList'
import Job from './sub/Job'

import axios from 'axios'
// import { connect } from 'react-redux'

export default class JobsScreen extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      kategori: '',
      name: '',
      order: '',
      data:[],
      isLoading: false,
    };
  }

	componentDidMount() {

    this.scrollY = new Animated.Value(0)

    this.startHeaderHeight = 100 // + StatusBar.currentHeight
    this.endHeaderHeight = 0 // StatusBar.currentHeight

    this.animatedHeaderHeight = this.scrollY.interpolate({
        inputRange: [0, 120],
        outputRange: [this.startHeaderHeight, this.endHeaderHeight],
        extrapolate: 'clamp'
    })

    this.animatedSearch = this.scrollY.interpolate({
        inputRange: [0, 120],
        outputRange: [15, -65],
        extrapolate: 'clamp'
    })

    this.animatedPicker = this.scrollY.interpolate({
        inputRange: [0, 120],
        outputRange: [5, -75],
        extrapolate: 'clamp'
    })

    console.log('com did mount')

    this.getData('http://localhost:8080/jobs')
    .then(res=>{
    	console.log(res)
    	this.setState({
    		data:res.result
    	},
        console.log('sukses')
      )
    })
    .catch(err=>{
    	console.log(err)
    })
  }

  handleSubmit () {
    const name = this.state.name 
    let order = this.state.order
    if (order === "") {
      order = 'date_updated DESC'
    }
    let link = 'http://localhost:8080/jobs/' // 192.168.1.6 // 192.168.1.30
    link = link.concat('?order=')
    link = link.concat(order)
    if (name !== ''){
    	link = link.concat('&name=')
    	link = link.concat(name)
    }

    console.log('submit')
    this.getData(link)
    .then(res=>{
      console.log(res)
    	this.setState({
    		data:res.result
    	},
        console.log('sukses')
      )
    })
    .catch(err=>{
    	console.log(err)
    })
  }

  getData = async(page) => {
    const listJobs = await axios.get(page!==undefined?page:'http://10.0.2.2:8080/jobs') //10.0.2.2
    return listJobs.data
  }

  onOrderChange (value: string) {
    this.setState({
      order: value
    },
      this.handleSubmit
    );

  }

  renderJobs = ({item}) => {
    return (
      <View style={{ paddingHorizontal: 20, marginTop: 20, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
      <Job width={width}
      name={item.jobs}
      type="PRIVATE ROOM - 2 BEDS"
      price={82}
      />
      </View>
      
    )
  }

	render() {
		console.log('render')
		// let searchRes = []
		// if (this.state.data!==''){
		// 	searchRes = this.state.data.result
		// }

		return (
			<View style={styles.container}>
			
				<Animated.View style={{...styles.header, height:this.animatedHeaderHeight}}>
					<Animated.View style={{...styles.searchWrapper, top:this.animatedSearch}}>
						<MaterialIcons name="search" size={20} style={{marginRight:10}} />
						<TextInput
							underlineColorAndroid="transparent"
							placeholder="Search Job"
							placeholderTextColor="grey"
							style={styles.search}
							onChangeText={(name)=>this.setState({name})}
							value={this.state.name}
							onSubmitEditing={()=>this.handleSubmit()}
						/>
					</Animated.View>
          <Animated.View style={{...styles.picker, top:this.animatedPicker}}>
            <Form>
              <Item style={styles.item} picker>
                <Picker
                  mode="dropdown"
                  selectedValue={this.state.order}
                  onValueChange={this.onOrderChange.bind(this)}
                >
                  <Picker.Item label="Urutkan" value="" />
                  <Picker.Item label="A-Z" value="name ASC" />
                  <Picker.Item label="Gaji" value="salary DESC" />
                  <Picker.Item label="Terbaru" value="date_updated DESC" />
                </Picker>
              </Item>
            </Form>
          </Animated.View>
				</Animated.View>

				<ScrollView
          scrollEventThrottle={10}
          onScroll={Animated.event(
          	[
          		{nativeEvent:{
          			contentOffset:{
          				y:this.scrollY		
          		}}}
          	]
          )}
        >
				<View style={{ flex: 1, backgroundColor: 'white', paddingTop: 20 }}>
          <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20 }}>
            Categories:
          </Text>
          <View style={{ height: 130, marginTop: 20 }}>
            <CategoryList />
          </View>
        </View>
        </ScrollView>

        <View style={{ marginTop: 40 }}>
          <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20 }}>
            Jobs
          </Text>

          
          <FlatList
            style={{}}
          	data={this.state.data}
            renderItem={this.renderJobs}
            keyExtractor={(item)=>item.id}
          />
          

        </View>

			</View>
		)
	}
}

const categoryArray = [
	'Pendidikan', 'Kuliner', 'IT', 'Desain', 'Olah Raga', 'Kesenian',
	'Hukum', 'Administrasi', 'Lainnya', 'Manajemen', 'Matematika', 'Data', 'Ekonomi',
	'Psikologi', 'Sosial', 'Otomotif', 'Kesehatan', 'Kedokteran', 'Pertanian', 'Peternakan',
	'Transportasi'
];

// const startHeaderHeight = 100 + StatusBar.currentHeight
const { height, width } = Dimensions.get('window')

const styles = StyleSheet.create({
	container:{
		flex:1,
		backgroundColor:'white', //#FFF0CE',
		// paddingTop:StatusBar.currentHeight,
		// paddingTop:25,
	},
	header:{
		// height:startHeaderHeight,
		backgroundColor:'white',
		borderBottomWidth:0,
		// borderBottomColor:'grey',
		elevation:5,
		// paddingTop:StatusBar.currentHeight,
	},
  picker:{
    position:'relative',
    top:5,
    marginHorizontal:20,
  },
  item:{
    borderColor: "transparent",
    // fontWeight:'700',
  },
	searchWrapper:{
		position:'relative',
		top:15,
		flexDirection:'row',
    alignItems:'center',
		paddingLeft:10,
		borderRadius:10,
		backgroundColor:'white',
		marginHorizontal:20,
		// shadowColor:'black',
		// shadowOpacity:1,
		elevation:1,
		// marginTop:10,
	},
	search:{
		flex:1,
		fontWeight:'700',
		// backgroundColor:'white',
	}
})

