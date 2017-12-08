<?php

    session_start();
    $_SESSION['isIn'] = false;
    header("Location: index.php");
    exit;

?>