<?php

include_once "../../PHP/Database/PDOController.php";
include_once "../../PHP/Utils/DataStream.php";
include_once "../../PHP/Utils/RequestAPI.php";
include_once "../../PHP/Utils/Response.php";

session_start();

function createQuiz() {
    $data = RequestAPI::getJSON();
    $questions = $data['questions'];
    $quiz = $data['quiz'];
    $quizId = PDOController::insertCommand("
    INSERT INTO `quizes` (
        `quizId`, `name`, `description`, `groupId`, `creatorId`, `isActive`, `categoryId`, `created`
    ) VALUES (
      NULL, :quizName, :quizDescription, :groupId, :userId, '1', :quizCategory, NOW()
    );
",[
    'quizName'=>$quiz['quizName'],
    'quizDescription'=>$quiz['quizDescription'],
    'groupId'=>$quiz['groupId'],
    'userId'=>$_SESSION['userId'],
    'quizCategory'=>$quiz['quizCategory']
    ]);
    //TODO walidacja ilości pytań === 5,
    //TODO walidacja ilość odpowiedzi per pytanie === 4,
    //TODO walidacja ilość odpowiedzi poprawnych odpowiedzi per pytanie === 1,
    foreach ($questions as $question){
        $questionId=PDOController::insertCommand("
        INSERT INTO `questions` (`questionId`, `quizId`, `text`, `type`) 
        VALUES (NULL, :quizId, :questionText, :questionType);",
            ["quizId"=>$quizId,"questionText"=>$question['text'],"questionType"=>$question['type']]);
        foreach ($question['answers'] as $answer){
            $isCorrect = 0;
            if(isset($answer['isCorrect'])){
                $isCorrect = 1;
            }
            PDOController::insertCommand("
                INSERT INTO `answers` (`answerId`, `text`, `isCorrect`, `questionId`) 
                VALUES (NULL, :text, :isCorrect, :questionId);
            ", ["text"=>$answer['text'], "isCorrect"=>$isCorrect,"questionId"=>$questionId]);
        }
    }

    echo Response::message("Quiz has been added correctly");
}

switch (RequestAPI::getMethod()) {
    case "GET":
        break;
    case "POST":
        echo createQuiz();
        break;
    case "PUT":
        break;
    case "DELETE":
        break;
    default:
        break;
}