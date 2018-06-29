import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking, Alert,
  NetInfo,
  BackHandler,

} from 'react-native';
import Qrscan from './QRScan/Component/Qrscan_ui';
import { Spinner, View } from 'native-base';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { StackNavigator, } from 'react-navigation';
import * as firebase from 'firebase';
import moment from 'moment';

type Props = {};
export default class Qrscan extends Component<Props> {
  static navigationOptions = {
    title: 'Conference Room Tracker',
    headerStyle: { backgroundColor: 'green' },
    headerTintColor: 'white',
    headerTitleStyle: { color: 'white' },

  }

  constructor(Props) {
    super(Props);
    this.state = {
    }
  }

  componentDidMount() {
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


  onSuccess(e) {
    firebase.database().ref('/CR Room/' + e.data + '/').once('value').then(function (snapshot) {
      if (snapshot.exists()) {
        room:e.data;
       
        this.nav(e.data);

       
      }
      else {
        alert("Please Scan Valid Conference Room QR Code");
      }

    });


  }
  render() {

    nav = (str) => {
      this.props.navigation.navigate("Timeset", {
        room: str,
      });
    }
    return;
  }
}
