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
<meta name="format-detection" content="telephone=no, address=no, email=no" />
<link rel="stylesheet" type="text/css" href="css/dataout.css">
<title>sample page</title> 
</head> 

<body> 

	<style>

	</style>
	<p class="dataTitle">sample page</p>
	
	<div class="trip-in">
	    <div class="way">
	    	<input type="radio" id="do-ok" onclick="done()"> 
	        <label for="do-ok">예약완료</label> 
	    </div>      
	    <div class="way">
	        <input type="radio" id="do-no" onclick="doNot()"> 
	        <label for="do-no">예약취소</label> 
	    </div>
	    <div class="way">
	        <input type="radio" id="do-del" onclick="doDel()"> 
	        <label for="do-del">DB삭제</label> 
	    </div>
	</div>
          
	
	
	<table class="dataTable" id="dataT">
		<tr class="thead">
			<td>구분</td>
			<td>선택</td>
			<td>예약</td>
			<td>날짜</td>
			<td>이름</td>
			<td>전화번호</td>
			<td>여행날짜</td>
			<td>여행길</td>
            <td>출발지</td>
			<td>도착지</td>
			<td>여행자수</td>
			<td>정보동의</td>
		</tr>
		
		<?php
			$row = count($lines)-1;
			//$temp = explode('\t', $lines[0]);
			$colum = count( explode(',', $lines[0]) );

			//echo $row;

			for($i=$row; $i>=0; $i--)
			{
				$num = $i +1;
				echo "<tr id='" .$num. " '>";
				echo "<td>".$num."</td>";
				echo "<td><input id='"."check".$num."' type='checkbox' value='good'></td>";
				
				$txt = explode(',', $lines[$i]);
				for($y=0; $y<$colum; $y++)
					echo "<td>". $txt[$y] . "</td>";	
				
				//echo "<td>". $txt[1] . "</td>";			

				echo "</tr>";
			}

		?>

		<form id="ok_DB" name="reDB" method="post" target="_self">            
            <input type="hidden" name="file_name" value="">
            <input type="hidden" name="allData" value="">
        </form>



	</table>


	<script>	
		var t= document.getElementById("dataT");
		var ck="";
		var trows=t.rows.length-1;
		var i=0;
		var j=0;
		var allData = "";
		document.forms["reDB"]["file_name"].value = "dataoutput_php";
		//alert(trows);

		function done(){	
			if(!checking())
			{
				return;
			}
			else
			{
				for(i=trows; i>0; i--)
				{
					ck="check"+(trows-i+1);   //	alert(t.rows[i].cells[4].innerHTML);		//alert(t.rows[i].cells[3].innerHTML);
					if( document.getElementById(ck).checked )
					{  t.rows[i].cells[2].innerHTML="완료";	}							
				}	
				document.getElementById("do-ok").checked = false;		
				goDB();	
			}					
		}
		
		function doNot(){
			if(!checking())
			{
				return;
			}
			else
			{			
				for(i=trows; i>0; i--)
				{
					ck="check"+(trows-i+1);   //	alert(t.rows[i].cells[4].innerHTML);		//alert(t.rows[i].cells[3].innerHTML);
					if( document.getElementById(ck).checked )
					{  t.rows[i].cells[2].innerHTML="취소";	}							
				}	
				document.getElementById("do-ok").checked = false;		
				goDB();	
			}		
		}

		function doDel(){ 
			//trows=t.rows.length-1;
			if(!checking())
			{
				return;
			}
			else
			{
				for(i=trows; i>0; i--)
				{
					ck="check"+(trows-i+1);
					alert(ck);
					if( document.getElementById(ck).checked )
					{	t.deleteRow(i); }
				}//			

				document.getElementById("do-del").checked = false;
				goDB();
			}			
		}

		function checking(){
			var cnt=0;
			for(i=trows; i>0; i--)
			{
				ck="check"+(trows-i+1);				
				if( document.getElementById(ck).checked ) cnt++;
			}alert(cnt);
			if(cnt == 0)
			{
				document.getElementById("do-ok").checked = false;
				document.getElementById("do-no").checked = false;
				document.getElementById("do-del").checked = false;
				alert("선택 안했음");
				return false;
			}
			else
				return true;
		}
		
		function goDB(){
			trows=t.rows.length-1;
			
			for(i=trows; i>0; i--)
			{	alert(i);	
				for(j=2; j<t.rows[0].cells.length; j++)
				{
					if(j == t.rows[0].cells.length-1 ) 
						allData = allData + t.rows[i].cells[j].innerHTML;
					else
						allData =  allData + t.rows[i].cells[j].innerHTML + ",";
				}
				//alert(ck);	
			}

			document.forms["reDB"]["allData"].value = allData;
			//alert(document.forms["reDB"]["allData"].value);
			document.getElementById("ok_DB").action = "taxi_datasave.php";
			document.getElementById("ok_DB").submit(); 
		}
		
		
	
	</script>












</body> 

</html>