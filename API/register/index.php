<?php
include_once "../../PHP/Database/PDOController.php";
include_once "../../PHP/Utils/DataStream.php";
include_once "../../PHP/Utils/RequestAPI.php";
include_once "../../PHP/Utils/Response.php";

session_start();

function register(){
    $data = RequestAPI::getJSON();
    if(!isset($data['login'])){
        return Response::message("Missing login", 401);
    }
    if(!isset($data['password'])){
        return Response::message("Missing password", 401);
    }
    if(!isset($data['email'])){
        return Response::message("Missing email", 401);
    }
    $user = PDOController::getCommand(
        "SELECT login FROM users WHERE login=:login OR email=:email",
        ["login"=>$data['login'],"email"=>$data['email']]
    );
    if(count($user) != 0){
        return Response::message("Login or email is busy", 401);
    }
    $result = PDOController::insertCommand("
INSERT INTO `users` (`userId`, `login`, `password`, `isConfirmed`, `isActive`, `email`, `joined`) 
VALUES (NULL, :login, :password, '1', '1', :email, NOW());
", ["login"=>$data['login'], "password"=>md5($data['password']), "email" => $data['email']]);
    return Response::message("User has been created successfully");
}


switch (RequestAPI::getMethod()){
    case "POST":
        echo register();
        break;
    case "DELETE":
    case "GET":
    case "PUT":
    default:
        break;
}