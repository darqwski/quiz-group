<?php

function generatePage($path = '/'){
    echo "
<!DOCTYPE html>
<html lang='en'>
    <head>
        <meta charset='UTF-8'>
        <title>Blockix</title>
        <link rel='stylesheet' href='https://fonts.googleapis.com/icon?family=Material+Icons' />
        <style>
            #react-app, body, html {
                height: 100%;
            }
        </style>
    </head>
    <body>
        <div id='react-app'></div>
        <script src='${path}react/build/bundle.js'></script>
        <script src='${path}react/build/main.bundle.js'></script>
    </body>
</html>
    ";
} ?>

