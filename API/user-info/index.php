<?php

include_once "../../PHP/Database/PDOController.php";
include_once "../../PHP/Utils/DataStream.php";
include_once "../../PHP/Utils/RequestAPI.php";

session_start();

function getUserInfo(){
    $userId = $_SESSION['userId'];
    $data = PDOController::getCommand("
    SELECT *
    FROM users_groups 
    INNER JOIN users ON users.userId = users_groups.userId
    INNER JOIN groups ON groups.groupId = users_groups.groupId
    WHERE users.userId = $userId
    ");

    return (new DataStream($data))->toJson();
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