

'use strict';




function openPopup(popup) //obj, mainbody
{

	checkPopupBg(); // black bg 깔고

	const popX = check_element_positionX();
	const scroll_top_holder = check_element_positionY(); //스크롤 위치 확인

	popup.style.display = "block";  //팝업 열고
	
	if( popup.id === "nameCard")
	{
		console.log("openPopup", popup.id);
		popup.querySelector(".tab li").classList.add("on");
		popup.querySelector(".tabcontent").style.display = "block";
		popup.addEventListener("click",tabMenu);
	}
	//set_input(popup);

	popup.style.top = (window.innerHeight - popup.clientHeight)/2 + "px";
	popup.style.left = (window.innerWidth - popup.clientWidth)/2 + "px";

	// //뒷배경 멈춤
	const mainbody = document.querySelector(".wrap");
	mainbody.style.position = "fixed"; 
	mainbody.style.top = -scroll_top_holder + "px";

	popup.querySelector(".closePopup").addEventListener("click", buttonToDoList);
}

function tabMenu(e){
	console.log(e.target);

	let elem = clickElement.find(e.target, "LI");
	if( elem === null ) return;

	if( elem.parentNode.id === "tab" )
	{	
		var child = elem.parentNode.querySelectorAll(elem.nodeName);

		console.log("tab.childNodes  ", elem.nodeName );

		for( let i=0; i<elem.parentNode.childElementCount; i++ )
		{		
			if( child[i].className === "on" )
			{
				child[i].classList.remove("on");
				this.querySelectorAll(".tabcontent")[i].style.display = "none";
			}
		}

		elem.classList.add("on");
		for( let i=0; i<elem.parentNode.childElementCount; i++ )
		{		
			if( child[i].className === "on" )
				this.querySelectorAll(".tabcontent")[i].style.display = "block";
		}
	}
	else if( elem.parentNode.id === "tabcontent" )
	{
		if( elem.id === "gotoTxt" )
		{
			if( elem.className === "on" )
			{
				elem.classList.remove("on");
				this.querySelector("#txtBox").classList.remove("on");
				this.querySelector("#txtBox").querySelector(".guide").classList.remove("off");
				this.querySelector("#txtBox").querySelector("button").classList.remove("on");
			}
			else 
			{
				elem.classList.add("on");
				this.querySelector("#txtBox").classList.add("on");

			}
		}
		else if( elem.id === "txtBox")
		{
			elem.querySelector("input").focus();
			elem.querySelector(".guide").classList.add("off");
			elem.querySelector("button").classList.add("on");
			elem.querySelector("button").addEventListener("click", () => {});

		}
	}

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


function validateForm(popup){ console.log("validateForm ");

	const txtBox = popup.getElementsByClassName("txtBox");  // guide 개수 확인

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
function closePopup(popup){   

	popup.style.display = "none";

	checkPopupBg();

	const mainbody = document.querySelector(".wrap");
	mainbody.style.position = "relative";
	let scroll_top_holder = mainbody.style.top.replace(/[^0-9]/g, "");

	mainbody.style.top = "initial";
	document.querySelector('html').scrollTop = scroll_top_holder;
	//document.documentElement.scrollTop = scroll_top_holder;

	// //입력폼 초기화
	// let txtBox = popup.getElementsByClassName("txtBox");
	// for( let i=0; i<txtBox.length; i++ )
	// {
	//     txtBox[i].value = ""; 
	//     txtBox[i].previousElementSibling.classList.remove("off");
	//     txtBox[i].previousElementSibling.classList.remove("warning");
	// }

	// popup.querySelector("#agreeBox").classList.remove("ok");

	// popup.querySelector("#agreeBox").removeEventListener("click", () => {});
   
}



//     //문자로 명함 보내기_ 번호 입력하기
//     function enterPhone(e){

//         console.log("guide" );

//         e.currentTarget.classList.remove("on"); 

//         const enterNum = document.getElementById("enterNum");

//         enterNum.focus();
//         document.getElementById("sendTxt").classList.add("on");
//         //this
//     }
