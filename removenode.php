<<<<<<< HEAD
<?php

    // db.conf or dbconf.php
    require_once 'db.conf';

    $deleteThisID = $_POST['children'];

    $conn = new mysqli($dbhost, $dbuser, $dbpass, $dbname);

    // Error handling
    if ($conn -> connect_error) {
        $error = "Error: " . $conn->connect_errno . " " . $conn->connect_error;
        require "index.html";
        exit;
    }

    $query = "DELETE FROM members WHERE id = '$deleteThisID';";

    if ($conn->query($query) === TRUE) {
        echo "Record destroyed successfully!";
    } else {
        echo "Error: " . $query . "<br>" . $conn->error;
    }

    $conn->close();

    header('Location: index.html');
    exit;

=======
<?php

    // db.conf or dbconf.php
    require_once 'db.conf';

    $deleteThisID = $_POST['children'];

    $conn = new mysqli($dbhost, $dbuser, $dbpass, $dbname);

    // Error handling
    if ($conn -> connect_error) {
        $error = "Error: " . $conn->connect_errno . " " . $conn->connect_error;
        require "index.html";
        exit;
    }

    $query = "DELETE FROM members WHERE id = '$deleteThisID';";

    if ($conn->query($query) === TRUE) {
        echo "Record destroyed successfully!";
    } else {
        echo "Error: " . $query . "<br>" . $conn->error;
    }

    $conn->close();

    header('Location: index.html');
    exit;

>>>>>>> 76c7520c0bcf363d314909abc2ce2031961e2ed2
?>