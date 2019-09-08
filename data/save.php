<?php
  // create short variable names
  
  $file_name = $_POST['file_name'];
  
?>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8">
<title> data save/load  </title>
</head>
<body>

<?php
 

  if($file_name == "index_html")
  {
	$agree = $_POST['agree'];
	$whatDay = $_POST['whatDay'];
	$name = $_POST['name'];
	$tel = $_POST['tel'];
	$story = $_POST['story'];	
	
	 echo $whatDay;

    $outputstring =  $whatDay.",".$name.",".$tel.",".$story.",".$agree."\n";

    $fp = fopen("bghbmh.dothome.co.kr/data/askMe.txt", 'a');

    flock($fp, LOCK_EX);
    if (!$fp) {
      echo "no";
      exit;
    }
    
    fwrite($fp, $outputstring, strlen($outputstring));
    flock($fp, LOCK_UN);
    fclose($fp);

    header("location: https://bghbmh.github.io/main/");
  }
  else if($file_name == "admin_php")
  {
    $allData = $_POST['reData'];

    echo $allData;

    $fileopen = @fopen("bghbmh.dothome.co.kr/data/askMe.txt",'w') or exit("파일을 읽을 수 없습니다."); 

    flock($fileopen, LOCK_EX);
    if (!$fileopen) {
      echo "no";
      exit;
    }
    
    fwrite($fileopen, $allData);
    flock($fileopen, LOCK_UN);
    fclose($fileopen);
    
    header("location: bghbmh.dothome.co.kr/data/admin.php");
  }

?>

</body>
</html>
