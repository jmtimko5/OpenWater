import React, { Component } from 'react';
import { Container, Content, Label, Header, Body, Title, Card, CardItem, Text } from 'native-base';
import { Image } from 'react-native';

// Replace with GET user
let user = {
  username: 'TestUser',
  location: 'Durham',
  img_src: 'https://facebook.github.io/react/img/logo_og.png'
};

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

    this._navigateBack = this._navigateBack.bind(this);
  }

  _navigateBack(){
    this.props.navigator.push({
      name: 'ViewDiveSite',
      passProps: {
        user_id: this.props.user_id,
        site_id: this.props.site_id,
      }
    });
  }

  render() {
    return (
      <Container>
        <Header>
          <Body>
              <Title>View Profile</Title>
          </Body>
        </Header>
          <Content
            contentContainerStyle={{
              flex: 1,
              alignItems: 'center'
            }}
          >
              <Label>{user.username}</Label>
              <Label>{user.location}</Label>
              <Image
                style={{width: 200, height: 200}}
                source={{uri: user.img_src}}
              />
          </Content>
          <Label>Reviews</Label>
          <Content>
            <Card dataArray={reviews}
            renderRow={(review) =>
              <Review
                site_name={review.site_name}
                rating={review.rating}
                text={review.text}
              />
            }>
            </Card>
          </Content>
        </Container>
    );
  }
}

class Review extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <CardItem>
        <Body>
          <Text>
            {this.props.site_name}
          </Text>
          <Text>
            {this.props.rating}
          </Text>
          <Text>
            {this.props.text}
          </Text>
        </Body>
      </CardItem>
    );
  }
}