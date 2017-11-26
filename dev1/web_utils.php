<?php

function generatePageHTML($title, $body) {
	$html = <<<EOT
<!DOCTYPE html>
<html>
<head>
<title>$title</title>
</head>
<body>
$body
</body>
</html>
EOT;

	return $html;
}

?>