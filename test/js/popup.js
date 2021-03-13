	


'use strict';




function openPopup(e) //obj, mainbody
{

	let pp = "." + e.currentTarget.getAttribute('class') + 'popup';

	const popup = document.querySelector(pp);
	console.log(popup);

	checkPopupBg(); // black bg 깔고

	const popX = check_element_positionX();
	const scroll_top_holder = check_element_positionY(); //스크롤 위치 확인

	popup.style.display = "block";  //팝업 열고
	// timeCheck = -1; 
	set_input(popup);

	popup.style.top = (window.innerHeight - popup.clientHeight)/2 + "px"; 
	popup.style.left = (window.innerWidth - popup.clientWidth)/2 + "px";

	// //뒷배경 멈춤
	const mainbody = document.querySelector(".wrap");
	mainbody.style.position = "fixed"; 
	mainbody.style.top = -scroll_top_holder + "px";

	popup.querySelector(".closePopup").addEventListener("click", closePopup);

}

let timeCheck; 
function set_input(popup){
	//input 활성화
	let form =  popup.querySelector("form");

	if( form === null )
		return;


	form.addEventListener('click', enableInputFromGuide);
	popup.querySelector("#agreeBox").addEventListener("click", (e) => {

		if( e.timeStamp === timeCheck )
			return;

		let t = e.currentTarget;
		let cn = t.className.split(" ");
		let isThere=false;

		//console.log("111 ok ::: ", isThere);

		for( let i=0; i<cn.length; i++)
		{
		    if( cn[i] === "ok")
				isThere = true;
		} //console.log("222 ok ::: ", isThere);

		if( isThere )
		    t.classList.remove("ok");
		else
		    t.classList.add("ok");

		validateForm(popup);
		timeCheck = e.timeStamp;

	});

	//버튼 활성화
	popup.querySelector(".submit").addEventListener("click", function(){
		alert("준비 중이에요.");
	});
	topsmallSlides(true);

}


function checkPopupBg(){

	let bg = document.querySelector(".popupBg");

	if( bg !== null )
	{
		document.body.removeChild(bg);
		return;		
	}

	let popBg = document.createElement("div");
	popBg.classList.add("popupBg");
	document.body.appendChild(popBg);

}


function enableInputFromGuide(e){ 

	if( e.target.nodeName === this.nodeName )
		return;

	let nowTxtBox = e.target;
	let nowGuide = nowTxtBox.previousElementSibling;

	let txtBox = this.getElementsByClassName("txtBox");	

	//입력폼에 내용이 있을 때는 안내글 안보이게
	for( let i=0; i<txtBox.length; i++ )
	{
		let guide = txtBox[i].previousElementSibling;

		if( txtBox[i].value === "" )
			guide.classList.remove("off");
		else
			guide.classList.add("off");
	}

	nowGuide.classList.add("off");
	nowTxtBox.focus();
}


function validateForm(popup){ console.log("validateForm ");

	const txtBox = popup.getElementsByClassName("txtBox");	// guide 개수 확인

	//입력폼 확인하기
	for( let i=0; i<txtBox.length; i++ )
	{          
		let guide = txtBox[i].previousElementSibling; 

		if( txtBox[i].value === "" )
		{
			guide.classList.remove("off");
			guide.classList.add("warning");
		}
		else
			guide.classList.remove("warning");
	}
}



//팝업 닫기 버튼 설정
function closePopup(e){   

	let popup = e.currentTarget.parentNode;

	popup.style.display = "none";

	checkPopupBg(false);

	const mainbody = document.querySelector(".wrap");
	mainbody.style.position = "relative";
	let scroll_top_holder = mainbody.style.top.replace(/[^0-9]/g, "");

	mainbody.style.top = "initial";
	document.body.scrollTop = scroll_top_holder;
	document.documentElement.scrollTop = scroll_top_holder;


	//슬라이드 start again
	if( mainbody.className !== "subwrap")
	    topsmallSlides(false);

	// //입력폼 초기화
	let txtBox = popup.getElementsByClassName("txtBox");
	for( let i=0; i<txtBox.length; i++ )
	{
	    txtBox[i].value = ""; 
	    txtBox[i].previousElementSibling.classList.remove("off");
	    txtBox[i].previousElementSibling.classList.remove("warning");
	}

	popup.querySelector("#agreeBox").classList.remove("ok");

	popup.querySelector("#agreeBox").removeEventListener("click", () => {});
       
}
























	
