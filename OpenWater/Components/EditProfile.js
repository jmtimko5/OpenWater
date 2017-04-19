import React, { Component } from 'react';
import { Container, Content, Header, Body, Title, Card, CardItem, Text, Button, Form, Item, Label, Input, InputGroup, Row } from 'native-base';
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

export default class EditProfile extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <Container>
        <Header>
          <Body>
              <Title>Edit Profile</Title>
          </Body>
        </Header>
        <Content
        >
          <Form>
              <Item stackedLabel>
                <Label>Edit Username</Label>
                <Row>
                  <Input placeholder={user.username}/>
                  <Button><Text>Submit</Text></Button>
                </Row>
              </Item>
              <Item stackedLabel>
                <Label>Edit Location</Label>
                <Row>
                  <Input placeholder={user.location}/>
                  <Button><Text>Submit</Text></Button>
                </Row>
              </Item>
          </Form>
          <Label>Your Reviews</Label>
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
        <Button danger>
          <Text>Delete</Text>
        </Button>
      </CardItem>
    );
  }
}
