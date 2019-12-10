import React from 'react'
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Alert,
  StatusBar,
  ScrollView,
  Image,
  Dimensions,
  Animated,
} from 'react-native'

import { Content, Form, Item, Picker, Button } from 'native-base'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
// import { MaterialIcons } from '@expo/vector-icons'

import CategoryList from './sub/CategoryList'
import Job from './sub/Job'

import axios from 'axios'
// import { connect } from 'react-redux'

export default class JobsScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      kategori: '',
      name: '',
      order: '',
      data: [],
      isLoading: true,
      jobsFound: 0,
      nextAble: false,
      nextPage: '',
      reload: false,
      jobChange: false,
    }
  }

  componentDidMount() {
    this.scrollY = new Animated.Value(0)

    this.startHeaderHeight = 100 // + StatusBar.currentHeight
    this.endHeaderHeight = 0 // StatusBar.currentHeight

    this.animatedHeaderHeight = this.scrollY.interpolate({
      inputRange: [0, 120],
      outputRange: [this.startHeaderHeight, this.endHeaderHeight],
      extrapolate: 'clamp',
    })

    this.animatedSearch = this.scrollY.interpolate({
      inputRange: [0, 120],
      outputRange: [15, -65],
      extrapolate: 'clamp',
    })

    this.animatedPicker = this.scrollY.interpolate({
      inputRange: [0, 120],
      outputRange: [5, -75],
      extrapolate: 'clamp',
    })

    console.log('com did mount')

    this.getData('https://kerjarek.online/jobs')
      .then(res => {
        console.log(res)
        this.setState(
          {
            data: res.result,
            nextAble: res.pageLink.nextAble,
            nextPage: res.pageLink.baseLink + res.pageLink.nextPage,
            jobsFound: res.pagination.dataShow,
            isLoading: false,
          },
          console.log('sukses'),
        )
      })
      .catch(err => {
        console.log(err)
      })
  }

  componentDidUpdate() {
    if (this.state.jobChange) {
      console.log('com did update')

      this.getData('https://kerjarek.online/jobs')
        .then(res => {
          console.log(res)
          this.setState(
            {
              data: res.result,
              nextAble: res.pageLink.nextAble,
              nextPage: res.pageLink.baseLink + res.pageLink.nextPage,
              jobsFound: res.pagination.dataShow,
              isLoading: false,
              jobChange: false,
            },
            console.log('sukses'),
          )
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  handleSubmit() {
    const name = this.state.name
    let order = this.state.order
    if (order === '') {
      order = 'date_updated DESC'
    }
    let link = 'https://kerjarek.online/jobs/' // 192.168.1.6 // 192.168.1.30
    link = link.concat('?order=')
    link = link.concat(order)
    if (name !== '') {
      link = link.concat('&name=')
      link = link.concat(name)
    }

    console.log('submit')
    this.getData(link)
      .then(res => {
        console.log(res)
        this.setState(
          {
            data: res.result,
            nextAble: res.pageLink.nextAble,
            nextPage: res.pageLink.baseLink + res.pageLink.nextPage,
            jobsFound: res.pagination.dataShow,
            isLoading: false,
          },
          console.log('sukses'),
        )
      })
      .catch(err => {
        console.log(err)
      })
  }

  getData = async page => {
    const listJobs = await axios.get(
      page !== undefined ? page : 'https://kerjarek.online/jobs',
    ) //10.0.2.2
    return listJobs.data
  }

  onOrderChange(value: string) {
    this.setState(
      {
        order: value,
      },
      this.handleSubmit,
    )
  }

  loadMore() {
    console.log('load more')
    this.getData(this.state.nextPage)
      .then(res => {
        console.log(res)
        this.setState(
          {
            data: [...this.state.data, ...res.result],
            nextAble: res.pageLink.nextAble,
            nextPage: res.pageLink.baseLink + res.pageLink.nextPage,
            jobsFound: res.pagination.totalData,
          },
          console.log('sukses'),
        )
      })
      .catch(err => {
        console.log(err)
      })
  }

  callbackCategoryList(cate) {
    console.log('callback')
    let link = 'https://kerjarek.online/jobs'
    if (cate !== '') {
      link = link + '/?category=' + cate
    }
    this.getData(link)
      .then(res => {
        console.log(res)
        this.setState(
          {
            data: res.result,
            nextAble: res.pageLink.nextAble,
            nextPage: res.pageLink.baseLink + res.pageLink.nextPage,
            jobsFound: res.pagination.dataShow,
            isLoading: false,
          },
          console.log('sukses'),
        )
      })
      .catch(err => {
        console.log(err)
      })
  }

  callbackJob = reload => {
    this.setState({
      reload: this.state.reload,
      jobChange: true,
    })
  }

  render() {
    console.log('render')
    // let searchRes = []
    // if (this.state.data!==''){
    //  searchRes = this.state.data.result
    // }

    return (
      <View style={styles.container}>
        <Animated.View
          style={{ ...styles.header, height: this.animatedHeaderHeight }}>
          <Animated.View
            style={{ ...styles.searchWrapper, top: this.animatedSearch }}>
            <MaterialIcons
              name="search"
              size={20}
              style={{ marginRight: 10 }}
              color={'white'}
            />
            <TextInput
              underlineColorAndroid="transparent"
              placeholder="Search Job"
              placeholderTextColor="white"
              style={styles.search}
              onChangeText={name => this.setState({ name, isLoading: true })}
              value={this.state.name}
              onSubmitEditing={() => this.handleSubmit()}
            />
          </Animated.View>
          <Animated.View style={{ ...styles.picker, top: this.animatedPicker }}>
            <Form>
              <Item style={styles.item} picker>
                <Picker
                  mode="dropdown"
                  style={{ color: 'white' }}
                  selectedValue={this.state.order}
                  onValueChange={this.onOrderChange.bind(this)}>
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
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  y: this.scrollY,
                },
              },
            },
          ])}>
          <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 20 }}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: '700',
                paddingHorizontal: 20,
              }}>
              Categories:
            </Text>
            <View style={{ height: 130, marginTop: 20 }}>
              <CategoryList
                parentCallback={this.callbackCategoryList.bind(this)}
              />
            </View>
          </View>

          <View style={{ marginTop: 40 }}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: '700',
                paddingHorizontal: 20,
              }}>
              Jobs:
            </Text>

            {!this.state.isLoading &&
              this.state.jobsFound === 0 &&
              Alert.alert('Not Found')}

            <View
              style={{
                paddingHorizontal: 20,
                marginTop: 20,
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
              }}>
              {this.state.data.map(i => (
                <View key={i.id}>
                  <ScrollView
                  // horizontal={true}
                  // showsHorizontalScrollIndicator={false}
                  >
                    <Job
                      parentCallback={this.callbackJob}
                      width={width}
                      fullData={i}
                      name={i.jobs}
                      company={i.company}
                      salary={i.salary}
                      location={i.location}
                      date_updated={i.date_updated}
                      logo={i.logo}
                      jobId={i.id}
                    />
                  </ScrollView>
                </View>
              ))}
            </View>
          </View>
          {this.state.nextAble && (
            <Button
              full
              style={{ backgroundColor: '#097392' }}
              onPress={() => this.loadMore()}>
              <Text>Load more..</Text>
            </Button>
          )}
        </ScrollView>
      </View>
    )
  }
}

