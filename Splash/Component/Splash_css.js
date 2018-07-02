'use strict';
var React = require('react-native');


var {
  StyleSheet,
} = React;

module.exports = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3498db',
    },
    text: {
        fontWeight: 'bold',
        fontSize: 30,
        color: 'white'
    }
});