'use strict';


/* 노란색 #ffd500   rgba(255,213,0,1)  */ 
/* 보라색 #916aef   rgba(145,106,239,1)  */ 
/* 청록색 #00d199  rgba(0,209,153,1) */ 
/* 복숭아색 #ffa47f  rgba(255,164,127,1)  */
/* 빨간색 #ff5050  rgba(255,80,80,1)  */	
/* 파란+보라 사이색 #5e5fef  rgba(94, 95, 239, 1 )  // 파란색 #378eff  rgba(55,142,255,1) */
/* 연두색 #bccd50   rgba(188,205,80,1) */	


(function() {

	if (navigator.maxTouchPoints > 1) {
		// browser supports multi-touch
	}

	

})();

let pc_size = 100;//임시값 
let expandSize = 30;

let ns = "http://www.w3.org/2000/svg";


function makeSvg(state, reSize, hrefNum, fillColor, faceNum, classname){

	let svg = document.createElementNS(ns, "svg");
	svg.setAttributeNS( ns, 'viewBox', `0 0 ${pc_size+reSize} ${pc_size+reSize}`);
	// svg.setAttribute("width", pc_size );
	// svg.setAttribute("height", pc_size );
	svg.setAttributeNS( ns, "width", pc_size );
	svg.setAttributeNS( ns, "height", pc_size );
	// svg.setAttributeNS( ns, 'viewBox', `0 0 160 160`);

	// 모양 설정
	let shape = document.createElementNS(ns, "use");
	shape.setAttribute("href", "#s"+ hrefNum );
	shape.setAttribute("fill", fillColor );
	shape.setAttribute("class", classname.shape);

	if( state === "stroke"){
		svg.appendChild(shape);
		return svg;

	}	

	// 표정 설정
	let face = document.createElementNS(ns, "use");
	face.setAttribute('href', "#face"+ faceNum );

	if( faceNum < 5 ) face.setAttribute("class", classname.face);
	else face.setAttribute("class", classname.withMouth);
	// let transform = "translate(32,45) scale(0.8)"; // translate(25,40)

	// if( faceNum > 4 )
	// 	transform = "translate(24,45) scale(0.7)"; // translate(17,40)
	
	//face.setAttribute("transform", transform);

	svg.appendChild(shape);
	svg.appendChild(face);	

	return svg;
}

function loadSite(motherBoard){

	console.log("loadSite");

	let ns = "http://www.w3.org/2000/svg";
	let blindness = document.createElement("section");
	blindness.setAttribute("class", "blindness");

	//샘플 가져오기 도형 7개, 표정 7개
	let sampleDIV = document.createElement("div");
	sampleDIV.setAttribute("class", "sample");

	let sampleSvg = document.createElementNS(ns, "svg");	

	for( let key in sample ) {
		for( let i=0; i<sample[key].length; i++ )
			sampleSvg.innerHTML += sample[key][i];
	}

	sampleDIV.appendChild(sampleSvg);
	blindness.appendChild(sampleDIV);

	//인트로페이지 생성
	console.log("loadSite ", motherBoard );
	let intro = document.createElement("ul");
	intro.setAttribute("class", "intro");

	let mb = window.getComputedStyle(motherBoard);
	console.log(mb.height, mb.width);
	
	let fillColor = [ '#ffd500', '#916aef', '#00d199', '#ffa47f', '#ff5050', '#5e5fef', '#bccd50'];
	let loopRow = parseInt(mb.height)/(pc_size + 30);// 마진값 더해줬음
	let loopColumn = parseInt(mb.width)/(pc_size + 30);	
	// let loopRow = parseInt(motherBoard.offsetHeight/(pc_size + 30));// 마진값 더해줬음
	// let loopColumn = parseInt(motherBoard.offsetWidth/(pc_size + 30));	

	console.log('111  ',motherBoard.offsetHeight	)

	for( let j=0; j<loopRow; j++ ) {// loopRow
		for( let k=0; k<loopColumn; k++ ) {
			let li = document.createElement("li");
			li.style.cssText = `width : ${pc_size}px;
								height : ${pc_size}px;	`;

			li.appendChild( makeSvg("shape", 
									0, 
									parseInt(Math.random()*7), 
									fillColor[ parseInt(Math.random()*fillColor.length) ], 
									parseInt(Math.random()*7), 
									{ shape : "reShape", face : "reFace", withMouth : "rewithMouth"}) );

			intro.appendChild(li);
		}
	}

	blindness.appendChild(intro);
	motherBoard.appendChild(blindness);


	//들어가기 버튼 붙이기
	let btn = document.createElement("button");
	btn.setAttribute("class", "enter");
	btn.setAttribute("type", "button");

	btn.addEventListener("click", closeIntro);

	motherBoard.appendChild(btn);

	loadSite.prototype.motherBoard = motherBoard;

	loadSite.prototype.introIndex = resetIndexList(motherBoard.querySelector(".intro").children, [], null);

	console.log(loadSite.prototype.introIndex)

}

