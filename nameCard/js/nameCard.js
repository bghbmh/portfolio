'use strict';	
	console.log(checkMobile());


//상단 인물 이미지 스크롤_리사이징 설정
var worker;
var personal;
var photo;
var ini_photo_w; // 초기값_이미지 가로 길이
var ini_personal_h; // 이미지가 포함된 요소 세로 길이 초기값
var photo_w_rate;
var photo_h_rate;
var mini_h = 100;
var mini_w = 13;
var resize_start; 
var scrollY = check_element_positionY();

var clickElement = {

	find : function(elem, tagName){

			let elemName = elem.nodeName;

			while( elemName !== tagName )
			{
				elem = elem.parentNode;

				if( elem === document ) return null;

				elemName = elem.nodeName;
				console.log( 'while : ', elemName);
			}		
			
			return elem;
		}

}

function buttonToDoList(e){

	let elem = clickElement.find(e.target, "BUTTON");

	if( elem === null ) 
	{
		return;
	}

	let name = elem.id; console.log( elem.className );
	if( elem.id === "" )
	{
		name = elem.className.split(" ")[0];
	}

	switch( name )
	{
		case "sendCard":
			openPopup(document.querySelector("#nameCard"));
			break;
		case "apply":
			openPopup( document.querySelector(".writePopup"));
			break;
		case "listTelNum":
			console.log("buttonToDoList  ", name);
			openPopup( document.querySelector("#connectList"));
			break;

		case "closePopup":
			console.log("buttonToDoList  ", elem);
			closePopup(elem.parentNode);
			elem.parentNode.querySelector(".closePopup").removeEventListener("click", buttonToDoList);
			break;

	}

}

function loadmain(){

	//상단 인물 이미지 스크롤_리사이징 설정
	worker = document.getElementById("worker");
	personal = document.querySelector(".personal");
	photo = document.querySelector(".personal .photo");
	ini_photo_w = photo.clientWidth; // 초기값_이미지 가로 길이
	ini_personal_h = personal.clientHeight; // 이미지가 포함된 요소 세로 길이 초기값
	photo_w_rate = photo.clientWidth / personal.clientWidth;
	photo_h_rate = photo.clientHeight / personal.clientHeight;
	resize_start = personal.querySelector(".companyLogo").offsetTop + personal.querySelector(".companyLogo").clientHeight; 


	//인물사진 가져와서 메인 상단이랑 팝업에 넣어두기
	var mainFace = photo.getElementsByTagName("img")[0].src;
	photo.style.backgroundImage = "url('" + mainFace + "')";
	//photo.style.backgroundPosition = "center";

	var popFace = document.querySelector("#nameCard .sampleCard");
	popFace.style.backgroundImage = "url('" + mainFace + "')";
	//popFace.style.backgroundPosition = "center";

	//버튼
	const nav = document.querySelector("nav").addEventListener("click", buttonToDoList); 

}


//click the 'sendTxt' button
function sendTxt(){

    var enterNum = document.getElementById("enterNum");

    var regPhone = /^((01[1|6|7|8|9])[1-9]+[0-9]{6,7})|(010[1-9][0-9]{7})$/;

    //var regExp = /^\d{3}-\d{3,4}-\d{4}$/;

    // 01로 시작하는 핸드폰 및 지역번호와 050, 070 검증함. 그리고 -(하이픈)은 넣어도 되고 생략해도 되나 넣을 때에는 정확한 위치에 넣어야 함.
    var regExp = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/;

    var x = enterNum.value;
    if (x == "") {
        alert("Name must be filled out");
        return false;
    }
    else if( !regExp.test(x) )
    {
        alert('잘못된 번호 : ' + x);
    }
    else if( regExp.test(x) )
    {
        alert('맞는 번호 : ' + x);

        var link = location.href;
        location.href = 'sms:' + x + ( checkMobile() == 'ios' ? '&' : '?' ) + 'body='+ link;
    }


}




