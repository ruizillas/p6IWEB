import { quizzes } from "../assets/mock-data";
import { Provider } from 'react-redux';
import GlobalState from './reducers';
import { createStore } from 'redux';
import {Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';

import React from 'react';
import GameScreen from '../components/GameScreen';
import Inicio from '../components/Inicio';

const Stack = createStackNavigator();

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
          <NavigationContainer> 
           <Stack.Navigator initialRouteName="Inicio"> 
              <Stack.Screen name="Inicio" component={Inicio} />
              <Stack.Screen name="GameScreen" component={GameScreen} /> 
           </Stack.Navigator> 
          </NavigationContainer>
			</Provider>
		);
	}
	configureStore() {
		return createStore(GlobalState, this.initialState);
	}
}
