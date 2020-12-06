import React from 'react';
import PropTypes from 'prop-types';
import useAppRequest from '../../hooks/useAppRequest';
import Loading from "../../components/loading/Loading";

const quizId = window.sessionStorage.getItem('quizId');

const ReadyToPlayView = ({ quiz = {} }) => {
	const { description } = quiz;

	return(
		<div>
			<p>{description}</p>
			<h3>Aby zagrać wciśnij</h3>
			<button onClick={()=>{window.location.href='../game/';}}>Rozpocznij quiz</button>
		</div>
	)
}
const PlayedView = () => {
	return (<div>Już grałeś w ten quiz</div>)
}

const QuizDashboard = () => {
	const { quizInfo, loading } = useAppRequest({
		url:'/API/quiz-info/',
		name: 'quizInfo',
		method: 'POST',
		data: { quizId }
	});

	const { played, quiz, game } = quizInfo || {};

	return loading ? <Loading/> : (
		played ? <PlayedView quiz={quiz} game={game}/> : <ReadyToPlayView  quiz={quiz} />
	);
};

QuizDashboard.propTypes = {};

export default QuizDashboard;