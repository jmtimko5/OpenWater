import React, { Component } from 'react';
import { Container, Content, Label, Header, Left, Right, Button, Icon, Body, Title, Card, CardItem, Text, List, ListItem, H3 } from 'native-base';
import { Image, StyleSheet } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Review from './Review.js'

export default class UserProfile extends Component {
  constructor(props){
    super(props);

    this._navigateBack = this._navigateBack.bind(this);
    this._navigateDiveDetail = this._navigateDiveDetail.bind(this);

    this.state = {
      user: {},
      reviews: {},
    };

    // GET user
    fetch('http://colab-sbx-243.oit.duke.edu/api/v1/users/'+ props.user, {
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
    fetch('http://colab-sbx-243.oit.duke.edu/api/v1/users/' + props.user + '/reviews', {
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
          <Content>
            <Grid>
              <ListItem itemDivider><Text>User Info</Text></ListItem>
              <Row style={{ height: 85 }}>
                <Col style={{alignItems: 'center', marginTop: 18}}>
                  <H3>{this.state.user.username}</H3>
                  <Text note>Location: {this.state.user.location}</Text>
                  <Text note>Joined: {this.state.user.joined}</Text>
                </Col>
              </Row>
              <Row style={{ height: 500 }}>
                <Col>
                  <ListItem itemDivider><Text>Reviews by this User</Text></ListItem>
                  <List dataArray={this.state.reviews}
                  renderRow={(review) =>
                    <Review
                      name={review.site_name}
                      navFunc={this._navigateDiveDetail}
                      id={review.site_id}
                      rating={review.rating}
                      text={review.message}
                      date={review.date}
                    />
                  }>
                  </List>
                </Col>
              </Row>
            </Grid>
          </Content>
        </Container>
    );
  }
}
