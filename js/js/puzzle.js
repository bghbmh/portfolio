'use strict';


function settingPuzzle(imgObj){

	console.log("w : ", imgObj ,"\nh : ", imgObj.naturalWidth, imgObj.naturalHeight)

	return function(w, h, re){

		let arr = {
			src : imgObj.src,
			resize : re,//0.85,
			cells : w*h,
			widthCount : w,
			heightCount : h,
			cellWidth : re*imgObj.naturalWidth/w,
			cellHeight : re*imgObj.naturalHeight/h,
			wholeWidth : re*imgObj.naturalWidth,
			wholeHeight : re*imgObj.naturalHeight,				
			piece : [], //{ self : null, neighbor : [], dock : [], clicked : false, ongoingTouches : [], starttop : 0, startleft : 0}
			connectSide : 0, // 접촉면
			connected : []
		};

		settingPuzzle.prototype.imgObj = imgObj;

		let x = 0;
		while( x < arr.cells )
		{
			arr.piece.push({});
			arr.piece[x].self = null;
			arr.piece[x].neighbor = [x-w, x+1, x+w, x-1];
			arr.piece[x].dock = [x-w, x+1, x+w, x-1];//false, false, false, false
			arr.piece[x].clicked = false;
			arr.piece[x].ongoingTouches = [];
			arr.piece[x].startTop = null;
			arr.piece[x].startLeft = null;
			//console.log(arr.neighbor[x]);
			x++;
		}

		// 기준 퍼즐 주변에 퍼즐이 없는 경우는 null 입력
		let row = 0;
		while( row < arr.heightCount ) //행
		{
			let column = 0;
			let init = row*arr.widthCount;
			while( column < arr.widthCount )//열
			{
				let r = init + column;

				for( let i=0; i<arr.piece[r].neighbor.length; i++ )// n x n 의 퍼즐 주변에 붙을 퍼즐 설정
				{
					if( row == 0 && arr.piece[r].neighbor[i] < 0 )//퍼즐의 제일  첫 번째 줄에 있는 경우
					{
						arr.piece[r].neighbor[i] = null;
						arr.piece[r].dock[i] = null;
					}

					if( row == arr.heightCount-1 && arr.piece[r].neighbor[i] >= arr.cells )//퍼즐 마지막 줄
					{
						arr.piece[r].neighbor[i] = null;
						arr.piece[r].dock[i] = null;
					}

					if( column%w == 0 )//열, 세로줄 중에 양쪽 끝에 있는건지 확인
					{
						if( arr.piece[r].neighbor[i] == r - 1 ) 
						{
							arr.piece[r].neighbor[i] = null;
							arr.piece[r].dock[i] = null;
						}
					}

					if( column%w == w-1 )//열, 세로줄 중에 양쪽 끝에 있는건지 확인
					{
						if( arr.piece[r].neighbor[i] == r + 1 ) 
						{
							arr.piece[r].neighbor[i] = null;
							arr.piece[r].dock[i] = null;
						}
					}
				}
				//console.log(arr.neighbor[r]);
				column++;
			}

			row++;
		}

		// 접촉면 파악하기
		let side = 0;
		for( let x=0; x<arr.piece.length; x++ )
		{
			for( let y=0; y<arr.piece[x].neighbor.length; y++ )
			{
				//console.log(side, " settingPuzzle : ",arr.piece[x].neighbor[y])
				if( arr.piece[x].neighbor[y] != null )
					side++;
			}				
		}

		arr.connectSide = side/2;

		return arr;

	};
}



function puzzleLoad(target, matrix, resize){

	let doPuzzle = settingPuzzle(target);// .getAttribute("src")
	let puzzle = doPuzzle(matrix.x, matrix.y, resize);//doPuzzle(7,3, 0.85);

	console.log("puzzleLoad : ", matrix);
	startPuzzle(puzzle);
}


// document.querySelector(".puzzleImg").addEventListener("load", puzzleLoad);

// function puzzleLoad(e){

// 	console.log("load : ", e );

// 	let doPuzzle = settingPuzzle(target);// .getAttribute("src")

// 	let puzzle = doPuzzle(2,2, 0.5);;//doPuzzle(7,3, 0.85);

// 	startPuzzle(puzzle);
// }