const categoryArray = [
  'Pendidikan',
  'Kuliner',
  'IT',
  'Desain',
  'Olah Raga',
  'Kesenian',
  'Programmer',
  'Hukum',
  'Administrasi',
  'Lainnya',
  'Manajemen',
  'Matematika',
  'Data',
  'Ekonomi',
  'Psikologi',
  'Sosial',
  'Otomotif',
  'Kesehatan',
  'Kedokteran',
  'Pertanian',
  'Peternakan',
  'Transportasi',
]

// const startHeaderHeight = 100 + StatusBar.currentHeight
const { height, width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', //#FFF0CE',
    // paddingTop:StatusBar.currentHeight,
    // paddingTop:25,
  },
  header: {
    // height:startHeaderHeight,
    backgroundColor: '#097392', //'white',
    borderBottomWidth: 0,
    // borderBottomColor:'grey',
    elevation: 5,
    // paddingTop:StatusBar.currentHeight,
  },
  picker: {
    position: 'relative',
    top: 5,
    marginHorizontal: 20,
  },
  item: {
    borderColor: 'transparent',
    // fontWeight:'700',
  },
  searchWrapper: {
    position: 'relative',
    top: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    borderRadius: 10,
    backgroundColor: '#097392', //'white',
    marginHorizontal: 20,
    // shadowColor:'black',
    // shadowOpacity:1,
    elevation: 1,
    borderWidth: 1,
    borderColor: 'white',
    // marginTop:10,
  },
  search: {
    flex: 1,
    fontWeight: '700',
    // backgroundColor:'white',
  },
})
