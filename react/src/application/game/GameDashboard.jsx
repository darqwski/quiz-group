import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useAppRequest from '../../hooks/useAppRequest';
import Loading from '../../components/loading/Loading';
import appRequest from '../../utils/appRequest';

/**
 *
 * GAME - FLOW
 *  1. Countdown 3,2,1
 *  2. FOR questions
 *     a) Request for questions and answers
 *     c) Give some time to answer question
 *     b) Send response
 *     c) Receive correct answer
 *  3. get sum of points
 *  4. allow to redirect
 *
 */

const PossibleAnswer = ({ answerId, text, setResult, addAnswer, refresh, setLastAnswer }) => {

	const onClick = () => {
		appRequest({
			url: '/API/game/answer/',
			data: { answer: answerId },
			method: 'POST'
		}).then(({ data: { correctAnswer: { answerId: correctAnswer }, isLastAnswer, result } })=>{
			addAnswer(correctAnswer === answerId);
			if(isLastAnswer){
				setResult(result);
				setLastAnswer(true);
				console.log("THE END?")
			} else {
				console.log("REFRESH?")
				setTimeout(refresh, 5000);
			}
		});
	};

	return (
		<button onClick={onClick}>{text}</button>
	);
};

const quizId = window.sessionStorage.getItem('quizId');

const GameDashboard = () => {
	const [lastAnswer, setLastAnswer] = useState(false);
	const [answers, setAnswers] = useState([]);
	const [result, setResult] = useState([]);
	const addAnswer = (isCorrect)=>setAnswers(state=>[...state, isCorrect]);

	const { question, loading, refresh } = useAppRequest({
		url: '/API/game/question/',
		method: 'POST',
		data: { quizId },
		name: 'question'
	});

	return loading ? <Loading/> : (
		<div>
			<p>{question?.question?.text}</p>
			<ul>
				{question?.answers.map(({ answerId, text })=>(
					<PossibleAnswer
						answerId={answerId}
						text={text}
						refresh={refresh}
						addAnswer={addAnswer}
						setResult={setResult}
					/>
				))}
			</ul>
			<div>
				<h3>Wynik</h3>
				{answers.map(i=><p>{i ? 'DOBRZE!' : "ZLE"}</p>)}
				<p>Podsumowanie</p>
				<p>{result}</p>
			</div>
		</div>
	);
};

GameDashboard.propTypes = {};

export default GameDashboard;