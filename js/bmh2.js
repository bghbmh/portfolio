'use strict';

function loadBody(mainBody){

	// let temp = new layout();
	// console.log('temp : ',temp);


	//파일 가져오기	
	loadFile._json('./json/bmh.json', template.arrange);


	mainBody.style.height = window.innerHeight + "px";//높이가 오류나고 있음 확인하기

	console.log("navigator  ",navigator.userAgent);

	let device = navigator.userAgent.split(' ');

	let d = navigator.userAgent.toLowerCase();

	console.log("navigator  ",device, d);

	var regExp = /[^a-zA-Z]/;

	console.log(navigator.userAgent.toLowerCase(), device[1].split(regExp)[1], navigator.maxTouchPoints)

	document.querySelector("nav").addEventListener("click", openPage);//버튼 연결	
	//topsmallSlides(false);// 상단, 하는 일 수직 슬라이드 설정

}

let timerID = null;
function openPage(e){ 	
	//서브페이지 연결
	console.log("openpage ")
	let pageNum = -1;
	let callback = null;

	switch (e.target.dataset.btn) {
		case "퍼블리싱":
			pageNum = 0;
			callback = showMicroSite;
			break;
		case "디자인":
			pageNum = 1;
			callback = showCategoryPage;
			break;
		default:
			// statements_def
			break;
	}

	//버튼
	document.querySelectorAll(".subpage")[pageNum].classList.add("on");
	document.querySelectorAll(".subpage")[pageNum].querySelector('.contents .category').addEventListener('click', callback);
	document.querySelectorAll(".subpage")[pageNum].querySelector(".btnSet").addEventListener("click", buttonToDoList);

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

	let node ;
	switch( className )
	{
		case "closeSubPage":			
			node = elem.parentNode.parentNode;
			node.classList.remove("on");
			break;

		case "closePage":
		case "closeDetail":

			node = elem.parentNode.parentNode;
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
			node = elem.parentNode.parentNode;
			let arr = template.findCategory( node.querySelector(".subsubTitle").innerHTML.split(" ")[0] );
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

function showMicroSite(e){
	console.log("showMicroSite");

	let motherBoard = document.querySelector(".microSite");
	motherBoard.innerHTML = "";
	motherBoard.classList.add('on'); //리스트 페이지 열고

	let elem = clickElement.find(e.target, "LI");	
	let category = elem.getAttribute('data-category'); // 무슨 카테고리인지 가져와서 제목넣고

	console.log("showMicroSite",elem, category);

	let btnSet = document.createElement("div");
	btnSet.setAttribute("class", "btnSet");
	btnSet.innerHTML = `<button id="closeSubPage" class="closePage" aniEffect="cfOutline">
							<span class="icons leftArrowSide"></span>
							<div class="circumference_outline" data-anim="base wrapper">
								<div class="circumference" data-anim="base left"></div>
								<div class="circumference" data-anim="base right"></div>
							</div>
						</button>`;
				
	btnSet.addEventListener("click", buttonToDoList);
	motherBoard.appendChild(btnSet);
	
	if( category == "퍼즐" ) 	{
		console.log("showMicroSite 퍼즐");

		loadFile._css('css/puzzle.css');
		motherBoard.style.cssText = "";

		let ul = document.createElement("ul");
		ul.setAttribute("class", "game");
		ul.innerHTML = `<li>
							<img src="img/puzzle.JPG" alt="안녕하세요 일러스트" />
							<dl>
								<dt>HELLO GOODBYE</dt>
								<dd>© Ze Cardoso</dd>
							</dl>
						</li>
						<li>
							<img src="img/driving.gif" alt="아랍뉴스 처음 운전하는 여성 일러스트" />
							<dl>
								<dt>start your engines</dt>
								<dd>© Malika Favre</dd>
							</dl>
							
						</li>`;
					
		motherBoard.appendChild(ul);
		loadFile._script('js/puzzle.js');

	} else if( category == "랜딩페이지" ){
		console.log("showMicroSite 랜딩페이지");

		motherBoard.style.cssText = " width : 110%; height : calc(100% + 8px); top : -4px; left : -5%;";
		
		let isCss = loadFile._css('css/samplePage01_blindness.css');
		let isScript = loadFile._script('js/samplePage01.js'); //  samplePage01.js

		if( isCss && isScript ){
			loadSite(motherBoard); 
		} else {
			isScript.addEventListener("load", function(){
				loadFile._script('./js/samplePage01_data.js').addEventListener("load", () => { 
					loadSite(motherBoard); 					
				});
			});

		}
		
	} else if( category == "uiComponents" ){
		console.log("showMicroSite uiComponents");
		loadFile._css('css/uiComponents.css');		
		loadFile._json('./json/uiComponents.json', uiTemplate);
		loadFile._script('js/uiComponents.js'); 

	}

}

function uiTemplate(jsonObj){

	console.log(jsonObj);
	const rawData = jsonObj;

	let ul = document.createElement("ul");
	ul.setAttribute("class", "components");

	for( let i=0; i<jsonObj.length; i++) 
	{
		let li = document.createElement("li");
	
		for( let key in jsonObj[i] ){

			if( key === "link" ){
				li.dataset.linkFile = jsonObj[i][key];
				continue;
			}
			
			li.textContent = jsonObj[i][key];
		}		
		
		ul.appendChild(li);
		ul.addEventListener("click", showComponent);
	}

	let div = document.createElement("div");
	div.setAttribute("class", "componentBoard");

	document.querySelector(".microSite").appendChild(ul);
	document.querySelector(".microSite").appendChild(div);

}


function showComponent(e){

	if( e.target.tagName !== "LI" ) return;

	console.log("showComponent", e.target.dataset.linkFile)

	let request = { method : "get", headers : { "content-type" : "text/html"} };
	let site = "./ui/";

	let ui = loadFile._html(site + e.target.dataset.linkFile, request);
	console.log("showComponent", site, ui)
	ui.then(response => { 
		
		if( !response.ok ){
			console.log(response.status)
			throw response.status;
		}

		return response.text();

	})
	.then(html => { 
		console.log("aaaaa")
		document.querySelector(".componentBoard").innerHTML = html; 
		UIHandler(document.querySelector(".componentBoard"), e.target.dataset.linkFile); 
	})
	.catch( err => {
		if( err === 404 )
			preparePage(document.querySelector(".componentBoard"));
	});

}

function preparePage(board){
	console.log("preparePage")

	board.innerHTML = `<div class="prepare">
							<img src="img/icons_myFace.svg">
							준비 중입니다
						</div> `;
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











