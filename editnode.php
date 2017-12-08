<?php

    // db.conf or dbconf.php
    require_once 'db.conf';

    $fullname = $_POST['editfullname'];
    $birthdate = $_POST['editbirthdate'];
    $editdeathdate = $_POST['editdeathdate'];
    $ID = $_POST['children'];

     $conn = new mysqli($dbhost, $dbuser, $dbpass, $dbname);

    // Error handling
    if ($conn -> connect_error) {
        $error = "Error: " . $conn->connect_errno . " " . $conn->connect_error;
        require "index.html";
        exit;
    }

    $query = "UPDATE members SET NAME = '$fullname', dob = '$birthdate', dod = '$editdeathdate' WHERE id = '$ID';";

    if ($conn->query($query) === TRUE) {
        echo "record edited successfully!";
    } else {
        echo "Error: " . $query . "<br>" . $conn->error;
    }

    $conn->close();

    header('Location: index.html');
    exit;
    

?>