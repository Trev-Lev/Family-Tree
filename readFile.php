<?php
//session_start();
require ('db_credentials.php');
//include('logmein.php');
session_start();
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error)
{
    die("Connection failed: " . $conn->connect_error);
}
//echo "Work";
$userUniqueID = $_SESSION['id1'];

//echo $userUniqueID;
//sleep(5);

$sql="SELECT NAME, id, parentID, dob, dod FROM members WHERE userID = $userUniqueID";
//$sql="SELECT NAME, id, parentID, dob, dod FROM members";
$person = array();
//$text = array();
$response = array();
$members = array();
$result=mysqli_query($conn,$sql);
while($row=mysqli_fetch_array($result))
{
$name=$row['NAME'];
$id=$row['id'];
$parentid=$row['parentID'];
$htmlclass='white';
//$dob=$row['dob'];
//$dod=$row['dod'];
/*
echo $id;
echo $name;
*/
//$person = array('id'=> $id, 'parentid'=>$parentid, 'name'=>$name);
//$text = array('name' => $name,'dob'=>$dob,'dod'=>$dod);
$text = array('name' => $name, 'title' => $id);
//$text1 = array('text'=>$text);
$members[] = array('text'=>$text,'id'=>$id,'parentid'=>$parentid,'HTMLclass'=>$htmlclass);
//$text = array('name' => $name);
//$text1 = array('text'=>$text);
//$members[] = array('text'=>$text,'id'=>$id,'parentid'=>$parentid,'HTMLclass'=>$htmlclass);
}
//$response['members'] = $members;
//echo json_encode($response);
echo json_encode($members);
//$fp = fopen('members.json', 'w');
//fwrite($fp, json_encode($response));
//fclose($fp);
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
