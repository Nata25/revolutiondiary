<?php
  include("connect.inc.php");

  $URL = $_SERVER['PHP_SELF'];

  // Fetching tags for given URL

  try {
    $sql = "SELECT tag, query
            FROM tags INNER JOIN posts_tags
              ON tags.id = posts_tags.tagid
            INNER JOIN posts
              ON posts_tags.postid = posts.id
            WHERE URL = '$URL'";
    $result = $pdo->query($sql);
  }
  catch (PDOException $e) {
    echo "Cannot fetch tags, " . $e->getMessage();
    exit();
  }

    // save selected rows to a list
      while ($row = $result->fetch()) {
        $name = $row["tag"];
        $query = $row["query"];
    // display
        echo '<a href="' . "/tags/?name=" . $query . '">' . $name . "</a>, &nbsp;";
      }

  ?>