function startPuzzle(puzzle){

	console.log("startPuzzle : ")

	let board = document.querySelector("#board");

	if( board != null )
	{
		showPiece(board, puzzle);
		settingPuzzle.prototype.puzzle = puzzle;
		return;
	}

	board = document.createElement("section");

	board.setAttribute("id", "board");
	board.addEventListener("mousedown", mouseEvent);
	board.addEventListener("mousemove", mouseEvent);
	board.addEventListener("mouseup", mouseEvent);
	board.addEventListener("mouseout", mouseEvent);

	board.addEventListener("touchstart", touchEvent);
	board.addEventListener("touchmove", touchEvent);
	board.addEventListener("touchend", touchEvent);

	//console.log("startPuzzle : ", board)

	// let rootLink = document.querySelectorAll('link');
	// rootLink.style.setProperty('--cell-width', puzzle.cellWidth + "px" );
	// rootLink.style.setProperty('--cell-height', puzzle.cellHeight + "px" );
	// rootLink.style.setProperty('--cell-background-sise', puzzle.wholeWidth + "px" );
	// rootLink.style.setProperty('--cell-background-image', `url(${puzzle.src})`);
	// document.body.appendChild(board);

	document.querySelector(".microSite").appendChild(board);

	settingPuzzle.prototype.puzzle = puzzle;

	showPiece(document.querySelector(".microSite #board"), puzzle);

}

function showPiece(board, puzzle){

	//화면에 퍼즐 뿌려놓기
	console.log('showPiece  ', board.offsetWidth)
	let cnt = puzzle.widthCount;

	for( let i=0; i<puzzle.piece.length; i++ ) {

		let span = document.createElement("span");
		let rnd = parseInt( Math.random()*puzzle.cellWidth );

		if( i%2 !== 1 ) {
			rnd = board.offsetWidth - puzzle.cellWidth*1.15 - rnd;
		}

		// 배경 이미지 위치 설정
		let top, left;
		switch ( parseInt(i/cnt) ) {
			case 0: // 첫 번째 줄
				top = 0;
				break;
			case puzzle.heightCount-1: // 마지막 줄

			default: //중간 줄
				top = puzzle.cellHeight * parseInt(i/cnt) * -1;
				// statements_def
				break;
		}

		left = puzzle.cellWidth * ( i%cnt ) * -1;

		span.style.cssText = `  width: ${puzzle.cellWidth}px;
								height: ${puzzle.cellHeight}px;
								top: ${20*i}px;
								left: ${rnd}px;
								z-index: ${i}px;
								background-image: url("${puzzle.src}");
								background-size: ${puzzle.wholeWidth}px;
								background-position: ${left}px ${top}px; `;

		span.dataset.puzzle = i;
		puzzle.piece[i].self = span;
		
		board.appendChild(span);
	}

}


function touchEvent(e){

	e.preventDefault();

	if( e.target.tagName != "SPAN" ) return;

	//console.log(settingPuzzle);

	let mainBoard = settingPuzzle.prototype.puzzle;
	let idx = e.target.dataset.puzzle;

	switch ( e.type ) {
		case "touchstart":
			mainBoard.piece[idx].startTop = [];
			mainBoard.piece[idx].startLeft = [];

			//console.log("  !!!touchstart!!!!  ",e.target, e)
			for( let i=0; i<e.touches.length; i++ )	{
				mainBoard.piece[idx].ongoingTouches.push(copyTouch(e.touches[i]));
				mainBoard.piece[idx].startTop.push(e.touches[i].pageY);
				mainBoard.piece[idx].startLeft.push(e.touches[i].pageX);
				console.log("touchstart", mainBoard.piece[idx].ongoingTouches, "\naa  ", mainBoard.piece[idx]);
			}				

			e.target.style.zIndex = mainBoard.cells;
			e.target.classList.add("moving");
			
			pieceZindex(e.target.parentNode, idx);//zIndex 설정하기	

			break;

		case "touchend":
			console.log("  !!!touchend!!!!  ")
			mainBoard.piece[idx].ongoingTouches = [];

			e.target.classList.remove("moving");

			docking(e.target, mainBoard, idx); 	

			if( dockingList(mainBoard, -1, -1) === mainBoard.cells )
			{
				console.log("  !!!done!!!!  ")
				playDone(this, mainBoard);
			}

			break;

		case "touchmove":
			//console.log("  !!!touchmove!!!!  ", e.changedTouches)

			let touchIdx, mp, dx, dy;
			let isThere = false;

			for( let i=0; i<e.changedTouches.length; i++ ) {

				touchIdx = ongoingTouchIndexById(e.changedTouches[i].identifier, mainBoard.piece[idx]);

				if (touchIdx < 0) {
					console.log("can't figure out which touch to continue");
					return;
				}

				mp = mainBoard.piece[idx];

				//console.log(" touchmove -  ", mp.ongoingTouches[touchIdx].pageX,   mp.startLeft)

				dx = e.changedTouches[touchIdx].pageX - mp.startLeft;
				dy = e.changedTouches[touchIdx].pageY - mp.startTop;	

				//console.log(" touchmove -  ", dx, dy)	

				for( let j=0; j<mainBoard.connected.length; j++ ){
					if( mainBoard.connected[j].dataset.puzzle === idx )	{
						isThere = true;
						break;
					}
				}

				if( isThere ) {
					for( let i=0; i<mainBoard.connected.length; i++ ) {
						let o = mainBoard.connected[i];
						o.style.top = parseInt(o.style.top) + dy + "px";
						o.style.left = parseInt(o.style.left) + dx + "px";
					}
				} else {
					e.target.style.top = e.target.offsetTop + dy + "px";
					e.target.style.left = e.target.offsetLeft + dx + "px";
				}	

				mainBoard.piece[idx].startTop = e.changedTouches[touchIdx].pageY;
				mainBoard.piece[idx].startLeft = e.changedTouches[touchIdx].pageX;		

			}


			break;

		case "":				
			break;

	}

}

