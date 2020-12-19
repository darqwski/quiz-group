import React from 'react';
import PropTypes from 'prop-types';
import { useCreateQuizContext } from '../../context/CreateQuizContext';
import WithLabel from '../../components/forms/WithLabel';
import AnswerForm from './AnswerForm';

const QuestionForm = ({ index }) => {
	const { editQuestionField } = useCreateQuizContext();
	return (
		<div className="question">
			<h5>Pytanie {index + 1}</h5>
			<WithLabel label="Treść pytania">
				<input onChange={editQuestionField('text', index)}/>
			</WithLabel>
			<input onChange={editQuestionField('type', index)} type="hidden" value="1" />
			<h5>Odpowiedzi {index + 1}</h5>
			<div className="answers">
				{Array.from({ length: 4 }).map((_,i)=>(
					<AnswerForm questionIndex={index} answerIndex={i} key={`answer-${index}-${i}`} />
				))}
			</div>
		</div>
	);
};


QuestionForm.propTypes = {
	index: PropTypes.number.isRequired
};

export default QuestionForm;
