<?php
include_once "../../PHP/Database/PDOController.php";

echo json_encode(PDOController::getCommand("SELECT * FROM quizes"));