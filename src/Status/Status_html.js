import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  AppState,
  TouchableOpacity, AsyncStorage, Alert,
  TimePickerAndroid,

} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Container, Header, Left, Body, Right, Title, Button, Content, Card, CardItem } from 'native-base';
import { NetCon } from '../NetConnection/NetConnetion';

import Status from './Status';

var styles =require( './Component/Status_css');
export default class Status_html extends Component {

constructor(){
    super()
}
  render() {
      
    return (
        <Container style={{ backgroundColor: '#ecf0f1', }}>

        <Content padder>
          <Card style={styles.card}>
            <CardItem header >
              <Text style={styles.text_book}>{'        '}Booking Details </Text>
            </CardItem>
            <CardItem >
                
              <Text style={styles.text}>Room No : {new Status().state.Room}</Text>
            </CardItem>
            <CardItem>
              <Text style={styles.text}>Date : {new Status().state.Date}</Text>
            </CardItem>
            <CardItem>
              <Text style={styles.text}>Start Time : {new Status().state.From}</Text>
            </CardItem>
            <CardItem>
              <Text style={styles.text}>End Time : {new Status().state.To}</Text>
            </CardItem>
            <CardItem>
             <Text style={styles.text}>Capacity : {new Status().state.Capacity}</Text>
          </CardItem>
            <CardItem>
              <Text style={styles.text}>Facilities : {new Status().state.Facility}</Text>
            </CardItem>
          </Card>
         </Content>
         <Button rounded success style={styles.Button} onPress={new Status().renderTimePicker.bind(this)}>
          <Text style={styles.text}>{'   '}Extend</Text>
        </Button>
        <Button rounded success style={styles.Button} onPress={new Status().release}>
          <Text style={styles.text}>{'   '}Release</Text>
        </Button>
        <Button rounded success style={styles.Button} onPress={() => new Status().props.navigation.navigate("Home")}>
          <Text style={styles.text}>{'   '}Home</Text>
        </Button> 

      </Container>
    );
  }
}
