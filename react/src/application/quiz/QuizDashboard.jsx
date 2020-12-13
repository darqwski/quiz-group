import React from 'react';
import useAppRequest from '../../hooks/useAppRequest';
import Loading from '../../components/loading/Loading';
import { Button } from 'react-materialize';
import './quiz-dashboard.less';

const quizId = window.sessionStorage.getItem('quizId');

const QuizDashboard = () => {
	const { quizInfo, loading } = useAppRequest({
		url:'/API/quiz-info/',
		name: 'quizInfo',
		method: 'POST',
		data: { quizId }
	});
	const { quiz } = quizInfo || {} ;
	const { description, name, category } = quiz || {};

	return loading ? <Loading/> : (
		<div className="ready-to-play">
			<div className="ready-to-play-name blue darken-4 white-text">{name}</div>
			<div className="ready-to-play-description">{description}</div>
			<div className="ready-to-play-details">
				<p>Kategoria : {category}</p>
			</div>
			<div className="ready-to-play-main">
				{
					quizInfo?.played ? (
						<p>Quiz został już rozwiazany</p>
					) : (
						<Button
							flat
							onClick={()=>{window.location.href='../game/';}}
						>
							START
						</Button>
					)
				}
			</div>
		</div>
	);
};

QuizDashboard.propTypes = {};

export default QuizDashboard;