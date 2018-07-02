'use strict';
var React = require('react-native');


var {
  StyleSheet,
} = React;

module.exports = StyleSheet.create({
    text: {

        fontWeight: 'bold',
        fontSize: 20,
        alignSelf: 'center',
        marginLeft: 40,

    },
    button: {
        alignItems: 'center',
        width: 200,
        alignSelf: 'center',
        marginTop: 30
    },
    view: {
        flex: 1,
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    }
});