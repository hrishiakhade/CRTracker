import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  AsyncStorage,Child,Alert
} from 'react-native';
import { Container, Header, Left, Body, Right, Title ,Button,Content} from 'native-base';
import * as firebase from 'firebase';
import {  StackNavigator,} from 'react-navigation';
import { NetCon } from '../NetConnection/NetConnetion';
import Home from './Home';
var styles =require( './Component/Home_css');


export default class Home_html extends Component {
  static navigationOptions = {
    title: 'Conference Room Tracker',
    headerStyle: { backgroundColor: 'green' },
    headerTintColor: 'white',
  headerTitleStyle: { color: 'white' },
   
  }
 

    render() {

    return (
      
      <Container style={{backgroundColor:'white'}}>
      
    
        
        <Content >
        <Button 
        rounded danger large style={{marginTop:150,alignItems:'center',width:200,
    alignSelf:'center',}} onPress={new Home().display.bind(this) }>
             <Text style={styles.text}>{'     '}Booking Details</Text>
          </Button>

        <Button onPress={() =>this.props.navigation.navigate("Profile") }
        rounded danger large style={{marginTop:50,alignItems:'center',width:150,
    alignSelf:'center',}} >
             <Text style={styles.text}>{'     '}Edit Profile</Text>
          </Button>
          <Button 
          rounded danger large 
          style={{marginTop:50,alignItems:'center',width:250,alignSelf:'center',}} >
            <Text style={styles.text}>{'  '}Book Conference Room</Text>
          </Button>

        </Content>
      </Container>
    );
  }
}


