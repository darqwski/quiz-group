<?php

function isAdmin(){
    $user = PDOController::getCommand("SELECT * FROM admins WHERE admins.userId = $_SESSION[userId]");
    if(count($user) == 1){
        return true;
    }
    return false;
}
