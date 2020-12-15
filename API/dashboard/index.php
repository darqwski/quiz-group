<?php


include_once "../../PHP/Database/PDOController.php";
include_once "../../PHP/Utils/DataStream.php";
include_once "../../PHP/Utils/RequestAPI.php";

session_start();

function getPopularQuizes(){
    return PDOController::getCommand("
        SELECT q.*,c.name as categoryName, COUNT(*) as played FROM games 
        INNER JOIN quizes q on games.quizId = q.quizId
        INNER JOIN categories c on q.categoryId = c.categoryId
        WHERE q.isActive = 1
        GROUP BY games.quizId
");
}

function getRecommendedQuizes(){
    $userId = isset($_SESSION['userId']) ? $_SESSION['userId'] : false;
    return PDOController::getCommand("
        SELECT quizes.*, c.name as categoryName FROM `quizes`
        LEFT JOIN games on games.quizId = quizes.quizId ".($userId ? "AND games.userId = :userId " : "")."
        INNER JOIN categories c on quizes.categoryId = c.categoryId
        WHERE games.gameId IS NULL AND quizes.isActive = 1
",['userId'=>$userId]);
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