import React from 'react';
import {Text, View, TouchableHighlight, StyleSheet, Dimensions } from 'react-native';

const token = "9f840f6c3926aa427da7";
const url = "https://core.dit.upm.es/api/quizzes/random10wa?token="+token;



export default class ActionBar extends React.Component {
    render() {
        return (
            <View style={styles.prueba}>

                    <TouchableHighlight style={styles.button} id= 'Anterior' onPress={() => { this.props.onAnteriorQuiz(-1); }}>
                        <Text style = {{fontSize : 20}}> Anterior </Text>
                    </TouchableHighlight>

                    <TouchableHighlight style={styles.button}  id= 'Submit' onPress={() => { this.props.onSubmit(); }}>
                        <Text style = {{fontSize : 20}}> Submit </Text>
                    </TouchableHighlight>
                    
                    <TouchableHighlight style={styles.button} id= 'Siguiente' onPress={() => { this.props.onChangeQuiz(1); }}>
                        <Text style = {{fontSize : 20}}> Siguiente </Text>
                    </TouchableHighlight>
                    
                    <TouchableHighlight style={styles.button}  id= 'Reset' onPress={() => {this.props.onReset() }}>
                        <Text style = {{fontSize : 20}}> Reset </Text>
                    </TouchableHighlight>
                
            </View >
        )
    }
}

const styles = StyleSheet.create({

    button: {
        backgroundColor: "white",
        margin:5,
        borderRadius: 10
      },

      
       prueba: {

        height: '10%',
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#e47c5d',
        borderColor: 'white',
        marginTop:10,
        

    }

});

