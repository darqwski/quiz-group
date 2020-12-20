import React from 'react';
import PropTypes from 'prop-types';
import { useFormDataContext } from '../../../context/FormDataManager';
import WithLabel from '../../../components/forms/WithLabel';
import useQuestionFormUpdate from './useQuestionFormUpdate';

const QuestionAnswersView = ({ index }) => {
	const { formData: { [index]: question } } = useFormDataContext();
	const { updateQuestionText, updateAnswerCorrect, updateAnswerText } = useQuestionFormUpdate(index);

	return (
		<div>
			<WithLabel label={`Pytanie ${index+1}`}>
				<input value={question[0].questionText} onChange={updateQuestionText} />
			</WithLabel>
			<div className="answers">
				{Object.keys(question).map((item, answerIndex)=>(
					<div
						className={`card answer ${+question[answerIndex].isCorrect ? 'green lighten-4' :''}`}
						key={`answer-${index}-${answerIndex}`}
					>
						<WithLabel label={`Odpowiedź ${index+1}.${answerIndex+1}`}>
							<input value={question[answerIndex].answerText} onChange={updateAnswerText(answerIndex)} />
						</WithLabel>
						<button
							className="btn green"
							onClick={updateAnswerCorrect(answerIndex)}
						>
                            Oznacz poprawność
						</button>
					</div>
				))}
			</div>
		</div>
	);
};

QuestionAnswersView.propTypes = {
	index: PropTypes.number
};

export default QuestionAnswersView;
