<?php


include_once "../../../PHP/Database/PDOController.php";
include_once "../../../PHP/Utils/DataStream.php";
include_once "../../../PHP/Utils/RequestAPI.php";

session_start();

function isLastAnswer(){
    $gameId = $_SESSION['gameId'];
    $leftQuestions = PDOController::getCommand("
        SELECT questions.text, questionId FROM games
        INNER JOIN questions ON questions.quizId = games.quizId
        LEFT JOIN user_answers ON user_answers.questonId = questions.questionId AND user_answers.gameId =:gameId
        WHERE games.gameId = :gameId AND user_answers.answerId IS NULL
                ", ["gameId"=>$gameId]
    );

    return count($leftQuestions) == 0;
}

function endGame($sumOfPoints){
    PDOController::putCommand("
        UPDATE `games` SET `stop` = NOW(), result = :sumOfPoints WHERE games.stop IS NULL AND userId = $_SESSION[userId];
    ", ["sumOfPoints"=>$sumOfPoints]);
}

function calculateResult(){
    $gameId = $_SESSION['gameId'];
    $result = PDOController::getCommand("
        SELECT SUM(answers.isCorrect) as sumOfPoints FROM user_answers 
        INNER JOIN answers ON answers.answerId = user_answers.answerId
        WHERE user_answers.gameId = :gameId", ['gameId'=>$gameId]
    );

    return $result[0]['sumOfPoints'];
}

function answerQuestion(){
    $answer = RequestAPI::getJSON()['answer'];

    PDOController::putCommand("
        UPDATE `user_answers` 
        SET 
            `answerId` = :answer, 
            `datetime` = NOW() 
        WHERE `user_answers`.`userId` = :userId AND answerId IS NULL;
    ", ['userId'=>$_SESSION['userId'],'answer'=>$answer]);
    $correctAnswer = PDOController::getCommand("
        SELECT a.answerId
        FROM answers 
        INNER JOIN answers a ON a.questionId = answers.questionId 
        WHERE a.isCorrect = 1 AND answers.answerId = :answer
        ", ['answer'=>$answer])[0];
    $response = ["correctAnswer"=>$correctAnswer];
    if(isLastAnswer()){
        $response['isLastAnswer'] = true;
        $response['result']=calculateResult();
        endGame($response['result']);
        unset($_SESSION['gameId']);
        if(isset($_SESSION['randomUserId'])){
            unset($_SESSION['userId']);
            unset($_SESSION['randomUserId']);
        }
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
