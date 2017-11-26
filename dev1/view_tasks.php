<?php
	require ('db_credentials.php');
	require ('web_utils.php');

	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);

	// Check connection
	if ($conn->connect_error) {
		print generatePageHTML("Tasks (Error)", "<p>Connection failed: " . $conn->connect_error . "</p>");
		exit;
	}

	$sql = "SELECT * FROM members";
	$result = $conn->query($sql);
	$members = array();
	if ($result->num_rows > 0) {
		while($row = $result->fetch_assoc()) {
			array_push($members, $row);
		}
	}

	print generatePageHTML("Members", generateTaskTableHTML($members));



	function generateTaskTableHTML($members) {

		if (count($members) < 1) {
			$html .= "<p>No members to display!</p>\n";
			return $html;
		}

		$html .= "<table>\n";
		$html .= "<tr><th>id</th><th>first name</th><th>last name</th><th>sex</th><th>date of birth</th><th>spouse</th><th>spouse id</th><th>parent id</th></tr>\n";

		foreach ($members as $member) {
			$id = $member['id'];
			$firstName = $member['firstName'];
			$lastName = $member['lastName'];
			$sex = $member['sex'];
			$dob = $member['dob'];
			$spouse = $member['spouse'];
			$spouseID = $member['spouseID'];
			$parentID = $member['parentID'];

			$html .= "<tr><td>$id</td><td>$firstName</td><td>$lastName</td><td>$sex</td><td>$dob</td><td>$spouse</td><td>$spouseID</td><td>$parentID</td></tr>\n";
		}
		$html .= "</table>\n";

		return $html;
	}

?>
