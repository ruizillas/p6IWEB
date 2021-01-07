import React from 'react';
import {Text, View, Image, StyleSheet } from 'react-native';
import { questionAnswer, changeQuiz, initQuizzes} from '../redux/actions';
import looser from '../assets/looser.png'
import ganador from '../assets/ganador.jpg'

const token = "9f840f6c3926aa427da7";
const url = "https://core.dit.upm.es/api/quizzes/random10wa?token="+token;

export default class Puntuacion extends React.Component {
    render() {
        return (
            <View>

                <Text>     Tu puntuación final es: {this.props.score} </Text>
                <Image source={this.props.score < 5 ? looser : ganador} />
            </View>
        );
    }
}