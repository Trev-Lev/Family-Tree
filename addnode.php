<?php

    // db.conf or dbconf.php
    require_once 'db_credentials.php';
    session_start();

    $userUniqueID = $_SESSION['id1'];

    $fullname = $_POST['fullname'];

    // Other data strings
    $childOf = $_POST['parents'];
    $birthdate = $_POST['birthdate'];
    $deathdate = $_POST['deathdate'];

    $conn = new mysqli($servername, $username, $password, $dbname);

    // Error handling
    if ($conn -> connect_error) {
        $error = "Error: " . $conn->connect_errno . " " . $conn->connect_error;
        require "index.html";
        exit;
    }

    $nameEscaped = $conn->real_escape_string($fullname);

    $query = "INSERT INTO members (NAME, dob, dod, parentID, userID) VALUES ('$nameEscaped', '$birthdate', '$deathdate', '$childOf', $userUniqueID);";

    if ($conn->query($query) === TRUE) {
        echo "New record created successfully!";
    } else {
        echo "Error: " . $query . "<br>" . $conn->error;
    }

    $conn->close();

    header('Location: index.php');
    exit;

    //require index.html;

?>
