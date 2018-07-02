'use strict';
var React = require('react-native');


var {
  StyleSheet,
} = React;

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  content: {

    marginTop: 10
  },
  button: {
    marginTop: 40,
    alignItems: 'center',
    width: 150,
    alignSelf: 'center',

  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    alignSelf: 'center'
  },
  imagestyle: {
    marginLeft: 90,
    marginTop: 30
  },
  label: {
    fontSize: 20
  }
});
