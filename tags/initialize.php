<?php
  include("connect.inc.php");

  // Get URL of a page
  $URL = $_SERVER['PHP_SELF'];

  try {
    $sql = "SELECT title, URL, day
            FROM posts
            WHERE URL = '$URL'";
    $result = $pdo->query($sql);
  }
  catch (PDOException $e) {
    //echo "Помилка при відображені, " . $e->getMessage();
    exit();
  }

  $row = $result->fetch();
  $date = $row['day'];
  $title = $row['title'];
?>
