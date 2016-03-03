<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Показуємо дані за тегом</title>
  </head>
  <body>

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
      echo '<h1>Показуємо дані за тегом "' . $name[0] . '"</h1>';

    }
    catch (PDOException $e) {
      echo "Cannot fetch tag_name, " . $e->getMessage();
      exit();
    }

    // Display posts on selected tag
    try {
      $sql = "SELECT title, brief
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

    foreach ($item as $line) {
      $date = $line['title'];
      $text = $line['brief'];
      echo "<p><h3>". $date . ":</h3> " . $text . "</p>";
    }

     ?>
  </body>
</html>
