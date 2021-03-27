<?php

include_once "../../PHP/Database/PDOController.php";
include_once "../../PHP/Utils/DataStream.php";
include_once "../../PHP/Utils/RequestAPI.php";
include_once "../../PHP/Utils/Response.php";

session_start();

function getQuizById(){

    $quizData = (new DataStream())->getFromQuery("
    SELECT *, questions.text as questionText, answers.text as answerText FROM `quizes` 
        INNER JOIN questions ON questions.quizId = quizes.quizId 
        INNER JOIN answers ON answers.questionId = questions.questionId 
        WHERE quizes.quizId = :quizId
    ",['quizId'=>$_GET['quizId']])
        ->groupBy("questionId")
        ->toArray()
        ->get();
    $gamesData = ((new DataStream())
        ->getFromQuery("
                SELECT 
                    user_answers.answerId, 
                    user_answers.questonId, 
                    user_answers.datetime,
                    count(*) as amount
                FROM `games` 
                INNER JOIN user_answers ON user_answers.gameId = games.gameId 
                WHERE games.quizId = :quizId
                GROUP BY user_answers.answerId, user_answers.questonId
            ",['quizId'=>$_GET['quizId']]))
        ->get();

    return (new DataStream(['quizData'=>$quizData, 'gamesData'=>$gamesData]))->toJson();
}
function updateQuizById(){
    //TODO check of is creator or admin
    $data=RequestAPI::getJSON();

    PDOController::putCommand("
        UPDATE quizes SET quizes.name = :quizName, quizes.description = :quizDescription
        WHERE quizes.quizId = :quizId
    ", ['quizName'=>$data['quizName'],'quizId'=>$data['quizId'],'quizDescription'=>$data['quizDescription'],]);
    foreach ($data['questions'] as $question){
        PDOController::putCommand("
            UPDATE questions SET questions.text = :questionText WHERE questions.questionId = :questionId
        ",['questionText'=>$question['questionText'],'questionId'=>$question['questionId']]);
        foreach ($question['answers'] as $answer){
            PDOController::putCommand("
                UPDATE answers SET 
                       answers.text = :answerText, 
                       answers.isCorrect = :isCorrect
                WHERE answers.answerId = :answerId
            ", [
                'answerId'=>$answer['answerId'],
                'isCorrect'=>$answer['isCorrect'],
                'answerText'=>$answer['answerText']
            ]);
        }
    }
    return Response::message("Quiz has been updated correctly");
}
function deleteQuiz(){}


switch (RequestAPI::getMethod()) {
    case "GET":
        echo getQuizById();
        break;
    case "POST":
        break;
    case "PUT":
        echo updateQuizById();
        break;
    case "DELETE":
        echo deleteQuiz();
        break;
    default:
        break;
}
