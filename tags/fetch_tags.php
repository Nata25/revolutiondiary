<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Виводимо список тегів із таблиці</title>
  </head>
  <body>
    <?php
      include("connect.inc.php");

      $URL = "/2013/Nov/21";

      // Finding corresponding title

      try {
        $sql = "SELECT title FROM posts WHERE URL = '/2013/Nov/21'";
        $title = $pdo->query($sql);

      } catch (Exception $e) {
        echo "Cannot parse title, " . $e->getMessage();
        exit();
      }


      // Fetching tags for given URL`

      try {
        $sql = "SELECT tag, query
                FROM tags INNER JOIN posts_tags
                  ON tags.id = posts_tags.tagid
                INNER JOIN posts
                  ON posts_tags.postid = posts.id
                WHERE URL = '/2013/Nov/21'";
        $result = $pdo->query($sql);
      }
      catch (PDOException $e) {
        echo "Cannot fetch tags, " . $e->getMessage();
        exit();
      }

      include("output.php");
     ?>

  </body>
</html>
