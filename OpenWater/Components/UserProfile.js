import React, { Component } from 'react';
import { Container, Content, Label, Header, Left, Right, Button, Icon, Body, Title, Card, CardItem, Text } from 'native-base';
import { Image } from 'react-native';
import Review from './Review.js'

// Replace with GET reviews for user
// Need to do a JOIN with dive site to get site name
let reviews = [
  {rating: 4, site_id: 1, site_name: 'Beach', text: 'Pretty good dive'},
  {rating: 3, site_id: 2, site_name: 'Cove', text: 'Ok dive'},
  {rating: 5, site_id: 3, site_name: 'Lagoon', text: 'Awesome dive'},
];

export default class UserProfile extends Component {
  constructor(props){
    super(props);
    console.log(props);

    this._navigateBack = this._navigateBack.bind(this);
    this._navigateDiveDetail = this._navigateDiveDetail.bind(this);

    this.state = {
      user: {},
      reviews: {},
    };

    // GET user
    fetch('http://localhost:3000/api/v1/users/'+ props.user, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        user: responseJson[0]
      });
    });

    // GET reviews
    fetch('http://localhost:3000/api/v1/users/' + props.user + '/reviews', {
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

  _navigateBack(){
    this.props.navigator.push({
      name: this.props.prev.name,
      passProps: this.props.prev.passProps
    });
  }

  _navigateDiveDetail(site_id){
    this.props.navigator.push({
      name: 'DiveDetail',
      passProps: {
        site: site_id,
        prev: {
          name: 'UserProfile',
          passProps: this.props
        },
      },
    })
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={this._navigateBack}>
                 <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
              <Title>View Profile</Title>
          </Body>
          <Right>

          </Right>
        </Header>
          <Content
            contentContainerStyle={{
              flex: 1,
              alignItems: 'center'
            }}
          >
              <Label>{this.state.user.username}</Label>
              <Label>{this.state.user.location}</Label>
          </Content>
          <Label>Reviews</Label>
          <Content>
            <Card dataArray={this.state.reviews}
            renderRow={(review) =>
              <Review
                name={review.site_name}
                navFunc={this._navigateDiveDetail}
                id={review.site_id}
                rating={review.rating}
                text={review.message}
              />
            }>
            </Card>
          </Content>
        </Container>
    );
  }
}
