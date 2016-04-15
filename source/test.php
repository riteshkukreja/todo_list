<?php

	ini_set('display_errors',1);
	ini_set('display_startup_errors',1);
	error_reporting(-1);
	//mysqli_report(MYSQLI_REPORT_ALL);

	require_once ('methods.php');

	$m = new Methods;
	echo "<pre>";
try {
	print_r($subdata = $m->getSubTODO(24));
} catch(Exception $e) {
	echo $e;
}

?>