function resetIndexList(intro, reIndexSet, isNum){
	
	let noNum;
	while( reIndexSet.length < intro.length ) //삭제할 때 사용할 순서 뽑아놓기
	{
		noNum = true;
		let temp = parseInt( Math.random()*intro.length );
		
		if( reIndexSet.length === 0 )
			reIndexSet[reIndexSet.length] = temp;	
		
		for( let j=0; j<reIndexSet.length; j++ )
			if( reIndexSet[j] === temp ) noNum = false;

		if( noNum )
			reIndexSet[reIndexSet.length] = temp;

	}
	//console.log("resetIndexList  ",reIndexSet, isNum)

	if( isNum != null )
	{
		//console.log("11 resetIndexList  ", isNum)
		let y = reIndexSet.indexOf(isNum);
		reIndexSet.splice(y, 1);
	}

	return 	reIndexSet;

}


function closeIntro(){

	let intro = loadSite.prototype.motherBoard.querySelector(".intro");
	let introIndex = loadSite.prototype.introIndex;

	console.log("closeIntro  ", intro, introIndex);

	let n = -1;
	let tikmerID = setTimeout(function closeLI(){			

		n++;

		if( n < parseInt(intro.children.length/2) )
		{
			intro.children[ introIndex[n] ].classList.add("invisible");
			tikmerID = setTimeout( closeLI, 500 ); // 300-(idx*5)
		}

		if( intro.children.length-1-n > parseInt(intro.children.length/2) ) //뒤부터 삭제
		{				
			intro.children[ introIndex[intro.children.length-1-n] ].classList.add("invisible");
			tikmerID = setTimeout( closeLI, 300 ); // 300-(idx*5)			
		}

		if( n == parseInt(intro.children.length/2) )
		{
			clearTimeout(tikmerID);
			let obj = intro.children[ introIndex[n] ];
			moveToCube(obj, {
				href : parseInt( obj.children[0].children[0].getAttribute("href").replace(/[^0-9]/g,'') ),
				fill : obj.children[0].children[0].getAttribute("fill"),
				face : parseInt( obj.children[0].children[1].getAttribute("href").replace(/[^0-9]/g,'') )
			});				
			
		}

	}, 1000); //intro.children.length*5	idx*5

	this.parentNode.removeChild(this);//버튼 삭제
	delete loadSite.prototype.introIndex;

}

