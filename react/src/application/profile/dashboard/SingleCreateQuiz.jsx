import React from 'react';
import PropTypes from 'prop-types';
import ValueDesc from '../../../components/value-desc/ValueDesc';

const SingleCreateQuiz = ({ quizId, average, name }) => {
	const onClick = ()=>{
		window.sessionStorage.setItem('quizIdDetails',quizId);
		window.location.href='quiz-details';
	};
	const colorClassName = average < 0.3 ? 'orange' : average < 0.5 ? 'yellow' : average < 0.7 ? 'light-green' : 'green';

	return (
		<div className={`clickable created-quiz ${colorClassName} lighten-2`} onClick={onClick}>
			<ValueDesc value={name} desc="Nazwa" />
			<ValueDesc value={parseInt(average*100)+'%'} desc="Średni wynik" />
		</div>
	);
};

SingleCreateQuiz.propTypes = {};

export default SingleCreateQuiz;
