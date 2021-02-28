'use strict';

function loadBody(mainBody){

	let temp = new layout();
	console.log('temp : ',temp);

	// let aa = new Date(2021, 1, 0);
	// let lastday = aa.getDate();

	// console.log('last day : ', lastday);


	// const url = new URL('https://developer.mozilla.org/ko/docs/Web/API/URL/href#aa#Bb#ccc');
	// console.log('hash : ',url.hash); // Logs: '#예제'

	//파일 가져오기	
	loadFile._json('./json/bmh.json', template.arrange);
	//loadFile._json('./json/bmh.json', temp.arrange);
	
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

	mainBody.style.height = window.innerHeight + "px";//높이가 오류나고 있음 확인하기

	document.getElementById("openSubPage").addEventListener("click", openPage);//버튼 연결	
	topsmallSlides(false);// 상단, 하는 일 수직 슬라이드 설정

}

function buttonToDoList(e){

	//console.log("111buttonToDoList", e);

	let elem = clickElement.find(e.target, "BUTTON");

	if( elem === null ) 
		return;

	//console.log('sub', elem.classList, e, elem.parentNode);

	let className;

	if( elem.classList.length > 1 )
	{
		className = elem.classList[0];
	}
	else
	{
		className = elem.className;
	}


	switch( className )
	{
		case "closeSubPage":			
			timerID = setTimeout(spreadXY, 30, 0, false, document.querySelector("header").clientHeight, e.currentTarget.parentNode );
			break;

		case "closePage":
		case "closeDetail":
			let node = elem.parentNode.parentNode;
			node.classList.remove("on");
			node.querySelector('.btnSet').removeEventListener("click", buttonToDoList);
			
			break;

		case "disconnect":
		console.log("disconnect");
			elem.parentNode.querySelector('.disconnect').removeEventListener("click", buttonToDoList);
			document.body.removeChild(elem.parentNode);
			break;

		case "allItemsPage":
			showWorkResult(template.rawData);
			break;

		case "categoryItemPage":
		//console.log("222buttonToDoList", elem);
			let nd = elem.parentNode.parentNode;
			let arr = template.findCategory( nd.querySelector(".subsubTitle").innerHTML.split(" ")[0] );
			showWorkResult(arr);
			break;

		case "hashtagItemPage":
		//console.log("222buttonToDoList", elem);
			testPage(elem);
			break;

		case "sampleSite":
			console.log("999 buttonToDoList", elem);
			openSampleSite(elem.dataset.link);
			break;
	}


}


function openPage(e){ 	

	//서브페이지 연결
	const subpage_cnt = document.getElementById("subpage_cnt");
	subpage_cnt.classList.add("on");

	// 클릭하면 일단...세로가 길어지고, 나중에 아래쪽 가로길이가 채워지고 
	timerID = setTimeout(spreadXY, 30, 6, true, document.querySelector("header").clientHeight, subpage_cnt);

	//버튼
	subpage_cnt.querySelector(".btnSet").addEventListener("click", buttonToDoList);

	document.querySelector('.contents .category').addEventListener('click', showCategoryPage);

	console.log("openPage");

}

function showCategoryPage(e){

	console.log("setCategoryPage");

	// if( e.target.nodeName === this.nodeName ) return;

	let mainContents = document.querySelector(".mainContents");
	mainContents.classList.add('on'); //리스트 페이지 열고

	let elem = clickElement.find(e.target, "LI");	
	let category = elem.getAttribute('data-category'); // 무슨 카테고리인지 가져와서 제목넣고
		
	mainContents.setAttribute('data-category', category);
	mainContents.querySelector('.subsubTitle').textContent = category + ' - ' + e.currentTarget.querySelector('span').innerHTML;

	mainContents.querySelector('.cntList').innerHTML = template.setCategoryLIST(category);//안에 리스트 설정하고

	mainContents.addEventListener('click', setClickCategory);		

}


