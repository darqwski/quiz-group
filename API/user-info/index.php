<?php

include_once "../../PHP/Database/PDOController.php";
include_once "../../PHP/Utils/DataStream.php";
include_once "../../PHP/Utils/RequestAPI.php";

session_start();

function getUserInfo(){
    $userId = $_SESSION['userId'];

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