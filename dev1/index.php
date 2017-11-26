<?php
require ('db_credentials.php');


$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error)
{
    die("Connection failed: " . $conn->connect_error);
}

$data = array();
$index = array();
$sql2 = "SELECT * FROM members ORDER BY lastName";
$result2 = $conn->query($sql2);

if ($result2->num_rows > 0)
{
        while ($row2 = $result2->fetch_assoc())
        {
                $id = $row2["id"];
                $parent_id = $row2["parentID"] === NULL ? "NULL" : $row2["parentID"];
                $data[$id] = $row2;
                $index[$parent_id][] = $id;
        }
}
else
{
    echo "0 results";
}

$conn->close();

function display_child_nodes($parent_id, $level)
{
    global $data, $index;
    $parent_id = $parent_id === NULL ? "NULL" : $parent_id;
    if (isset($index[$parent_id]))
        {
        foreach ($index[$parent_id] as $id)
                {
            echo str_repeat("-", $level) . $data[$id]["firstName"] . " " . $data[$id]["lastName"] . "<br>";
            display_child_nodes($id, $level + 1);
        }
    }
}

echo '<ul>';
display_child_nodes(NULL, 0);
echo '</ul>';






?>
