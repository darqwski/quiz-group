<?php


include_once "../../PHP/Database/PDOController.php";
include_once "../../PHP/Utils/DataStream.php";
include_once "../../PHP/Utils/RequestAPI.php";

session_start();

function getPopularQuizes(){
    return PDOController::getCommand("SELECT *, COUNT(*) as played FROM games GROUP BY games.quizId");
}

function getRecommendedQuizes(){
    return PDOController::getCommand("
        SELECT quizes.* FROM `quizes`
        LEFT JOIN games on games.quizId = quizes.quizId AND games.userId = :userId
        WHERE games.gameId IS NULL
",['userId'=>$_SESSION['userId']]);
}

function getDashboardInfo() {

    $popularQuizes = getPopularQuizes();
    $recommendedQuizes = getRecommendedQuizes();
    $categories = "";
    return ((new DataStream(['popular'=>$popularQuizes,"recommended"=>$recommendedQuizes, "categories"=>$categories])))->toJson();
}

switch (RequestAPI::getMethod()) {
    case "GET":
        echo getDashboardInfo();
        break;
    case "POST":
        break;
    case "PUT":
        break;
    case "DELETE":
        break;
    default:
        break;
}