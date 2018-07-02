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
import * as firebase from 'firebase';
import moment from 'moment';
import Status_html from './Status_html';
import { NavigationActions } from 'react-navigation';
import { Container, Header, Left, Body, Right, Title, Button, Content, Card, CardItem } from 'native-base';
import { NetCon } from '../NetConnection/NetConnetion';
var styles =require( './Component/Status_css');
export default class Status extends Component {
  static navigationOptions = {
    title: 'Conference Room Tracker',
    headerStyle: { backgroundColor: 'green' },
    headerTintColor: 'white',
    headerTitleStyle: { color: 'white' },
    headerLeft: null

  }
  constructor(props) {
    super(props)
    this.state = {
      Room: '',
      Index: '',
      Date: '',
      From: '',
      To: '',
      Ind: '',
      isValidated: false,
      Capacity: '',
      Facility: ''

    }

  }


  async renderTimePicker() {
    var sum;
    var date, cur_hour, cur_minute;
    date = new Date();
    cur_hour = date.getHours();
    cur_minute = date.getMinutes();
    var curr = parseFloat(cur_hour) + (cur_minute) / 100;

    sum = cur_hour * 60 + cur_minute;


    //alert(sum);
    //alert(hour+" "+minute);


    const { action, hour, minute } = await TimePickerAndroid.open({

      hour: 0,
      minute: 0,
      is24Hour: true, // Will display '2 PM'
    });
    if (action !== TimePickerAndroid.dismissedAction) {


      if (sum < hour * 60 + minute) {
        var upto = parseFloat(hour) + (minute) / 100;
        Alert.alert("Confirmation", "Are you sure you want to Extend this room to " + upto + "?",
          [
            {
              text: 'Cancel'
            },
            {
              text: 'Yes', onPress: () => {
                this.extend(upto)

              }
            }
          ]
        )
      } else {
        alert("Please choose Valid Time");

      }

    }

  }

  fun(flag, upto, from) {
    if (flag == 1)
      firebase.database().ref('/Booking/' + this.state.Date + "/" + this.state.Room + "/" + this.state.Ind + "/").update({
        End: upto.toString().replace(".", ":")
      }, function (error) {
        if (error) {
          alert("ERROR");
        } else {

          alert("CR Room Time Extended Successfully !!")
          this.nav();
        }
      });
    else {
      Alert.alert("Extension Failed !!", "Can't Extend upto " + upto.toString().replace(".",":") +
        " ,Already Booked by Admin from " + from.toString().replace(".",":"));
    }

  }
  extend = (upto) => {
    var flag = 0;
    var from;
    var ref = firebase.database().ref('Booking/' + this.state.Date + '/' + this.state.Room + "/");
    ref.orderByChild("End").once('value', (snapshot) => {
      snapshot.forEach((snap) => {
       var to= snap.val().End.toString().replace(":",".");
       
         from = snap.val().Start.toString().replace(":", ".");
       
        var adminfl = snap.val().Admin;
        if (adminfl == true) {
          if ((upto > from) && ((upto < to) || (upto > to))) {
            flag = 2;
            return true;
            //alert("You Can Extend till"+from);
          } else if (upto < from) {
            flag = 1;
            // alert("Direct Extend");
          }

        } else {
          flag = 1;
        }

      });
      this.fun(flag, upto, from);
    })

  }

  componentDidMount = async () => {
    NetCon();
     let room=await AsyncStorage.getItem('Room');
    let ind = await AsyncStorage.getItem('Index');
    let date = await AsyncStorage.getItem('Date');
    

    var ref = firebase.database().ref("/Booking/" + date + "/"+room +"/"+ ind + "/");
    ref.once('value').then(function (snapshot) {

      if (!snapshot.exists())
        alert('No Booking Details Found !!');
      else {
        var from = (snapshot.val() && snapshot.val().Start);
        var to = (snapshot.val() && snapshot.val().End);
        to = to.toString().replace(":", ".");
        from = from.toString().replace(":", ".");
        var date1, cur;

        date1 = new Date();
        var cur_hour1 = date1.getHours();
        var cur_minute1 = date1.getMinutes();
        date1 = moment(new Date()).format("DD-MM-YYYY");
        cur = parseFloat(cur_hour1) + (cur_minute1) / 100;
        if (cur >= to || date != date1) {
          // AsyncStorage.clear();
          AsyncStorage.removeItem('Room');
          AsyncStorage.removeItem('Index');
          AsyncStorage.removeItem('Date');
          this.nav();
        } else {
          var facility, capacity;
          var ref1 = firebase.database().ref("/CR Room/"+room);
          ref1.once('value').then(function (snapshot) {
            if (!snapshot.exists())
              alert("Invalid CR Room");
            else {
              capacity = snapshot.val() && snapshot.val().Capacity;
              facility = (snapshot.val() && snapshot.val().Facility).toString();

              this.st(room, date, from, to, ind, capacity, facility);
            }
          })
        }
      }

    })
  }





  release = () => {
    Alert.alert("Confirmation", "Are you sure you want to Release this room ?.",
      [
        {
          text: 'Cancel'
        },
        {
          text: 'Yes', onPress: () => {
            var date, cur_hour, cur_minute;
            date = new Date();
            cur_hour = date.getHours();
            cur_minute = date.getMinutes();
            var curr = parseFloat(cur_hour) + (cur_minute) / 100;


            firebase.database().ref('/Booking/' + this.state.Date + "/" + this.state.Room + "/" + this.state.Ind + "/").update({
              End: curr.toString().replace(".", ":")
            }, function (error) {
              if (error) {
                alert("ERROR");
              } else {
                //  AsyncStorage.clear();
                AsyncStorage.removeItem('Room');
                AsyncStorage.removeItem('Index');
                AsyncStorage.removeItem('Date');
                this.nav();

              }
            });
          }
        }
      ]
    )

  }

  render() {
    nav = () => {
      this.props.navigation.navigate("Home")
    }
    st = (room, date, from, to, ind, capacity, facility) => {
     
      this.setState({
        Room: room,
        Date: date,
        From: from.toString().replace(".", ":"),
        To: to.toString().replace(".", ":"),
        Ind: ind,
        Capacity: capacity,
        Facility: facility
      })
    }

    return (
     // <Status_html/>
      <Container style={{ backgroundColor: '#ecf0f1', }}>

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
        <Button rounded success style={styles.Button} onPress={this.renderTimePicker.bind(this)}>
          <Text style={styles.text}>{'   '}Extend</Text>
        </Button>
        <Button rounded success style={styles.Button} onPress={this.release}>
          <Text style={styles.text}>{'   '}Release</Text>
        </Button>
        <Button rounded success style={styles.Button} onPress={() => this.props.navigation.navigate("Home")}>
          <Text style={styles.text}>{'   '}Home</Text>
        </Button>

      </Container>
    );
  }
}
