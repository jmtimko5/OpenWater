import React, { Component } from 'react';
import {
 AppRegistry,
 StyleSheet,
 Text,
 View,
 Navigator,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';


export default class NewDiveSite extends Component {
  constructor(props){
    super(props);


  }



  render() {
    return (
          <MapView style={ styles.map }
            initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
            }}
            >
            </MapView>
    );
  }
}
