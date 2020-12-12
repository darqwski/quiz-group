import React from 'react';
import PropTypes from 'prop-types';
import { useCreateQuizContext } from '../../context/CreateQuizContext';
import { useFormDataContext } from '../../context/FormDataManager';
import WithLabel from '../../components/forms/WithLabel';

const AnswerForm = ({ questionIndex, answerIndex }) => {
	const { editAnswerField } = useCreateQuizContext();
	const { formData } = useFormDataContext();
	const { questions = {} } = formData;
	const { answers = {} } = questions[questionIndex] || {};
	const { isCorrect } = answers[answerIndex] || {};
	return (
		<div className={`card answer ${isCorrect ? 'green lighten-4' :''}`}>
			<h6> Odpowiedź {questionIndex}.{answerIndex}</h6>
			<WithLabel label="Treść pytania">
				<input onChange={editAnswerField('text', questionIndex, answerIndex)}/>
			</WithLabel>
			<a
				className="btn green lighten-2"
				onClick={editAnswerField('isCorrect', questionIndex, answerIndex)}
			>Oznacz poprawność</a>
		</div>
	);
};

AnswerForm.propTypes = {
	questionIndex: PropTypes.number.isRequired,
	answerIndex: PropTypes.number.isRequired
};

export default AnswerForm;