function moveToCube(obj, firstCubePiece){		

	// 마지막을 남은 얼굴, 복사본 만들기
	let lastPerson = document.createElement("div");
	lastPerson.setAttribute("class", "lastPerson");
	lastPerson.style.cssText = `top : ${obj.offsetTop}px; left: ${obj.offsetLeft}px;`;

	lastPerson.appendChild( makeSvg("shape", 
									0, 
									firstCubePiece.href, 
									firstCubePiece.fill, 
									firstCubePiece.face, 
									{ shape : "reShape", face : "reFace", withMouth : "rewithMouth"}) );

	document.querySelector(".blindness").appendChild(lastPerson);
	document.querySelector(".blindness").removeChild(obj.parentNode);// intro 삭제할

	//blindness 첫번째 섹션 만들기
	let firstSection = document.createElement("section");
	firstSection.setAttribute("class", "pageIntro");
	firstSection.style.cssText = ` height: ${loadSite.prototype.motherBoard.offsetHeight}px;`;

	// 얼굴 담을 3X3 박스 만들기	
	let cubeAllFace = document.createElement("ul");
	cubeAllFace.setAttribute("class", "allFace");

	for( let i=0; i<9; i++ )
	{
		let li = document.createElement("li");
		li.style.cssText = `width : ${pc_size}px;
							height : ${pc_size}px;	`;
		cubeAllFace.appendChild(li);
	}

	firstSection.appendChild(cubeAllFace);
	document.querySelector(".blindness").appendChild(firstSection);	

	let idx = cubeIndex(firstCubePiece.face);// 남아있는 얼굴이 들어갈 큐브의 인덱스 알아보기
	let at = ( cubeAllFace.offsetTop - cubeAllFace.offsetHeight/2 ) + cubeAllFace.children[idx].offsetTop;
	let al = ( cubeAllFace.offsetLeft - cubeAllFace.offsetWidth/2 ) + cubeAllFace.children[idx].offsetLeft;
	let t1, t2, t3;
	t1 = setTimeout(function(){	console.log("moveToCube  ",firstCubePiece.face)

			//  0>0  1>1  2
			//  3>2  4>3  5>6
			//  6>4  7>5  8		

			lastPerson.classList.add("moving");//.lastPerson	transition-duration: 1.5s
			// lastPerson.querySelector("svg").setAttribute( "filter", "url(#ds0)");

			lastPerson.style.top = at + "px";
			lastPerson.style.left = al + "px";

			t2 = setTimeout(function(){

					lastPerson.classList.remove("moving");
					lastPerson.classList.add("end");// transition-duration: 1.5s, -delay: 1.5s

					t3 = setTimeout(function(){

						cubeAllFace.classList.add("on");
						cubeAllFace.children[idx].appendChild( makeSvg("shape",
																		expandSize,
																		firstCubePiece.href, 
																		firstCubePiece.fill, 
																		firstCubePiece.face, 
																		{ shape : "reShape", face : "reFace", withMouth : "rewithMouth"}) );						

						fillCube(lastPerson, cubeAllFace, idx, firstCubePiece );

						clearTimeout(t1);
						clearTimeout(t2);
						clearTimeout(t3);	

					},1500);		

				}, 1500);			

		}, 1000);

}

function fillCube(obj, allFace, liIdx, cubepiece){

	let oriFillColor = [ '#ffd500', '#916aef', '#00d199', '#ffa47f', '#bccd50', '#378eff', '#ff5050'];
	
	// 남아있는 얼굴만 빼고 배열 순서 다시 설정
	let fillColor = resetIndexList(oriFillColor, [], oriFillColor.indexOf(cubepiece.fill));
	let hrefNum = resetIndexList(oriFillColor, [], cubepiece.href);
	let faceNum = resetIndexList(oriFillColor, [], cubepiece.face );

	//console.log('fillCube - ', fillColor, hrefNum, faceNum)

	//  0>0  1>1  2
	//  3>2  4>3  5>6
	//  6>4  7>5  8

	let temp = [];
	for( let j=0; j<fillColor.length; j++ )
	{
		temp.push({
			"idx" : cubeIndex(faceNum[j]), 
			"svg" : makeSvg("shape", 
							expandSize, 
							hrefNum[j], 
							oriFillColor[ fillColor[j] ], 
							faceNum[j], 
							{ shape : "reShape", face : "reFace", withMouth : "rewithMouth"}) });
	}

	// for( let k=0; k<usedTimerID.length; k++ )
	// 	clearTimeout(usedTimerID[k]);	

	let x=0
	let t4 = setTimeout(function showTime(){

		//console.log( "xxx ", x, temp.length)

		if( x === temp.length )
		{
			clearTimeout(t4);

			//버튼 붙이기
			let btn = document.createElement("button");
			btn.setAttribute("class", "btnbox");
			btn.setAttribute("type", "button");			

			let hn = parseInt( allFace.children[5].children[0].children[0].getAttribute("href").replace(/[^0-9]/g,'') );

			btn.appendChild( makeSvg("stroke",expandSize,  hn, "none", null, { shape : "reShape", face : "", withMouth : ""}) );
			
			btn.addEventListener("click", nextSection);
			allFace.children[ 5 ].appendChild( btn);

			return;
		}

		allFace.children[ temp[x].idx ].appendChild( temp[x].svg );	// 남은 얼굴들 붙이

		x++;
		t4 = setTimeout( showTime, 300/x);

	}, 300);
	
}

