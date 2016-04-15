<?php

	session_start();

	//if(!isset($_SESSION['UID'])) exit;

	require_once ("methods.php");

	$response = array();
	$method = new Methods;
	//$UID = $_SESSION['UID'];

	$UID = 5;

	if(isset($_POST['method'])) {
		switch($_POST['method']) {
			case 'ADD':	if(isset($_POST['TOPIC'])) {
								$TOPIC = $_POST['TOPIC'];
								$key = $method->addTODO($UID, $TOPIC);
								$response['success'] = $key;
							}
							break;
			case 'DEL': if(isset($_POST['ID'])) {
								$ID = $_POST['ID'];
								$key = $method->delTODO($ID);
								$response['success'] = $key;
							}
							break;
			case 'DONE': if(isset($_POST['ID'])) {
								$ID = $_POST['ID'];
								$key = $method->setDone($ID);
								$response['success'] = $key;
							}
							break;
			case 'ADDSUB': if(isset($_POST['ID']) && isset($_POST['TOPIC'])) {
								$ID = $_POST['ID'];
								$TOPIC = $_POST['TOPIC'];
								$key = $method->addSubTODO($ID, $TOPIC);
								$response['success'] = $key;
							}
							break;
			case 'DONESUB': if(isset($_POST['SID'])) {
								$ID = $_POST['SID'];
								$key = $method->setSubDone($ID);
								$response['success'] = $key;
							}
							break;
			case 'DELSUB': if(isset($_POST['SID'])) {
								$ID = $_POST['SID'];
								$key = $method->delSubDone($ID);
								$response['success'] = $key;
							}
							break;

		}
	}

	
	if(!isset($response['success'])) {
		$response['success'] = false;
	}

	echo json_encode($response);
	

?>