<?php


class Response
{
    static function message($text, $code = 200){
        http_response_code($code);
        return (new DataStream(["message"=>$text]))->toJson();
    }

    static function resultMessage($type){
        $method = RequestAPI::getMethod();
        if($method == "POST"){
            return self::message("$type has been added correctly");
        }

        if($method == "PUT"){
            return self::message("$type has been updated correctly");
        }

        if($method == "DELETE"){
            return self::message("$type has been removed correctly");
        }
    }
}