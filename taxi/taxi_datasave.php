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
    $bookingTrip = $_POST['bookingTrip'];
    $whatDay = $_POST['whatDay'];
    $name = $_POST['name'];
    $tel = $_POST['tel'];
    $date = $_POST['date'];
    $way = $_POST['way'];
    $start = $_POST['start'];
    $finish = $_POST['finish'];
    $people = $_POST['people'];
    $agree = $_POST['agree'];  

    $outputstring = $bookingTrip.",". $whatDay.",".$name.",".$tel.",".$date.",".$way.",".$start.",".$finish.",".$people.",".$agree."\n";

    $fp = fopen("orders.txt", 'a');

    flock($fp, LOCK_EX);
    if (!$fp) {
      echo "no";
      exit;
    }
    
    fwrite($fp, $outputstring, strlen($outputstring));
    flock($fp, LOCK_UN);
    fclose($fp);

    header("location:index.html");
  }
  else if($file_name == "dataoutput_php")
  {
    $allData = $_POST['reData'];

    //echo "????<br><br>";

    //echo $allData;

    $fileopen = @fopen("orders.txt",'w') or exit("파일을 읽을 수 없습니다."); 

    flock($fileopen, LOCK_EX);
    if (!$fileopen) {
      echo "no";
      exit;
    }
    
    fwrite($fileopen, $allData);
    flock($fileopen, LOCK_UN);
    fclose($fileopen);
    
    header("location: http://bghbmh.dothome.co.kr/taxi/toutput.php");
  }

?>

</body>
</html>
