import React from 'react';
import PropTypes from 'prop-types';

const SingleQuiz = ({ quizId, name, description, categoryName,result }) => {
	const onClick=()=>{
		window.sessionStorage.setItem('quizId',quizId);
		console.log(quizId)
		console.log(window.sessionStorage.getItem('quizId'))

		window.location.href='../quiz/';
	};
	//TODO jakiś widok dla punktów
	return (
		<div className="single-quiz card clickable" onClick={onClick}>
			<div className="card-title">{name}</div>
			<div className="card-content">{description}</div>
			<div className="single-quiz-category">{categoryName}</div>
			<p>{result}</p>
		</div>
	);
};

SingleQuiz.propTypes = {
	quizId:PropTypes.string,
	name:PropTypes.string,
	description:PropTypes.string,
	categoryName:PropTypes.string
};

export default SingleQuiz;
