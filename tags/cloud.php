<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Хмара тегів</title>
  </head>
  <body>

    <?php

      include("connect.inc.php");

      $sql = "SELECT tag, query, COUNT(title) AS rating
              FROM tags
              INNER JOIN posts_tags
              ON tagid = tags.id
              INNER JOIN posts
              ON postid = posts.id
              GROUP BY tag;";
      $result = $pdo->query($sql);

      $num_rows = 0;

      while ($row = $result->fetch()) {
        $table[] = $row;
        $num_rows ++;
      }

      $min = $table[0]['rating'];
      $max = $table[0]['rating'];
      for ($i = 1; $i < $num_rows; $i++) {
        if ($table[$i]['rating'] > $max) {
          $max = $table[$i]['rating'];
        }
        if ($table[$i]['rating'] < $min) {
          $min = $table[$i]['rating'];
        }
      }
      $min_size = 70;
      $max_size = 150;
      $scale = ($max_size - $min_size) / ($max - $min);

      foreach ($table as $tag):
        if ($min == $max) {
          $size = ($max_size - $min_size) / 2;
        }
        else {
            $size = $min_size + $scale * ($tag['rating'] - $min);
        }
        $name = $tag['tag'];
        $query = $tag['query'];
     ?>



     <p>
          <?php
            $tag = '<a href="/exercises/tags/?name=' . $query;
            $tag .= '"><span style="font-size:' . $size;
            $tag .= '%;">' . $name . '</span></a>';
            echo $tag;
          ?>
     </p>

   <?php endforeach ?>

  </body>
</html>
