<?php

    require_once 'db_credentials.php';
    session_start();    // needed
    
    // user "test", password "dale" for non-password hash
    // other ID: "Trevor" and "dale"
    
    $userusername = empty($_POST['username']) ? '' : $_POST['username'];
    $userpassword = empty($_POST['password']) ? '' : $_POST['password'];

    $connect = new mysqli($servername, $username, $password, $dbname);

    // Escape the strings here
    //$userusername = mysql_real_escape_string($userusername);
    //$userpassword = mysql_real_escape_string($userpassword);

    // Hash password
    $hashedPassword = password_hash($userpassword, PASSWORD_DEFAULT);

    // Error handling
    if ($connect -> connect_error) {
        $error = "Error: " . $connect->connect_errno . " " . $connect->connect_error;
        require "index.php";
        exit;
    }

    $query = "SELECT * FROM users WHERE loginID = '$userusername' AND password = '$userpassword'";
/*
    $query = $connect->prepare("SELECT * FROM users WHERE loginID = ? AND password = ?");
    $query->bind_param("ss", $userusername, $hashedPassword);
*/
    $result = $connect->query($query);

    if ($result->num_rows > 0) {
        $_SESSION['isIn'] = true;
        $_SESSION['username'] = $userusername;
        // userid?
        $connect->close();
        header("Location: index.php");
        exit;
    } else {
        $_SESSION['isIn'] = false;
        // debugging
    }

    $connect->close();
    header('Location: index.php');
    exit;
?>