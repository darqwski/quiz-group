<?php

ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);
include_once "DB_PASS.php";


class PDOController
{
    private static $db = null;

    static function openDatabaseConnection(){
        if(PDOController::$db == null){
            try {
                PDOController::$db = new PDO(TEXT, LOGIN, PASSWORD);
            } catch (PDOException $e) {
                print "Failed to connect database!: " . $e->getMessage() . "<br/>";
            }
        }
    }

    static function getCommand($command, $params = []) {
        self::openDatabaseConnection();
        $statement = PDOController::$db->prepare($command);
        $paramsArray = [];
        foreach ($params as $key => $param) {
            $paramsArray[":$key"] = $param;
        }
        $statement->execute($paramsArray);
        if ($statement->errorInfo()[0] != '00000') {
            print_r($command);
            print_r($statement->errorInfo());
            return $statement->errorInfo();
        }
        $data = $statement->fetchAll(PDO::FETCH_ASSOC);

        return $data;
    }

    /**
     * @param $command
     * @param array $params
     * @return mixed
     */
     static function putCommand($command, $params = []){
        self::openDatabaseConnection();
        $statement = PDOController::$db->prepare($command);
        $paramsArray = [];
        foreach ($params as $key => $param) {
            $paramsArray[":$key"] = $param;
        }

        $result = $statement->execute($paramsArray);
        if ($statement->errorInfo()[0] != '00000') {
            print_r($command);
            print_r($statement->errorInfo());
            return $statement->errorInfo();
        }
        return $result;
    }

    static function insertCommand($command, $params = []){
        self::openDatabaseConnection();
        $statement = PDOController::$db->prepare($command);
        $paramsArray = [];
        foreach ($params as $key => $param) {
            $paramsArray[":$key"] = $param;
        }

        $statement->execute($paramsArray);
        if ($statement->errorInfo()[0] != '00000') {
            print_r($command);
            print_r($statement->errorInfo());
            return $statement->errorInfo();
        }
        $records = PDOController::$db->query("SELECT LAST_INSERT_ID()");
        $return = $records->fetchAll(PDO::FETCH_ASSOC);

        return $return[0]['LAST_INSERT_ID()'];
    }
}
