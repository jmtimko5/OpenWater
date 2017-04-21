import React, { Component } from 'react';
import { Container, Content, Header, List, Left, Right, Body, Title, Text, Button, Form, Item, ListItem, Label, Input, Icon, Picker } from 'native-base';
import { Image } from 'react-native';

export default class NewReview extends Component {
  constructor(props){
    super(props);

    this._navigateBack = this._navigateBack.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRatingChange = this.handleRatingChange.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);

    this.state = {
      rating: 1,
      message: "",
    }
  }

  _navigateBack(){
    this.props.navigator.push({
      name: this.props.prev.name,
      passProps: this.props.prev.passProps
    });
  }

  handleSubmit(){
    // POST review
    var _this = this;
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
    }).then(function(response) {
           _this._navigateBack();
    }).catch(function(err) {
           alert(err);
    })
  }

  handleRatingChange(val){
    this.setState({
      rating: val,
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
                <Label>Rating (click to select)</Label>
                <Picker
                  iosHeader="Select Rating"
                  mode="dropdown"
                  selectedValue={this.state.rating}
                  onValueChange={this.handleRatingChange}>
                  <Item label={makeStars(1)} value={1} />
                  <Item label={makeStars(2)} value={2} />
                  <Item label={makeStars(3)} value={3} />
                  <Item label={makeStars(4)} value={4} />
                  <Item label={makeStars(5)} value={5} />
               </Picker>
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

function makeStars(count) {
  var stars = [];
  for (var i=0; i < count; i++) {
      stars.push(<Icon key={i} style={{fontSize: 20}} name='ios-star'/>);
  }
  return <Text note>{stars}</Text>;
}