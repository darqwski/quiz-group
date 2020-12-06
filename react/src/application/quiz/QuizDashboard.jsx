import React from 'react';
import PropTypes from 'prop-types';
import useAppRequest from '../../hooks/useAppRequest';
import Loading from "../../components/loading/Loading";

const quizId = window.sessionStorage.getItem('quizId');

const QuizDashboard = () => {
	const { quizInfo, loading } = useAppRequest({
		url:'/API/quiz-info/',
		name: 'quizInfo',
		method: 'POST',
		data: { quizId }
	});


	return loading ? <Loading/> : (
		<div>QuizDashboard</div>
	);
};

QuizDashboard.propTypes = {};

export default QuizDashboard;