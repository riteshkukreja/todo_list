<?php

	

	class Methods {
		private $db = null;

		public $USER_TABLE = "";
		public $TODO_TABLE = "task";
		public $SUB_TABLE = "subtask";

		public function __construct() {
			include_once ('connection.php');
			$this->db = $db;
		}

		public function addTODO($uid, $topic) {
			$sql = "INSERT INTO " . $this->TODO_TABLE . "( UID, TOPIC )" . 
					" VALUES( '$uid', '$topic' )";

			if($this->db->query($sql)) {
				$sql = "SELECT ID FROM " . $this->TODO_TABLE . " WHERE UID = $uid AND TOPIC = '$topic' ORDER BY DATE DESC LIMIT 1";

				$res = $this->db->query($sql);
				if($res) {
					return $this->getData($res)[0]['ID'];
				}

				return false;
			}

			return false;
		}

		public function addSubTODO($id, $topic) {
			$sql = "INSERT INTO " . $this->SUB_TABLE . "( ID, TOPIC )" . 
					" VALUES( '$id', '$topic' )";

			if($this->db->query($sql)) {
				$sql = "SELECT SID FROM " . $this->SUB_TABLE . " WHERE ID = $id AND TOPIC = '$topic' ORDER BY DATE DESC LIMIT 1";

				$res = $this->db->query($sql);
				if($res) {
					return $this->getData($res)[0]['SID'];
				}

				return false;
			}

			return false;
		}

		public function setDone($id) {
			$sql = "UPDATE " . $this->TODO_TABLE . " SET STATUS = 2 " .
					"WHERE ID = '$id'";

			if($this->db->query($sql)) {
				$sql = "UPDATE " . $this->SUB_TABLE . " SET STATUS = 2 " .
					"WHERE ID = '$id'";

				return $this->db->query($sql);
			}

			return false;
		}

		public function setSubDone($sid) {
			$sql = "UPDATE " . $this->SUB_TABLE . " SET STATUS = 2 " .
					"WHERE SID = '$sid'";

				return $this->db->query($sql);
		}

		public function delTODO($id) {
			$sql = "DELETE FROM " . $this->TODO_TABLE .
					" WHERE ID = '$id'";

			if($this->db->query($sql)) {
				$sql = "DELETE FROM " . $this->SUB_TABLE .
					" WHERE ID = '$id'";

				return $this->db->query($sql);
			}

			return false;
		}

		public function delSubDone($sid) {
			$sql = "DELETE FROM " . $this->SUB_TABLE .
					" WHERE SID = '$sid'";

				return $this->db->query($sql);
		}

		public function getALLTODO($uid) {
			$sql = "SELECT * FROM " . $this->TODO_TABLE .
					" WHERE UID = '$uid'";

			if($res = $this->db->query($sql)) {
				return $this->getData($res);
			}
			return false;
		}

		public function getTODO($id) {
			$sql = "SELECT * FROM " . $this->TODO_TABLE .
					" WHERE ID = '$id'";

			if($res = $this->db->query($sql)) {
				return $this->getData($res);
			}
			return false;
		}

		public function getSubTODO($id) {
			$sql = "SELECT * FROM " . $this->SUB_TABLE .
					" WHERE ID = '$id'";
			if($res = $this->db->query($sql)) {
				return $this->getData($res);
			}
			return false;
		}

		private function getData($res, $mode = MYSQLI_ASSOC) {
			if(!$res) {
				return false;
			}

			$data = array();
			while($d = $res->fetch_array($mode)) {
				$data[] = $d;
			}
			return $data;
		}
	}

?>