function copyTouch({ identifier, pageX, pageY, screenX, screenY }) {
	return { identifier, pageX, pageY, screenX, screenY };
}

// function copyTouch(obj) {
// 	return { obj.identifier, obj.pageX, obj.pageY, obj.screenX, obj.screenY };
// }

function ongoingTouchIndexById(idToFind, obj) {
	for (var i = 0; i < obj.ongoingTouches.length; i++)
	{
		var id = obj.ongoingTouches[i].identifier;

		if (id == idToFind)
		{
			return i;
		}
	}
	return -1;    // not found
}

function mouseEvent(e){

	if( e.target.tagName != "SPAN" ) return;

	//console.log(settingPuzzle);

	let mainBoard = settingPuzzle.prototype.puzzle;
	let idx = e.target.dataset.puzzle;

	switch ( e.type )
	{
		case "mousedown":

			mainBoard.piece[idx].clicked = true;
			mainBoard.piece[idx].startTop = e.pageY;
			mainBoard.piece[idx].startLeft = e.pageX;

			e.target.style.zIndex = mainBoard.cells;

			e.target.classList.add("moving");
			
			pieceZindex(e.target.parentNode, idx);//zIndex 설정하기	

			break;

		case "mousemove":

			if( !mainBoard.piece[idx].clicked  ) return;

			let dx = e.pageX - mainBoard.piece[idx].startLeft;
			let dy = e.pageY - mainBoard.piece[idx].startTop;				

			let isThere = false;
			for( let i=0; i<mainBoard.connected.length; i++ )
			{
				if( mainBoard.connected[i].dataset.puzzle === idx )
				{
					isThere = true;
					break;
				}
			}

			if( isThere )
			{
				//console.log("mousemove - ",puzzle.connected);

				for( let i=0; i<mainBoard.connected.length; i++ )
				{
					let o = mainBoard.connected[i];
					o.style.top = parseInt(o.style.top) + dy + "px";
					o.style.left = parseInt(o.style.left) + dx + "px";
				}
			}
			else
			{
				e.target.style.top = e.target.offsetTop + dy + "px";
				e.target.style.left = e.target.offsetLeft + dx + "px";
			}

			mainBoard.piece[idx].startTop = e.pageY;
			mainBoard.piece[idx].startLeft = e.pageX;

			break;

		case "mouseup":
		
			mainBoard.piece[idx].clicked  = false; 

			e.target.classList.remove("moving");

			docking(e.target, mainBoard, idx); 	

			if( dockingList(mainBoard, -1, -1) === mainBoard.cells )
			{
				console.log("  !!!done!!!!  ")
				playDone(this, mainBoard);
			}

			break;

		case "mouseout":				
			mainBoard.piece[idx].clicked  = false; 
			break;

	}

}

function playDone(area, mainBoard){

	let rnd ;

	for( let i=0; i<mainBoard.cells; i++ )
	{
		//rnd = Math.floor( Math.random()*mainBoard.cells );

		mainBoard.connected[i].classList.add("off");
		setTimeout(function(){
			mainBoard.connected[i].style.display = 'none';
		}, 300);
	}

	let div = document.createElement("div");
	div.setAttribute("id", "madeBoard");
	div.style.width = mainBoard.wholeWidth + "px";
	div.style.height = mainBoard.wholeHeight + "px";
	div.style.backgroundImage = `url(${mainBoard.src})`;
	document.querySelector("#board").appendChild(div);

	msgPop("퍼즐 완성");//

}

