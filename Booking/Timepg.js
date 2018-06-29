import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View, NetInfo,Alert,
  BackHandler,
  TouchableOpacity,
  TimePickerAndroid,
  TouchableWithoutFeedback,
  Button,div
} from 'react-native';



type Props = {};
export default class Timepg extends Component<Props> {
    static navigationOptions = {
        title: 'Conference Room Tracker',
        headerStyle: { backgroundColor: 'green' },
        headerTintColor: 'white',
      headerTitleStyle: { color: 'white' },
       
      }

 
  constructor(Props){
    super(Props);
  }

componentDidMount(){
  /*NetInfo.isConnected.fetch().then(isConnected => {
    //alert('First, is ' + (isConnected ? 'online' : 'offline'));
    if(isConnected==false){
      Alert.alert("No conection","Please check the internet connectivity !!",
      [
        {text:'OK',onPress:()=>BackHandler.exitApp()}
      ]
    )
    }
  });*/
}




async Time () { 
  var date,hour1,minute1,time;
  date=new Date();
  hour1=date.getHours();
  minute1=date.getMinutes();
  time=hour1.toString()+":"+minute1.toString()+"";
  alert(time);
}

async renderTimePicker () { 
  var date,hour1,minute1,sum;
  date=new Date();
  hour1=date.getHours()*60;
  minute1=date.getMinutes();
  sum=hour1+minute1;
  //alert(sum);
  //alert(hour+" "+minute);
  try {
    const {action, hour, minute} = await TimePickerAndroid.open({
    
      hour: 0,
      minute: 0,
      is24Hour: true, // Will display '2 PM'
    });
   
    
    if (action !== TimePickerAndroid.dismissedAction) {
      // Selected hour (0-23), minute (0-59)
        //alert("Hour :"+hour+" Minutes : "+minute);
        if(sum< hour*60 + minute){
          alert("Time is set");
        }else{
          alert("Please choose Valid Time")
        }
        

    }
  } catch ({code, message}) {
    console.warn('Cannot open time picker', message);
  }
} 


  render() {
    return (
      <View style={{ flex: 1 ,marginTop:30}}>
        
         
     <Button title="Show time" onPress={this.Time}/>
     

     <Button title="Time To" onPress={this.renderTimePicker} />

     
        
      </View>
      
      
      );
   }
  }