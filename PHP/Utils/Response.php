<?php


class Response
{
    static function message($text, $code = 200){
        http_response_code($code);
        if($code != 200){
        }
        return (new DataStream(["message"=>$text]))->toJson();
    }
}