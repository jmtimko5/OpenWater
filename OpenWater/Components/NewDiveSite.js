import React, { Component } from 'react';
import {
 AppRegistry,
 StyleSheet,
 View,
 Navigator,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Container, Content, Header, Left, Right, Title, Button, Body, Icon, ListItem, Text, CheckBox } from 'native-base';


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


    this.dragDiveSite = this.dragDiveSite.bind(this);
    this._navigateMain = this._navigateMain.bind(this);
    this.handleSave = this.handleSave.bind(this);

    this.state = {
      newDiveMarker: (
        <Marker draggable coordinate={this.props.coordinate} pinColor="blue" onDragEnd={this.dragDiveSite} />
      ),
      newDiveCoord: this.props.coordinate,
    }

  }

  dragDiveSite(e){
    this.setState({
      newDiveCoord: e.nativeEvent.coordinate,
      //THIS WORKS BUT eh lets avoid it
      // newDiveMarker: (
      //   <Marker draggable coordinate={e.nativeEvent.coordinate} pinColor="blue" onDragEnd={this.dragDiveSite} />
      // ),
    })
  }

  // _navigateMain(){
  //   console.log("WE NAVIGATING HOME BABY")
  //   this.props.navigator.push({
  //     name: 'Main',
  //     passProps: {
  //
  //     },
  //   })
  // }
  //
  // handleSave(e){
  //   console.log("FUCK FUCK FUCK WE ARE SAVING FUCK HANDLE IT")
  // }

  render() {

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
    return (
        <Container>
              <Header>
                  <Left>
                    <Button transparent>
                         <Icon name='arrow-back' />
                    </Button>
                  </Left>
                  <Body>
                      <Title>New Dive Site</Title>
                  </Body>
                  <Right>
                    <Text>Save</Text>
                </Right>
              </Header>
          </Container>
    );
  }
}
