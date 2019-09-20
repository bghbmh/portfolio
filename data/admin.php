<?php 
	// 데이터 추가
	if ($_POST != null){
	 	$f = @fopen("askMe.txt",'a') or exit("파일을 읽을 수 없습니다.");
		if ($f != null){
			$s = $_POST['text1'];
			fputs($f,$s . "\n");
			fclose($f);
		}
	}
	// 파일 읽기
	$ck_list=array("등록일", "이름", "전화번호", "문의", "정보동의" );
	$fileopen = @fopen("askMe.txt",'r') or exit("파일을 읽을 수 없습니다.");
	$lines = array();
	$x = 0;

	while(!feof($fileopen)){
		$one_line = htmlspecialchars(fgets($fileopen));

		//echo $one_line;
		if ($one_line != ""){
			$lines[$x] = $one_line;
			$x++;
		}
	}
	fclose($fileopen);


?>

<!DOCTYPE html>
<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="Content-Script-Type" content="text/javascript">
<meta http-equiv="Content-Style-Type" content="text/css">
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no">
<meta name="apple-mobile-web-app-title" content="박민희">


<link rel="apple-touch-icon-precomposed" sizes="72x72" href="img/icon72.jpg" />
<link rel="apple-touch-icon-precomposed" sizes="96x96" href="img/icon96.jpg" />
<link rel="apple-touch-icon-precomposed" sizes="144x144" href="img/icon144.jpg" />
<link rel="apple-touch-icon-precomposed" sizes="192x192" href="img/icon192.jpg" />



<link rel="stylesheet" type="text/css" href="../font/nanumsquare.css" />
<link rel="stylesheet" type="text/css" href="../css/admin.css">
<title>박민희</title>
</head>

<body>


	<style>

	</style>
<div class="wrap">

	<div class="cardDB">문의사항</div>

	<!--div class="mheight"></div-->


		<?php



			$row = count($lines)-1;
			//$temp = explode('\t', $lines[0]);
			$colum = count( explode(',', $lines[0]) );

			//echo $row;

			for($i=$row; $i>=0; $i--)
			{
				$num = $i +1;
				$nowNum = $row-$i;

				$txt = explode(',', $lines[$i]);
				//for($y=0; $y<$colum; $y++)
				$clickDay = $txt[0];
				$name = $txt[1];
				$tel = $txt[2];
				$story = $txt[3];
				$agree = $txt[4];


				echo "<div class='card' id='li".$nowNum."'>
						  <span class='card_num'>".$num."</span>
						  <div class='card_name'>". $name . "</div>

						  <form name='ckDB".$nowNum."' method='post' target='_self'>
							  <ul class='card_list'>
								  <li><span>전화번호</span><input type='tel' name='tel' value='". $tel . "'></li>
								  <li><span>문의</span><textarea id='story' name='story' >". $story . "</textarea></li>
							  </ul>
							  <ul class='card_in' id='ci".$nowNum."'>
								   <li>". $agree . "</li>
								   <li>". $clickDay ."</li>
							  </ul>
							  <div class='btn' onClick='selecting(".$nowNum.")'></div>
							  <ul class='btn_select'>
								  <li onClick='modifyDB(".$nowNum.")' ontouchstart=''>수정하기</li>
								  <li onClick='deleteDB(".$nowNum.",". ($row + 1).")' ontouchstart=''>삭제하기</li>
								  <li onClick='closeScreen(".$nowNum.")' ontouchstart=''>닫기</li>
							  </ul>
							  <div class='btn_done'><div class='bde' onClick='done(".$nowNum.",". ($row + 1).")' ontouchstart='' ></div></div>
						  </form>
					</div>";

			}

		?>

</div>
		<form id="ok_DB" name="reDB" method='post' target='_self'>
            <input type="hidden" name="reData" value="">
            <input type="hidden" name="file_name" value="">
            </form>






	<script>
		var reAllData = "";
		var i, j;
		var a, b, c,d,e,f,g,h,k,l, m;
		var del_card, book, reDB, asking;
		var which;

		document.forms["reDB"]["file_name"].value = "admin_php";



		function selecting(i, j){ //alert(j);

		//alert(i);
			document.getElementsByClassName("btn")[i].style.display="none";
			document.getElementsByClassName("btn_select")[i].style.display="block";

		}

		function modifyDB(i){
			which = "ckDB" + i;
			//alert("modifyDB");
			//var tel = document.forms[which]["tel"].value;
			document.getElementsByClassName("card")[i].style.backgroundColor="#d5d5d5";

			document.getElementsByClassName("btn_select")[i].style.display="none";
			document.getElementsByClassName("btn_done")[i].style.display="block";
		}

		function deleteDB(i, all){ //
			//alert("deleteDB");
			document.getElementsByClassName("btn_done")[i].style.display="none";
			document.getElementsByClassName("btn")[i].style.display="block";

			//ck="check"+(trows-i+1);   //	alert(t.rows[i].cells[4].innerHTML);		//alert(t.rows[i].cells[3].innerHTML);

			del_card = i;

			for(j=(all-1); j>=0; j--)
			{  //alert(j);
				if(j != del_card)
				{
					//book = "bt" + j;
					reDB = "ckDB" + j;  //alert(reDB);
					asking = "ci" + j;
					//a = document.getElementById(book).innerHTML ;
					b = document.getElementById(asking).getElementsByTagName("li")[1].innerHTML;
					c = document.getElementsByClassName('card_name')[j].innerHTML;
					d = document.forms[reDB]["tel"].value;
					e = document.forms[reDB]["story"].value;
					l = document.getElementById(asking).getElementsByTagName("li")[0].innerHTML;
					m = b + ','+ c + ','+ d + ','+e + ','+l;
					//if(j != 0) m = m +'\n';
					reAllData = reAllData + m;
				}

			}
			goDB();
		}

		function closeScreen(i){
			//alert(i);
			document.getElementsByClassName("btn_select")[i].style.display="none";
			document.getElementsByClassName("btn")[i].style.display="block";
		}

		function done(i, all){
			//alert("done"+i+"/"+all);
			document.getElementsByClassName("btn_done")[i].style.display="none";
			document.getElementsByClassName("btn")[i].style.display="block";

			which = "ckDB" + i;
			//alert("modifyDB");
			//var tel = document.forms[which]["tel"].value;
			document.getElementsByClassName("card")[i].style.backgroundColor="#fff";

			for(j=(all-1); j>=0; j--)
			{  //alert(j);
				//book = "bt" + j;
				reDB = "ckDB" + j;  //alert(reDB);
				asking = "ci" + j;
				//a = document.getElementById(book).innerHTML ;
				b = document.getElementById(asking).getElementsByTagName("li")[1].innerHTML;
				c = document.getElementsByClassName('card_name')[j].innerHTML;
				d = document.forms[reDB]["tel"].value;
				e = document.forms[reDB]["story"].value;
				e = e.replace(/\n/gi, " ");
				l = document.getElementById(asking).getElementsByTagName("li")[0].innerHTML;
				m = b + ','+ c + ','+ d + ','+e + ','+l;
				//if(j != 0) m = m +'\n';

				reAllData = reAllData + m;

			}
			goDB();

		}


		function goDB(){  //alert(reAllData);
			document.forms["reDB"]["reData"].value = reAllData;
			//alert(document.forms["reDB"]["allData"].value);
			document.getElementById("ok_DB").action = "save.php";
			document.getElementById("ok_DB").submit();
		}



	</script>












</body>

</html>
