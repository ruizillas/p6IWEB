import { quizzes } from "../assets/mock-data";
import { Provider } from 'react-redux';
import GlobalState from './reducers';
import { createStore } from 'redux';
import {Text} from 'react-native';

import React from 'react';
import GameScreen from '../components/GameScreen';

export default class ReduxProvider extends React.Component {
	constructor(props) {
		super(props);
		this.initialState = {
			score: 0,
			finished: false,
			currentQuiz: 0,
			quizzes: [ ...quizzes ] 
		};
		this.store = this.configureStore();
	}
	render() {
		return (
			<Provider store={ this.store }>
				<Text style={{ height: '100%' }} >
					<GameScreen />
				</Text>
			</Provider>
		);
	}
	configureStore() {
		return createStore(GlobalState, this.initialState);
	}
}