import React, { Component } from 'react';
import {
 AppRegistry,
 StyleSheet,
 View,
 Navigator,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Container, Content, Header, Textarea, Left, Right, Title, Button, Label, InputGroup, Body, Icon, Form, Input, Item, ListItem, Text, CheckBox } from 'native-base';


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
    top: 315,
    left: 10,
    right: 10,
    bottom: 10,
  },
});

export default class NewDiveSite extends Component {
  constructor(props){
    super(props);


    this.dragDiveSite = this.dragDiveSite.bind(this);
    this._navigateMain = this._navigateMain.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleDiveNameChange = this.handleDiveNameChange.bind(this);
    this.handleDiveDescriptionChange = this.handleDiveDescriptionChange.bind(this);

    this.state = {
      newDiveMarker: (
        <Marker draggable coordinate={this.props.coordinate} image={require('../img/diving-buoy-small.png')} onDragEnd={this.dragDiveSite}
       />
      ),
      newDiveCoord: this.props.coordinate,
      newDiveName: "",
      newDiveDescription: "",
    }

  }

  dragDiveSite(e){
    this.setState({
      newDiveCoord: e.nativeEvent.coordinate,
    })
  }

  _navigateMain(){
    this.props.navigator.push({
      name: 'Main',
    })
  }

  handleSave(e){
    //TODO get some semblance of who is logged in as user

    //POST New Dive Site to API
    var _this = this;
    fetch('http://colab-sbx-243.oit.duke.edu/api/v1/sites', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        creator_id: 1,
        name: this.state.newDiveName,
        lat: this.state.newDiveCoord.latitude,
        lng: this.state.newDiveCoord.longitude,
        description: this.state.newDiveDescription,
      }),
    }).then(function(response) {
      console.log(response)
            _this._navigateMain();
    }).catch(function(err) {
      console.log(err)
           alert(err);
    })


  }

  handleDiveNameChange(text){
    this.setState({
      newDiveName: text,
    })
  }

  handleDiveDescriptionChange(text){
    this.setState({
      newDiveDescription: text,
    })
  }

  render() {
    return (
        <Container>
              <Header>
                  <Left>
                    <Button transparent onPress={this._navigateMain}>
                         <Icon name='arrow-back' />
                    </Button>
                  </Left>
                  <Body>
                      <Title>New Dive Site</Title>
                  </Body>
                  <Right>
                    <Button transparent onPress={this.handleSave}>
                      <Text>Save</Text>
                    </Button>
                </Right>
              </Header>
              <Content>
                  <Form>
                      <Item stackedLabel>
                          <Label>Site Name</Label>
                          <Input onChangeText={this.handleDiveNameChange} />
                      </Item>
                      <Item stackedLabel>
                        <Label>Description</Label>
                        <Input bordered style={{height: 150}} multiline={true} onChangeText={this.handleDiveDescriptionChange} />
                      </Item>
                  </Form>

              </Content>
              <MapView style={ styles.map }
              initialRegion={{
              latitude: this.props.coordinate.latitude,
              longitude: this.props.coordinate.longitude,
              latitudeDelta: 3.0522,
              longitudeDelta: 3.0221,
              }}
              >
                {this.state.newDiveMarker}
              </MapView>
          </Container>
    );
  }
}
