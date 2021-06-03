<?php

$name =   htmlspecialchars($_POST['name']);
$email =  htmlspecialchars($_POST['email']);
$text =   htmlspecialchars($_POST['text']);



//var_dump(dirname(__FILE__));
   // var_dump("Les valeurs sont definies");

try{

    $pdo = new PDO('sqlite:'.dirname(__FILE__).'/database.db');
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE,PDO::FETCH_ASSOC);
    $pdo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);

    $pdo->query(
        'CREATE TABLE IF NOT EXISTS first_table(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_name VARCHAR(50) NOT NULL,
            email VARCHAR(50) NOT NULL,
            message_text TEXT NOT NULL )'
    );


    if($name && $email && $text){   

        $statement  = $pdo->prepare(
            'INSERT INTO first_table(user_name,email,message_text) VALUES(:user_name,:email,:message_text)'
        );
        $statement->bindValue('user_name',$name,PDO::PARAM_STR);
        $statement->bindValue('email',$email,PDO::PARAM_STR);
        $statement->bindValue('message_text',$text,PDO::PARAM_STR);
        $statement->execute();

    }
    
} catch(PDOException $exception){
    var_dump($exception);
}





//var_dump($_POST);