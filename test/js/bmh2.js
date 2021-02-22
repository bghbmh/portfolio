'use strict';

function loadBody(mainBody){

	// let aa = new Date(2021, 1, 0);
	// let lastday = aa.getDate();

	// console.log('last day : ', lastday);


	// const url = new URL('https://developer.mozilla.org/ko/docs/Web/API/URL/href#aa#Bb#ccc');
	// console.log('hash : ',url.hash); // Logs: '#예제'

	//파일 가져오기	
	loadFile._json('./json/bmh.json', arrangedFile);
	
	// saveFile._json('./json/test.json');

	const btn_calltxt = document.getElementsByClassName("calltxt");
	const btn_write = document.querySelector(".write"); // 글남기기 버튼
	btn_write.addEventListener("click", openPopup);

	//입력창 모두 빈칸으로 만들기
	let txtBox = document.getElementsByClassName("txtBox");	
	for( let i=0; i<txtBox.length; i++ )
	{
		let guide = txtBox[i].previousElementSibling;
		txtBox[i].value === "";
		guide.classList.remove("off");
		guide.classList.remove("warning");
	}

	document.getElementById("openSubPage").addEventListener("click", openPage);//버튼 연결	
	topsmallSlides(false);// 상단, 하는 일 수직 슬라이드 설정

}


function openPage(e){ 	

	//서브페이지 연결
	const topMargin = document.querySelector("header").clientHeight;
	const subpage_cnt = document.getElementById("subpage_cnt");

	subpage_cnt.classList.add("on");

	// 클릭하면 일단...세로가 길어지고, 나중에 아래쪽 가로길이가 채워지고 
	let inClass = true;
	let higher = 6;
	timerID = setTimeout(spreadXY, 300, higher, inClass, topMargin, subpage_cnt);

	//페이지 닫기 버튼 설정
	document.getElementById("closeSubPage").addEventListener("click", () => {
		setTimeout(spreadXY, 30, 0, false, topMargin, subpage_cnt);
	}); 

	//모든 아이템 보기 버튼 설정
	document.getElementById("allItemSubPage").addEventListener("click", () => { 

		//새탭 열기 안하고 div 새로 만들어서 화면에 뿌리기
		showAllItemsPage();

	});

	//항목 클릭하면 항목과 관련된 이미지들 불러오기
	let categorise = document.querySelectorAll('.contents .category li');
	for( let i=0; i<categorise.length; i++)
		categorise[i].addEventListener('click', showCategoryPage);

	// let categorise = document.querySelector('.contents .category');
	// categorise.addEventListener('click', ttttt);

}

function ttttt(e){

	if( e.target.nodeName === this.nodeName )
	{
		console.log("mmmm == ", e.target.nodeName, this.nodeName);
		return;
	}

	let nowTarget = e.target;

	let category = e.target.getAttribute('data-category'); // 무슨 카테고리인지 가져와서 제목넣고
	console.log( e.target);
	// let mainContents = document.querySelector(".mainContents");
	// mainContents.classList.add('on'); //리스트 페이지 열고
	// mainContents.setAttribute('data-category', category);
	// mainContents.querySelector('.subsubTitle').textContent = category + ' - ' + e.currentTarget.querySelector('span').innerHTML;

	// mainContents.querySelector('.cntList').innerHTML = setCategoryList(category);//안에 리스트 설정하고
}

function showCategoryPage(e){	

	let category = e.currentTarget.getAttribute('data-category'); // 무슨 카테고리인지 가져와서 제목넣고
	let mainContents = document.querySelector(".mainContents");
	mainContents.classList.add('on'); //리스트 페이지 열고
	mainContents.setAttribute('data-category', category);
	
	mainContents.querySelector('.subsubTitle').textContent = category + ' - ' + e.currentTarget.querySelector('span').innerHTML;

	mainContents.querySelector('.cntList').innerHTML = setCategoryList(category);//안에 리스트 설정하고

	//만들어진 리스트에 리스너 달고
	let cntList = mainContents.querySelector('.cntList').querySelectorAll("div");
	for( let i=0; i<cntList.length; i++)
	{
		cntList[i].addEventListener('click', showDetailPage);
	}

	//상단 버튼 설정
	mainContents.querySelector(".backPage").addEventListener('click', closePage);
	mainContents.querySelector(".selectedItemSubPage").addEventListener('click', showSelectedAllItemsPage);//url에 쿼리스트링이나 해시태그 붙이는 형태로 바꿀것

	//console.log('template : ', template);
	//setCategoryPage(category);
}


