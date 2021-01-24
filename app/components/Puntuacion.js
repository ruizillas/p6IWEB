
import React from 'react';
import {Text, View, Image, StyleSheet, Dimensions } from 'react-native';
import { questionAnswer, changeQuiz, initQuizzes} from '../redux/actions';
import looser from '../assets/looser.png'
import ganador from '../assets/ganador.jpg'
 

const token = "9f840f6c3926aa427da7";
const url = "https://core.dit.upm.es/api/quizzes/random10wa?token="+token;

export default class Puntuacion extends React.Component {
    render() {
        return (
        	
            <View style ={styles.puntuacion}>

			
					<View style={styles.listaQuizzes}>
						<Text style={{ fontSize: 20, fontWeight: 'bold' ,color: 'black', alignItems:	'center', marginTop: 50}}>Tu puntuación final es: {this.props.score}</Text>
					</View>

                <Image	style={styles.imagen} source={this.props.score < 5 ? looser : ganador} />
            </View>
            
        );
    }
}
 const styles = StyleSheet.create({
	puntuacion: {
		
		width: Dimensions.get('window').width,
		justifyContent:	'center',	
		backgroundColor: 'lightblue',

	},
	listaQuizzes: {
		alignItems: 'center',
		marginTop:10
	},
		imagen: {
		justifyContent: 'center',
		width: '100%',
		borderRadius: 20,
		height: 500,
		marginBottom: 10,
		marginTop: 10,
		resizeMode:'contain'

	}

});