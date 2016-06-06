<?php include("connect.inc.php"); ?>

<?php
// Get page title

    if ($_REQUEST['name']) {
      $tag_query = $_REQUEST['name'];
      $date = $tag_query;
    }

    // Get the tag name and generate basic heading
    try {
      $sql = "SELECT tag FROM tags WHERE query = '" . $tag_query . "' ";
      $result = $pdo->query($sql);
      $name = $result->fetch();
      $basic_heading = 'Записи за тегом «' . $name[0] . '»';
    }
    catch (PDOException $e) {
      echo "Cannot fetch tag_name, " . $e->getMessage();
      exit();
    }
?>

<?php
// Generate custom page title and description using basic heading
  $custom_heading = $name[0] . " | Дати. Дні. Нотатки з Революції";
  $custom_description = $basic_heading;

?>

<?php
// Generate document head
include($_SERVER['DOCUMENT_ROOT'].'/head.html');
?>

    <div class="container">
      <div class="left-bar"></div>
      <div class="text-container">
        <h1><?php echo $basic_heading; ?>:</h1>

<?php
// Display posts on selected tag
    try {
      $sql = "SELECT day, title, brief, URL
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
      $date = $line['day'];
      $title = $line['title'];
      $text = $line['brief'];
      $URL = $line['URL'];
      $entry = '<h3><a href="'. $URL . '">'. $date . '</a></h3>';
      $entry .= '<p class=sub-date>' . $title . '</p>';
      $entry .= '<p>' . $text;
      $entry .= '&nbsp;&nbsp;<a href="'. $URL . '">Детальніше...</a></p>';
      echo $entry;
    }
 ?>

 <nav>
   <h2 class="offset">Швидкі посилання</h2>
   <a href="/">На головну...</a>
   <br /><a href="/about.html" accesskey="a">Детальніше про цей сайт...</a>
   <br /><a href="/tips.html">Як користуватися сайтом...</a>
 </nav>

 <?php
 // Generate foot part without prev/next links
   include($_SERVER['DOCUMENT_ROOT'].'/raw_foot.html');
 ?>