function cubeIndex(cubeNum){
	let idx = -1;
	if( cubeNum == 0 ) idx = 0;
	else if( cubeNum == 1 ) idx = 1;
	else if( cubeNum == 2 ) idx = 3;
	else if( cubeNum == 3 ) idx = 4;
	else if( cubeNum == 4 ) idx = 6;
	else if( cubeNum == 5 ) idx = 7;
	else if( cubeNum == 6 ) idx = 5;
	return idx;
}

function makelastPerson(){
	// //말하는 사람 복사본 만들기
	// let speaker = document.createElement("div");
	// speaker.setAttribute("class", "speaker");

	// //말하는 사람 크기, 위치
	// let cw = document.querySelector(".allFace").children[5].offsetWidth;
	// let ch = document.querySelector(".allFace").children[5].offsetHeight;
	// let al = document.querySelector(".allFace").offsetLeft
	// 		 - (document.querySelector(".allFace").offsetWidth/2); // offsetLeft -> css transform때문에 화면중앙으로 계산됨 
	// let at = document.querySelector(".allFace").offsetTop
	// 		 - (document.querySelector(".allFace").offsetHeight/2);
	// //let margin = ( window.innerWidth - loadSite.prototype.motherBoard.clientWidth )/2;

	// speaker.style.cssText = `
	// 				width : ${cw}px;
	// 				height : ${ch}px;
	// 				top : ${at + ch}px;
	// 				left : ${al + cw*2}px;
	// 				transform: translate(0,0)`; //
	
	// speaker.innerHTML = document.querySelector(".allFace").children[5].children[0].outerHTML;
	// blindness.appendChild(speaker);

}

function nextSection(){	

	console.log('nextSection ', document.querySelector(".allFace"))

	// let af = document.querySelector(".allFace");
	let blindness = loadSite.prototype.motherBoard.querySelector(".blindness");

	for( let key in layout_blindness){

		let sec = document.createElement("section");
		sec.setAttribute("class", key);
		sec.style.cssText = ` height: ${loadSite.prototype.motherBoard.offsetHeight}px;`;
		sec.innerHTML = layout_blindness[key];

		blindness.appendChild(sec);
	}

	//이동하기
	let microSite = loadSite.prototype.motherBoard;

	console.log("1 scroll nextSection " ,microSite.scrollTop)

	setTimeout(function(){
		microSite.scrollTop = loadSite.prototype.motherBoard.querySelector(".they").offsetTop;

		console.log("2 scroll nextSection " ,microSite.scrollTop)

	}, 1000);


	let article = document.querySelectorAll(".another article");

	for( let i=0; i<article.length; i++ )
	{
		if( i == 0 ) article[i].setAttribute("class", "on");

		article[i].style.zIndex = article.length - 1 - i;
	}
	
	//document.querySelector(".microSite").addEventListener("wheel", onScroll);
	document.querySelector(".microSite").addEventListener("scroll", testScroll( debounce, 700, document.querySelector(".microSite") ) );


}

