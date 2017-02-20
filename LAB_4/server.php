<?php 

	$mysql_host = '127.0.0.1'; //lub jakiś adres: np sql.nazwa_bazy.nazwa.pl
	$port = '3306'; //domyślnie jest to port 3306
	$username = 'root';
	$password = 'ciastko';
	$database = 'calendar'; //'produkty'
	$db = new PDO('mysql:host='.$mysql_host.';dbname='.$database, $username, $password );

	// $page = isset($_GET[ 'p' ])?$_GET[ 'p' ]:'';
	// if( $page=='insert' ){
	// 	$TITLE = $_POST['TITLE'];
	// 	$DESCRIPTION = $_POST['DESCRIPTION'];
	// 	$BEGIN_TIME = $_POST['BEGIN_TIME'];
	// 	$END_TIME = $_POST['END_TIME'];
	// 	$stmt = $db->prepare("INSERT INTO timetable (TITLE,DESCRIPTION,BEGIN_TIME,END_TIME) VALUES (?,?,?,?)");
	// 	$stmt->bindParam(1,$TITLE);
	// 	$stmt->bindParam(2,$DESCRIPTION);
	// 	$stmt->bindParam(3,$BEGIN_TIME);
	// 	$stmt->bindParam(4,$END_TIME);
	// 	$stmt->execute();
	// }
	// else if($page=='update'){

	// }
	// else if($page=='delete'){

	// }
	// else{

	// }

		$TITLE = $_POST['TITLE'];
		$DESCRIPTION = $_POST['DESCRIPTION'];
		$BEGIN_TIME = $_POST['BEGIN_TIME'];
		$END_TIME = $_POST['END_TIME'];
		$stmt = $db->prepare("INSERT INTO timetable (TITLE,DESCRIPTION,BEGIN_TIME,END_TIME) VALUES (?,?,?,?)");
		$stmt->bindParam(1,$TITLE);
		$stmt->bindParam(2,$DESCRIPTION);
		$stmt->bindParam(3,$BEGIN_TIME);
		$stmt->bindParam(4,$END_TIME);
		$stmt->execute();
?>