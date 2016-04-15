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

			case 'ALL': $data = $method->getALLTODO($UID);
						if($data) {
							$response['success'] = true;
							$response['data'] = $data;
						}
						break;

			case 'ID': if(isset($_POST['ID'])) {
							$ID = $_POST['ID'];

							$subdata = $method->getSubTODO($ID);
							$data = $method->getTODO($ID)[0];
							$data['sub'] = $subdata;
							if($data) {
								$response['success'] = true;
								$response['data'] = $data;
							}
						}
						break;
		}
	}

	
	if(!isset($response['success'])) {
		$response['success'] = false;
	}

	echo json_encode($response);
	

?>