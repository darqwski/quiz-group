<?php

include_once "../PHP/Utils/PageGenerator.php";
session_start();

print_r($_SESSION);
generatePage();