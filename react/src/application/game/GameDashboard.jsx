import React from 'react';
import PropTypes from 'prop-types';
import useAppRequest from '../../hooks/useAppRequest';
import Loading from '../../components/loading/Loading';

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

const quizId = window.sessionStorage.getItem('quizId');

const GameDashboard = () => {
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
				{question?.answers.map(({ answerId, text })=>(<li>{text}</li>))}
			</ul>
		</div>
	);
};

GameDashboard.propTypes = {};

export default GameDashboard;