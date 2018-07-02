import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  AsyncStorage, Child, Alert
} from 'react-native';
import { Container, Header, Left, Body, Right, Title, Button, Content } from 'native-base';
import * as firebase from 'firebase';
import { StackNavigator, } from 'react-navigation';
import { NetCon } from '../NetConnection/NetConnetion';
var styles = require('./Component/Home_css');
import Home_html from './Home_html'

export default class Home extends Component {


  static navigationOptions = {

    title: 'Conference Room Tracker',
    headerStyle: { backgroundColor: 'green' },
    headerTintColor: 'white',
    headerTitleStyle: { color: 'white' },


  }
  constructor(props) {
    super(props)
    this.state = {
      Room: '',
      Index: '',
      Date: '',
      From: '',
      To: '',
    }


  }

  componentDidMount = async () => {
    NetCon();
    let Name = await AsyncStorage.getItem('Name');
    let mail = await AsyncStorage.getItem('Email');
    let phone = await AsyncStorage.getItem('Phone');

    if (mail == null || Name == null || phone == null) {
      Alert.alert("Profile Incomplete", "Please complete your Profile Details!");
      this.props.navigation.navigate("Profile");

    }


  }


  display = async () => {

    let room = await AsyncStorage.getItem('Room');
    let ind = await AsyncStorage.getItem('Index');
    let date = await AsyncStorage.getItem('Date');

    firebase.database().ref('/Booking/' + date+"/"+room+"/" + ind + "/").once('value').then(function (snapshot) {

      if (!snapshot.exists())
        alert('No Booking Details Found !!');
      else {
        this.nav()

      }
    }, function (error) {
      if (error) {
        alert('No Booking Details Found !!');
      } else {
      }
    });


  }


  render() {
    nav_time = () => {
      this.props.navigation.navigate("Timeset")
    }

    nav = () => {
      this.props.navigation.navigate("Status");
    }
    return (
      // <Home_html/>
      <Container style={styles.container}>



        <Content >
          <Button
            rounded danger large style={{
              marginTop: 150, alignItems: 'center', width: 200,
              alignSelf: 'center',
            }} onPress={this.display.bind(this)}>
            <Text style={styles.text}>{'     '}Booking Details</Text>
          </Button>

          <Button onPress={() => this.props.navigation.navigate("Profile")}
            rounded danger large style={{
              marginTop: 50, alignItems: 'center', width: 150,
              alignSelf: 'center',
            }} >
            <Text style={styles.text}>{'     '}Edit Profile</Text>
          </Button>
          <Button onPress={() => this.props.navigation.navigate("Qrscan")}
            rounded danger large
            style={{ marginTop: 50, alignItems: 'center', width: 250, alignSelf: 'center', }} >
            <Text style={styles.text}>{'  '}Book Conference Room</Text>
          </Button>

        </Content>
      </Container>
    );
  }
}


