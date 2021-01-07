 
import React from 'react';
import {View, Text, TouchableHighlight, StyleSheet } from 'react-native';

export default class Lista extends React.Component{
	render(){
		return(
				<TouchableHighlight onPress={this.props.action}>
                        <Text> {this.props.quiz+1} </Text>
                </TouchableHighlight>
                
		);
	}
}