function setClickCategory(e){

	console.log('11setDetailPage',  e.target);
	if( e.target.nodeName === this.nodeName )
	{
		console.log("000",e.target.nodeName, this.nodeName );
		return;
	}

	if( e.target.className === "cntList") return;


	if( clickElement.find(e.target, "BUTTON") !== null )
	{
		console.log('55setClickCategory',  e);
		buttonToDoList(e);
		return;
	}

	if( clickElement.find(e.target, "DIV") !== null )
	{
		console.log('66setDetailPage',  e.target);
		let parent = clickElement.find(e.target, "DIV").parentNode;
		let name = parent.previousElementSibling.innerHTML.split(" ")[0];
		let idx;
			
		if (parent.hasChildNodes()) 
		{
			//console.log( "this.hasChildNodes() : ", a);
			let children = parent.childNodes;

			for (let i = 0; i < children.length; i++)
			{		
				let elem = clickElement.find(e.target, "DIV");

				if( children[i] === elem )
				{
					console.log("aaa : ",i, children[i], elem);
					idx = i;
				}
			}
		}

		let detail = document.querySelector(".subDetail");
		detail.classList.add('on');

		detail.querySelector('.item').innerHTML = template.detailITEM(name, idx, detail.querySelector('.item'));//안에 리스트 설정;

		detail.querySelector(".btnSet").addEventListener("click", buttonToDoList);

		if( detail.querySelector(".sampleSite") !== null )
			detail.querySelector(".sampleSite").addEventListener("click", buttonToDoList);
	}

}


function showWorkResult(items){

	let page = document.querySelector('.workResult');	
	page.querySelector('ul').innerHTML = template.SetItemsList(items);
	page.classList.add("on");

	page.querySelector(".btnSet").addEventListener("click", buttonToDoList);
}


function testPage(elem){

	// const url = new URL('https://developer.mozilla.org/ko/docs/Web/API/URL/href#aa#bbb#ccc');
	// console.log(url.hash, '///', location.href); // Logs: '#예제'

	console.log("hashtag", elem);
	let queryData = null;

	let nd = elem.parentNode.parentNode.querySelectorAll(".hashtag span");

	console.log('location : ',nd);

	let str = '';//'#';
	for( let i=0; i< nd.length; i++)
	{
		if( i === nd.length-1 )
		{
			str += nd[i].innerHTML;
			break;
		}

		str += nd[i].innerHTML + '#';
	}

	// const state = '';//{ 'page_id': 1, 'user_id': 5 };
	// const title = '';
	// const url = location.href+str;

	// location.href = url;
	// history.pushState(state, title, url);
	// console.log( history, location);


	// //str 에 담긴 해시태그들만 모아서 화면에 나타내기, 우선은 layout.js에 작성해두기

	let page = document.querySelector('.workResult');

	page.querySelector('ul').innerHTML =  template.selectedHASHTAG(str);
	page.classList.add("on");

	page.querySelector(".btnSet").addEventListener("click", buttonToDoList);


}

function openSampleSite(siteAddress){

	let div = document.createElement("div");
	div.setAttribute("class", "linkediframe");

	let iframe = document.createElement("iframe");
	iframe.src = siteAddress;

	let btn = document.createElement("button");
	btn.setAttribute("class", "disconnect");
	btn.innerHTML = '<span class="icons crossShape whiteBG"></span>';

	document.body.appendChild(div);
	let linked = document.querySelector('.linkediframe');
	linked.appendChild(btn);
	linked.appendChild(iframe);
	
	linked.querySelector(".disconnect").addEventListener("click", buttonToDoList);
	//loadFile._html('./nameCard/m_nameCard.html', samplesite);

// console.log( "link : ", iframe);
}

function samplesite(htmlSource){

	console.log("samplesite  ", htmlSource);
	let frame = document.createElement("iframe");
	frame = htmlSource;

}

//setTimeout(spreadXY, 30, 6, -1, document.querySelector("header").clientHeight, subpage_cnt);

let timerID = null;
function spreadXY(higher, isClassOn, topMargin, subpage_cnt)
{

	if( isClassOn )
	{
		higher--;
		if( higher == 0 ) 
		{
			clearTimeout(timerID);
			subpage_cnt.style.top = ( topMargin + 20) + "px";				
			return;
		}
	}
	else
	{
		higher++;  
		if( higher == 6 ) 
		{
			clearTimeout(timerID);       
			subpage_cnt.style.top = ( topMargin + subpage_cnt.clientHeight + 20) + "px";
			subpage_cnt.classList.remove("on");
			subpage_cnt.querySelector('.btnSet').removeEventListener("click", buttonToDoList);
			return;
		}
	}

	subpage_cnt.style.top = (subpage_cnt.clientHeight/5 * higher) + "px";
	setTimeout(spreadXY, 30, higher, isClassOn, topMargin, subpage_cnt);

}



loadFile._script('js/object.js');
console.log(1111111111);
loadFile._script('js/layout.js');

window.addEventListener("load", loadWindow);
//window.addEventListener("scroll", resizeImgFromScroll);//상단 인물 이미지 스크롤_리사이징 설정

function loadWindow(){

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











