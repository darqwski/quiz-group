import React, { useEffect } from 'react';
import FormDataManager, { useFormDataContext } from '../../../context/FormDataManager';
import Loading from '../../../components/loading/Loading';
import useAppRequest from '../../../hooks/useAppRequest';
import FormInput from '../../../components/forms/FormInput';
import appRequest from '../../../utils/appRequest';
import { useSnackbar } from '../../../context/SnackBarManager';
import { isAnyChanges, parseDataToObject, prepareData } from './utils';
import QuestionAnswersView from './QuestionAnswersView';

const QuizDetails = () => {
	const quizId = window.sessionStorage.getItem('quizIdDetails');
	const { data, loading } = useAppRequest({
		url: `/API/quiz-details/?quizId=${quizId}`,
	});
	const { setFormData, formData } = useFormDataContext();
	const { addSnackBar } = useSnackbar();
	useEffect(()=>{
		if(data){
			// Parse array to object
			setFormData(parseDataToObject(data));
		}
	}, [data]);

	const onFormSave = () => {
		if(isAnyChanges(data, formData)){
			appRequest({
				url:'/API/quiz-details/',
				data: prepareData(formData),
				method: 'PUT'
			}).then(({ data: { message } })=>{
				addSnackBar({ text: message });
			});
		} else {
			addSnackBar({ text: 'Nie dokonano żadnych zmian' });
		}

	};
	return loading ? <Loading/> : (
		<div className="edit-quiz card container">
			<h3>Panel edycji quizu</h3>
			<div>
				<FormInput name="quizName" label="Nazwa quizu" />
				<FormInput name="quizDescription" label="Opis quizu" />
				{data && data.map((item, index)=>(
					<QuestionAnswersView
						index={index}
						key={`QuestionAnswersView-${index}`}
					/>
				))}
			</div>
			<button className="btn-large green darken-4" onClick={onFormSave}>Zapisz formularz</button>
			<a className="btn-flat" href="../..">Wróć do profilu</a>
		</div>
	);
};

QuizDetails.propTypes = {};

export default ()=> (
	<FormDataManager>
		<QuizDetails />
	</FormDataManager>
);
