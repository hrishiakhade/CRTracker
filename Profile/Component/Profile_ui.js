import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  Keyboard,BackHandler, NetInfo
} from 'react-native';

import {  StackNavigator,} from 'react-navigation';

import { Container, Header, Left, Body, Right, Title ,Button,Content,Form, Item, Input, Label} from 'native-base';
import Profile from './Profile/Container/Profile_fn';

export default class Profile extends Component {
  static navigationOptions = {
    title: 'Conference Room Tracker',
    headerStyle: { backgroundColor: 'green' },
  headerTitleStyle: { color: 'white' },
   
  }
 
 

  render() {
    
    return (
      
      <Container style={styles.container}>
      
        <Image source={require('./logo.png')} style={styles.imagestyle}/>
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
            <Button rounded success  style={styles.button} onPress={() => this.props.navigation.navigate("Home") } >
            <Text style={styles.text}>{'      '}Save Info</Text>
          </Button>
          </Form>
        </Content>
      </Container>
    );
  
}
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  },
  content:{
  
    marginTop:10
  },
  button:{
    marginTop:40,
    alignItems:'center',
    width:150,
    alignSelf:'center',
    
  },
  text:{
    color:'white',
    fontWeight:'bold',
    fontSize:20,
    alignSelf:'center'
  },
  imagestyle:{
    marginLeft:90,
    marginTop:30
  },
  label:{
    fontSize:20
  }
});
