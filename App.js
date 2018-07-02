import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { StackNavigator, NavigationAction, } from 'react-navigation';

import Home from './src/Home/Home';
import Profile from './src/Profile/Profile';
import Qrscan from './src/QRScan/Qrscan';
import Timeset from './src/Booking/Timeset';
import Status from './src/Status/Status';
import Home_html from './src/Home/Home_html'

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