import React, { Component } from 'react';
import { Container, Content, Header, Left, Right, Body, Title, Text, Button, Form, Item, Label, Input, Icon } from 'native-base';
import { Image } from 'react-native';

export default class NewReview extends Component {
  constructor(props){
    super(props);

    this._navigateBack = this._navigateBack.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRatingChange = this.handleRatingChange.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);

    this.state = {
      rating: "",
      message: "",
    }
  }

  _navigateBack(){
    this.props.navigator.push({
      name: 'DiveDetail',
      passProps: {
        site: this.props.site_id
      }
    })
  }

  handleSubmit(){
    // POST review
    fetch('http://colab-sbx-243.oit.duke.edu/api/v1/reviews', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: 1,
        site_id: this.props.site_id,
        rating: this.state.rating,
        message: this.state.message,
      })
    })
    .then(this._navigateBack);
  }

  handleRatingChange(text){
    this.setState({
      rating: text,
    });
  }

  handleMessageChange(text){
    this.setState({
      message: text,
    });
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
              <Title>Add Review</Title>
          </Body>
          <Right />
        </Header>
        <Content>
        <Title>{this.props.site_name}</Title>
          <Form>
              <Item stackedLabel>
                <Label>Rating</Label>
                <Input onChangeText={this.handleRatingChange}/>
              </Item>
              <Item stackedLabel>
                <Label>Message</Label>
                <Input bordered style={{height: 250}} multiline={true} onChangeText={this.handleMessageChange} />
              </Item>
          </Form>
          <Button style={{marginTop: 10}} block primary onPress={this.handleSubmit}>
            <Text>Submit</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
