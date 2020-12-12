<?php

include_once "../../PHP/Database/PDOController.php";
include_once "../../PHP/Utils/DataStream.php";
include_once "../../PHP/Utils/RequestAPI.php";

session_start();

function getUserInfo(){
    $userId = $_SESSION['userId'];
    $quizes = PDOController::getCommand("
    SELECT *
    FROM users_groups 
    INNER JOIN groups ON groups.groupId = users_groups.groupId
    WHERE users_groups.userId = $userId
    ");
    $unPlayedQuizes = PDOController::getCommand("
    SELECT * FROM `games` 
        RIGHT JOIN quizes ON quizes.quizId = games.quizId
        INNER JOIN `users_groups` ug on quizes.groupId = ug.groupId
        WHERE ug.userId = :userId
    ", ['userId'=>$userId]);

    return (new DataStream(['groups'=>$quizes,'availableQuizes'=>$unPlayedQuizes]))->toJson();
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