<?php
//echo "test2";
//log.console("test");
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
    //$hashedPassword = password_hash($userpassword, PASSWORD_DEFAULT);

    // Error handling
    if ($connect -> connect_error) {
        $error = "Error: " . $connect->connect_errno . " " . $connect->connect_error;
        require "index.php";
        exit;
    }

    $loginIDescaped = $connect->real_escape_string($userusername);
    //$passwordescaped = $mysqli->real_escape_string($userpassword);
//echo "test1";
    //$query = "SELECT * FROM users WHERE loginID = '$userusername' AND password = '$userpassword'";
	$query = "SELECT * FROM users WHERE loginID = '$loginIDescaped'";
/*
    $query = $connect->prepare("SELECT * FROM users WHERE loginID = ? AND password = ?");
    $query->bind_param("ss", $userusername, $hashedPassword);
*/
    //$result = $connect->query($query);

    if ($result = $connect->query($query)) {
      $row=$result->fetch_array();
			if ($result->num_rows > 0) {
				$loginID = $row['loginID'];
				$userUniqueID = $row['id'];
				$hashedPassword = $row['password'];

        if(password_verify($userpassword, $hashedPassword))
        {
          $_SESSION['isIn'] = true;
          $_SESSION['username'] = $loginID;
          $_SESSION['id1'] = $userUniqueID;

          $_SESSION['isIn'] = true;
      //    connect->close)();
        //  header("Location: index.php");
          //exit;
        }
        else {
          $_SESSION['isIn'] = false;
        }



			}
      else{
        $_SESSION['isIn'] = false;
      }
			//$result->close();
			//$_SESSION['isIn'] = true;
		} else {
			$_SESSION['isIn'] = false;
		}

/*
$result = $connect->query($query);
$row=$result->fetch_array();
//$result = mysqli_query($connection, $query);

    if ($result->num_rows > 0) {
        $_SESSION['isIn'] = true;
        $_SESSION['username'] = $userusername;
        $userUniqueID = $row['id'];
        //console.log($userUniqueID);
        $_SESSION['id1'] = $userUniqueID;
        // userid?
        $connect->close();
        header("Location: index.php");
        exit;
    } else {
        $_SESSION['isIn'] = false;
        // debugging
    }
*/

    $connect->close();
    header('Location: index.php');
    exit;
?>
