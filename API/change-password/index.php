<?php

include_once "../../PHP/Database/PDOController.php";
include_once "../../PHP/Utils/DataStream.php";
include_once "../../PHP/Utils/RequestAPI.php";
include_once "../../PHP/Utils/Response.php";

session_start();

function updatePassword(){
    $data = RequestAPI::getJSON();
    //TODO only user
    $oldPassword = PDOController::getCommand("SELECT password FROM users WHERE userId = '$_SESSION[userId]'")[0]['password'];
    if($oldPassword !== md5($data['oldPassword'])){
        return Response::message('Old password is wrong', 401);
    }
    PDOController::putCommand("
        UPDATE users SET password = :password WHERE userId = $_SESSION[userId]
    ", ['password' =>md5($data['newPassword'])]);

    return Response::message('Password changed successfully');
}

switch (RequestAPI::getMethod()) {
    case "GET":
        break;
    case "POST":
        echo updatePassword();
        break;
    case "PUT":
        break;
    case "DELETE":
        break;
    default:
        break;
}
