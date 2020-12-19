import React from 'react';
import PropTypes from 'prop-types';
import ValueDesc from '../../components/value-desc/ValueDesc';

const SummaryQuiz = ({ parsedQuestions, quizName, quizDescription }) => {
	const questionAnswers = parsedQuestions.map(({ text, answers })=>({
		question: text, answer: answers.find(({ isCorrect })=>isCorrect).text
	}));

	return (
		<div>
			<p>
				Czy wszystkie dane się zgadzają?
			</p>
			<ValueDesc value={quizName} desc="Nazwa quizu" />
			<ValueDesc value={quizDescription} desc="Opis quizu" />
			{questionAnswers.map(({ question, answer }, index)=>(
				<div className="question-answer" key={`question-answer-${index}`}>
					<div className="question">{question}</div>
					<div className="answer">{answer}</div>
				</div>
			))}
			<p>
				Jeżeli wszystko jest ok, potwierdź akcje
			</p>
		</div>
	);
};

SummaryQuiz.propTypes = {
	parsedQuestions: PropTypes.array,
	quizName: PropTypes.string,
	quizDescription: PropTypes.string,
	quizCategory: PropTypes.string
};

export default SummaryQuiz;
