import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View, NetInfo, Alert,
  BackHandler,
  TouchableOpacity,
  TimePickerAndroid,
  TouchableWithoutFeedback,
  div,
  AsyncStorage

} from 'react-native';
import * as firebase from 'firebase';
import moment from 'moment';
import { NavigationActions } from 'react-navigation';
var styles = require("./Component/Timeset_css")
import { Button } from 'native-base';
import { NetCon } from '../NetConnection/NetConnetion';

type Props = {};
export default class Timeset extends Component<Props> {
  static navigationOptions = {
    title: 'Conference Room Tracker',
    headerStyle: { backgroundColor: 'green' },
    headerTintColor: 'white',
    headerTitleStyle: { color: 'white' },

  }


  constructor(Props) {
    super(Props)
    this.state = {
     // room: "CR2",
      room: this.props.navigation.state.params.room,
      hr: '',
      min: '',
      isValidated: false,
      cur_hour: '',
      cur_minute: '',
      date: '',
      i: '',
      name: '',
      email: '',
      phone: '',
      capacity:'',
      facility:''
    };

  }
  flag_check = (flag, date) => {
    if (flag == 1 || flag == 0) {
      this.add_data(date);
    } else {
      this.props.navigation.navigate("Home");

    }
  }

  componentDidMount = async () => {
    NetCon();


    firebase.database().ref('/CR Room/' + this.state.room + '/').once('value').then(function (snapshot) {
      if (!snapshot.exists()) {

        alert("Please Scan Valid Conference Room QR Code");
this.navigate_home();
      }
      

    });

   

    var no,Capacity,Facility;

    let nam = await AsyncStorage.getItem('Name');
    let mail = await AsyncStorage.getItem('Email');
    let mob = await AsyncStorage.getItem('Phone');


    const date = moment(new Date()).format("DD-MM-YYYY");
    var ref = firebase.database().ref('Booking/' + date + '/' + this.state.room + "/");
    ref.once('value').then(function (snapshot) {
      no = snapshot.numChildren();

    });
    var ref1 = firebase.database().ref("/CR Room/"+this.state.room+"/");
    ref1.once('value').then(function (snapshot) {
      if (!snapshot.exists())
        alert("Invalid CR Room");
      else {
         Capacity = snapshot.val() && snapshot.val().Capacity;
         Facility = (snapshot.val() && snapshot.val().Facility).toString();
        
      }
      });
    setInterval(() => {
      this.setState({
        hour3: new Date().toLocaleString(),
        i: no,
        name: nam,
        email: mail,
        phone: mob,
        facility:Facility,
        capacity:Capacity
      })
    }, 1000)
   
    
  }


  async renderTimePicker() {
    var date, sum;
    date = new Date();
    cur_hour = date.getHours();
    cur_minute = date.getMinutes();
    sum = cur_hour * 60 + cur_minute;


    const { action, hour, minute } = await TimePickerAndroid.open({

      hour: 0,
      minute: 0,
      is24Hour: true, // Will display '2 PM'
    });
    if (action !== TimePickerAndroid.dismissedAction) {
      // Selected hour (0-23), minute (0-59)



      if (sum < hour * 60 + minute) {
        this.setState({ isValidated: true });
        this.setState({ min: minute.toString() });
        this.setState({ hr: hour.toString() });
        this.setState({ cur_minute: cur_minute.toString() });
        this.setState({ cur_hour: cur_hour.toString() });



      } else {
        alert("Please choose Valid Time");
        this.setState({ isValidated: false });

      }

    }


  }



