import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    AppState,
    TouchableOpacity, AsyncStorage, Alert,
    TimePickerAndroid,

} from 'react-native';
import * as firebase from 'firebase';
import moment from 'moment';
import Status from './Status/Component/Status_ui'
import { NavigationActions } from 'react-navigation';
import { Container, Header, Left, Body, Right, Title, Button, Content, Card, CardItem } from 'native-base';
export default class Home extends Component {
    static navigationOptions = {
        title: 'Conference Room Tracker',
        headerStyle: { backgroundColor: 'green' },
        headerTintColor: 'white',
        headerTitleStyle: { color: 'white' },
        headerLeft: null

    }
    constructor(props) {
        super(props)
        this.state = {
            Room: '',
            Index: '',
            Date: '',
            From: '',
            To: '',
            Ind: '',
            isValidated: false,
            Capacity: '',
            Facility: ''

        }

    }


    async renderTimePicker() {
        var sum;
        var date, cur_hour, cur_minute;
        date = new Date();
        cur_hour = date.getHours();
        cur_minute = date.getMinutes();
        var curr = parseFloat(cur_hour) + (cur_minute) / 100;

        sum = cur_hour * 60 + cur_minute;


        //alert(sum);
        //alert(hour+" "+minute);


        const { action, hour, minute } = await TimePickerAndroid.open({

            hour: 0,
            minute: 0,
            is24Hour: true, // Will display '2 PM'
        });
        if (action !== TimePickerAndroid.dismissedAction) {


            if (sum < hour * 60 + minute) {
                var upto = parseFloat(hour) + (minute) / 100;
                Alert.alert("Confirmation", "Are you sure you want to Extend this room to " + upto + "?",
                    [
                        {
                            text: 'Cancel'
                        },
                        {
                            text: 'Yes', onPress: () => {
                                firebase.database().ref('/Booking/' + this.state.Date + "/" + 100 + "/" + this.state.Ind + "/").update({
                                    To: upto.toString()
                                }, function (error) {
                                    if (error) {
                                        alert("ERROR");
                                    } else {

                                        alert("CR Room Time Extended Successfully !!")
                                        this.nav();
                                    }
                                });
                            }
                        }
                    ]
                )

            } else {
                alert("Please choose Valid Time");

            }

        }

    }

    componentDidMount = async () => {
        // let room=await AsyncStorage.getItem('Room');
        let ind = await AsyncStorage.getItem('Index');
        let date = await AsyncStorage.getItem('Date');

        var ref = firebase.database().ref("/Booking/" + date + "/100/" + ind + "/");
        ref.once('value').then(function (snapshot) {

            if (!snapshot.exists())
                alert('No Booking Details Found !!');
            else {
                var from = parseFloat((snapshot.val() && snapshot.val().From));
                var to = parseFloat((snapshot.val() && snapshot.val().To));

                var date1, cur;

                date1 = new Date();
                var cur_hour1 = date1.getHours();
                var cur_minute1 = date1.getMinutes();
                date1 = moment(new Date()).format("DD-MM-YYYY");
                cur = parseFloat(cur_hour1) + (cur_minute1) / 100;
                if (cur >= to || date != date1) {
                    AsyncStorage.clear();
                    this.nav();
                } else {
                    var facility, capacity;
                    var ref1 = firebase.database().ref("/CR Room/100/");
                    ref1.once('value').then(function (snapshot) {
                        if (!snapshot.exists())
                            alert("Invalid CR Room");
                        else {
                            capacity = snapshot.val() && snapshot.val().Capacity;
                            facility = (snapshot.val() && snapshot.val().Facilites).toString();
                            this.st(100, date, from, to, ind, capacity, facility);
                        }
                    })
                }

            }

        })



    }



    release = () => {
        Alert.alert("Confirmation", "Are you sure you want to Release this room ?.",
            [
                {
                    text: 'Cancel'
                },
                {
                    text: 'Yes', onPress: () => {
                        var date, cur_hour, cur_minute;
                        date = new Date();
                        cur_hour = date.getHours();
                        cur_minute = date.getMinutes();
                        var curr = parseFloat(cur_hour) + (cur_minute) / 100;


                        firebase.database().ref('/Booking/' + this.state.Date + "/" + 100 + "/" + this.state.Ind + "/").update({
                            To: curr.toString()
                        }, function (error) {
                            if (error) {
                                alert("ERROR");
                            } else {
                                AsyncStorage.clear();
                                this.nav();

                            }
                        });
                    }
                }
            ]
        )

    }

    render() {
        nav = () => {
            this.props.navigation.navigate("Profile")
        }
        st = (room, date, from, to, ind, capacity, facility) => {
            this.setState({
                Room: room,
                Date: date,
                From: from.toString(),
                To: to.toString(),
                Ind: ind,
                Capacity: capacity,
                Facility: facility
            })
        }

        return;


    }
}
