import React, { Component } from 'react';
import {
 AppRegistry,
 StyleSheet,
 View,
 Navigator,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Container, Content, Header, Textarea, Left, Card, CardItem, Right, H1, H2, H3, Title, Button, Label, InputGroup, Body, Icon, Form, Input, Item, ListItem, Text, CheckBox } from 'native-base';
import Review from './Review.js'

let reviews = [
  {rating: 4, site_id: 1, site_name: 'Beach', text: 'Pretty good dive'},
  {rating: 3, site_id: 2, site_name: 'Cove', text: 'Ok dive'},
  {rating: 5, site_id: 3, site_name: 'Lagoon', text: 'Awesome dive'},
];

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

  map:{
    flex:1,
    top: 50,
  },
});



export default class DiveDetail extends Component {
  constructor(props){
    super(props);

    this.state = {
      site: {},
      reviews: {}
    }

    this._navigateMain = this._navigateMain.bind(this);
    this._navigateNewReview = this._navigateNewReview.bind(this);

    // GET site
    fetch('http://colab-sbx-243.oit.duke.edu/api/v1/sites/'+ props.site, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        site: responseJson[0]
      });
    });

    // GET reviews
    fetch('http://colab-sbx-243.oit.duke.edu/api/v1/sites/' + props.site + '/reviews', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        reviews: responseJson
      });
    });

  }


  _navigateMain(){
    this.props.navigator.push({
      name: 'Main',
    })
  }

  _navigateNewReview(){
    this.props.navigator.push({
      name: 'NewReview',
      passProps: {
        site_id: this.props.site,
        site_name: this.state.site.name
      },
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
                      <Title>{this.state.site.name}</Title>
                  </Body>
                  <Right>

                  </Right>
              </Header>

              <Content>
                <Label>Average Rating:</Label>
                <Text>{this.state.site.avg} ({this.state.reviews.length} reviews)</Text>
                <Label>Description:</Label>
                <Text>{this.state.site.description}</Text>
                <Label>Reviews:</Label>
                  <Card dataArray={this.state.reviews}
                  renderRow={(review) =>
                    <Review
                      name={review.username}
                      rating={review.rating}
                      text={review.message}
                    />
                  }>
                  </Card>
                  <Button full rounded onPress={this._navigateNewReview}>
                      <Text> Review Site </Text>
                    </Button>
              </Content>
          </Container>
          <MapView style={ styles.map }
          region={{
          latitude: this.state.site.lat,
          longitude: this.state.site.lng,
          latitudeDelta: 3.0722,
          longitudeDelta: 3.0421,
          }}
          pitchEnable={false}
          rotateEnabled={false}
          scrollEnabled={false}
          zoomEnabled={false}
          >
           <Marker coordinate={{latitude: this.state.site.lat, longitude: this.state.site.lng}} key={this.state.site.id} />
          </MapView>
        </View>
    );

  }
}
