<?php
include_once "../../PHP/Database/PDOController.php";
include_once "../../PHP/Utils/DataStream.php";
include_once "../../PHP/Utils/RequestAPI.php";
include_once "../../PHP/Utils/Response.php";

session_start();

function login(){
    $data = RequestAPI::getJSON();
    if(!isset($data['login'])){
        return Response::message("Missing login", 401);
    }
    if(!isset($data['password'])){
        return Response::message("Missing password", 401);
    }
    $user = PDOController::getCommand(
        "SELECT login, userId, password FROM users WHERE login=:login",
        ["login"=>$data['login']]
    );
    if(count($user) == 0 ){
        return Response::message("Wrong login", 401);
    }

    if(md5($data['password']) != $user[0]['password'] ){
        return Response::message("Wrong password", 401);
    }

    if(md5($data['password']) == $user[0]['password'] ){
        $_SESSION['userId']=$user[0]['userId'];
        $_SESSION['login']=$user[0]['login'];
        return Response::message("Login Successfull");
    }

}

function logout(){
    session_destroy();
}

switch (RequestAPI::getMethod()){
    case "POST":
        echo login();
        break;
    case "DELETE":
        echo logout();
        break;
    case "GET":
    case "PUT":
    default:
        break;
}