function msgPop(msg){

	console.log("msgPop")

	let m = document.querySelector("#madeBoard");

	//console.log(window.getComputedStyle(m))

	let div = document.createElement("div");
	div.setAttribute("id", "puzzleBtnSet");

	let btnRestart = document.createElement("button");
	let btnClose = document.createElement("button");

	btnRestart.textContent = "다시";
	btnClose.textContent = "그만";

	btnRestart.addEventListener("click", reStart);
	btnClose.addEventListener("click", stopThis);
	btnClose.addEventListener("touchend", stopThis);

	div.appendChild(btnRestart);
	div.appendChild(btnClose);
	document.querySelector("#board").appendChild(div);

}

function resetBoard(board){

	console.log("resetBoard", board.children)

	let i = board.children.length-1;
	while( i >= 0 ) {
		console.log("resetBoard", i, board.children[i])
		board.removeChild(board.children[i]);

		i--;
	}

	if( board.children.length == 0 ) return true;
	else return false;
}


function reStart(){

	console.log("reStart ", settingPuzzle);

	let target = settingPuzzle.prototype.imgObj;
	let matrix = { x: settingPuzzle.prototype.puzzle.widthCount, 
				   y : settingPuzzle.prototype.puzzle.heightCount };
	let resize = settingPuzzle.prototype.puzzle.resize;

	delete settingPuzzle.prototype.puzzle;

	let board = document.querySelector("#board");

	if( board != null && board.children.length > 0 )
	{
		if( resetBoard(board) )
		{
			console.log("reStart done")
			puzzleLoad(target, matrix, resize);
		}
	}

}

function stopThis(){

	document.querySelector(".microSite").removeChild(document.querySelector("#board"));
	
	delete settingPuzzle.prototype.puzzle;
	delete settingPuzzle.prototype.imgObj;

	console.log("stopThis", settingPuzzle);
}

function docking(now, mainBoard, idx){  console.log("docking" );	

	let cw = parseInt(mainBoard.cellWidth); 
	let ch = parseInt(mainBoard.cellHeight);
	let puzzle = mainBoard.piece;
	

	let a = 20;
	let nowFl = {
			top : parseInt(now.style.top) - a,
			left : parseInt(now.style.left) - a,
			right : parseInt(now.style.left) + cw + a,
			bottom : parseInt(now.style.top) + ch + a
		};

	let ok = false;
	for( let i=0; i<puzzle[idx].neighbor.length; i++ )
	{
		if( puzzle[idx].neighbor[i] != null )
		{				
			let num = puzzle[idx].neighbor[i];
			let neighbor = puzzle[num].self;
			let nbFl = {
					top : parseInt(neighbor.style.top),
					left : parseInt(neighbor.style.left),
					right : parseInt(neighbor.style.left) + cw,
					bottom : parseInt(neighbor.style.top) + ch
				};

			//console.log("dock -- " ,i, parseInt(now.style.left)+ data.cellWidth, nowFl, nbFl)
			switch(i)
			{
				case 0: //접촉면 - 위쪽
					if( nowFl.top < nbFl.bottom && nowFl.left < nbFl.left && nowFl.right > nbFl.right )
					{
						console.log("접촉면 " ,i)
						resetDocking(now, mainBoard, idx, i, puzzle[idx].neighbor[i], nbFl.bottom, nbFl.left );	
					}	
					break;
				case 1: //접촉면 - 오른쪽
					if( nowFl.top < nbFl.top && nowFl.bottom > nbFl.bottom && nowFl.right > nbFl.left )
					{
						console.log("접촉면 " ,i )
						resetDocking(now, mainBoard, idx, i, puzzle[idx].neighbor[i], nbFl.top, nbFl.left - cw);					
					}
					break;
				case 2: //접촉면 - 아래
					if( nowFl.bottom > nbFl.top && nowFl.left < nbFl.left && nowFl.right > nbFl.right )
					{
						console.log("접촉면 " ,i)
						resetDocking(now, mainBoard, idx, i, puzzle[idx].neighbor[i], nbFl.top - ch, nbFl.left );			
					}

					break;
				case 3: //접촉면 - 왼
					if( nowFl.top < nbFl.top && nowFl.bottom > nbFl.bottom && nowFl.left < nbFl.right )
					{
						console.log("접촉면 " ,i)
						resetDocking(now, mainBoard, idx, i, puzzle[idx].neighbor[i], nbFl.top, nbFl.right );					
					}
					break;
			}

		}
	}

}

