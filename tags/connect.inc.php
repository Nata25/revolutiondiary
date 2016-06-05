<?php try {
  $pdo = new PDO('mysql:host=localhost;dbname=tagcloud', 'tagcloud', 'datydni2013');
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  $pdo->exec('SET NAMES "utf8"');
}
catch (PDOException $e)
{
  echo "Cannot connect to the database: " .
  $e->getMessage();
  exit();
}
?>

<!-- <script>
  console.log("Connection set");
</script> -->
