import React from 'react';
import {View, Text, TouchableHighlight, StyleSheet } from 'react-native';

export default class Lista extends React.Component{
	render(){
		return(
				<TouchableHighlight style = {{backgroundColor: 'white', borderColor: '#de3c4b', alignContent:'center', flexDirection: 'row', borderRadius: 10}} onPress={this.props.action}>
                        <Text style = {{fontSize : 30}}> {this.props.quiz+1} </Text>
                </TouchableHighlight>
                
		);
	}
}
