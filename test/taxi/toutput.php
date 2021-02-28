<?php 
	// 데이터 추가 
	if ($_POST != null){ 
	 	$f = @fopen("orders.txt",'a') or exit("파일을 읽을 수 없습니다."); 
		if ($f != null){ 
			$s = $_POST['text1']; 
			fputs($f,$s . "\n"); 
			fclose($f); 
		} 
	}
	// 파일 읽기 
	$ck_list=array( "상태", "등록일", "이름", "전화번호", "여행날짜", "여행길", "출발지", "도착지", "여행자수", "정보동의" );
	$fileopen = @fopen("orders.txt",'r') or exit("파일을 읽을 수 없습니다."); 
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
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /> 
<meta property="og:image:height" content="img/taxi_192.png">
<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
<meta name="format-detection" content="telephone=no, address=no, email=no" />
<link rel="stylesheet" type="text/css" href="../font/nanumsquare.css">
<link rel="stylesheet" type="text/css" href="css/output.css">
<title> 택시함께 여행신청</title> 
</head> 

<body> 


	<style>

	</style>
<div class="wrap">	
	
	<div class="cardDB">택시함께 여행신청</div>
          
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
				$bookingTrip = $txt[0] ;
				$clickDay = $txt[1];
				$name = $txt[2];
				$tel = $txt[3];
				$date = $txt[4];
				$way = $txt[5];
				$start = $txt[6];
				$finish = $txt[7];
				$people = $txt[8];
				$agree = $txt[9];
				
				if($bookingTrip == "예약진행") $cn="ing";
				else if($bookingTrip == "예약완료") $cn="dd";
				else if($bookingTrip == "예약취소") $cn="xx";
				
				echo "<div class='card' id='li".$nowNum."'>
						  <span class='card_num'>".$num."</span>
						  <div class='card_name'>". $name . "</div>
						  <div id='bt".$nowNum."' class='".$cn."' onclick='checkBook(".$nowNum.",".$num.")'>". $bookingTrip . "</div>	
						  <form name='ckDB".$nowNum."' method='post' target='_self'> 					
							  <ul class='card_list'>					
								  <li><span>전화번호</span><input type='tel' name='tel' value='". $tel . "'></li>	
								  <li><span>여행날짜</span><input type='text' name='date' value='". $date . "'></li>	
								  <li><span>여행길</span><input type='text' name='way' value='". $way . "'></li>	
								  <li><span>출발지</span><input type='text' name='start' value='". $start . "'></li>	
								  <li><span>도착지</span><input type='text' name='finish' value='". $finish . "'></li>	
								  <li><span>여행자수</span><input type='tel' name='people' value='". $people . "'></li>
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
		
		document.forms["reDB"]["file_name"].value = "dataoutput_php";
			
		function checkBook(i, j) { 
			var text;
			var which = "bt" + i; 
			var now = document.getElementById(which).innerHTML;
			
			if(document.getElementsByClassName("btn")[i].style.display == "none")
		  	{  
				switch(now) 
				{
				  case "예약진행":
					text = "예약완료";
					break;
				  case "예약완료":
					text = "예약취소";
					break;
				  case "예약취소":
					text = "예약진행";
					break;			  
				}
				document.getElementById(which).innerHTML = text;
			}			
		}
		
		function selecting(i, j){ //alert(j);
		
		//alert(i);
			document.getElementsByClassName("btn")[i].style.display="none";
			document.getElementsByClassName("btn_select")[i].style.display="block";
			
		}

		function modifyDB(i){ //alert(i);
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
					book = "bt" + j;
					reDB = "ckDB" + j;  //alert(reDB);
					asking = "ci" + j;
					a = document.getElementById(book).innerHTML ;
					b = document.getElementById(asking).getElementsByTagName("li")[1].innerHTML;
					c = document.getElementsByClassName('card_name')[j].innerHTML;
					d = document.forms[reDB]["tel"].value;
					e = document.forms[reDB]["date"].value;
					f = document.forms[reDB]["way"].value;
					g = document.forms[reDB]["start"].value;
					h = document.forms[reDB]["finish"].value;
					k = document.forms[reDB]["people"].value;
					l = document.getElementById(asking).getElementsByTagName("li")[0].innerHTML;
					m = a + ',' + b + ','+ c + ','+ d + ','+e + ','+f + ','+g + ','+h + ','+k + ','+l;
					//
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
				book = "bt" + j;
				reDB = "ckDB" + j;  //alert(reDB);
				asking = "ci" + j;
				a = document.getElementById(book).innerHTML ;
				b = document.getElementById(asking).getElementsByTagName("li")[1].innerHTML;
				c = document.getElementsByClassName('card_name')[j].innerHTML;
				d = document.forms[reDB]["tel"].value;
				e = document.forms[reDB]["date"].value;
				f = document.forms[reDB]["way"].value;
				g = document.forms[reDB]["start"].value;
				h = document.forms[reDB]["finish"].value;
				k = document.forms[reDB]["people"].value;
				l = document.getElementById(asking).getElementsByTagName("li")[0].innerHTML;
				m = a + ',' + b + ','+ c + ','+ d + ','+e + ','+f + ','+g + ','+h + ','+k + ','+l;
				//if(j != 0) m = m +'\n';
				reAllData = reAllData + m;
				
			}
			goDB();	
						
		}

		
		function goDB(){  //alert(reAllData);
			document.forms["reDB"]["reData"].value = reAllData;
			//alert(document.forms["reDB"]["allData"].value);
			document.getElementById("ok_DB").action = "taxi_datasave.php";
			document.getElementById("ok_DB").submit(); 
		}
		
	
	
	</script>












</body> 

</html>