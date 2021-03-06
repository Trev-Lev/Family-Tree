<!DOCTYPE html>
<?php
    
    // Session start? Sure man
    session_start();

    $loggedIn = $_SESSION['username'];

    // To check if we are logged in later:
    if ($_SESSION['isIn'] == true)
        $message = "You're currently logged in as '$loggedIn.'";
    else {
        $message = "You're not logged in.";
        header("Location: login.html");
        exit;
    }
?>
<html lang="en">
<head>
    <meta charset="utf-8"/>
    <title>Family Tree</title>
    <!-- stylesheets -->
    <link rel="stylesheet" href="treant-js-master/Treant.css" type="text/css"/>
    <link rel="stylesheet" href="treecss.css" type="text/css"/>

</head>
<body>
    
    <h2 id="titlemessage">Family Tree</h2>
    <br>
    <p id="loginmessage"><?php echo $message ?></p>
    <?php
        if ($_SESSION['isIn'] == true) {
            echo "<form action='logout.php' method='post' class='centered'> <input type='submit' value='Log out' id='logout'> </form>";
        }
    ?>
    
    <!-- Tree -->
    <div id="tree-simple" class="base"></div>

    <!-- Modal for adding to tree -->
    <div id="addmodal" class="addmodal">
        <div class="modal-content-add" id="modal-content-add"></div>
    </div>

    <!-- Modal for removing from tree -->
    <div id="removemodal" class="removemodal">
        <div class="modal-content-remove" id="modal-content-remove"></div>
    </div>

    <!-- Modal for editing a node on the tree -->
    <div id="editmodal" class=" editmodal">
        <div class="modal-content-edit" id="modal-content-edit"></div>
    </div>

    <!-- Buttons -->
    <div id="center">
        <button id="addbutton">Add a member</button>
        <button id="removebutton">Remove a member</button>
        <button id="editbutton">Edit a member</button>
    </div>

    <!-- javascript -->
    <script type = "text/javascript" src="node_modules/underscore/underscore-min.js"></script>
    <script src="treant-js-master/vendor/raphael.js"></script>
    <script src="treant-js-master/Treant.js"></script>
    <script src="jquery-3.2.1.min.js"></script>
    <script src="javascript.js"></script>
  <!--  <script type = "text/javascript" src="node_modules/underscore/underscore-min.js"></script>-->
  <!--  <script src="node_modules/underscore/package.json"></script>
    <script src="node_modules/underscore/underscore-min.js"></script>-->

</body>
</html>
