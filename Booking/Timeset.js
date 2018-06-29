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

import { Button } from 'native-base';
import { NetCon } from '../NetConnetion';

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
      room:100,
     // room: this.props.navigation.state.params.room,
      hr: '',
      min: '',
      isValidated: false,
      //room:489,
      cur_hour: '',
      cur_minute: '',
      date: '',
      i:'',
      name:'',
      email:'',
      phone:''
    };

  }
  fun=(flag,date)=>{
    if(flag==1 || flag==0){
      this.db(date);
    }else{
      this.props.navigation.navigate("Home");

        // alert("CR Room Busy");
    }
}

componentDidMount=async()=>{
  NetCon();
    var no;
    
   let nam=await AsyncStorage.getItem('Name');
     let mail=await AsyncStorage.getItem('Email');
     let mob=await AsyncStorage.getItem('Phone');
    
   
    const date = moment(new Date()).format("DD-MM-YYYY");
  var ref = firebase.database().ref('Booking/'+date+'/'+this.state.room+"/");
 ref.once('value').then(function(snapshot){
    no=snapshot.numChildren();
    
 });
 
    setInterval(() => {
      this.setState({
        hour3: new Date().toLocaleString(),
        i:no,
        name:nam,
        email:mail,
        phone:mob
      })
    }, 1000)
            
     
  }


  async renderTimePicker() {
    var date, sum;
    date = new Date();
    cur_hour = date.getHours();
    cur_minute = date.getMinutes();
    sum = cur_hour * 60 + cur_minute;

    //alert(sum);
    //alert(hour+" "+minute);


    const { action, hour, minute } = await TimePickerAndroid.open({

      hour: 0,
      minute: 0,
      is24Hour: true, // Will display '2 PM'
    });
    if (action !== TimePickerAndroid.dismissedAction) {
      // Selected hour (0-23), minute (0-59)
     


      if (sum < hour * 60 + minute) {
        //await this.setState({hr:' 9'}).done;
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
  
 

   fn =()=>{
    
var flag=0;
   
     var curr=parseFloat(this.state.cur_hour)+(this.state.cur_minute)/100;
     var endt=parseFloat(this.state.hr)+(this.state.min)/100;
    const date = moment(new Date()).format("DD-MM-YYYY");
    var ref = firebase.database().ref('Booking/'+date+'/'+this.state.room+"/");
    ref.orderByChild("To").once('value',(snapshot) => {
      snapshot.forEach((snap) => {
        var to=(snap.val().To.toString().replace(":","."));
        var from=(snap.val().From).toString().replace(":",".");
        var adfl=snap.val().Admin;
       if(to!=null){
       if(parseFloat(to) < curr && endt > parseFloat(to) ){
           flag=1;
       }else{
         if(adfl=="Yes"){
            if(curr > parseFloat(from) ){
               
              flag=2;
              Alert.alert("Already Booked by Admin ", 
              "Name : "+snap.val().Name+
              "\n\nEmail : "+snap.val().Email+
              "\n\nMobile No. : "+snap.val().Phone+
              "\n\nAdmin : "+snap.val().Admin+
              "\n\nFrom : "+snap.val().From+
              "\n\nEnd Time : "+snap.val().To);
              return true;
         
            }

         }else{         
        flag=2;
        Alert.alert("Already Booked by ", 
        "Name : "+snap.val().Name+
        "\n\nEmail : "+snap.val().Email+
        "\n\nMobile No. : "+snap.val().Phone+
        "\n\nAdmin : "+snap.val().Admin+
        "\n\nEnd Time : "+snap.val().To);
        return true;
         } 
       }
      }else{
        this.db(date);
      }
       });
       if(!snapshot.exists())
       this.db(date);
else
       this.fun(flag,date);

      })
    
   }
   
   db=(date)=>{
    
     //const id=Math.floor(Math.random()*90000) + 10000;
     var from=parseFloat(this.state.cur_hour)+(this.state.cur_minute)/100;
     var to=parseFloat(this.state.hr)+((this.state.min)/100);

     var ref=firebase.database().ref('Booking/' + date + '/'+this.state.room+'/'+this.state.i+'/').set({
 
      // ID:id,
       From: from.toString().replace(".",":"),
       To: to.toString().replace(".",":"),
       Admin : "No",
       Name: this.state.name,
       Email: this.state.email,
       Phone: this.state.phone

 
 
     }, function (error) {
       if (error) {
         alert("Error");
       } else {
        
         //alert("Booking Confirmed ");
         //const postKey = this.state.i;
        // alert(postKey);
         //this.props.navigation.navigate('Status');
         
        this.navi(date);
         
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
            text: 'Yes', onPress: () => { this.fn()}
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
    navi=(date)=>{
      let cr=this.state.room;
     
      let dt=date;
      let ind=(this.state.i.toString());
      AsyncStorage.setItem("Room",cr);
      AsyncStorage.setItem("Date",dt);
     AsyncStorage.setItem("Index",ind);

     

     this.props.navigation.navigate('Status');

    }
   
    



    return (
      <View style={styles.view}>

        <Text style={styles.text}>Room no is {this.state.room}</Text>


        <Text style={styles.text}>Time From :  {this.state.hour3}</Text>

        <Button rounded success onPress={this.renderTimePicker.bind(this)} style={styles.button}>
          <Text style={styles.text}>Time To </Text>

        </Button>

        <Text style={styles.text}>
          {this.state.isValidated ? "Time To : " + this.state.hr + " :" + this.state.min : ""} </Text>

        <Button rounded success style={styles.button} onPress={this.bookRoom} >
          <Text style={styles.text} >Book </Text>

        </Button>

      </View>


    );
  }
}
const styles = StyleSheet.create({
  text: {

    fontWeight: 'bold',
    fontSize: 20,
    alignSelf: 'center',
    marginLeft: 40,

  },
  button: {
    alignItems: 'center',
    width: 150,
    alignSelf: 'center',
    marginTop: 30
  },
  view:{
    flex: 1, 
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  }
});