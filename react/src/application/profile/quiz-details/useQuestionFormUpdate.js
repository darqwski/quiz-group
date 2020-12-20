import { useFormDataContext } from '../../../context/FormDataManager';

export default (index) => {
	const { setFormData } = useFormDataContext();
	const updateQuestionText = ({ target: { value } }) => {
		setFormData(data=>({
			...data,
			[index]: {
				...data[index],
				[0]: {
					...data[index][0],
					questionText: value
				}
			}
		}));
	};
	const updateAnswerText = (answerIndex) => ({ target: { value } }) => {
		setFormData(data=>({
			...data,
			[index]: {
				...data[index],
				[answerIndex]: {
					...data[index][answerIndex],
					answerText: value

				}
			}
		}));
	};
	const updateAnswerCorrect = (answerIndex) => () => {
		setFormData(data=>{
			const answers = Object
				.keys(data[index])
				.map(key=>data[index][key])
				.map(({ answerText, answerId, questionText })=>({
					answerText, answerId, isCorrect: 0, questionText
				}))
				.reduce((memo, item, index)=>({ ...memo, [index]:item }),{});

			return ({
				...data,
				[index]: {
					...answers,
					[answerIndex]: {
						...data[index][answerIndex],
						isCorrect: true
					}
				}
			});
		});
	};

	return {
		updateQuestionText,
		updateAnswerText,
		updateAnswerCorrect
	};
};
