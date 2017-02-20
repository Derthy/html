<?php 

	$mysql_host = '127.0.0.1'; //lub jakiś adres: np sql.nazwa_bazy.nazwa.pl
	$port = '3306'; //domyślnie jest to port 3306
	$username = 'root';
	$password = 'ciastko';
	$database = 'calendar'; //'produkty'
	$db = new PDO('mysql:host='.$mysql_host.';dbname='.$database, $username, $password );

	$page = isset($_GET[ 'p' ])?$_GET[ 'p' ]:'';
	if( $page=='insert' ){
		$TITLE = $_POST['TITLE'];
		$DESCRIPTION = $_POST['DESCRIPTION'];
		$DAY = $_POST['DAY'];
		$BEGIN_TIME = $_POST['BEGIN_TIME'];
		$END_TIME = $_POST['END_TIME'];
		$stmt = $db->prepare("INSERT INTO timetable (TITLE,DESCRIPTION,DAY,BEGIN_TIME,END_TIME) VALUES (?,?,?,?,?)");
		$stmt->bindParam(1,$TITLE);
		$stmt->bindParam(2,$DESCRIPTION);
		$stmt->bindParam(3,$DAY);
		$stmt->bindParam(4,$BEGIN_TIME);
		$stmt->bindParam(5,$END_TIME);
		$stmt->execute();
	}
	else if($page=='update'){
		$ID = $_POST['ID'];
		$TITLE = $_POST['TITLE'];
		$DESCRIPTION = $_POST['DESCRIPTION'];
		$DAY = $_POST['DAY'];
		$BEGIN_TIME = $_POST['BEGIN_TIME'];
		$END_TIME = $_POST['END_TIME'];
		$stmt = $db->prepare("UPDATE timetable SET TITLE=?,DESCRIPTION=?,DAY=?,BEGIN_TIME=?,END_TIME=? WHERE ID=?");
		$stmt->bindParam(6,$ID);
		$stmt->bindParam(1,$TITLE);
		$stmt->bindParam(2,$DESCRIPTION);
		$stmt->bindParam(3,$DAY);
		$stmt->bindParam(4,$BEGIN_TIME);
		$stmt->bindParam(5,$END_TIME);
		$stmt->execute();
	}
	else if($page=='delete'){
		$ID = $_POST['ID'];
		$stmt = $db->prepare("DELETE FROM timetable WHERE ID=?");
		$stmt->bindParam(1,$ID);
		$stmt->execute();
	}
	else{
        
        $stmt = $db->prepare("SELECT * FROM timetable");
        $stmt->execute();
        while($row = $stmt->fetch()){
        	$timetable[] = [ 'ID' => $row['ID'], 'TITLE' => $row['TITLE'],'DESCRIPTION' => $row['DESCRIPTION'], 'DAY' => $row['DAY'],'BEGIN_TIME' => $row['BEGIN_TIME'], 'END_TIME' => $row['END_TIME'] ];
        }
        echo json_encode($timetable);
	}
?>