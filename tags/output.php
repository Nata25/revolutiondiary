<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Виводимо теги</title>
  </head>
  <body>
    <?php

    // 1. print title
      $print_title = $title->fetch();
      echo "<p>Теги для запису за " . $print_title['title'];

    // 2. save selected rows to a list
      while ($row = $result->fetch()):
        $name = $row["tag"];
        $query = $row["query"];
    ?>

      <div style="background-color: lightyellow; height: 20px;">
        <p><?php
            echo '<a href="' . "/tags/?name=" . $query . '">' . $name . "</a>";
            ?>
        </p>
      </div>

    <?php endwhile; ?>

  </body>
</html>
