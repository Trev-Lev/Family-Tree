<?php

    require_once 'db_credentials.php';
    //session_start();

    // Get username
    $username = $_POST['username'];

    // Get password to hash
    $password = $_POST['password'];

    // Hash password
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    $connect = new mysqli($servername, $username, $password, $dbname);

    // Error handling
    if ($connect -> connect_error) {
        $error = "Error: " . $connect->connect_errno . " " . $connect->connect_error;
        require "index.php";
        exit;
    }

    $query = "SELECT * FROM users WHERE loginID = '$username' AND password = '$hashedPassword';";
    $result = $connect->query($query);

    if ($result->num_rows > 0) {
        echo "Login success! Redirecting...";
        $_SESSION['isIn'] = true;
        $_SESSION['userID'] = $username;
        sleep(2);
        header("Location: index.php");
    } else {
        $_SESSION['isIn'] = false;
        echo "Error: " . $query . "<br>" . $connect->error;
    }

    $connect->close();

    header('Location: index.php');
    exit;

?>