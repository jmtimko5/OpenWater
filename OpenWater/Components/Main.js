import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
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
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});


export default class Main extends Component {
  constructor(props){
    super(props);

    this.state = {
      markers: [],
    }
    this.handleLongPress = this.handleLongPress.bind(this);
    this.handlePress = this.handlePress.bind(this);
  }

  _navigateNewDiveSite(coordinate){
    this.props.navigator.push({
      name: 'NewDiveSite',
      passProps: {
        coordinate: coordinate,
      },
    })
  }

  handleLongPress(e){

    this._navigateNewDiveSite(e.nativeEvent.coordinate);

  }

  handlePress(e){
    this.setState({
      markers: [
        ...this.state.markers,
        {
          title: "Test",
          description: "Test Description in Latin of course",
          coordinate: e.nativeEvent.coordinate,
        }
      ],
    });
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
            onLongPress={this.handleLongPress}
            onPress={this.handlePress}
            >
          {this.state.markers.map((marker, i ) => {
            return <Marker {...marker} key={i} />
        })}
          </MapView>
    );
  }
}
