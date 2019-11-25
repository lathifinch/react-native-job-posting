import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";

// import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

// import StarRating from 'react-native-star-rating'

// <StarRating
//   disable={true}
//   maxStars={5}
//   rating={this.props.rating}
//   starSize={10}
// />

class Job extends Component {
  alertEdit () {
    console.log(this.props.fullData)
    Alert.alert('Warning!','Edit job?',
      [
        {text:'OK',onPress:()=>console.log('OK edit')},
        {text:'Cancel',style:'cancel',onPress:()=>console.log('Cancel edit')}
      ])
  }
  alertDelete () {
    console.log(this.props.fullData)
    Alert.alert('Warning!','delete job?',
      [
        {text:'OK',onPress:()=>console.log('OK delete')},
        {text:'Cancel',style:'cancel',onPress:()=>console.log('Cancel delete')}
      ])
  }

  render() {
    return (
      <View style={{ width: this.props.width / 2 - 30, height: this.props.width / 1.5 - 30, borderWidth: 0.5, borderColor: '#dddddd', marginBottom:10, }}>
        <View style={{ flex: 1 }}>
          <Image
            style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }}
            source={{uri:'https://picsum.photos/id/' + Math.floor(Math.random() * 100)+1 + '/200/300'}}
          />
        </View>
        <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'space-evenly', paddingLeft: 10 }}>
          <View style={{flexDirection:'row'}} >
            <Text style={{ fontSize: 10, color: '#b63838' }}>{this.props.company}</Text>
            <TouchableOpacity style={{position:'absolute',left:100}}
              onPress={this.alertEdit.bind(this)}
            >
              <MaterialIcons name="edit" size={16} color={'#097392'} />
            </TouchableOpacity>
            <TouchableOpacity style={{position:'absolute',left:120}}
              onPress={this.alertDelete.bind(this)}
            >
              <MaterialIcons name="delete" size={16} color={'#097392'} />
            </TouchableOpacity>
          </View>
          <Text style={{ fontSize: 12, fontWeight: 'bold' }}>{this.props.name}</Text>
          <Text style={{ fontSize: 10 }}>Gaji Rp {this.props.salary}</Text>
          <Text style={{ fontSize: 10 }}>Lokasi {this.props.location}</Text>
          <Text style={{ fontSize: 10 }}>Diperbarui {this.props.date_updated.substring(0,10)}</Text>
        </View>
        
      </View>
    );
  }
}

export default Job;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
