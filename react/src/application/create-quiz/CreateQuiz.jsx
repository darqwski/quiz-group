import React  from 'react';
import FormDataManager, { useFormDataContext } from '../../context/FormDataManager';
import FormInput from '../../components/forms/FormInput';
import {CreateQuizManager, useCreateQuizContext} from '../../context/CreateQuizContext';
import QuestionForm from './QuestionForm';
import './create-quiz.less';
import '../../css/index.less';
import appRequest from '../../utils/appRequest';
import { useSnackbar } from '../../context/SnackBarManager';
import FormSelect from "../../components/forms/FormSelect";

const CreateQuiz = () => {
	const { formData: { quizName, quizDescription, groupId, quizCategory, questions } } = useFormDataContext();
	const { categories } = useCreateQuizContext();
	const { addSnackBar } = useSnackbar();
	const submitForm = e => {
		e.preventDefault();
		const parsedQuestions = Object.keys(questions).map(key=>questions[key]).map(question=>({
			...question,
			answers: Object.keys(question.answers).map(key=>question.answers[key])
		}));
		appRequest({
			url: '/API/quiz/',
			method: 'POST',
			data: { quiz: { quizName, quizDescription, groupId, quizCategory }, questions: parsedQuestions }
		}).then(({ data: { message } })=>addSnackBar({ text: message }));
	};

	return (
		<div className="create-quiz">
			<form onSubmit={submitForm} className="card container margin-auto">
				<div className="card-title">
					<h3>Dodawanie nowego quizu</h3>
				</div>
				<div className="card-content">
					<div className="rules">
						<p>Utwórz <strong>5</strong> pytań</p>
						<p>Dla każdego pytania dodaj <strong>4</strong> odpowiedzi</p>
						<p>W jednym pytania musi być poprawna <strong>TYLKO</strong> jedna odpowiedź</p>
					</div>
					<div>
						<h4>Dane quizu</h4>
						<div className="form-description">
							<p>Nazwa quizu jest nazwą wyświetlaną dla innych użytkowników</p>
							<p>Opis quizu jest wyświetlany po wybraniu quizu, jest pokazywany na stronie szczegółów quizu</p>
							<p>Grupa dla quizu określa czy quiz będzie dostępny w obrębie grupy, lub będzie dostępny publiczny</p>
							<p>Kategoria quizu pozwala zainteresowanym użytkownikom na szybsze znalezienie quizu</p>
						</div>
						<FormInput name="quizName" label="Nazwa quizu" />
						<FormInput name="quizDescription" label="Opis quizu" />
						<FormSelect name="quizCategory" label="Kategoria quizu" data={categories} />
						<h4>Dane pytań</h4>
						<div className="questions">
							{Array.from({ length: 5 }).map((_,i)=>(
								<QuestionForm index={i} key={`question-${i}`} />
							))}
						</div>
					</div>
				</div>
				<div className="card-action">
					<button type="submit" className="btn-large green"> Zapisz quiz </button>
				</div>
			</form>
		</div>
	);
};

CreateQuiz.propTypes = {};

const CreateQuizWithContext = () => (
	<FormDataManager initialData={{ questions: {} }}>
		<CreateQuizManager>
			<CreateQuiz/>
		</CreateQuizManager>
	</FormDataManager>
);

export default CreateQuizWithContext;