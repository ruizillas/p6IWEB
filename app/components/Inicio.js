import React from 'react';
import { View, TouchableHighlight, Text, StyleSheet } from 'react-native';
import MyButton from './my_button';

export default class IndexScreen extends React.Component {
render() {
  return (
    <View style={{ flex:1, alignItems:'center', justifyContent:'center' }}>
    <MyButton
    onPress={() => this.props.navigation.navigate('GameScreen')}
    text={"PLAY"}/>
    </View>
  )
}
}
