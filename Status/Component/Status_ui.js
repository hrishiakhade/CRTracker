import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    AppState,
    TouchableOpacity,AsyncStorage,Alert,
    TimePickerAndroid,

  } from 'react-native';
  import * as firebase from 'firebase';
  import moment from 'moment';
  import Status from './Status/Container/Status_fn'
  import { NavigationActions } from 'react-navigation';
  import { Container,Header, Left, Body, Right, Title ,Button,Content,Card, CardItem} from 'native-base';
export default class Home extends Component {
    static navigationOptions = {
      title: 'Conference Room Tracker',
      headerStyle: { backgroundColor: 'green' },
      headerTintColor: 'white',
    headerTitleStyle: { color: 'white' },
    headerLeft: null
     
    }
         
   
    render() {
      nav=()=>{
        this.props.navigation.navigate("Profile") 
      }
      st=(room,date,from,to,ind,capacity,facility)=>{
        this.setState({
          Room:room,
          Date:date,
          From:from.toString(),
          To:to.toString(),
          Ind:ind,
          Capacity:capacity,
          Facility:facility
        })
      }
      
      return (
        
        <Container style={{backgroundColor:'#ecf0f1',}}>

          <Content padder>
        <Card style={styles.card}>
            <CardItem header >
              <Text style={styles.text_book}>{'        '}Booking Details </Text>
            </CardItem>
            <CardItem >
            <Text style={styles.text}>Room No : {this.state.Room}</Text>
        </CardItem>
        <CardItem>
        <Text style={styles.text}>Date : {this.state.Date}</Text>
        </CardItem>
        <CardItem>
        <Text style={styles.text}>Start Time : {this.state.From}</Text>
        </CardItem>
        <CardItem>
        <Text style={styles.text}>End Time : {this.state.To}</Text>
        </CardItem>
       
        <CardItem>
        <Text style={styles.text}>Capacity : {this.state.Capacity}</Text>
        </CardItem>
        <CardItem>
        <Text style={styles.text}>Facilities : {this.state.Facility}</Text>
        </CardItem>
        </Card>
          </Content>
          <Button rounded success  style={styles.Button}  onPress={this.renderTimePicker.bind(this)}>
            <Text style={styles.text}>{'   '}Extend</Text>
          </Button>
          <Button rounded success  style={styles.Button}  onPress={this.release}>
            <Text style={styles.text}>{'   '}Release</Text>
          </Button>

        </Container>
      );
    }
}
  const styles = StyleSheet.create({
    text:{
        
        fontWeight:'bold',
        alignSelf:'center',
        marginLeft:28,
        justifyContent:'center',
        fontSize:20,
        color:'black'
               
      },
      text_book:{
        fontSize:25,
        fontWeight:'bold',
        color:'black',
        textAlign:'center'

      },
      card:{
        marginLeft:10,
        marginTop:20,
        marginRight:10,
        borderColor:'green'
      },
      Button:{
        marginTop:10,
        alignItems:'center',
        width:150,
       alignSelf:'center',

      }
  
  });
