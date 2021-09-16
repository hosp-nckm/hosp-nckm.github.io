
<?php
$myfile = fopen("read_text_file.txt", "r") or die("Unable to open file!");
echo fread($myfile,filesize("read_text_file.txt"));
fclose($myfile);
?>