function goDown(/* timerID, */board, speaker, they, interval){

	
	if( interval >= they.offsetTop )
	{
		//clearTimeout(timerID);
		return;
	}

	let temp = parseInt(speaker.style.top);	

	//speaker.style.top = `${ temp + interval }px)`;
	speaker.style.transform = `translate(50px, ${interval}px)`;
	console.log("goDown ", speaker.style.transform, board.scrollTop, interval);

	interval = interval + 100;//interval * interval;

	setTimeout(goDown, 500, board, speaker, they, interval);


}


let initScrollTop = null;

function debounce( e, microsite){

	if( microsite.dataset.myScroll == 'false' ) {
		console.log('의도한 스크롤이 아님')
		initScrollTop = null;
		microsite.dataset.myScroll = true;
		return;
	}
	
	console.log("debounce start..\n" )

	let another = microsite.querySelector(".another");
	let page = another.parentNode;
	let article = another.querySelectorAll("article");
	let broken = microsite.querySelector(".brokenShape");
	let paths = microsite.querySelectorAll(".brokenShape svg path");


	if( page.classList.contains("pause") ){			
		microsite.scrollTop =  microsite.querySelector(".another").offsetTop;

		console.log("pause..next = ", microsite.dataset.next , "\n", article, page)
		let timer = setTimeout(function(){
			resetSlide(article, page, parseInt(microsite.dataset.next), microsite);
			clearTimeout(timer);
		}, 600);		
		return;			 
	}

	if( initScrollTop - microsite.scrollTop < 0 ) {  console.log( "stop scroll 위 -> 아래 ")

		if( findIndex(article, "on") === 0 && microsite.scrollTop >= another.offsetTop ){
			resetMicroSite(microsite, page, microsite.querySelector(".another").offsetTop, 1);
				// microsite.querySelector(".another").offsetHeight,
		}

		if( microsite.scrollTop >= broken.offsetTop ){
			brokenShape(paths, broken);
		}
		
	} else {   console.log( "stop scroll 아래 -> 위 ")	

		if( findIndex(article, "on") === article.length - 1 && microsite.scrollTop <= another.offsetTop ){	
			resetMicroSite(microsite, page, microsite.querySelector(".another").offsetTop, -1); 
				// microsite.querySelector(".another").offsetHeight, 
		}		
	}

	initScrollTop = null;
	
}

function resetMicroSite(microsite, page, lockTop, next){ // lockBottom, 
console.log("start pause   ")
	microsite.scrollTop = lockTop;
	page.style.top = -lockTop + "px";
	// page.style.bottom = -lockBottom + "px";
	page.classList.add("pause");	
	microsite.dataset.next = next;	
	microsite.dataset.myScroll = "false";
}


function testScroll(callback, delay, microsite){

	let testId = null;	
	
	console.log("testScroll 모르겠지만..")

	return e => {
		//console.log("11 closure", myScroll)

		if( testId != null ){
			clearTimeout( testId );
		}

		if( initScrollTop == null )	{
			initScrollTop = microsite.scrollTop;
		}	

		testId = setTimeout( callback, delay, e, microsite);
	};

	//console.log("급하다 급해")

}

