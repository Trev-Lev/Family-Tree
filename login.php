<?php
    //session_start();

    // Attempt password hashing here

    /*
    $password = 'Databaseisgr8!';
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    print $password . "<br />";
    print $hashedPassword . "<br />";
    

    if (password_verify($password, $hashedPassword)) {
        print("Password matches.<br />");
    } else {
        print("Password does not match lol.<br />");
    }*/

?>
<html lang="en">
<head>
    <meta charset="utf-8"/>
    <title>you better log in mister</title>
</head>
<body>
    <div id="loginformdiv">
        <form action="logmein.php" method="post">
            <p>Username:</p>
            <input type="text" placeholder="UserID" name="username" id="username">
            <br> <p>Password:</p>
            <input type="password" placeholder="Password" name="password" id="password">
            <br>
            <input type="submit" value="Submit">
        </form>
    </div>
    
</body>

</html>