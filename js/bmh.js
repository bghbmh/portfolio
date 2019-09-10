	var agree = 0;
	var w = window.innerWidth;	
	var h = window.innerHeight;	
	var pw = 0;
	var ph = 0;
	var d = new Date();
	var fc = "done";

	function openBody(){
		//alert(w);
		var ww = window.innerWidth;
		var wh = window.innerHeight;
			
		var ctn = document.getElementById("contents");
		var area = ctn.getElementsByTagName("div");
		var imgH = [];
		imgH = document.getElementsByClassName("pi");
			
		var n=0;
		for( n=0; n<area.length; n++)
		{ //alert( imgH[n].src);
			if( imgH[n].height >= wh )				
				area[n].style.height = imgH[n].height/40 + "rem";
		}
		
		/*
		do{ alert(x[n].style.height +'/'+x[n].height); 
			if( x[n].height >= wh )				
				area[n].style.height = x[n].height/40 + "rem";
			
			
			n++;
		}	
		while ( area[n].style.display != "none");
*/
	}

	
	function telNum(){
		var bar= document.getElementById("talk");
		
		if( bar.getElementsByTagName("a")[0].style.display == "inline-block" )
		{
			bar.style.width = "6rem";
			bar.getElementsByTagName("a")[0].style.display = "none";
		}
		else
		{
			bar.style.width = "20rem";			
			bar.getElementsByTagName("a")[0].style.display = "inline-block";
		}
	}




	
	
	/*==========================================================================================*/
	
	
	function introduce(className, num){  
		
		openPop(className, num);

		var popObject = document.getElementsByClassName(className)[num];

		if( num == 0 )
		{
			var pp = document.getElementsByClassName("picture")[0];
			popObject.style.top = pp.clientHeight*2 + "px";
		}
		else if( num == 1 )
		{//alert("!");
			document.getElementById("popBg").style.display ="block";
		}
		
	}
	
	function bigShow(obj){ 
		document.getElementById("popBg").style.display = "block";
		document.getElementsByClassName("imgArea")[0].style.display = "block";
		document.getElementsByClassName("imgArea")[0].style.overflow = "auto";
		
		var w = window.innerWidth;	
		var h = window.innerHeight;	
		var show = document.getElementById("imgBig");
		
		//document.body.style.overflow = "hidden";
		
	//	show.style.width = 0.9*w + "px";	
		show.src = obj.src;		
	 	//show.style.display = "block";	
			
		var ow = 0;
		var oh = 0;
	 	//ow = obj.width;
		//oh = obj.height; 
		ow = show.clientWidth;
		oh = show.clientHeight;
		//show.style.height = oh;
		
		if( show.style.position != "static" && show.style.position != "initial" && show.style.position != "inherit") alert("no static");
		
		if( show.style.position != "fixed") alert("no fixed");
		//if( ) alert("no inherit");
		
		if( show.style.overflow != "auto") alert("auto");
		//alert( show.clientHeight + '/'+ obj.height);
		if( oh == 0 )
		{ alert('oh == 0'+oh + '/' +obj.height);
			oh = obj.height;
		}


		if( ow > oh || h > oh )
		{
			
			//oh = oh * (0.9*w/ow);
			//ow = 0.9*w;
			//show.clientHeight = oh + "px";
			//show.clientWidth = ow + "px";
			
			alert(oh);	
			show.style.marginTop = (h - oh)/2 +"px";
			//alert(show.style.top);
		}
		else
		{ 
			show.style.marginTop = 20 +"px";
			
		}
		
		show.style.marginLeft = (w - ow)/2+ "px";	
		//alert(show.style.left);
		
		var ctn = document.getElementById("contents");
		var area = ctn.getElementsByTagName("div");
		var imgH = document.getElementsByClassName("pi");
		//alert(imgH[0].clientHeight);
		
		
		
		
		
	}	
	
	
	function ask(n){
		agree = agree + n;

		if( agree%2 == 1 )
		{
			document.getElementsByClassName("CheckBox")[0].style.backgroundColor = "#4CAF50";	
			document.forms["question"]["agree"].value = "yes";	 // alert(document.forms["question"]["agree"].value);
		}
		else if( agree%2 == 0 )
		{
			document.getElementsByClassName("CheckBox")[0].style.backgroundColor = "#fff";
			document.forms["question"]["agree"].value = "no";
		}
	}
	
	
	function openPop(className, num){ 
		var w = window.innerWidth;	
		var h = window.innerHeight;	
		var popObject = document.getElementsByClassName(className)[num];
		
		popObject.style.display = "block";
		
		pw =  popObject.clientWidth;
		ph =  popObject.clientHeight; 

		//alert('openPop' + pw+'/'+ph);

		popObject.style.left = (w-pw)/2 + "px";
		popObject.style.top = (h-ph)/2 + "px";		
	}
	
	
	
	function closePop(className, num, str){		
		//alert(className);
		if ( str == "alarm" )
		{			
			if( fc != "done" ) 
			{
				document.getElementById("popBg").style.zIndex = "555";
				if( fc != "agree" ) document.getElementById(fc).focus();
			}
			
			document.getElementsByClassName(className)[num].style.display = "none";
								
		}
		else if( str == "call_off")
		{
			if( className == "Hello" && num == 1 )
			{ // alert(num);
				agree = 0;
				pw = 0;
				ph = 0;
				document.forms["question"]["name"].value = "";
				document.forms["question"]["tel"].value = "";
				document.forms["question"]["story"].value = "";
			}
			else if( className == "imgArea")
			{
				document.body.style.overflow = "auto";
				var show = document.getElementById("imgBig");

				show.src = "";	
				show.style.marginTop = 0;
				show.style.marginLeft = 0;

			}
			
			document.getElementsByClassName(className)[num].style.display = "none";
			if( document.getElementById("popBg").style.display != "none" )			
				document.getElementById("popBg").style.display = "none";
			
	
				
		}
		else if( str == "go" )
		{  			//alert("go"+className+'/'+str);
			
			document.getElementsByClassName(className)[num].style.display = "none";
			document.getElementsByClassName("Hello")[1].style.display = "none";
			document.getElementById("popBg").style.display = "none";	
			//alert(story);	
			story = document.forms["question"]["story"].value;
			story = story.replace(/\n/gi, " ");	
			document.forms["question"]["story"].value = story;
			
			document.forms["question"]["whatDay"].value = d.getFullYear() + "년" + ( d.getMonth() + 1) +"월" +d.getDate() +"일 \t" + d.getHours() +"시"+ d.getMinutes() +"분";				
			//alert(story);	
			document.getElementById("ok").action = "http://bghbmh.dothome.co.kr/data/save.php";
			document.getElementById("ok").submit();	
		}
		/*
		*/

	}
	
	function checking()
	{
		var btn = "확인";
		var strName="이름을 입력해주세요";
		var strTel="전화번호를 입력해주세요";
		var strStory="문의사항을 입력해주세요";
		var strAgree="개인정보 수집 및 이용에 동의해주세요";
		var strOk = "접수되었습니다<br>최종확인을 위해 빠른 시간 안에<br>연락드리겠습니다";
		
		var name = document.forms["question"]["name"].value;
		var tel = document.forms["question"]["tel"].value;
		var story = document.forms["question"]["story"].value;
		
		document.getElementById("popBg").style.zIndex = "8888";
		if (name == "") 
		{ 
			fc = "name";			
			openAlert(1, strName, btn);
		}
		else if(tel == "")
		{
			fc = "tel";
			openAlert(1, strTel, btn);
		}
		else if(story == "")
		{
			fc = "story";
			openAlert(1, strStory, btn);
		}
		else if( agree%2 == 0 )
		{
			fc = "agree";
			openAlert(1, strAgree, btn);
		}
		else
		{			
			openAlert(2, strOk, btn);
		}
	}
	
	
	function openAlert(n, str1, str2){   //alert(str1);
	
		var popWarnning = document.getElementsByClassName("popWarnning")[0];
		var popTxt = document.getElementsByClassName("popTxt")[1];
		var popBtn = document.getElementsByClassName("popBtn")[n];

		popWarnning.style.display = "block";
		popBtn.style.display = "block";
		
		if(n==2) document.getElementsByClassName("popBtn")[n-1].style.display = "none";
		//document.getElementsByClassName("popBtn")[1].style.display = "none";
		
		popTxt.innerHTML = str1;
		popBtn.innerHTML = str2;

		var popw = popWarnning.clientWidth;
		var poph = popWarnning.clientHeight;
		//alert(poph);
		
		popWarnning.style.top = (h-poph)/2 + "px";
		popWarnning.style.left = (w-popw)/2 + "px";
		
		return;
		
	} 	
	
	
