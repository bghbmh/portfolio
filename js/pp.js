	var agree = 0;
	var w = window.innerWidth;	
	var h = window.innerHeight;	
	var pw = 0;
	var ph = 0;
	var d = new Date();

	function openBody(){

		var ww = window.innerWidth;
		var wh = window.innerHeight;
			
		var ctn = document.getElementById("contents");
		var imgH = ctn.getElementsByTagName("img");
			
		var n=0;
		do{ //alert(wh);
			if( imgH[n].clientHeight >= wh )				
				ctn.getElementsByTagName("div")[n].style.height = imgH[n].clientHeight/40 + "rem";
			
			n++;
		}	
		while ( ctn.getElementsByTagName("div")[n].style.display != "none");

	}


	function introduce(n){ 
		var me = document.getElementsByClassName("Hello")[n];

		me.style.display="block";
		var pw =  me.clientWidth;
		var ph =  me.clientHeight; 

		me.style.left = (w-pw)/2 + "px";
		me.style.top =  (h-ph)/2 + "px";

		if( n == 0 )
		{
			var pp = document.getElementsByClassName("picture")[0];

			me.style.top = pp.clientHeight*2 + "px";
		}
		else if( n == 1 )
			document.getElementsByClassName("popBg")[n].style.display="block";
	}

	function popup(obj){
		var pop = document.getElementById("imgBig");
		var path=obj.src;
		var oh = obj.height;
		var wh = window.innerHeight;
	
		pop.src = path;
		if( oh < wh )
			pop.style.marginTop = (wh-oh)/2 + "px";

		document.getElementsByClassName("popBg")[0].style.display="block";
	}

	function ask(n){
	    agree = agree + n;

		if( agree%2 == 1 )
		{
			document.getElementsByClassName("CheckBox")[0].style.backgroundColor = "#4CAF50";	
			document.forms["question"]["agree"].value = "yes";	  alert(document.forms["question"]["agree"].value);
		}
		else if( agree%2 == 0 )
		{
			document.getElementsByClassName("CheckBox")[0].style.backgroundColor = "#fff";
			document.forms["question"]["agree"].value = "no";
		}
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


	function openAlert(n, str1, str2){ 
	
		var popup = document.getElementsByClassName("popAlert")[n];
		//var popBg = document.getElementsByClassName("popBg")[1];
		var popTxt = document.getElementsByClassName("popTxt")[n-1];
		var popBtn = document.getElementsByClassName("popBtn")[n];

		popup.style.display = "block";

		var popw = popup.clientWidth;
		var poph = popup.clientHeight;
		
	
		if( w < 768 )
		{ 
			if( poph > h)
			{
				poph = h*0.8;
				popup.style.height = poph + "px";
			}
		}
	
		popTxt.innerHTML = str1;
		popBtn.innerHTML = str2;	
		
		popup.style.top = (h-poph)/2 + "px";
		popup.style.left = (w-popw)/2 + "px";	
		
		
	} 
/*	
	function closePop(){		
		var name = document.forms["question"]["name"].value;
		var tel = document.forms["question"]["tel"].value;
		var story = document.forms["question"]["story"].value;
		alert("!"); }
	
*/	
	

	function closePop(className, i, str){
		
			
		var name = document.forms["question"]["name"].value;
		var tel = document.forms["question"]["tel"].value;
		var story = document.forms["question"]["story"].value;
		
			
		if ( str == "alert" ){			
			if (name == "") document.getElementById("fname").focus(); 
			else if(tel == "") document.getElementById("ftel").focus(); 
			else if(story == "") document.getElementById("fdate").focus();
								
		}
		else if( str == "call_off")
		{
			document.getElementsByClassName(className)[i].style.display = "none";
			document.getElementsByClassName("popBg")[1].style.display = "none";
		}
		else if( str == "go" ){  
		
			document.getElementsByClassName(className)[i].style.display = "none";
			document.getElementsByClassName("popBg")[1].style.display = "none";
			
			if( document.forms["question"]["agree"].value == "yes" )
			{  
				document.forms["question"]["whatDay"].value = d.getFullYear() + "년" + ( d.getMonth() + 1) +"월" +d.getDate() +"일 \t" + d.getHours() +"시"+ d.getMinutes() +"분";				
				
				document.getElementById("ok").action = "data/save.php";
				document.getElementById("ok").submit();
			}
		}
		
		/*
		*/
	}
	
	function okAlert(){
	//alert("inDB");
		var a="접수되었습니다<br>최종확인을 위해 빠른 시간 안에<br>연락드리겠습니다";
		alert(a);
		document.getElementsByClassName("Hello")[1].style.display="none";
		openAlert(2, a,"aaaaa");
	}
	
	
	
	/*==================*/
	function openPop_position(className, num){ 
		var openObject = document.getElementsByClassName(className)[num];

		if( openObject.style.display == "none" )
			openObject.style.display = "block";
		else
			warnning("");
			
		pw =  openObject.clientWidth;
		ph =  openObject.clientHeight; 

		openObject.style.left = (w-pw)/2 + "px";
		openObject.style.top =  (h-ph)/2 + "px";
		
	}
	
	function introduce(className, num){
		
		openPop_position(className, num);
		alert(pw+'/'+ph);
		
		if( num == 0 )
		{
			var pp = document.getElementsByClassName("picture")[0];
			var me = document.getElementsByClassName(className)[num];
			me.style.top = pp.clientHeight*2 + "px";
		}
		else if( num == 1 )
		{
			document.getElementsByClassName("popBg")[n].style.display="block";
		}
		
	}
	