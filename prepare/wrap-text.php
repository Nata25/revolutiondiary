<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Wrapping text</title>
  </head>
  <body>
    <?php

      $DOCUMENT_ROOT = $_SERVER['DOCUMENT_ROOT'];

      $filename = $DOCUMENT_ROOT.'/prepare/'.'to_wrap.txt';

      $file = fopen($filename, 'r');

      $text = '';
      $output = '';
      $indent = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";

      while ($line = fgets($file)) {
        $text[] = trim($line);
      }

      foreach ($text as $line) {
        $output .= $indent;
        $output .= "&lt;p&gt;";
        $wrapped_text = wordwrap($line, 150, "</br>\n" . $indent);
        $output .= $wrapped_text;
        $output .= "&lt;/p&gt;</br>";
      }
      //$newtext = wordwrap($text, 130, "</br>\n");

      $output = str_replace('“', '&laquo;', $output);
      $output = str_replace('”', '&raquo;', $output);
      $output = str_replace('...', '&hellip;', $output);

      echo $output;

    ?>

  </body>
</html>
