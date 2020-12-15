<?php

include_once "../../PHP/Database/PDOController.php";
include_once "../../PHP/Utils/DataStream.php";
include_once "../../PHP/Utils/RequestAPI.php";

session_start();

function getUserDetails(){
    return PDOController::getCommand("SELECT login, email, joined FROM users WHERE userId = $_SESSION[userId];")[0];
}

function getGamesDetails(){
    $categories = PDOController::getCommand("
    SELECT c.name as categoryName, COUNT(c.categoryId) as categoryCount FROM `games` 
    INNER JOIN quizes q on games.quizId = q.quizId
    INNER JOIN categories c on q.categoryId = c.categoryId
    WHERE q.isActive = 1
    GROUP BY c.categoryId
    ORDER BY COUNT(c.categoryId)
    LIMIT 3;
");
    $games = PDOController::getCommand("
SELECT AVG(result/5) as `average`, count(*) as `all` FROM `games` 
WHERE userId = $_SESSION[userId]
")[0];

    return [
        "average"=>$games['average'],
        "all"=>$games['all'],
        "categories"=>$categories,
    ];
}
function getCreatedDetails(){
    return PDOController::getCommand("
SELECT AVG(result/5) as `average`, count(*) as `all` FROM `games` 
INNER JOIN quizes q on games.quizId = q.quizId AND q.creatorId = $_SESSION[userId]
WHERE userId = $_SESSION[userId] AND q.isActive = 1
")[0];
}

function getUserInfo(){
    return (new DataStream([
        'user'=>getUserDetails(),
        'games'=>getGamesDetails(),
        'created'=>getCreatedDetails()
    ]))->toJson();
}

switch (RequestAPI::getMethod()) {
    case "GET":
        echo getUserInfo();
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