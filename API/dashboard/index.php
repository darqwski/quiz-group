<?php


include_once "../../PHP/Database/PDOController.php";
include_once "../../PHP/Utils/DataStream.php";
include_once "../../PHP/Utils/RequestAPI.php";

session_start();
define("PAGE_SIZE",25);

function getPopularQuizes(){
    if(isset($_SESSION['userId'])){
        return PDOController::getCommand("
        SELECT q.*, c.name as category, q.sumOfGames, g.result as result FROM games 
        RIGHT JOIN quizes q ON q.quizId = games.quizId 
        LEFT JOIN games g ON g.gameId = games.gameId AND g.userId = $_SESSION[userId]
        INNER JOIN categories c on q.categoryId = c.categoryId
        GROUP BY q.quizId
        ORDER BY q.sumOfGames DESC
        LIMIT ".(PAGE_SIZE*$_GET['pageNumber']).", ".(PAGE_SIZE+1)."
");
    } else {
        return PDOController::getCommand("
        SELECT q.*, c.name as category, sumOfGames FROM games 
        RIGHT JOIN quizes q ON q.quizId = games.quizId 
        INNER JOIN categories c on q.categoryId = c.categoryId
        GROUP BY q.quizId
        ORDER BY q.sumOfGames DESC
        LIMIT ".(PAGE_SIZE*$_GET['pageNumber']).", ".(PAGE_SIZE+1)."
");
    }
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

function getCategories() {
    return (new DataStream())
        ->getFromQuery("
            SELECT categories.*
            FROM categories 
            ORDER BY categories.name ASC
        ")->get();
}

function getLastNotice(){
    return (new DataStream())
        ->getFromQuery("
            SELECT notices.*, users.login
            FROM notices 
            INNER JOIN users ON users.userId = notices.author
            ORDER BY date
            LIMIT 1
        ")->get()[0];
}

function getDashboardInfo() {
    $popularQuizes = getPopularQuizes();
    $recommendedQuizes = getRecommendedQuizes();
    $categories = getCategories();
    $lastInfo = getLastNotice();

    return ((new DataStream([
        'popular'=>$popularQuizes,
        "recommended"=>$recommendedQuizes,
        "categories"=>$categories,
        "lastInfo"=>$lastInfo,
        "lastPage" => count($popularQuizes) == PAGE_SIZE + 1 ? false : true
    ])))->toJson();
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
