import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Container, Content, Header, Textarea, Left, Right, H1, H2, H3, Title, Button, Label, InputGroup, Body, Icon, Form, Input, Item, ListItem, Text, CheckBox } from 'native-base';


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
    top: 60,
    left: 0,
    right: 0,
    bottom: 0,
  },
});


export default class Main extends Component {
  constructor(props){
    super(props);
    var coord = {
      latitude: 37.78825,
      longitude: -122.4324,
    }
    this.state = {
      markers: [{
        coordinate: coord,
        title: "Test Marker",
      }],
    }
    this.handleLongPress = this.handleLongPress.bind(this);
    this.handlePress = this.handlePress.bind(this);
    this._navigateDiveDetail = this._navigateDiveDetail.bind(this);
    this._navigateUserProfile = this._navigateUserProfile.bind(this);

  }

  _navigateNewDiveSite(coordinate){
    this.props.navigator.push({
      name: 'NewDiveSite',
      passProps: {
        coordinate: coordinate,
      },
    })
  }

  //TODO change to input of dive id
  _navigateDiveDetail(e, marker){
    this.props.navigator.push({
      name: 'DiveDetail',
      passProps: {
        marker: marker,
      },
    })
  }

  _navigateUserProfile(){
    console.warn("FUCK WE GOIN USER PROF PICS")
    this.props.navigator.push({
      name: 'UserProfile',
      passProps: {
        backRoute: 'Main',
      },
    })
  }

  handleLongPress(e){
    this._navigateNewDiveSite(e.nativeEvent.coordinate);
  }

  handlePress(e){
    // this.setState({
    //   markers: [
    //     ...this.state.markers,
    //     {
    //       title: "Test",
    //       description: "Test Description in Latin of course",
    //       coordinate: e.nativeEvent.coordinate,
    //     }
    //   ],
    // });
  }



  render() {

    return (
        <Container>
          <Header>
              <Left>
              </Left>
              <Body>
                  <Title>OpenWater</Title>
              </Body>
              <Right>
                <Button transparent onPress={this._navigateUserProfile}>
                  <Text>Profile</Text>
                </Button>
            </Right>
          </Header>

          <Content>
          </Content>

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
                return (
                  <Marker {...marker} key={i}>
                    <MapView.Callout>
                      <View>
                        <H3>{marker.title}</H3>
                        <Button transparent onPress={(e) => {this._navigateDiveDetail(e, marker)} }>
                            <Text>Explore</Text>
                            <Icon name='arrow-forward' />
                        </Button>
                      </View>
                    </MapView.Callout>
                  </Marker>
                )
            })}
            </MapView>
          </Container>

    );
  }
}
