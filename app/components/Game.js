import React from 'react';
import { connect } from 'react-redux';
import ActionBar from './ActionBar';
import { changeQuiz, submit, initQuizzes, anteriorQuiz } from '../redux/actions';
import Lista from "./ListaQuizzes";


import { Text, Dimensions, View, Button, StyleSheet, Image, TextInput, TouchableHighlight } from 'react-native';


const token = "9f840f6c3926aa427da7";
const url = "https://core.dit.upm.es/api/quizzes/random10wa?token=" + token;




export class Game extends React.Component {

	constructor(props) {
		super(props);
		this.state = { timer: 120 };
	}

	componentDidMount() {
		this.state.timer = 120;
		fetch(url)
			.then(res => res.json())
			.then(json => {
				this.props.dispatch(initQuizzes(json))
			})
			.catch(error => {
				console.log(error)
			});
		this.clockCall = setInterval(() => {
			this.decrementClock();
		}, 1000);
	}

	componentWillUnmount() {
		clearInterval(this.clockCall);
	}

	decrementClock = () => {
		if (this.state.timer === 0) {
			this.props.dispatch(submit(this.props.quizzes));
		}

		this.setState((prevstate) => ({ timer: prevstate.timer - 1 }));
	};


	render() {

		if (this.props.quiz === null) {
			return (
				<View>
					<Text>Vacio</Text>
				</View>
			)

		} else {
			let none ="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.seton.es%2Fpictograma-rollo-iso-7010-prohibido-tomar-fotografias-p029.html&psig=AOvVaw2Ni_4ajrlEFz8JcCeAWJxr&ust=1610205421841000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCPjRuOPQjO4CFQAAAAAdAAAAABAD";
			let usuario ="https://www.google.com/url?sa=i&url=https%3A%2F%2Fdefinicion.de%2Fperfil-de-usuario%2F&psig=AOvVaw3cwwb7VYSTELYh3dkPZULx&ust=1610205692158000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCNiVieXRjO4CFQAAAAAdAAAAABAD";

			let imagenusuario = this.props.quiz.author === null || this.props.quiz.author.photo === null || this.props.quiz.author.photo.url === null ? usuario : this.props.quiz.author.photo.url ;
			let imagenquiz = this.props.quiz.attachment === null || this.props.quiz.attachment.url === null ? none : this.props.quiz.attachment.url;


			return (
				<View style={styles.game}>

					<View style={styles.listaQuizzes}>

						{this.props.quizzes.map((v, i) => i).map(quiz => {

							return <Lista key={"quiz" + quiz} quiz={quiz} selected={quiz === this.props.currentQuiz}
								action={() => this.props.dispatch(changeQuiz(quiz))} />
						})}

					</View>

					<Text style={styles.tiempo}>
						{this.state.timer === 0 ? '¡Se acabó el tiempo!' : this.state.timer}
					</Text>


					<View style={styles.pregunta}>
						<Text style={{ fontSize: 20, fontWeight: 'bold' }}>{this.props.quiz.question}</Text>
						<Image style={styles.imagenPregunta} source={{uri: imagenquiz }} />
					</View>


					<View style={styles.respuesta}>
						<TextInput
							style={styles.textInput}
							placeholder='Escriba su respuesta'
							value={this.props.quiz.userAnswer || ''}
							onChangeText={(e) => this.props.onQuestionAnswer(e)} />
						<Text style={{ fontSize: 15, fontWeight: 'bold' }}>   Autor: {this.props.quiz.author === null || this.props.quiz.author.username === null ? 'Unknown' : this.props.quiz.author.username}</Text>
						<Image style={styles.logoSanti} source={{ uri: imagenusuario }}/>

					</View>

					<ActionBar
						onAnteriorQuiz={(n) => { this.props.dispatch(anteriorQuiz(this.props.currentQuiz - n)) }}
						onChangeQuiz={(n) => { this.props.dispatch(changeQuiz(this.props.currentQuiz + n)) }}
						onSubmit={() => { this.props.dispatch(submit(this.props.quizzes)) }}
						score={this.props.score}
						onReset={() => { this.componentDidMount() }}
					/>

				</View>
			);
		}
	}
}
function mapStateToProps(state) {
	return {
		...state
	};
}

const styles = StyleSheet.create({
	game: {
		
		flexDirection: 'column',
		width: Dimensions.get('window').width,
		justifyContent:	'center',
		backgroundColor: '#f0ddaa',
	},
	tiempo:{
		color: '#142b3b',
		fontSize: 20,
		fontWeight: 'bold' 


},

	pregunta: {
		alignItems: 'center',
		color: '#142b3b'

	},

	textInput: {
		height: 40,
		borderColor: 'purple',
		borderWidth: 1,
		borderRadius: 10,
		width: '90%',
		padding: 5
	},

	listaQuizzes: {

		height: '10%',
		padding: 10,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		backgroundColor: '#e47c5d',
		borderColor: 'white',
		marginTop:10,

	},

	respuesta: {
		alignItems: 'center',
		marginBottom: 10
	},
	imagenPregunta: {
		justifyContent: 'center',
		width: '90%',
		borderRadius: 20,
		height: 206,
		marginBottom: 10,
		marginTop: 10

	},
	logoSanti: {
		width: '20%',
		height: 100,
		alignItems: 'center',
		borderRadius: 30
	}
});
export default connect(mapStateToProps)(Game);