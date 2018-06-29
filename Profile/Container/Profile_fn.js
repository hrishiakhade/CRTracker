import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  Keyboard,BackHandler, NetInfo
} from 'react-native';

import {  StackNavigator,} from 'react-navigation';

import { Container, Header, Left, Body, Right, Title ,Button,Content,Form, Item, Input, Label} from 'native-base';
//import Profile from './Profile/Component/Profile_ui';
export default class Profile_fn extends Component{
  constructor(props, context) {
    super(props, context);

    this.state = {
                      
                      name:'',
                      email:'',
                      mobile:'',
                               
          }
};
export function Hello(){
  alert("Hello");
}
render(){
  return(
    <View></View>
  );

  
}
}





