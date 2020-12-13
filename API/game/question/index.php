<?php


include_once "../../../PHP/Database/PDOController.php";
include_once "../../../PHP/Utils/DataStream.php";
include_once "../../../PHP/Utils/RequestAPI.php";



function startGame(){
    $quizId = RequestAPI::getJSON()['quizId'];
    if( !isset($_SESSION['gameId']) ){
        $gameId = PDOController::insertCommand("
        INSERT INTO `games` (`gameId`, `userId`, `quizId`, `result`, `start`, `stop`) 
        VALUES (NULL, :userId, :quizId, NULL, NOW(), NULL);", ["userId"=>$_SESSION['userId'], "quizId"=>$quizId]);
        $_SESSION['gameId'] = $gameId;
    }

    return $_SESSION['gameId'];
}

function getQuestion(){
    //TODO zabezpeczy skończoną grę, zabezpieczyc pytanie bez odpowiedzi, zabezpieczyc pytanie po czasie
    $gameId = startGame();

    $data = PDOController::getCommand("
        SELECT questions.text, questionId FROM games
        INNER JOIN questions ON questions.quizId = games.quizId
        LEFT JOIN user_answers ON user_answers.questonId = questions.questionId
        WHERE user_answers.questonId IS NULL AND games.gameId = $gameId;
    ");
    if(!isset($data[0]['questionId'])){
        unset($_SESSION['gameId']);

        return;
    }
    $randomIndex = array_rand($data, 1);
    $question = $data[$randomIndex];

    PDOController::insertCommand("
        INSERT INTO `user_answers` (`userAnswerId`, `userId`, `answerId`, `datetime`, `questonId`, `gameId`) 
        VALUES (NULL, :userId, NULL,NULL, :questionId, :gameId);
    ",['questionId'=>$question['questionId'], 'userId' => $_SESSION['userId'], 'gameId' => $gameId]);

    $answers = PDOController::getCommand("
        SELECT text, answerId FROM answers
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