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

import Qrscan from './QRScan/Container/Qrscan_fn.js'

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

  
  render() {

    
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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3498db',
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});