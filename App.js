import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { StackNavigator, NavigationAction, } from 'react-navigation';

import Home from './Home/Home';
import Profile from './Profile/Profile';
import Qrscan from './QRScan/Qrscan';
import Timeset from './Booking/Timeset';
import Status from './Status/Status';


const Navigation = StackNavigator({
 
  Home: {
    screen: Home,
  },
  Profile: {
    screen: Profile,
  },
  Qrscan: {
    screen: Qrscan,
  },
  Timeset: {
    screen: Timeset,
  },
  
  Status:{
    screen: Status,
  }

})

export default Navigation;