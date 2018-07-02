import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  Keyboard,BackHandler, NetInfo,AsyncStorage
} from 'react-native';

import {  StackNavigator,} from 'react-navigation';
import Profile_html from './Profile_html'
import { Container, Header, Left, Body, Right, Title ,Button,Content,Form, Item, Input, Label} from 'native-base';
import { NetCon } from '../NetConnection/NetConnetion';
var styles=require('./Component/Profile_css');

export default class Profile extends Component {
  static navigationOptions = {
    title: 'Conference Room Tracker',
    headerStyle: { backgroundColor: 'green' },
  headerTitleStyle: { color: 'white' },
  
   
  }
 
  constructor(props, context) {
    super(props, context);

    this.state = {
                      
                      name:'',
                      email:'',
                      mobile:'',
                               
          }
};

componentDidMount(){
  NetCon();
} 
submit=async()=>{

  if( this.state.name=="" || this.state.email=="" || this.state.mobile=="" ){
    alert("Please Fill in All the Fields");
}
else{
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
  var Value1 = this.state.mobile.length.toString() ;
    if(reg.test(this.state.email) === false){
    alert( "Please Enter Valid Email");
    }else if(Value1!=10){
      alert('Please Enter 10 Digit Valid Mobile Number')
    }else{
      Keyboard.dismiss();
      Alert.alert("Success", "Congratulation !! Your Info has been successfully saved !");
      let Mail=this.state.email;
      let Name=this.state.name;
      let Phone=this.state.mobile;
    
      AsyncStorage.setItem("Name",Name);
      AsyncStorage.setItem("Email",Mail);
     AsyncStorage.setItem("Phone",Phone);
     
      this.props.navigation.navigate("Home");
    }

}

}


  render() {
    
    return (
      //<Profile_html/>
      <Container style={styles.container}>
      
        <Image source={require('./Component/logo.png')} style={styles.imagestyle}/>
<Content style={styles.content}>
        <Form >
            <Item floatingLabel>
              <Label style={styles.label}>Name</Label>
              <Input style={styles.label} onChangeText={(name) => this.setState({name})} value={this.state.name} />
            </Item>
            <Item floatingLabel last>
                  <Label style={styles.label}>Email ID</Label>
              <Input keyboardType={'email-address'} style={styles.label} onChangeText={(email) => this.setState({email})} value={this.state.email} />
            </Item>
            <Item floatingLabel last>
              <Label style={styles.label}>Mobile Number</Label>
              <Input keyboardType={'phone-pad'} style={styles.label} onChangeText={(mobile) => this.setState({mobile})} value={this.state.mobile} />
            </Item>
            <Button rounded success  style={styles.button} onPress={this.submit }>
            <Text style={styles.text}>{'      '}Save Info</Text>
          </Button>
          </Form>
        </Content>
      </Container>
    );
  
}
}


