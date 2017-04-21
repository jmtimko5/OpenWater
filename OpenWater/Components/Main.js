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
      sites: [],
      region: this.props.region,
    }

    this.handleLongPress = this.handleLongPress.bind(this);
    this.handlePress = this.handlePress.bind(this);
    this.onRegionChange = this.onRegionChange.bind(this);
    this._navigateDiveDetail = this._navigateDiveDetail.bind(this);
    this._navigateUserProfile = this._navigateUserProfile.bind(this);

    // GET sites
    fetch('http://colab-sbx-243.oit.duke.edu/api/v1/sites/', {
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
  _navigateDiveDetail(id){
    this.props.navigator.push({
      name: 'DiveDetail',
      passProps: {
        site: id,
        prev: {
          name: 'Main',
          passProps: {...this.props, region: this.state.region}
        },
      },
    })
  }

  _navigateUserProfile(){
    this.props.navigator.push({
      name: 'UserProfile',
      passProps: {
        user: 1,
        prev: {
          name: 'Main',
          passProps: this.props
        },
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

  onRegionChange(region) {
    this.setState({region});
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
              region={this.state.region}
              onLongPress={this.handleLongPress}
              onPress={this.handlePress}
              onRegionChange={this.onRegionChange}
              >
              {this.state.sites.map((site) => {
                star = (site.avg) ? <Icon name='ios-star' style={{fontSize: 20}} /> : "";
                return (
                  <Marker coordinate={{latitude: site.lat, longitude: site.lng}} key={site.id} image={require('../img/diving-buoy-small.png')}>
                    <MapView.Callout>
                      <View>
                        <H3>{site.name}</H3>
                        <Text>{site.avg}{star} ({site.count} reviews)</Text>
                        <Button transparent onPress={() => {this._navigateDiveDetail(site.id)} }>
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