  validate_time = () => {

    var flag = 0;

    var curr = parseFloat(this.state.cur_hour) + (this.state.cur_minute) / 100;
    var endt = parseFloat(this.state.hr) + (this.state.min) / 100;
    const date = moment(new Date()).format("DD-MM-YYYY");
    var ref = firebase.database().ref('Booking/' + date + '/' + this.state.room + "/");
    ref.orderByChild("To").once('value', (snapshot) => {
      snapshot.forEach((snap) => {
        var to = (snap.val().End.toString().replace(":", "."));
        var from = (snap.val().Start).toString().replace(":", ".");
        var adminflag = snap.val().Admin;
        if (to != null) {
          if (parseFloat(to) < curr && endt > parseFloat(to)) {
            flag = 1;
          } else {
            if (adminflag == true) {
              if (curr < parseFloat(from)) {
                  if(endt < parseFloat(to) && endt > parseFloat(from) ){
                    //false
                    flag=2;
                    Alert.alert("Already Booked by Admin ",
                    "Name : " + snap.val().Name +
                    "\n\nEmail : " + snap.val().Email +
                    "\n\nMobile No. : " + snap.val().Phone +
                    "\n\nAdmin : " + snap.val().Admin +
                    "\n\nFrom : " + snap.val().Start +
                    "\n\nEnd Time : " + snap.val().End);
                  return true;
                  }else if(endt>parseFloat(to)){
                    flag=2;
                    Alert.alert("Already Booked by Admin ",
                    "Name : " + snap.val().Name +
                    "\n\nEmail : " + snap.val().Email +
                    "\n\nMobile No. : " + snap.val().Phone +
                    "\n\nAdmin : " + snap.val().Admin +
                    "\n\nFrom : " + snap.val().Start +
                    "\n\nEnd Time : " + snap.val().End);
                  return true;
                  }else if((curr<parseFloat(from)) && (endt<parseFloat(to))){
                    flag=1;
                  }

  

            } else {
              flag = 2;
              Alert.alert("Already Booked by ",
                "Name : " + snap.val().Name +
                "\n\nEmail : " + snap.val().Email +
                "\n\nMobile No. : " + snap.val().Phone +
                "\n\nAdmin : " + snap.val().Admin +
                "\n\nEnd Time : " + snap.val().End);
              return true;
            }
          }
        }} else {
          this.add_data(date);
        }
      });
      if (!snapshot.exists())
        this.add_data(date);
      else
        this.flag_check(flag, date);

    })

  }

  add_data = (date) => {

    var from = parseFloat(this.state.cur_hour) + (this.state.cur_minute) / 100;
    var to = parseFloat(this.state.hr) + ((this.state.min) / 100);

    var ref = firebase.database().ref('Booking/' + date + '/' + this.state.room + '/' + this.state.i + '/').set({

      Start: from.toString().replace(".", ":"),
      End: to.toString().replace(".", ":"),
      Admin: false,
      Name: this.state.name,
      Email: this.state.email,
      Phone: this.state.phone



    }, function (error) {
      if (error) {
        alert("Error");
      } else {

        this.navigate_status(date);

      }
    });

  }

  bookRoom = () => {
    if (this.state.hr != '' && this.state.min != '') {
      Alert.alert("Confirmation", "Are you sure you want to book this room ?.",
        [
          {
            text: 'Cancel'
          },
          {
            text: 'Yes', onPress: () => { this.validate_time() }
          }
        ]
      )
    }
    else {
      alert("Please choose valid time.");
    }
  }

  render() {
    const { Navigation } = this.props;
    navigate_home=()=>{
      this.props.navigation.navigate('Home');

    }
    navigate_status = (date) => {
      let cr = this.state.room.toString();
     // let cr ="CR2";

      let dt = date;
      let ind = (this.state.i.toString());
      AsyncStorage.setItem("Room", cr);
      AsyncStorage.setItem("Date", dt);
      AsyncStorage.setItem("Index", ind);



      this.props.navigation.navigate('Status');

    }


    return (
      <View style={styles.view}>

        <Text style={styles.text}>Room no : {this.state.room}</Text>

        <Text style={styles.text}>Capacity  :  {this.state.capacity}</Text>
          <Text style={styles.text}>Facility  :  {this.state.facility}</Text>
        <Text style={styles.text}>Start Time  :  {this.state.hour3}</Text>

        <Text style={styles.text}>
          {this.state.isValidated ? "End Time  :" + this.state.hr + " :" + this.state.min : ""} </Text>
         


        <Button rounded success onPress={this.renderTimePicker.bind(this)} style={styles.button}>
          <Text style={styles.text}>Pick End Time  </Text>

        </Button>

        
        <Button rounded success style={styles.button} onPress={this.bookRoom} >
          <Text style={styles.text} >{'     '}Book </Text>

        </Button>

      </View>


    );
  }
}
