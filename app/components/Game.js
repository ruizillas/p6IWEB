import React from 'react';
import { connect } from 'react-redux';
import ActionBar from './ActionBar';
import { changeQuiz, submit , initQuizzes, anteriorQuiz} from '../redux/actions';
import Lista from "./ListaQuizzes";
import usuario from '../assets/perfildeusuario.jpg';
import none from '../assets/none.png';
import {Text, View, Button, StyleSheet, Image, TextInput} from 'react-native';




const token = "9f840f6c3926aa427da7";
const url = "https://core.dit.upm.es/api/quizzes/random10wa?token="+token;




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
            .catch(error =>{
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
  	if(this.state.timer === 0){
  		this.props.dispatch(submit(this.props.quizzes));
  	}

    this.setState((prevstate) => ({ timer: prevstate.timer-1 }));
  };


	render() {
		
		if (this.props.quiz === null){
		 	return (
		 	<View>
		 		<Text>Vacio</Text>
		 	</View>
		)}else{
		
		let url1 = 2;
		let img2 = this.props.quiz.author.photo.url;

		return (
			<View style={styles.game}>

				<View  style={{flex: 1, height: 50, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', backgroundColor:  'purple'}}>

				{this.props.quizzes.map((v, i) => i).map(quiz => {

					return <Lista key={"quiz" + quiz} quiz={quiz} selected={quiz === this.props.currentQuiz}
						action={() => this.props.dispatch(changeQuiz(quiz), anteriorQuiz(quiz))} />
				})}

				</View>

				<Text>
			    {this.state.timer === 0 ? '¡Se acabó el tiempo!' : this.state.timer }
			    </Text>


				<View style={styles.pregunta}>
					<Text style= {{fontSize: 20, fontWeight: 'bold'}}>{this.props.quiz.question}</Text>
					<Image  style={styles.logo} source={{uri: this.props.quiz.attachment.url}} alt='Foto de la ciudad' />
				</View>
				

				<View style={styles.respuesta}>
					<TextInput
					 	style={{ height: 25, borderColor: 'gray', borderWidth: 1 }}
						placeholder='Escriba su respuesta'
						value={this.props.quiz.userAnswer || ''}
						onChangeText={(e) => this.props.onQuestionAnswer(e)} />
					<Text style= {{fontSize: 15, fontWeight: 'bold'}}>   Autor: {this.props.quiz.author === null || this.props.quiz.author.username === null ? 'Unknown' : this.props.quiz.author.username}</Text>
					<Image style={styles.logo} source={{uri: this.props.quiz.author.photo.url}} alt='Foto del Autor' />

				</View>

				<ActionBar
					onAnteriorQuiz={(n) => { this.props.dispatch(anteriorQuiz(this.props.currentQuiz - n)) }}
					onChangeQuiz={(n) => { this.props.dispatch(changeQuiz(this.props.currentQuiz + n)) }}
					onSubmit={() => { this.props.dispatch(submit(this.props.quizzes)) }}
					score={this.props.score}
					onReset={() => {this.componentDidMount()}}
				/>



			</View>
		);
	}
}}
function mapStateToProps(state) {
	return {
		...state
	};
}

const styles = StyleSheet.create({
	game: {
			flex: 1,
			margin: 50,
			backgroundColor:  'lightblue',
			justifyContent:	'center'
	},

	pregunta: {

	},

	respuesta: {

	},
	logo: {
    width: 66,
    height: 58,
  }

});
export default connect(mapStateToProps)(Game);