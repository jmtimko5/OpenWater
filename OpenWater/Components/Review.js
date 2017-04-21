import React, { Component } from 'react';
import { Container, Content, Label, Header, Body, Title, Card, CardItem, Text, ListItem, Icon } from 'native-base';
import { Image } from 'react-native';


export default class Review extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <ListItem>
        <Body>
          <Text onPress={()=>{this.props.navFunc(this.props.id);}}>
            {this.props.name}
          </Text>
          <Text note>{this.props.date}</Text>
          {makeStars(this.props.rating)}
          <Text note>
            {this.props.text}
          </Text>
        </Body>
      </ListItem>
    );
  }
}

function makeStars(count) {
  var stars = [];
  for (var i=0; i < count; i++) {
      stars.push(<Icon key={i} name='ios-star'/>);
  }
  return <Text note>{stars}</Text>;
}
