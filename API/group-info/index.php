<?php

include_once "../../PHP/Database/PDOController.php";
include_once "../../PHP/Utils/DataStream.php";
include_once "../../PHP/Utils/RequestAPI.php";

session_start();

function getGroupInfo(){
    $userId = $_SESSION['userId'];
    $userGroupId = RequestAPI::getJSON()['userGroupId'];

    $usersInGroup = PDOController::getCommand("
        SELECT u.login FROM users_groups
        INNER JOIN `groups` g on users_groups.groupId = g.groupId
        INNER JOIN users u on users_groups.userId = u.userId
        WHERE userGroupId = :userGroupId AND users_groups.userId = :userId
    ", ["userGroupId"=>$userGroupId, "userId"=>$userId]);

    $quizes = PDOController::getCommand("
        SELECT q.quizId, q.categoryId, q.name FROM users_groups
        INNER JOIN `groups` g on users_groups.groupId = g.groupId
        INNER JOIN quizes q on g.groupId = q.groupId
        WHERE userGroupId = :userGroupId AND users_groups.userId = :userId
    ", ["userGroupId"=>$userGroupId, "userId"=>$userId]);

    return (new DataStream([
        "users"=>$usersInGroup,
        "quizes"=>$quizes
    ]))->toJson();
}

switch (RequestAPI::getMethod()) {
    case "GET":
        break;
    case "POST":
        echo getGroupInfo();
        break;
    case "PUT":
        break;
    case "DELETE":
        break;
    default:
        break;
}