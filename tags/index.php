<?php
  include($_SERVER['DOCUMENT_ROOT'].'/head.html');
?>

    <div class="container">
      <div class="left-bar"></div>
      <div class="text-container">

<?php

    // Connect to database
    include("connect.inc.php");

    if ($_REQUEST['name']) {
      $tag_query = $_REQUEST['name'];
    }

    // Get the tag name
    try {
      $sql = "SELECT tag FROM tags WHERE query = '" . $tag_query . "' ";
      $result = $pdo->query($sql);
      $name = $result->fetch();
      echo '<h1>Записи за тегом &laquo;' . $name[0] . '&raquo;:</h1>';

    }
    catch (PDOException $e) {
      echo "Cannot fetch tag_name, " . $e->getMessage();
      exit();
    }

    // Display posts on selected tag
    try {
      $sql = "SELECT title, brief, URL
              FROM posts INNER JOIN posts_tags
                ON posts.id = posts_tags.postid
              INNER JOIN tags
                ON posts_tags.tagid = tags.id
              WHERE tags.query = '" . $tag_query . "' ";
      $result = $pdo->query($sql);
    }
    catch (PDOException $e) {
      echo "Cannot fetch tags, " . $e->getMessage();
      exit();
    }

    foreach ($result as $row) {
      $item[] = $row;
    }
?>

<?php
    foreach ($item as $line) {
      $date = $line['title'];
      $text = $line['brief'];
      $URL = $line['URL'];
      $entry = '<h3><a href="'. $URL . '">'. $date;
      $entry .= ":</a></h3><p>" . $text;
      $entry .= '&nbsp;&nbsp;<a href="'. $URL . '">Детальніше...</a></p>';
      echo $entry;
    }
 ?>

 <?php
   include($_SERVER['DOCUMENT_ROOT'].'/raw_foot.html');
 ?>