function showAllItemsPage(e){

	let page = document.querySelector('.workResult');
	page.querySelector('ul').innerHTML = template.selectedITEMS('all');

	page.classList.add("on");

	document.querySelector('.closeSelectedPage').addEventListener('click', closePage);
}

function showSelectedAllItemsPage(e){

	console.log('selectedItemSubPage');

	let parent = e.currentTarget.parentNode;

	console.log(parent);
	let page = document.querySelector('.workResult');

	let str = parent.getAttribute('data-category');
	
	page.querySelector('ul').innerHTML = setSelectedAllItemsPage(str);
	console.log('data-category  : ', parent.getAttribute('data-category'));
	page.classList.add("on");

	document.querySelector('.closeSelectedPage').addEventListener('click', closePage);
}

function showDetailPage(e){

	let detail = document.querySelector(".subDetail");
	detail.classList.add('on');

	console.log('data-index  : ',e.currentTarget.getAttribute('data-index'));
	let idx = e.currentTarget.getAttribute('data-index');
	detail.querySelector('.item').innerHTML = setDetailPage(idx, detail.querySelector('.item'));//안에 리스트 설정;

	//상단 버튼 설정
	detail.querySelector(".closeDetail").addEventListener('click', closePage);
	detail.querySelector(".selectedItemSubPage").addEventListener('click', testPage);//url에 쿼리스트링이나 해시태그 붙이는 형태로 바꿀것
}

function testPage(e){

	// const url = new URL('https://developer.mozilla.org/ko/docs/Web/API/URL/href#aa#bbb#ccc');
	// console.log(url.hash, '///', location.href); // Logs: '#예제'
	
	let queryData = null;

	let parent = e.currentTarget.parentNode;
	let ht = parent.querySelectorAll(".hashtag span");

	let str = '';//'#';
	for( let i=0; i< ht.length; i++)
	{
		if( i === ht.length-1 )
		{
			str = str + ht[i].innerHTML;
			break;
		}

		str = str + ht[i].innerHTML + '#';
	}

	console.log('location : ', location.href, '///', str);

	// const state = '';//{ 'page_id': 1, 'user_id': 5 };
	// const title = '';
	// const url = location.href+str;

	// location.href = url;
	// history.pushState(state, title, url);
	console.log( history, location);


	//str 에 담긴 해시태그들만 모아서 화면에 나타내기, 우선은 layout.js에 작성해두기

	let page = document.querySelector('.workResult');

	page.querySelector('ul').innerHTML =  template.selectedHASHTAG(str);
	page.classList.add("on");

	page.querySelector('.closeSelectedPage').addEventListener('click', closePage);



}

function closePage(e){

	// if( location.hash !== '' )
	// {
	// 	location.href = location.origin + location.pathname;
	// }

	let parent = e.currentTarget.parentNode;
	parent.classList.remove("on");

}

let timerID = null;
function spreadXY(higher, inClass, topMargin, subpage_cnt)
{
	let h = subpage_cnt.clientHeight;
	let x;

	if( inClass )
	{   
		if( higher <= 6 )
		{  
			higher--;
			if( higher == 0 ) 
			{
				clearTimeout(timerID);
				inClass = null;
				subpage_cnt.style.top = ( topMargin + 20) + "px";
				return;
			}
		}
	}
	else
	{             
	    if( higher >= 0 )
		{                   
			higher++;  
			if( higher == 6 ) 
			{
				clearTimeout(timerID);       
				subpage_cnt.style.top = ( topMargin + h + 20) + "px";
				subpage_cnt.classList.remove("on");
				return;
			}
		}
	}

	subpage_cnt.style.top = (h/5 * higher) + "px";
	setTimeout(spreadXY, 30, higher, inClass, topMargin, subpage_cnt);

}



loadFile._script('js/object.js');
console.log(1111111111);
loadFile._script('js/layout.js');

window.addEventListener("load", loadWindow);
//window.addEventListener("scroll", resizeImgFromScroll);//상단 인물 이미지 스크롤_리사이징 설정

function loadWindow(){

	console.log(2222222222);

	const wrap = document.querySelector(".wrap");
	const subwrap = document.querySelector(".subwrap");

	console.log(`wrap : ${wrap}... subwrap : ${subwrap}`);

	if( wrap != null ) 
	{  	//파일 가져오기
	
	    
	    loadBody(wrap);
	}
	else if( subwrap != null )
	{
	    console.log("subwrap");
	    loadBody(subwrap);

	}
}











