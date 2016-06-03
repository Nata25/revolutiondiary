<?php

  // Fetching tags for given URL

  try {
    $sql = "SELECT tag, query
            FROM tags INNER JOIN posts_tags
              ON tags.id = posts_tags.tagid
            INNER JOIN posts
              ON posts_tags.postid = posts.id
            WHERE URL = '$URL'
            ORDER BY tag";
    $result = $pdo->query($sql);
  }
  catch (PDOException $e) {
    //echo "Помилка при відображені, " . $e->getMessage();
    exit();
  }

    if ($result->rowCount() != 0) {
      echo "<div class='tags'>";
      echo "<h5>Теги:</h5>";
      echo "<p>";

      while ($row = $result->fetch()) {
          $name = $row["tag"];
          $query = $row["query"];
          $tags_array[] = '<a rel="tag" href="' . "/tags/?name=" . $query . '">' . $name . "</a>";
      }

      $tags_list = implode(",&nbsp;", $tags_array);
      echo $tags_list . "</p></div>";
    }

  ?>
