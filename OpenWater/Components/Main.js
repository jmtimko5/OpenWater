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
    this.state = {
      sites: []
    }

    this.handleLongPress = this.handleLongPress.bind(this);
    this.handlePress = this.handlePress.bind(this);
    this._navigateDiveDetail = this._navigateDiveDetail.bind(this);
    this._navigateUserProfile = this._navigateUserProfile.bind(this);

    // GET sites
    fetch('http://localhost:3000/api/v1/sites/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        sites: responseJson
      });
    });

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
  _navigateDiveDetail(e, id){
    this.props.navigator.push({
      name: 'DiveDetail',
      passProps: {
        site: id,
      },
    })
  }

  _navigateUserProfile(){
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
              latitude: -16.920334,
              longitude: 145.770859,
              latitudeDelta: 3.6922,
              longitudeDelta: 3.6421,
              }}
              onLongPress={this.handleLongPress}
              onPress={this.handlePress}
              >
              {this.state.sites.map((site) => {
                return (
                  <Marker coordinate={{latitude: site.lat, longitude: site.lng}} key={site.id}>
                    <MapView.Callout>
                      <View>
                        <H3>{site.name}</H3>
                        <Button transparent onPress={(e) => {this._navigateDiveDetail(e, site.id)} }>
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
