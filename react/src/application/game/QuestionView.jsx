import React, { useEffect, useState } from 'react';
import useAppRequest from '../../hooks/useAppRequest';
import PossibleAnswer from './PossibleAnswer';
import TimeLoader from './TimeLoader';
import { useGame } from './GameContext';

const quizId = window.sessionStorage.getItem('quizId');

const QuestionView = () => {
	const {  points, lastAnswer, userAnswers, addQuestion, setView } = useGame();
	const [ stop, setStop ] = useState(false);
	const { question, refresh } = useAppRequest({
		url: '/API/game/question/',
		method: 'POST',
		data: { quizId },
		name: 'question'
	});
	useEffect(()=>{
		if(question)
			addQuestion(question);
	},[question]);

	useEffect(()=>{
		if(!stop)return;

		setTimeout(()=>{
			if(!lastAnswer) {
				refresh();
				setStop(false);
			} else {
				setView('final');
			}
		}, 3000);
	}, [stop]);

	return (
		<div className="game-container">
			<div className="game-title blue darken-4 white-text">
                Pytanie {userAnswers?.length}/5
			</div>
			<div className="game-question ">
				{question?.question.text}
			</div>
			<div className="game-loader">
				<TimeLoader time={20} stop={stop} />
			</div>
			<div className="game-answers ">
				{question && question.answers.map(({ answerId, text })=>(
					<PossibleAnswer
						key={`answer-${answerId}`}
						answerId={answerId}
						text={text}
						refresh={refresh}
						setStop={setStop}
						stop={stop}
					/>
				))}
			</div>
			<div className="game-border blue darken-4" />
			<div className="game-result ">Aktualny wynik to {points}/5</div>
		</div>
	);
};

QuestionView.propTypes = {};

export default QuestionView;
