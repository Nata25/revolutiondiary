<?php

// Connect to the database and based on URL choose the page title / headings

  include("connect.inc.php");

  if ($custom_heading != '') {
    $heading = $custom_heading;
    $description = $custom_description;
  }
  else {
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
      $heading = $date . ": " . $title . " | Дати. Дні";
      $description = 'Запис від ' . $date . ': ' . $title ;

}

?>
