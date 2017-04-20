import React, { Component } from 'react';
import {
 AppRegistry,
 StyleSheet,
 View,
 Navigator,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Container, Content, Header, Textarea, Left, Right, H1, H2, H3, Title, Button, Label, InputGroup, Body, Icon, Form, Input, Item, ListItem, Text, CheckBox } from 'native-base';


const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 400,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  // map: {
  //   position: 'absolute',
  //   top: 80,
  //   left: 50,
  //   right: 50,
  //   bottom: 400,
  // },
  map:{
    flex:1
  },
});



export default class DiveDetail extends Component {
  constructor(props){
    super(props);

    this.state = {

    }

    this._navigateMain = this._navigateMain.bind(this);

  }


  _navigateMain(){
    this.props.navigator.push({
      name: 'Main',
    })
  }



  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <Container>
              <Header>
                  <Left>
                    <Button transparent onPress={this._navigateMain}>
                         <Icon name='arrow-back' />
                    </Button>
                  </Left>
                  <Body>
                      <Title>{this.props.marker.title}</Title>
                  </Body>
                  <Right>

                  </Right>
              </Header>

              <Content>
                <H3>Description:</H3>
                <Text></Text>
              </Content>
          </Container>
          <MapView style={ styles.map }
          initialRegion={{
          latitude: this.props.marker.coordinate.latitude,
          longitude: this.props.marker.coordinate.longitude,
          latitudeDelta: 0.0722,
          longitudeDelta: 0.0421,
          }}
          pitchEnable={false}
          rotateEnabled={false}
          scrollEnabled={false}
          zoomEnabled={false}
          >
          <Marker {...this.props.marker}></Marker>
          </MapView>
        </View>
    );

  }
}
