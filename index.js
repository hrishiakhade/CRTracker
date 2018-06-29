import React, { Component } from 'react';
import { AppRegistry, Alert, NetInfo, BackHandler } from 'react-native';
import App from './App';
import Splash from './Splash';
import * as firebase from 'firebase';
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['', 'Module RCTImageLoader']);
import moment from 'moment';
import { NetCon } from './NetConnetion';
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentScreen: 'Splash',
            value: false,
        };
        setTimeout(() => {
            this.setState({ currentScreen: 'App' })
        }, 2000)
    }

    componentDidMount() {
        NetCon();
        if (!firebase.apps.length) {
            firebase.initializeApp({
                databaseURL: "https://push-ebdbb.firebaseio.com/",
            });
        }
        // firebase.initializeApp({
        //     databaseURL: "https://push-ebdbb.firebaseio.com/",
        // });

    }



    render() {

        const { currentScreen } = this.state
        let mainScreen = currentScreen === 'Splash' ? <Splash /> : <App />
        return mainScreen
    }
}
AppRegistry.registerComponent('push', () => Main);

