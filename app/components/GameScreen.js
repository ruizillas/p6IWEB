import React, { Component } from 'react';
import Game from "./Game";
import Puntuacion from "./Puntuacion";
import { connect } from 'react-redux';
import { questionAnswer, changeQuiz, initQuizzes } from '../redux/actions';
import { View, Text } from 'react-native';


 const token = "9f840f6c3926aa427da7";
 const url = "https://core.dit.upm.es/api/quizzes/random10wa?token="+token;


class GameScreen extends Component {

  render(){
      if(this.props.finished!==false){
        return(
          <View>
            <Puntuacion score = {this.props.score}
            finished={this.props.finished}
            />
          </View>
          );

  } else{
  return (

      <View style ={{flex: 1, margin: 10}}>
      <Game 
          quiz={this.props.quizzes[this.props.currentQuiz]}
          onQuestionAnswer={(answer)=>{this.props.dispatch(questionAnswer(this.props.currentQuiz, answer))}}
        />
      </View>
   
  );
}}}


function mapStateToProps(state) {
  return {
    ...state
  };
}

export default connect(mapStateToProps)(GameScreen);

