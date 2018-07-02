import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import Splash from './Splash/Container/Splash';
import * as firebase from 'firebase';
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['', 'Module RCTImageLoader']);
import { NetCon } from './src/NetConnection/NetConnetion';
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
                databaseURL: "https://confrooms-9b2a5.firebaseio.com/",
            });
        }
    }
    render() {

        const { currentScreen } = this.state
        let mainScreen = currentScreen === 'Splash' ? <Splash /> : <App />
        return mainScreen
    }
}
AppRegistry.registerComponent('push', () => Main);

