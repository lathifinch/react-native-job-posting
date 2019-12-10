import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Clipboard,
} from 'react-native'

// import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import { delCompany } from '../../redux/actions/company'

import AsyncStorage from '@react-native-community/async-storage'

import { connect } from 'react-redux'

import { withNavigation } from 'react-navigation'

// import StarRating from 'react-native-star-rating'

// <StarRating
//   disable={true}
//   maxStars={5}
//   rating={this.props.rating}
//   starSize={10}
// />

const mapDispatchToProps = dispatch => {
  return {
    delCompany: (comId, resToken) => dispatch(delCompany(comId, resToken)),
  }
}

class Company extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: '',
    }
  }

  alertEdit() {
    console.log(this.props.fullData)
    Alert.alert(
      'Warning!',
      'For now edit company only available on web kerjarek.netlify.com',
      [
        {
          text: 'OK',
          onPress: () => console.log('OK edit'),
          // this.props.navigation.navigate('Add', { whereToGo: 'Company' }),
        },
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
    Alert.alert('Warning!', 'Delete company?', [
      {
        text: 'OK',
        onPress: () =>
          this.props.delCompany(this.props.comId, this.state.token),
      }, //console.log('OK delete')
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
    // console.log(this.state.token)
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

  writeToClipboard = async () => {
    await Clipboard.setString(this.props.comId)
    alert('Copied ID to Clipboard!')
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
            <Text
              style={{ fontSize: 12, fontWeight: 'bold', color: '#b63838' }}>
              {this.props.name}
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
          <Text style={{ fontSize: 10 }}>Lokasi: {this.props.location}</Text>
          <Text style={{ fontSize: 10 }}>
            Lowongan: {this.props.njob} pekerjaan
          </Text>
          <TouchableOpacity
            // style={{ position: 'absolute', left: 100 }}
            onPress={this.writeToClipboard}>
            <Text style={{ fontSize: 10 }}>Copy Company's ID</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default connect(
  null,
  mapDispatchToProps,
)(withNavigation(Company))

// export default Company

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
