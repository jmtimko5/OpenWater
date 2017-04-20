/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {
 AppRegistry,
 StyleSheet,
 Text,
 View,
 Navigator,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Main from './Components/Main.js';
import NewDiveSite from './Components/NewDiveSite.js';


export default class OpenWater extends Component {
  constructor(props){
    super(props);
  }

  renderScene(route, navigator) {
  	if(route.name == 'Main') {
    	return <Main navigator={navigator} {...route.passProps}  />
    }
    if(route.name == 'NewDiveSite') {
    	return <NewDiveSite navigator={navigator} {...route.passProps}  />
    }
    if(route.name == 'DiveDetail') {
      return <DiveDetail navigator={navigator} {...route.passProps} />
    }
  }

  render() {
    return (
      <Navigator
      	style={{ flex:1 }}
        initialRoute={{ name: 'Main' }}
        renderScene={ this.renderScene } />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('OpenWater', () => OpenWater);
