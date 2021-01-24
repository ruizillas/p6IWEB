import React, { Component } from 'react';
import Game from "./Game";
import Puntuacion from "./Puntuacion";
import { connect } from 'react-redux';
import { questionAnswer, changeQuiz, initQuizzes, submit } from '../redux/actions';
import { View, Text, StyleSheet, TouchableHighligh } from 'react-native';
import MyButton from './my_button';


 const token = "9f840f6c3926aa427da7";
 const url = "https://core.dit.upm.es/api/quizzes/random10wa?token="+token;


class GameScreen extends React.Component {

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

  render(){
      if(this.props.finished!==false){
        return(
          <View>
            <Puntuacion score = {this.props.score}
            finished={this.props.finished}
            />
           <MyButton
            onPress={() => this.componentDidMount()}
            text={"Reset"}/>
          </View>
          );


  } else{
  return (
      <View style ={{flex:1}}>
      <Game  quiz={this.props.quizzes[this.props.currentQuiz]}
          onQuestionAnswer={(answer)=>{this.props.dispatch(questionAnswer(this.props.currentQuiz, answer))}}
        />
      <MyButton
onPress={() => this.props.navigation.goBack()}
text={"Go back"}/>

      </View>

   
  );
}}}


function mapStateToProps(state) {
  return {
    ...state
  };
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#eee',
    fontSize: 25,
    textAlign: 'center',
    padding: 10
  }
});

export default connect(mapStateToProps)(GameScreen);