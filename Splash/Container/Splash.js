
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
var styles = require('../Component/Splash_css')
type Props = {};
export default class Splash extends Component<Props> {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../Component/splash.png')} />
        <Text style={styles.text}>CRTracker</Text>

      </View>
    );
  }
}