function resetDocking(now, mainBoard, idx, i, neighbor, top, left){

	console.log("resetDocking")

	let puzzle = mainBoard.piece;

	puzzle[idx].dock[i] = true;								

	for( let k=0; k<puzzle[neighbor].dock.length; k++ )
	{
		if( puzzle[neighbor].dock[k] == idx )
			puzzle[neighbor].dock[k] = true;
	}

	now.style.top = top + "px";
	now.style.left = left + "px";

	//docking list
	dockingList(mainBoard, idx, neighbor);
}

function dockingList(mainBoard, idx, ngh){

	if( idx === -1 || ngh === -1 ) return mainBoard.connected.length;

	if( mainBoard.connected.length == 0 )
	{
		mainBoard.connected[0] = mainBoard.piece[idx].self;
		mainBoard.connected[1] = mainBoard.piece[ngh].self;

		console.log("dockinglist start", mainBoard.connected , mainBoard.connected.length );		

		// let made = document.querySelector("#madeBoard");

		// if( made == null )
		// {
		// 	makeBoard(mainBoard);
		// }				
	}
	else
	{	
		for( let i=0; i<mainBoard.connected.length; i++ )
		{
			if( mainBoard.connected[i].dataset.puzzle === idx )
			{
				console.log("dockingList already", mainBoard.connected);
				return;
			}
		}

		mainBoard.connected[mainBoard.connected.length] = mainBoard.piece[idx].self;

		console.log("dockingList reset", mainBoard.connected);
	}

}

function makeBoard(mainBoard){
	
	let div = document.createElement("div");
	div.setAttribute("id", "madeBoard");
	div.style.width = mainBoard.wholeWidth + "px";
	div.style.height = mainBoard.wholeHeight + "px";

	for( let i=0; i<mainBoard.piece.length; i++ )
	{
		let span = document.createElement("span");

		let top, left;
		let cnt = mainBoard.widthCount;
		switch ( parseInt(i/cnt) )
		{
			case 0: // 첫 번째 줄
				top = 0;
				break;
			case mainBoard.heightCount-1: // 마지막 줄

			default: //중간 줄
				top = mainBoard.cellHeight * parseInt(i/cnt) * -1;
				// statements_def
				break;
		}

		left = mainBoard.cellWidth * ( i%cnt ) * -1;

		span.style.top = `${top}px`;
		span.style.left = `${left}px`;
		span.style.backgroundColor = 'rgba(255,255,255,.8';
		span.dataset.puzzle = i;
		
		div.appendChild(span);
	}

	div.addEventListener("click", miniBoardEvent);

	document.querySelector("#board").appendChild(div);	

	console.log("makeBoard ok")	
}

function pieceZindex(board, idx){

	let pointer = [];// 클릭한 퍼즐 외  퍼즐의 인덱스 모으기

	let span = board.querySelectorAll('span');
	for( let i=0; i<span.length; i++ )
		if( idx != i ) pointer[pointer.length] = i;

	for( let i=0; i<pointer.length; i++ ) // 오름차순
	{						
		for( let j=i+1; j<pointer.length; j++ )
		{					
			let x1 = parseInt(span[pointer[i]].style.zIndex);
			let x2 = parseInt(span[pointer[j]].style.zIndex);

			let temp;

			if( x1 > x2 )
			{
				temp = pointer[i];
				pointer[i] = pointer[j];
				pointer[j] = temp;
			}
		}						
		
	}

	for( let k=0; k<pointer.length; k++ ) // zindex 다시 설정
		span[pointer[k]].style.zIndex = k+1;		

}

//document.querySelector(".puzzleImg").addEventListener("load", doPuzzle);


// 시작하기

document.querySelector(".microSite").addEventListener("click", function(e){

	if( e.target.tagName !== "IMG") return;

	//temp matrix
	let matrix = {};
	let size = 1;

	console.log('puzzle ',e.target);

	if( e.target.naturalWidth/e.target.naturalHeight > 1 ){
		console.log("puzzle width", this.innerWidth)
		size = (this.offsetWidth*0.85)/e.target.naturalWidth;


	} else {
		console.log("puzzle Height",e.target.naturalHeight, this.offsetHeight*0.85)
		size = (this.offsetHeight*0.85)/e.target.naturalHeight;

	}

	console.log('puzzle size ', size)
	if( e.target.attributes.src.nodeValue === "img/puzzle.JPG" )
	{
		matrix.x = 2;
		matrix.y = 2;
		// size = 0.7;
	}
	else
	{
		matrix.x = 5;
		matrix.y = 3;
		// size = 0.85;
	}

	puzzleLoad(e.target, matrix, size);

});	










