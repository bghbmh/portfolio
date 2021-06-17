


//=====================================================================================================================
// 팝업 1 ==============================================================================================================
function openAlert(board, addName, msg, btnStr){ // board, target, msg, btnStr

	//target.disabled = true;

	let modal = document.createElement("div");
	modal.setAttribute("class", "popup " + addName);

	let contentsArea = document.createElement("div");
	contentsArea.setAttribute("class", "contentsArea");
	contentsArea.textContent = msg;
	modal.appendChild(contentsArea);

	let btn = document.createElement("button");
	btn.textContent = btnStr;

	btn.addEventListener("click", function btnhandler(){
		modal.classList.add("off");
		let tId = setTimeout(() => {
			// target.disabled = false;
			btn.removeEventListener("click", btnhandler);
			board.removeChild(modal);
			clearTimeout(tId);
		}, 400);
	});

	modal.appendChild(btn);
	board.appendChild(modal);

}

//=====================================================================================================================
// 팝업 2 ==============================================================================================================
function addInfoHandler(e){ //폼에 붙일 핸들러

	if( e.target.tagName !== "INPUT" && e.target.tagName !== "BUTTON") return;

	switch(e.type){
		case "focusout":  
			if( e.target.tagName === "BUTTON" ) return; 
			if( e.target.value === "" )
				e.target.parentNode.classList.remove("up");
			break;
		case "focusin": 
			if( e.target.tagName === "BUTTON" ) return;				
			e.target.parentNode.classList.add("up");
			break;
		case "keydown":				
			if( e.key === "Enter" ){  // && checkUserId()
				
				if( e.target.parentNode.nextElementSibling !== null 
				   && ( e.target.value == "" || !e.target.parentNode.nextElementSibling.classList.contains("btnSet") ) ){
					e.preventDefault();
					e.target.parentNode.nextElementSibling.lastElementChild.focus();
				}
			}
			break;				
		case "click":				

			if( !e.target.parentNode.classList.contains("btnSet") ) return;

			if( e.target.type == "reset" ){
				document.querySelector(".popup").classList.add("off");
				let tId = setTimeout(() => {						
					this.removeEventListener("click", addInfoHandler);
					this.removeEventListener("focusin", addInfoHandler);
					this.removeEventListener("focusout", addInfoHandler);
					this.removeEventListener("keydown", addInfoHandler);
					document.querySelector(".componentBoard").removeChild(this);
					clearTimeout(tId);
				}, 400);
			} else if( e.target.type == "submit" ) {
				e.preventDefault(); //submit 임시 정지
				//유효성 검사 넣기	
				console.log("submit 임시 정지")
				let input = this.querySelectorAll("input");
				let first = null;

				for( let i=0; i<input.length; i++ ){
					if( input[i].value == "" ){
						if( first ==  null ) first = i;
						input[i].parentNode.classList.add("warning");
					}
				}

				if( first != null ) input[first].focus();
			}	
			
			break;
	}	

}

function resetLabel(obj, className){
	let label = obj.querySelectorAll("label");
	for( let i=0; i<label.length; i++ ){
		if( label[i].classList.contains(className) )
			label[i].classList.remove(className);
	}
}

function openAddInfo(board, addName, template, btns = {}){

	// target.disabled = true;

	let modal = document.createElement("div");
	modal.setAttribute("class", "popup " + addName);
	modal.addEventListener("click", addInfoHandler);
	modal.addEventListener("focusin", addInfoHandler);
	modal.addEventListener("focusout", addInfoHandler);
	modal.addEventListener("keydown", addInfoHandler);

	let form = document.createElement("form");

	for( let i=0; i<template.length; i++ ){
		let inputArea = document.createElement("div");
		inputArea.innerHTML = template[i];
		form.appendChild(inputArea);
		
	}		

	let btnSet = document.createElement("div");
	btnSet.setAttribute("class", "btnSet");
	for( let i=0; i<btns.length; i++ ){
		let btn = document.createElement("button");
		btn.textContent = btns[i].txt;
		btn.setAttribute("type", btns[i].type);
		btnSet.appendChild(btn);
	}
	form.appendChild(btnSet);
		
	modal.appendChild(form);
	board.appendChild(modal);

	/* 임시 */
	board.querySelector('input').focus();

}


//=====================================================================================================================
// 펼침 1 ==============================================================================================================
function showSpreadItem(){

	if( document.querySelector('.cmpt').classList.contains('on') ){
		document.querySelector('.cmpt').classList.remove("on");
		document.querySelector(".button--hamburger").classList.remove("on");
	} else {
		document.querySelector('.cmpt').classList.add("on");
		document.querySelector(".button--hamburger").classList.add("on");

		document.querySelector(".button--hamburger.on").addEventListener("click", showSpreadItem);//임시 리스너
	}

}

//=====================================================================================================================
// 펼침 2 ==============================================================================================================
function clickedItem(callback, delay){
	console.log("clickedItem")
	let tId = null;
	let elem = null;
	let top = 0;
	let height = 0;
	let scrollTop = 0;

	return function(e){

		console.log("return clickedItem")

		if( tId !== null ) clearTimeout(tId);

		if( this.querySelector('.spread') != null ){
			clickEvent(e, top, height, tId, this.querySelector('.spread'));
			return;
		}

		this.classList.add("on");
		this.children[2].classList.remove("mainSample"); //임시

		if( e.target.tagName === "DIV" ) elem = e.target.parentNode;
		else if( e.target.tagName === "IMG" ) elem = e.target.parentNode.parentNode;
		else elem = e.target;

		top = elem.offsetTop; //
		height = elem.offsetHeight; 
		scrollTop = this.scrollTop;

		console.log(e,  top, height, scrollTop)

		//복사본 만들기
		let spread = document.createElement("article");
		spread.setAttribute("class", "spread");
		spread.style.cssText = `top : ${elem.offsetTop}px;
								height : ${elem.offsetHeight}px;`;
		spread.innerHTML = elem.innerHTML;

		let btn = document.createElement("button");
		btn.setAttribute("class", "btn_close");
		spread.appendChild(btn);

		this.appendChild(spread);

		tId = setTimeout(callback, delay, this.querySelector('.spread'), `top : ${this.scrollTop}px; height : 100%;`);

	};

}

function setFullScreen(spread, cssStyle){

	spread.style.cssText = cssStyle;

	if( spread.classList.contains("fullScreen") ){
		spread.classList.remove("fullScreen");
		

		let t = setTimeout(() => {
			spread.classList.remove("spread");	
			spread.parentNode.classList.remove("on");	
			spread.parentNode.removeChild(spread);
		}, 400);
	}
	else {
		spread.classList.add("fullScreen");
	}		

}

function clickEvent(e, top, height, tId, spread){	

	console.log("clickEvent")	

	if( e.target.tagName !== "BUTTON") return;		
	tId = setTimeout(setFullScreen, 100, spread, `top : ${top}px; height : ${height}px;`);

}











































