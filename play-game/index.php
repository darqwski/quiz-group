<?php
include_once "../PHP/Database/PDOController.php";

foreach ($_GET as $key=>$value) {
    $data = PDOController::getCommand("SELECT quizId from quizes WHERE MD5(quizId) = :hash",['hash'=>$key]);
    if(count($data) == 0){
        //TODO redirect to quiz not exist page
    } else {
        $quizId = $data[0]['quizId'];
        ?>
        <script>
            window.sessionStorage.setItem('quizId',<?= $quizId ?>);
            window.location.href='../quiz'
        </script>
        <?php
    }
}
?>
