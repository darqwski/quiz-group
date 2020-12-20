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
    if(!isset($data['quizName']) || !isset($data['quizDescription']) || !isset($data['quizCategory'])){
        return Response::message("Quiz data is missing", 400);
    }
    if(count($questions) != 5){
        return Response::message("Wrong number of questions", 400);

    }
    foreach ($questions as $question){
        if(!isset($question['answers'])){
            return Response::message("Question doesn't contain answers", 400);
        }
        if($question['answers'] != 4){
            return Response::message("Question doesn't contain proper amount of answers", 400);
        }
        $onCorrectAnswer = 0;
        foreach ($question['answers'] as $answer){
            if(isset($answer['isCorrect'])){
                $onCorrectAnswer++;
            }
        }
        if($onCorrectAnswer == 0){
            return Response::message("Question doesn't contain correct answer", 400);
        }

        if($onCorrectAnswer != 1){
            return Response::message("Question doesn't contain proper amount of correct answer", 400);
        }
    }

    $quizId = PDOController::insertCommand("
    INSERT INTO `quizes` (
        `quizId`, `name`, `description`, `creatorId`, `isActive`, `categoryId`, `created`
    ) VALUES (
      NULL, :quizName, :quizDescription, :userId, '1', :quizCategory, NOW()
    );
",[
    'quizName'=>$quiz['quizName'],
    'quizDescription'=>$quiz['quizDescription'],
    'userId'=>$_SESSION['userId'],
    'quizCategory'=>$quiz['quizCategory']
    ]);

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

    return Response::message("Quiz has been added correctly");
}

function getQuizes(){
    if(isset($_GET['categoryId'])){
        return (new DataStream())
            ->getFromQuery("
                SELECT quizes.*,c.name as categoryName FROM quizes 
                INNER JOIN categories c on quizes.categoryId = c.categoryId
                WHERE c.categoryId = :categoryId
                ",['categoryId'=>$_GET['categoryId']])
            ->toJson();
    }
}


switch (RequestAPI::getMethod()) {
    case "GET":
        echo getQuizes();
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
