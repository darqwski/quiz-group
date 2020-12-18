<?php

include_once "../../PHP/Database/PDOController.php";
include_once "../../PHP/Utils/DataStream.php";
include_once "../../PHP/Utils/RequestAPI.php";

session_start();

function getQuizInfo(){
    $userId = isset($_SESSION['userId']) ? $_SESSION['userId'] : null;
    $quizId = RequestAPI::getJSON()['quizId'];

    $game = PDOController::getCommand("
        SELECT * FROM games
        WHERE games.quizId = :quizId AND games.userId = :userId
    ", ["quizId"=>$quizId, "userId"=>$userId]);

    $quiz = PDOController::getCommand("
        SELECT quizes.name, count(q.quizId)  as numberOfQuestions, quizes.description, c.name as `category` FROM quizes
        INNER JOIN questions q on quizes.quizId = q.quizId
        INNER JOIN categories c on quizes.categoryId = c.categoryId
        WHERE quizes.quizId = :quizId
    ", ["quizId"=>$quizId]);

    if(count($game) == 0){
        return (new DataStream([
            "played"=>false,
            "quiz"=>$quiz[0]
        ]))->toJson();
    } else {
        return (new DataStream([
            "played"=>true,
            "game" => $game[0],
            "quiz"=>$quiz[0]
        ]))->toJson();
    }
}

switch (RequestAPI::getMethod()) {
    case "GET":
        break;
    case "POST":
        echo getQuizInfo();
        break;
    case "PUT":
        break;
    case "DELETE":
        break;
    default:
        break;
}
