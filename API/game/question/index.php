<?php


include_once "../../../PHP/Database/PDOController.php";
include_once "../../../PHP/Utils/DataStream.php";
include_once "../../../PHP/Utils/RequestAPI.php";

session_start();

function startGame(){
    $quizId = RequestAPI::getJSON()['quizId'];
    $game = PDOController::getCommand(
        "SELECT * FROM games WHERE quizId = :quizId AND userId = :userId",
            ["quizId"=>$quizId, "userId"=>$_SESSION['userId']]
    );
    $gameId = null;
    if( count($game) == 0 ){
        $gameId = PDOController::insertCommand("
        INSERT INTO `games` (`gameId`, `userId`, `quizId`, `result`, `start`, `stop`) 
        VALUES (NULL, :userId, :quizId, NULL, NOW(), NULL);", ["userId"=>$_SESSION['userId'], "quizId"=>$quizId]);
    } else {
        $gameId = $game[0]['gameId'];
    }

    return $gameId;
}

function getQuestion(){
    $gameId = startGame();
    $data = PDOController::getCommand("
        SELECT questions.text, questionId FROM games
        INNER JOIN questions ON questions.quizId = games.quizId
        LEFT JOIN user_answers ON user_answers.questonId = questions.questionId
        WHERE user_answers.questonId IS NULL AND games.gameId = $gameId;
    ");
    $randomIndex = array_rand($data, 1);
    $question = $data[$randomIndex];
    $answers = PDOController::getCommand("
        SELECT answers.text FROM answers
        WHERE answers.questionId = :questionId
    ", ['questionId'=>$question['questionId']]);
    return (new DataStream(['question'=>$question,'answers'=>$answers]))->toJson();

}

switch (RequestAPI::getMethod()) {
    case "GET":
        break;
    case "POST":
        echo getQuestion();
        break;
    case "PUT":
        break;
    case "DELETE":
        break;
    default:
        break;
}