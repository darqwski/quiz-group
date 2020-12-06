<?php
define("BUILD_PATH","quiz-group/react/build/");

function generatePage($path = '/'){
    echo "
<!DOCTYPE html>
<html lang='en'>
    <head>
        <meta charset='UTF-8'>
        <title>Quiz-Group</title>
        <link rel='stylesheet' href='https://fonts.googleapis.com/icon?family=Material+Icons' />
        <link rel='stylesheet' href='".$path.BUILD_PATH."materialize.min.css' />
        <style>
            #react-app, body, html {
                height: 100%;
            }
        </style>
    </head>
    <body>
        <div id='react-app'></div>
        <script src='".$path.BUILD_PATH."bundle.js'></script>
        <script src='".$path.BUILD_PATH."main.bundle.js'></script>
    </body>
</html>
    ";
} ?>

