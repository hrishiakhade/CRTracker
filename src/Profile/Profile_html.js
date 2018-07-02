import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  Keyboard,BackHandler, NetInfo,AsyncStorage
} from 'react-native';

import {  StackNavigator,} from 'react-navigation';
import Profile from './Profile'
import { Container, Header, Left, Body, Right, Title ,Button,Content,Form, Item, Input, Label} from 'native-base';
import { NetCon } from '../NetConnection/NetConnetion';
var styles=require('./Component/Profile_css');

export default class Profile_html extends Component {
  
 
  constructor(props, context) {
    super(props, context);
    this.state = {
                      
      name:'',
      email:'',
      mobile:'',
               
}

 
};


  render() {
    
    return (
      
      <Container style={styles.container}>
      
        <Image source={require('./Component/logo.png')} style={styles.imagestyle}/>
<Content style={styles.content}>
        <Form >
            <Item floatingLabel>
              <Label style={styles.label}>Name</Label>
              <Input style={styles.label} onChangeText={(name) => this.setState({name})} value={this.state.name} />
            </Item>
            <Item floatingLabel last>
                  <Label style={styles.label}>Email ID</Label>
              <Input keyboardType={'email-address'} style={styles.label} onChangeText={(email) => this.setState({email})} value={this.state.email} />
            </Item>
            <Item floatingLabel last>
              <Label style={styles.label}>Mobile Number</Label>
              <Input keyboardType={'phone-pad'} style={styles.label} onChangeText={(mobile) => this.setState({mobile})} value={this.state.mobile} />
            </Item>
            <Button rounded success  style={styles.button} onPress={new Profile().submit(this.state.name,this.state.email,this.state.mobile) }>
            <Text style={styles.text}>{'      '}Save Info</Text>
          </Button>
          </Form>
        </Content>
      </Container>
    );
  
}
}


