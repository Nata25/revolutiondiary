    <?php

      include_once("connect.inc.php");

      $sql = "SELECT tag, query, COUNT(title) AS rating
              FROM tags
              INNER JOIN posts_tags
              ON tagid = tags.id
              INNER JOIN posts
              ON postid = posts.id
              GROUP BY tagid;";
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
      $min_size = 110;
      $max_size = 220;
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

          $tag = '<a rel="tag" href="/tags/?name=' . $query;
          $tag .= '"><span style="font-size:' . $size;
          $tag .= '%;">' . $name . '</span></a>';
          echo $tag;

        endforeach;

      ?>
