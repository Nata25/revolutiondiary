<!-- <script>console.log("fetch_tags.php");</script> -->

<?php
  // include("connect.inc.php");

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
          $tags_array[] = '<a rel="tag" href="' . "/tags/?name=" . $query . '">' . $name . ",</a>";
      }

      // Display tags
      $last = array_pop($tags_array);
      $last = str_replace(",</a>", "</a>", $last);
      array_push($tags_array, $last);

      $tags_list = implode(" ", $tags_array);

      echo $tags_list . "</p></div>";
    }

  ?>
