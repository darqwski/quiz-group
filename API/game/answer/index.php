<?php


include_once "../../../PHP/Database/PDOController.php";
include_once "../../../PHP/Utils/DataStream.php";
include_once "../../../PHP/Utils/RequestAPI.php";

function isLastAnswer(){
    $answers = PDOController::getCommand("
                    SELECT * FROM `user_answers`
                    RIGHT JOIN answers ON answers.answerId = user_answers.answerId
                    WHERE user_answers.gameId = :gameId AND user_answers.userAnswerId IS NULL
                ", ["userId"=>$_SESSION['userId'], 'gameId'=>$_SESSION['gameId']]
    )[0];

    return count($answers) == 0;
}

function endGame(){
    PDOController::putCommand("
        UPDATE `games` SET `stop` = NOW() WHERE games.stop IS NULL AND userId = :userId;
    ", ["userId"=>$_SESSION['userId']]);
}

function calculateResult(){
    $gameId = $_SESSION['gameId'];
    unset($_SESSION['gameId']);
    $result = PDOController::getCommand("
            SELECT SUM(answers.isCorrect) as SUM FROM user_answers 
            INNER JOIN answers ON answers.answerId = user_answers.answerId
            WHERE user_answers.gameId = :gameId", ['gameId'=>$gameId]
    );

    return $result[0]['SUM'];
}

function answerQuestion(){
    $answer = RequestAPI::getJSON()['answer'];

    PDOController::putCommand("
        UPDATE `user_answers` 
        SET 
            `answerId` = :answerId, 
            `datetime` = 'NOW()' 
        WHERE `user_answers`.`userId` = :userId AND answerId IS NULL;
    ");
    $correctAnswer = PDOController::getCommand("
        SELECT a.answerId, a.isCorrect FROM answers INNER JOIN answers a ON a.questionId = answers.questionId WHERE a.isCorrect = 1
        ", ['answerId'=>$answer])[0];
    $response = ["correctAnswer"=>$correctAnswer];
    if(isLastAnswer()){
        $response['isLastAnswer'] = true;
        endGame();
        $response['result']=calculateResult();
        unset($_SESSION['gameId']);
    }

    return (new DataStream($response))->toJson();

}

switch (RequestAPI::getMethod()) {
    case "GET":
        break;
    case "POST":
        echo answerQuestion();
        break;
    case "PUT":
        break;
    case "DELETE":
        break;
    default:
        break;
}