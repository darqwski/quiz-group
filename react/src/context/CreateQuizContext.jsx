import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useFormDataContext } from './FormDataManager';
import useAppRequest from '../hooks/useAppRequest';
import Loading from '../components/loading/Loading';

export const CreateQuizContext = React.createContext({});

export const useCreateQuizContext = () => useContext(CreateQuizContext);


export const CreateQuizManager = ({ children }) => {
	const { setFormData } = useFormDataContext();
	const editQuestionField = (name, index) => ({ target: { value } }) => {
		setFormData(data=>({ ...data, questions: { ...data.questions, [index]: {
			...data.questions[index], [name] : value
		} } }));
	};
	const { data, loading } = useAppRequest({ url: '/API/category/' });
	const categories = (data||[]).map(({name, categoryId})=>({value: categoryId, text: name}))
	const editAnswerField = (name, questionIndex, answerIndex) => ({ target: { value } }) => {
		const clearAnswers = name === 'isCorrect';
		setFormData(data=>{
			const answers = (data.questions[questionIndex]?.answers || {});
			const clearedAnswers = Object.keys(answers).map(key=>({ text: answers[key].text }));
			const newAnswer = {
				...(answers[answerIndex] || {}),
				[name]: value || true
			};

			return ({ ...data, questions: { ...data.questions, [questionIndex]: {
				...(data.questions[questionIndex] || {}), answers: {
					...(clearAnswers ? clearedAnswers: answers), [answerIndex]: newAnswer
				}
			} } });
		});
	};


	return (
		<CreateQuizContext.Provider value={{ editQuestionField, editAnswerField, categories }}>
			{loading ? <Loading/> : children}
		</CreateQuizContext.Provider>
	);
};

CreateQuizManager.propTypes = {
	children: PropTypes.any
};
