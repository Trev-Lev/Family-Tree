<?php

    // db.conf or dbconf.php
    require_once 'db_credentials.php';

    $fullname = $_POST['editfullname'];
    $birthdate = $_POST['editbirthdate'];
    $editdeathdate = $_POST['editdeathdate'];
    $ID = $_POST['children'];

     $conn = new mysqli($servername, $username, $password, $dbname);

    // Error handling
    if ($conn -> connect_error) {
        $error = "Error: " . $conn->connect_errno . " " . $conn->connect_error;
        require "index.html";
        exit;
    }

    $nameEscaped = $conn->real_escape_string($fullname);

    $query = "UPDATE members SET NAME = '$nameEscaped', dob = '$birthdate', dod = '$editdeathdate' WHERE id = '$ID';";

    if ($conn->query($query) === TRUE) {
        echo "record edited successfully!";
    } else {
        echo "Error: " . $query . "<br>" . $conn->error;
    }

    $conn->close();

    header('Location: index.php');
    exit;


?>
