import React from 'react';
import PropTypes from 'prop-types';
import appRequest from '../../utils/appRequest';
import { useGame } from './GameContext';

const PossibleAnswer = ({ answerId, text, setStop, stop }) => {
	const { addCorrectAnswer, addUserAnswer, setLastAnswer, questions, userAnswers, isCorrect } = useGame();
	const isQuestionAnswered = questions.length === userAnswers.length;
	const className = !isQuestionAnswered ? 'light-blue' :isCorrect(answerId) ? 'green' : 'red';
	const onClick = () => {
		if(stop){
			return;
		}
		appRequest({
			url: '/API/game/answer/',
			data: { answer: answerId },
			method: 'POST'
		}).then(({ data: { correctAnswer: { answerId: correctAnswer }, isLastAnswer } })=>{
			addCorrectAnswer(correctAnswer);
			addUserAnswer(answerId);
			setLastAnswer(isLastAnswer);
			setStop(true);
		});
	};

	return (
		<div className={`game-answer clickable white-text ${className} darken-4`} onClick={onClick}>{text}</div>
	);
};

PossibleAnswer.propTypes = {
	answerId: PropTypes.string,
	text: PropTypes.string,
	stop: PropTypes.bool,
	setStop: PropTypes.func
};

export default PossibleAnswer;
