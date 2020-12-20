<?php


include_once "../../../PHP/Database/PDOController.php";
include_once "../../../PHP/Utils/DataStream.php";
include_once "../../../PHP/Utils/RequestAPI.php";
include_once "../../../PHP/Utils/Response.php";

session_start();

define('PAGE_SIZE', 50);

function getQuizes() {
    $page = isset($_GET['page']) ? $_GET['page'] : 0;

    return (new DataStream())->getFromQuery("
        SELECT quizes.isActive, quizes.quizId, quizes.name as quizName, u.login, c.name as category, 
        COUNT(quizes.quizId)-IF(games.gameId IS NULL, 1, 0) AS playedTimes 
        FROM quizes
        INNER JOIN users u ON u.userId = quizes.creatorId
        INNER JOIN categories c on quizes.categoryId = c.categoryId
        LEFT JOIN games ON games.quizId = quizes.quizId
    	GROUP BY quizId
        LIMIT ".$page*PAGE_SIZE.", ".PAGE_SIZE."
    ")->toJson();
}

function deactiveQuiz(){
    $data = RequestAPI::getJSON();
    PDOController::putCommand("
    UPDATE `quizes` SET `isActive` = '0' WHERE `quizes`.`quizId` = :quizId;
    ", ['quizId'=>$data['quizId']]);
    return Response::message('Quiz has been deactivated');
}
function activeQuiz(){
    $data = RequestAPI::getJSON();

    PDOController::putCommand("
    UPDATE `quizes` SET `isActive` = '1' WHERE `quizes`.`quizId` = :quizId;
    ", ['quizId'=>$data['quizId']]);
    return Response::message('Quiz has been activated');

}
function updateQuiz(){
    $data=RequestAPI::getJSON();
    switch ($data['action']){
        case 'activate':
            return activeQuiz();
        case 'deactivate':
            return deactiveQuiz();
        default:
            return Response::message("Wrong action", 403);
    }
}

switch (RequestAPI::getMethod()) {
    case "GET":
        echo getQuizes();
        break;
    case "POST":
        break;
    case "PUT":
        echo updateQuiz();
        break;
    case "DELETE":
        break;
    default:
        break;
}
