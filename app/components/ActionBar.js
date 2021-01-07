import React from 'react';
import {Text, View, TouchableHighlight, StyleSheet } from 'react-native';

const token = "9f840f6c3926aa427da7";
const url = "https://core.dit.upm.es/api/quizzes/random10wa?token="+token;



export default class ActionBar extends React.Component {
    render() {
        return (
            <View style={{backgroundColor: 'green', flex: 1, flexDirection: 'row'}}>

                    <TouchableHighlight style={styles.button} id= 'Anterior' onPress={() => { this.props.onAnteriorQuiz(-1); }}>
                        <Text> Anterior </Text>
                    </TouchableHighlight>

                    <TouchableHighlight style={styles.button}  id= 'Submit' onPress={() => { this.props.onSubmit(); }}>
                        <Text> Submit </Text>
                    </TouchableHighlight>
                    
                    <TouchableHighlight style={styles.button} id= 'Siguiente' onPress={() => { this.props.onChangeQuiz(1); }}>
                        <Text> Siguiente </Text>
                    </TouchableHighlight>
                    
                    <TouchableHighlight style={styles.button}  id= 'Reset' onPress={() => {this.props.onReset() }}>
                        <Text> Reset </Text>
                    </TouchableHighlight>
                
            </View >
        )
    }
}

const styles = StyleSheet.create({

    button: {
        backgroundColor: "#3498db",
        padding: 15,
        borderRadius: 10
      }
});

