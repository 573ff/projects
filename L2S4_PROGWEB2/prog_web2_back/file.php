<?php

$q = $_REQUEST["q"];

try{

    $pdo = new PDO('sqlite:'.dirname(__FILE__).'/database.db');
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE,PDO::FETCH_ASSOC);
	$pdo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);

	$p = $pdo->query(
		'SELECT * FROM pictures WHERE id = ' . $q
	)->fetchAll();
	
}
catch(PDOException $exception){
    var_dump($exception);
}

//var_dump($q);	
echo json_encode($p);


?>