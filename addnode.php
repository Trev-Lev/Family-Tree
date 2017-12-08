<?php

    // db.conf or dbconf.php
    require_once 'db.conf';

    // Splice this string
    $fullname = $_POST['fullname'];

    // Other data strings
    $childOf = $_POST['parents'];
    $birthdate = $_POST['birthdate'];
    $deathdate = $_POST['deathdate'];   // May be null

    $conn = new mysqli($dbhost, $dbuser, $dbpass, $dbname);

    // Error handling
    if ($conn -> connect_error) {
        $error = "Error: " . $conn->connect_errno . " " . $conn->connect_error;
        require "index.php";
        exit;
    }

    $valuesFromFullname = explode('/', $fullname);

    $fullname = $valuesFromFullname[0];
    $id = $valuesFromFullname[1];

    $query = "INSERT INTO members (NAME, dob, dod, parentID) VALUES ('$fullname', '$birthdate', '$deathdate', $id);";

    if ($conn->query($query) === TRUE) {
        echo "New record created successfully!";
    } else {
        echo "Error: " . $query . "<br>" . $conn->error;
    }

    $conn->close();

    header('Location: index.html');
    exit;

    //require index.html;

?>