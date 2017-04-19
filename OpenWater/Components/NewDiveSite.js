import React, { Component } from 'react';
import {
 AppRegistry,
 StyleSheet,
 Text,
 View,
 Navigator,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 300,
    left: 10,
    right: 10,
    bottom: 10,
  },
});

export default class NewDiveSite extends Component {
  constructor(props){
    super(props);

    this.state = {
      newDiveMarker: (
        <Marker draggable coordinate={this.props.coordinate} pinColor="blue" />
      ),
    }

  }

  // dragDiveSite(e){
  //   console.log(e.nativeEvent.coordinate)
  //   this.setState({
  //     newDiveCoord: e.nativeEvent.coordinate,
  //   })
  // }

  render() {


    return (
          <MapView style={ styles.map }
          initialRegion={{
          latitude: this.props.coordinate.latitude,
          longitude: this.props.coordinate.longitude,
          latitudeDelta: 0.0522,
          longitudeDelta: 0.0221,
          }}
            >
            {this.state.newDiveMarker}
            </MapView>
    );
  }
}
