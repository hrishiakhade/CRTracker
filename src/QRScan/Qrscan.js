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
import { Spinner, View } from 'native-base';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { StackNavigator, } from 'react-navigation';
import * as firebase from 'firebase';
import moment from 'moment';
import { NetCon } from '../NetConnection/NetConnetion';
var styles = require("./Component/Qrscan_css");
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
    NetCon();

  }
  onSuccess(e) {
    

       // this.nav(e.data);
        this.props.navigation.navigate("Timeset", {
          room: e.data,
        });

     
    


  }
  render() {

    nav = (str) => {
      this.props.navigation.navigate("Timeset", {
        room: str,
      });
    }
    return (
      <QRCodeScanner
        onRead={this.onSuccess.bind(this)}
        reactivate={true}
        reactivateTimeout={5000}

        bottomContent={
          <TouchableOpacity style={styles.buttonTouchable} >
            <Text style={styles.buttonText} >Scan QR Code</Text>
          </TouchableOpacity>
        }
      />
    );

  }
}


