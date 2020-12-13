import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

export const GameContext = createContext({});
export const useGame = () => useContext(GameContext);

export const GameContextManager = ({ children }) => {
	const [lastAnswer, setLastAnswer] = useState(false);
	const [correctAnswers, setCorrectAnswers] = useState([]);
	const [questions, setQuestions] = useState([]);
	const [userAnswers, setUserAnswers] = useState([]);
	const [result, setResult] = useState([]);
	const [view, setView] = useState('countdown');
	const addCorrectAnswer = answerId=>setCorrectAnswers(state=>[...state, answerId]);
	const addUserAnswer = answerId=>setUserAnswers(state=>[...state, answerId]);
	const addQuestion = question=>setQuestions(state=>[...state, question]);
	const isCorrect = (answerId) => answerId === correctAnswers[correctAnswers.length-1];
	const points = userAnswers.filter((_, index)=> userAnswers[index] === correctAnswers[index]).length;

	return (
		<GameContext.Provider value={{
			lastAnswer,
			setLastAnswer,
			correctAnswers,
			userAnswers,
			result,
			setResult,
			view,
			setView,
			addCorrectAnswer,
			addUserAnswer,
			isCorrect,
			points,
			addQuestion,
			questions
		}}>
			{children}
		</GameContext.Provider>
	);
};

GameContextManager.propTypes = {
	children: PropTypes.node
};
