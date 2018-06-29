import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  AsyncStorage
} from 'react-native';

import { Container, Header, Left, Body, Right, Title ,Button,Content} from 'native-base';
import * as firebase from 'firebase';
//import {style} from './Home_ui'
import {  StackNavigator,} from 'react-navigation';
import Home from './Home/Container/Home_fn';


export default class Home extends Component {
  
  static navigationOptions = {
    title: 'Conference Room Tracker',
    headerStyle: { backgroundColor: 'green' },
    headerTintColor: 'white',
  headerTitleStyle: { color: 'white' },
   
  }
  
    render() {
nav=()=>{
  this.props.navigation.navigate("Status");
}

    return (
      
      <Container style={{backgroundColor:'white'}}>
      
        
        <Content >
        <Button 
        rounded danger large style={{marginTop:150,alignItems:'center',width:200,
    alignSelf:'center',}} onPress={this.display.bind(this) }>
             <Text style={styles.text}>{'     '}Booking Details</Text>
          </Button>

        <Button onPress={() => this.props.navigation.navigate("Profile") }
        rounded danger large style={{marginTop:50,alignItems:'center',width:150,
    alignSelf:'center',}} >
             <Text style={styles.text}>{'     '}Edit Profile</Text>
          </Button>
          <Button onPress={() => this.props.navigation.navigate("Timeset") }
          rounded danger large 
          style={{marginTop:50,alignItems:'center',width:250,alignSelf:'center',}} >
            <Text style={styles.text}>{'  '}Book Conference Room</Text>
          </Button>

        </Content>
      </Container>
    );
  }
}

