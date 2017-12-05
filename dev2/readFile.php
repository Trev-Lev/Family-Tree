<?php
require ('db_credentials.php');

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error)
{
    die("Connection failed: " . $conn->connect_error);
}



echo "Work";
$sql="SELECT NAME, id FROM members";

$response = array();
$members = array();
$result=mysqli_query($conn,$sql);

while($row=mysqli_fetch_array($result))
{
$name=$row['NAME'];
$id=$row['id'];
/*
echo $id;
echo $name;
*/

$members[] = array('name'=> $name, 'id'=> $id);

}

$response['members'] = $members;


$fp = fopen('members.json', 'w');
fwrite($fp, json_encode($response));
fclose($fp);


/*
$filename = 'members.json';
$somecontent = "Add this to the file\n";

// Let's make sure the file exists and is writable first.
if (is_writable($filename)) {

    // In our example we're opening $filename in append mode.
    // The file pointer is at the bottom of the file hence
    // that's where $somecontent will go when we fwrite() it.
    if (!$handle = fopen($filename, 'a')) {
         echo "Cannot open file ($filename)";
         exit;
    }

    // Write $somecontent to our opened file.
    if (fwrite($handle, $somecontent) === FALSE) {
        echo "Cannot write to file ($filename)";
        exit;
    }

    echo "Success, wrote ($somecontent) to file ($filename)";

    fclose($handle);

} else {
    echo "The file $filename is not writable";
}

echo "Read to file";*/
?>