function onScroll(e){

	console.log("wheel PC")

	let another = document.querySelector(".another")
	let page = another.parentNode;
	let article = another.querySelectorAll("article");
	let broken = document.querySelector(".brokenShape");
	let paths = document.querySelectorAll(".brokenShape svg path");

	if( e.deltaY > 0 ){

		//console.log(page.parentNode.scrollTop, this.scrollTop)

		if( page.classList.contains("pause") ){
			page.parentNode.scrollTop = hold_scrolltop;

			if( timer == null )
				timer = setTimeout(resetSlide, 1500, ++first, article, page, 1);
				
		}
		else{

			//시작점, 위 -> 아
			//console.log( "stop scroll 위 -> 아래 ", this.scrollTop)
			if( article[0].classList.contains("on") && this.scrollTop >= another.offsetTop ){

				console.log("start pause   ", window.scrollY, "\n  html  ",document.querySelector('html').scrollTop)
				hold_scrolltop = another.offsetTop;
				page.style.top = -another.offsetTop + "px";
				page.classList.add("pause");					
	
			}

			if( this.scrollTop >= broken.offsetTop ){

				//console.log("시작점 people.offsetTop  ", people.offsetTop)
				brokenShape(paths, broken);
			}
		}

	}
	else{

		if( page.classList.contains("pause") ){

			page.parentNode.scrollTop = hold_scrolltop;

			if( timer == null )
				timer = setTimeout(resetSlide, 1500, ++first, article, page, -1);
				
		}
		else{	
			//시작점, 아래 -> 위
			console.log( "stop scroll 아래 -> 위 ")
			if( article[ article.length-1 ].classList.contains("on") 
				&& this.scrollTop < another.offsetTop )
			{
				first = 0;
				console.log("아래 -> 위 ", another.offsetTop, this.scrollTop)
				hold_scrolltop = another.offsetTop;
				page.style.top = -another.offsetTop + "px";
				page.classList.add("pause");

				console.log("시작점 hold_scrolltop  ", window.pageYOffset)	

			}
		}

	}

}

function resetSlide(article, page, updown, microsite){

	console.log("!!! resetSlide !!!")

	let now = findIndex(article, "on");
	let next = now + updown;
	
	article[ now ].classList.add("off");	

	let zIndexTimer = setTimeout(function(){ 

		article[ now ].classList.remove("on");
		article[ next ].classList.add("on");	
		resetZindex(article, now, next);
		clearTimeout(zIndexTimer);

	}, 450); // 애니메이션 duration 2000, 45%일때 제일 오른쪽으로 이동하니까, 1000()*0.45

	if( next === article.length-1 || next === 0)  //  idx+1 === article.length-1
	{
		microsite.scrollTop =  microsite.querySelector(".another").offsetTop;
		page.style.top = "";
		page.classList.remove("pause");			
		
		let t1 = setTimeout(function(){

			for( let i=0; i<article.length; i++ )
				article[i].classList.remove("off");

			clearTimeout(t1);
			console.log("22 nextSlide last",t1, article)
			microsite.dataset.myScroll = "false";

		}, 600);
		
	}
	
	console.log( "우선 멈춤 on on pause ", article)

}

function scrollCheck(){


}


function findIndex(obj, className){

	let idx = -1;
	for( let i=0; i<obj.length; i++ )
	{
		if( obj[i].classList.contains(className) )
		{
			idx = i;
		}					
	}

	return idx;
}

function resetZindex(obj, now, next){		

	obj[ next ].style.zIndex = obj.length-1; // on 붙은 객체
	obj[ now ].style.zIndex = 0; // 바로 전에 on이 붙어 있던 객체

	for( let i=0; i<obj.length; i++ )
	{
		if( now === i ||  next === i ) continue;

		obj[i].style.zIndex = parseInt(obj[i].style.zIndex)+1;
	}

}

function brokenShape(paths, people){

	console.log('aaaaa')

	people.classList.add("on");

	let n=1;
	let peopleTimer = setTimeout(function broken(){

		//console.log('splitePiece  ', n)

		for( let i=0; i<paths.length; i++ )	{  

			if( paths[i].classList.contains("step" + (n-1)) )
				paths[i].classList.remove("step" + (n-1))

			paths[i].classList.add("step" + n);
		}
		

		if( n == 3 ){
			console.log('splitePiece clearTimeout ', n)
			clearTimeout(peopleTimer);
			people.querySelector(".wording").classList.add("on");
			return;

		} else {
			setTimeout( broken, 100, n++ );
		}


	}, 900);

}













