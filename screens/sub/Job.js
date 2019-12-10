import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native'

// import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import axios from 'axios'
// import qs from 'qs'

import AsyncStorage from '@react-native-community/async-storage'

// import StarRating from 'react-native-star-rating'

// <StarRating
//   disable={true}
//   maxStars={5}
//   rating={this.props.rating}
//   starSize={10}
// />

class Job extends Component {
  constructor() {
    super()
    this.state = {
      token: '',
    }
  }

  alertEdit() {
    console.log(this.props.fullData)
    Alert.alert(
      'Warning!',
      'For now edit job only available on web kerjarek.netlify.com',
      [
        { text: 'OK', onPress: () => console.log('OK edit') },
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => console.log('Cancel edit'),
        },
      ],
    )
  }
  alertDelete() {
    console.log(this.props.fullData)
    Alert.alert('Warning!', 'Delete job?', [
      { text: 'OK', onPress: () => this.delJob() }, //console.log('OK delete')
      {
        text: 'Cancel',
        style: 'cancel',
        onPress: () => console.log('Cancel delete'),
      },
    ])
  }

  componentDidMount() {
    this.getToken()
      .then(res => {
        this.setState({
          token: res,
        })
      })
      .catch(err => {
        console.log(err)
      })
    console.log(this.state.token)
  }

  getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('token')
      if (value !== null) {
        console.log(value)
        return value // value previously stored
      }
    } catch (e) {
      console.log('cannot get data') // error reading value
    }
  }

  delJob = () => {
    this.delData()
      .then(res => {
        console.log(res)
        this.setState(
          {
            isLoading: false,
          },
          console.log('sukses'),
        )
        Alert.alert('Success', res.message)
        this.props.parentCallback(true)
      })
      .catch(err => {
        this.setState(
          {
            isLoading: false,
          },
          console.log('gagal'),
        )
        Alert.alert('Error', err)
      })
  }

  delData = async () => {
    const res = await axios({
      method: 'delete',
      url: 'https://kerjarek.online/jobs/' + this.props.jobId,
      // data: qs.stringify(loginData),
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        authorization: this.state.token,
      },
    })
    return res
  }

  render() {
    return (
      <View
        style={{
          width: this.props.width / 2 - 30,
          height: this.props.width / 1.5 - 30,
          borderWidth: 0.5,
          borderColor: '#dddddd',
          marginBottom: 10,
        }}>
        <View style={{ flex: 1 }}>
          <Image
            style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }}
            source={{ uri: `${this.props.logo}` }}
            // source={{
            //   uri:
            //     'https://picsum.photos/id/' +
            //     Math.floor(Math.random() * 100) +
            //     1 +
            //     '/200/300',
            // }}
          />
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'flex-start',
            justifyContent: 'space-evenly',
            paddingLeft: 10,
          }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 10, color: '#b63838' }}>
              {this.props.company}
            </Text>
            <TouchableOpacity
              style={{ position: 'absolute', left: 100 }}
              onPress={this.alertEdit.bind(this)}>
              <MaterialIcons name="edit" size={16} color={'#097392'} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ position: 'absolute', left: 120 }}
              onPress={this.alertDelete.bind(this)}>
              <MaterialIcons name="delete" size={16} color={'#097392'} />
            </TouchableOpacity>
          </View>
          <Text style={{ fontSize: 12, fontWeight: 'bold' }}>
            {this.props.name}
          </Text>
          <Text style={{ fontSize: 10 }}>Gaji Rp {this.props.salary}</Text>
          <Text style={{ fontSize: 10 }}>Lokasi {this.props.location}</Text>
          <Text style={{ fontSize: 10 }}>
            Diperbarui {this.props.date_updated.substring(0, 10)}
          </Text>
        </View>
      </View>
    )
  }
}

export default Job

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
