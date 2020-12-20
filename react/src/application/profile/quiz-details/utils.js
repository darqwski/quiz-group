export const prepareData = (formData) => {
	const { quizName, quizDescription, quizId, ...rest } = formData;
	const questions = Object.keys(rest).map(key=>rest[key]).map(question=>{
		const answers = Object.keys(question).map(key=>question[key]).map(({ answerId, answerText, isCorrect })=>({
			answerId, answerText, isCorrect
		}));
		const questionText = question[0].questionText;
		const questionId = question[0].questionId;

		return {
			questionId,
			questionText,
			answers
		};
	});
	return {
		quizName,
		quizDescription,
		quizId,
		questions
	};
};

export const parseDataToObject = data => ({
	...data.reduce((questionMemo, questionItem, questionIndex)=>({
		...questionMemo,
		[questionIndex]: {
			...questionItem.reduce((answerMemo, answerItem, answerIndex)=>({
				...answerMemo, [answerIndex]: answerItem
			}),{}),
		}
	}),{}),
	quizId: data[0][0].quizId,
	quizName: data[0][0].name,
	quizDescription: data[0][0].description,
});

export const isAnyChanges = (data, formData) => {
	if(data[0][0].name !== formData.quizName) {
		return true;
	}
	if(data[0][0].description !== formData.quizDescription) {
		return true;
	}
	for(let questionIndex = 0; questionIndex<data.length; questionIndex++) {
		if(data[questionIndex][0].questionText !== formData[questionIndex][0].questionText){
			return true;
		}
		for(let answerIndex = 0; answerIndex < data[questionIndex].length; answerIndex++){
			if( +data[questionIndex][answerIndex].isCorrect !== +formData[questionIndex][answerIndex].isCorrect){
				return true;
			}
			if(data[questionIndex][answerIndex].answerText !== formData[questionIndex][answerIndex].answerText){
				return true;
			}
		}
	}
	return false;
};
