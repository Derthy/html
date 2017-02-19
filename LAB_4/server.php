<?php 

	$mysql_host = 'localhost'; //lub jakiś adres: np sql.nazwa_bazy.nazwa.pl
	$port = '3307'; //domyślnie jest to port 3306
	$username = 'root';
	$password = 'ciastko';
	$database = 'calendar'; //'produkty'
	try{
		$db = new PDO('mysql:host='.$mysql_host.';dbname='.$database.';port='.$port, $username, $password );
		echo 'GIT!';
	}catch(PDOException $e){
		echo 'Połączenie nie mogło zostać utworzone.<br />';
	}

	$page = isset($_GET[ 'p' ])?$_GET[ 'p' ]:'';
	if( $page=='insert' ){
		$TITLE = $_POST['TITLE'];
		$DESCRIPTION = $_POST['DESCRIPTION'];
		$BEGIN_TIME = $_POST['BEGIN_TIME'];
		$END_TIME = $_POST['END_TIME'];
		$stmt = $db->prepare("insert into timetable values ('',?,?,?,?)");
		$stmt->bindParam(1,$TITLE);
		$stmt->bindParam(2,$DESCRIPTION);
		$stmt->bindParam(3,$BEGIN_TIME);
		$stmt->bindParam(4,$END_TIME);
		$stmt->execute();
	}
	else if($page=='update'){

	}
	else if($page=='delete'){

	}
	else{

	}
		$TITLE = $_POST['TITLE'];
		$DESCRIPTION = $_POST['DESCRIPTION'];
		$BEGIN_TIME = $_POST['BEGIN_TIME'];
		$END_TIME = $_POST['END_TIME'];
		$stmt = $db->prepare("insert into timetable values ('',?,?,?,?)");
		$stmt->bindParam(1,$TITLE);
		$stmt->bindParam(2,$DESCRIPTION);
		$stmt->bindParam(3,$BEGIN_TIME);
		$stmt->bindParam(4,$END_TIME);
		$stmt->execute();
?>