//카카오톡으로 명함 보내기 방법 선택하기
function gotoKakao(){

    // var inClass = false;
    // var cn = -1;

    // //버튼 활성화 확인하기
    // var cn = btn_gotoKakao.className.split(" ");
    // for( var i=0; i<cn.length; i++ )
    // {
    //     if( cn[i] == "on" ) inClass = true;
    //     else inClass = false;
    // }

    // if( inClass )
    // {   
    //     this.classList.remove("on");             
    // }
    // else
    // {
    //     this.classList.add("on");  
    //     console.log(" gotoKakao : " + inClass );  
    //     //sendLink();  
    //     //chatChannel()      
    // }   

}




function resizeImgFromScroll() {

    if( document.querySelector(".popupBg") !== null)
        return;
    
    scrollY = check_element_positionY();
    //var scrollpercent = ( scrollY / (document.documentElement.scrollHeight - document.documentElement.clientHeight)) * 100;
    
    //console.log("resize Img, scroll");
    
    if( scrollY > resize_start ) // 사진이 직사각형이라 세로길이를 먼저 줄이고, 2/3 지점부터는 세로 가로 길이가 같은 비율로 줄어들게 하기
    {
        personal.style.top = scrollY + "px";

        if( ini_personal_h/3 > scrollY )
        {
            personal.classList.add("noneLogo");
            personal.classList.remove("stickyTop");
            
            photo.style.width = photo_w_rate*100 + "%";
            personal.style.height = (ini_personal_h + resize_start - scrollY ) + "px";

        }
        else if( 2 * ini_personal_h/3 > scrollY && scrollY >= ini_personal_h/3 )
        {
            
            personal.classList.remove("reInfo");
            personal.classList.add("stickyTop");
            personal.style.height = (ini_personal_h + resize_start - scrollY ) + "px";
        }
        else if( ini_personal_h > scrollY && scrollY >= 2 * ini_personal_h/3 )
        {
            personal.classList.add("reInfo");
            personal.style.height = (ini_personal_h + resize_start - scrollY ) + "px";

            let zeroOffset = 2 * ini_personal_h/3 // 사진 높이 기준, 전체 높이와 2/3 지점 사이에 스크롤이 올 때, 스크롤 위치를 상대적으로 표시
            let upN = scrollY - zeroOffset ;
            let downN = ini_personal_h - (2 * ini_personal_h/3);
            let rate = 1 - (upN / downN);//scrollY - zeroOffset;

            //console.log(' rate < 0.15 : ' + scrollY +'\n' );
            photo.style.height = photo_h_rate*100 + "%";
            photo.style.width = (ini_photo_w * rate ) + "px";


            if( (ini_photo_w * rate) < (personal.clientWidth * mini_w/100)  )
            {
                console.log(' 최소 가로길이 : ' + (personal.clientWidth * mini_w/100) +'\n' );
                photo.style.width = mini_w + "%";
            }


        }
        else if( scrollY > ini_personal_h )
        {
            personal.classList.add("reInfo");
            //console.log('personal.clientHeight : ' + personal.clientWidth +'\n' );

            let hh = personal.clientWidth * mini_w/100;
            photo.style.width = mini_w + "%";
            photo.style.height = hh + "px";  

            personal.style.height = hh +15 + "px";
        }

    }
    else
    {      
        if( !personal )
        {
            console.log("sss");
            personal = document.querySelector(".personal");
        }

        personal.classList.remove("reInfo");
        personal.classList.remove("noneLogo");
        personal.classList.remove("stickyTop");
        personal.style.top = 0 + "px";
        personal.style.height = ini_personal_h + "px";
       
    }


}




function loadWindow(){

    const wrap = document.querySelector(".wrap");

    console.log(`wrap : ${wrap}... `);

    if( wrap != null ) 
    {  
        
        loadmain(wrap);
    }

}

window.addEventListener("load", loadWindow);    
window.addEventListener("scroll", resizeImgFromScroll);//상단 인물 이미지 