<?php


include_once "../../PHP/Database/PDOController.php";
include_once "../../PHP/Utils/DataStream.php";
include_once "../../PHP/Utils/RequestAPI.php";
include_once "../../PHP/Utils/Response.php";

function getCategories(){
    return (new DataStream())
        ->getFromQuery("
            SELECT categories.*, count(*) as quizes
            FROM categories 
            LEFT JOIN quizes q on categories.categoryId = q.categoryId
            WHERE q.isActive = 1
            GROUP BY categoryId
            ORDER BY categories.name ASC
        ")->toJson();
}
function addCategory(){
    $data = RequestAPI::getJSON();
    $result = PDOController::insertCommand("
    INSERT INTO `categories` (`categoryId`, `name`, `description`, `image`) 
    VALUES (NULL, :name, :description, NULL);
    ",["name"=>$data['name'], 'description'=>$data['description']]);
    if(isset($data['image'])){
        $result;
    }

    return Response::resultMessage("Category");
}
function removeCategory(){
    $data = RequestAPI::getJSON();
    //TODO check if any quiz exist
    $result = PDOController::insertCommand("
        DELETE FROM `categories` WHERE `categories`.`categoryId` = :categoryId
",["categoryId"=>$data['categoryId']]);


    return Response::resultMessage("Category");
}
function updateCategory(){
    $data = RequestAPI::getJSON();
    $result = PDOController::putCommand("
    UPDATE `categories` 
    SET 
        `name` = :name, 
        `description` = :description
    WHERE `categories`.`categoryId` = :categoryId;
    ", ["name"=>$data['name'],"description"=>$data['description'],"categoryId"=>$data['categoryId']]);

    return Response::resultMessage("Category");
}

switch (RequestAPI::getMethod()) {
    case "GET":
        echo getCategories();
        break;
    case "POST":
        echo addCategory();
        break;
    case "PUT":
        echo updateCategory();
        break;
    case "DELETE":
        echo removeCategory();
        break;
    default:
        break;
}