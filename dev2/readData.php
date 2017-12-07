<?php

require ('db_credentials.php');

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error)
{
    die("Connection failed: " . $conn->connect_error);
}

$sql1="SELECT * FROM members";
$result=mysqli_query($conn,$sql1);
$rows=mysqli_fetch_array($result)
//$rows=mysqli_query($conn,$sql);



function hasChild($id){

    $sql = "SELECT count(*) as da_count FROM members WHERE parentID = ?";
    /*
    $stmt = $this->db->prepare($sql);
    $stmt->execute(array($id));
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    */
    $stmt = $conn->prepare($sql);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    return $row['da_count'] > 0 ? true : false;
}//function hasChild($id)

// create an index on id
$index = array();
foreach($rows as $i =>$row)
{
    if (hasChild($i)) {
        $index[$row['id']] = $row;
    }
}

// build the tree
foreach($index as $id => $indexRow)
{
    if ($id === 1) continue;
    $parent = $indexRow['parentID'];
    $index[$parent]['children'][] = $indexRow;
}
unset($indexRow);

echo json_encode($index);

//$fp = fopen('memecho.json', 'w');
//fwrite($fp, json_encode($index));
//fclose($fp);

?>
