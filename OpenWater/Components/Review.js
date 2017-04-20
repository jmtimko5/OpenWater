import React, { Component } from 'react';
import { Container, Content, Label, Header, Body, Title, Card, CardItem, Text } from 'native-base';
import { Image } from 'react-native';


export default class Review extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <CardItem>
        <Body>
          <Text>
            {this.props.name}
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
