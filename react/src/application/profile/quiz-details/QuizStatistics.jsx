import React from 'react';
import PropTypes from 'prop-types';


const QuizStatistics = ({ gamesData, quizData }) => {
	const uniqueQuestionIds = Object.keys(gamesData.reduce((memo, item)=>({ ...memo, [item.questonId]: item.questonId }), {})).map(i=>i);
	const uniqueAnswerIds = Object.keys(gamesData.reduce((memo, item)=>({ ...memo, [item.answerId]: item.answerId }), {})).map(i=>i);
	const answersTable = gamesData.reduce((memo, item)=>({
		...memo, [item.questonId]: {
			...(memo[item.questonId] || {}),
			[item.answerId]: item
		}
	}),{});
	const flatQuizData = quizData.reduce((memo, item)=>[...memo, ...item],[]);

	return (
		<div>{uniqueQuestionIds.map(
			(uniqueQuestionId)=>(
				<div key={uniqueQuestionId}>
					<h5>{flatQuizData.find(({ questionId })=>questionId === uniqueQuestionId).questionText}</h5>
					<div className="flex ">
						{uniqueAnswerIds.map(uniqueAnswerId=>(answersTable[uniqueQuestionId][uniqueAnswerId] && (
							<div className="flex-grow" key={uniqueAnswerId}>
								<p>{flatQuizData.find(({ answerId })=>answerId === uniqueAnswerId).answerText}</p>
								<p>{answersTable[uniqueQuestionId][uniqueAnswerId].amount}</p>
							</div>
						)))}
					</div>
				</div>
			)
		)
		}
		</div>
	);
};

QuizStatistics.propTypes = {
	gamesData: PropTypes.array,
	quizData: PropTypes.array,
};

export default QuizStatistics;
