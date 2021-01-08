import { combineReducers } from 'redux';
import { QUESTION_ANSWER, CHANGE_QUIZ, SUBMIT, INIT_QUIZZES, ANTERIOR_QUIZ } from './actions';

function score(state = 0, action = {}) {
	switch (action.type) {
		case SUBMIT:
			let result = 0;
			let acertadas = [];
			for (let i = 0; i < action.payload.quizzes.length; i++) {
				
				if ((acertadas.includes(action.payload.quizzes[i]) === false) && String(action.payload.quizzes[i].answer).toLowerCase() === String(action.payload.quizzes[i].userAnswer).toLowerCase()) {
					acertadas.push(action.payload.quizzes[i]);
				}
			}
			state = acertadas.length;
			return state;
			
		case INIT_QUIZZES:
			state = 0;
			return state;
		
		default:
			return state;
	}
}

function finished(state = false, action = {}) {
	switch (action.type) {
		case SUBMIT:
			return state = true;
		case INIT_QUIZZES:
			return state = false;
		
		default:
			return state;
	}
}

function currentQuiz(state = 0, action = {}) {
	switch (action.type) {
		case CHANGE_QUIZ:
				
				if(state<9){
					state = action.payload;
				
				}
			return state;
		case ANTERIOR_QUIZ:
				if(state > 0){
				state = state - 1;
			}
			return state;

		default:
			return state;
			}
			

		}

		


function quizzes(state = [], action = {}) {
	switch (action.type) {
		case QUESTION_ANSWER:
			return state.map((quiz, i) => {
				return {
					...quiz,
					userAnswer: action.payload.index === i ? action.payload.answer : quiz.userAnswer
				}
			})
			
		/*case INIT_QUIZZES:
			document.getElementById('Anterior').disabled = true;
			return state = action.payload.quizzes
		*/
		default:
			return state;
	}
}


const GlobalState = (combineReducers({
	score,
	finished,
	currentQuiz,
	quizzes
}));

export default GlobalState;