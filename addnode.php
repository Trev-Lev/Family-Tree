<<<<<<< HEAD
<?php

    // db.conf or dbconf.php
    require_once 'db.conf';

    $fullname = $_POST['fullname'];

    // Other data strings
    $childOf = $_POST['parents'];
    $birthdate = $_POST['birthdate'];
    $deathdate = $_POST['deathdate'];   

    $conn = new mysqli($dbhost, $dbuser, $dbpass, $dbname);

    // Error handling
    if ($conn -> connect_error) {
        $error = "Error: " . $conn->connect_errno . " " . $conn->connect_error;
        require "index.html";
        exit;
    }

    $query = "INSERT INTO members (NAME, dob, dod, parentID) VALUES ('$fullname', '$birthdate', '$deathdate', '$childOf');";

    if ($conn->query($query) === TRUE) {
        echo "New record created successfully!";
    } else {
        echo "Error: " . $query . "<br>" . $conn->error;
    }

    $conn->close();

    header('Location: index.html');
    exit;

    //require index.html;

=======
<?php

    // db.conf or dbconf.php
    require_once 'db.conf';

    $fullname = $_POST['fullname'];

    // Other data strings
    $childOf = $_POST['parents'];
    $birthdate = $_POST['birthdate'];
    $deathdate = $_POST['deathdate'];   

    $conn = new mysqli($dbhost, $dbuser, $dbpass, $dbname);

    // Error handling
    if ($conn -> connect_error) {
        $error = "Error: " . $conn->connect_errno . " " . $conn->connect_error;
        require "index.html";
        exit;
    }

    $query = "INSERT INTO members (NAME, dob, dod, parentID) VALUES ('$fullname', '$birthdate', '$deathdate', '$childOf');";

    if ($conn->query($query) === TRUE) {
        echo "New record created successfully!";
    } else {
        echo "Error: " . $query . "<br>" . $conn->error;
    }

    $conn->close();

    header('Location: index.html');
    exit;

    //require index.html;

>>>>>>> 76c7520c0bcf363d314909abc2ce2031961e2ed2
?>