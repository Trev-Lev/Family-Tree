<?php

require ('db_credentials.php');

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error)
{
    die("Connection failed: " . $conn->connect_error);
}



Class Node {
   public $id;
   public $parent_id;
   public $value;
   public $children;
   public $depth;

   function __construct($id, $parent_id, $value) {
      $this->id = $id;
      $this->parent_id = $parent_id;
      $this->value = $value;
      $this->children = array();
      $this->depth = 0;
   }

   function get_children_from_mysql() {
     echo "pie1";
      $query = "SELECT id, NAME, parentID FROM members WHERE parentID = '$this->id'";
      $results = mysqli_query($conn,$query);
    //$results = mysqli_query($conn,$query);
      echo "pie2";
      $row = mysqli_fetch_array($results);
      echo "$row['id']";

      while ($next = mysqli_fetch_array($results)) {
        echo "pie3";
        // $next_node = new Node($next['id'], $next['parentID'], $next['NAME']);
        $next_node = new Node($next['id'], $next['NAME'], $next['parentID']);
         $this->children[$next_node->id] = $next_node;
         $next_node->get_children_from_mysql();
         echo "pie";
      }
   }

   function to_array() {
      if (count($this->children) > 0) {
         $arr = array();
         foreach ($this->children as $child) {
            array_push($arr, $child->to_array());
         }
         return array($this->value => $arr);
      } else {
         return $this->value;
      }
   }

   function to_json() {
      return json_encode($this->to_array());
   }

}

// you need to know the root uid/value or get it from mysql
$root_uid = 1;
$root_value = "Richard Shakespeare";
$root = new Node($root_uid, 0, $root_value);
$root->get_children_from_mysql(); // magical recursive call

echo $root->to_json();

?>
