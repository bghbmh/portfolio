import * as cf from './commonFunction.js';

//import { fileHandler } from "./fileHandler.js";
import * as component from './component.js';
import * as card from '../../components/card.js';
import { SamplePageview } from './SamplePageview.js';
import { ShuttleSpace } from './shuttleSpace.js';
import { Modal } from "./modalType3.js";
// import { dataHandler } from "./dataHandler.js";





document.addEventListener("DOMContentLoaded", () => {
	
	console.log("DOMContentLoaded ")
	cf.fileHandler._load( { //bmh.json
		url: '../main/data/bmh.json', 
		success : introHandler,
		loadType:"item", 
		done: "items" 
	});


	if( document.querySelector(".listTest") ){
		document.querySelector(".listTest").addEventListener("click", listTestFunction('dt') );
	}
		

	if( document.querySelector(".noteSticky") )
		document.querySelector(".noteSticky").addEventListener("click", noteStickyHandler);

	if( document.querySelector("[data-ui-action='launch']" ) )
		document.querySelector("[data-ui-action='launch']" ).addEventListener("click", launchArocket);

});


function listTestFunction(targetTag){
	let selectedItem = undefined ;
	let tagrgetItem = targetTag;
	return function(e){
		if( !e.target.closest(tagrgetItem) ) return;

		if( selectedItem === e.target.closest(".on") ) 
		selectedItem = e.target.closest(".on");
		
		selectedItem ? selectedItem.classList.remove("on") : console.log(" selecteditem ? = ", selectedItem);
		
		elem.parentNode.classList.add("on") ;
		selectedItem = e.target.closest(tagrgetItem).parentNode;
	};
}

function testFunction(e){
	console.log("testFunction - ", e)
}

function testFunction111(aa){
	console.log("testFunction11 - ", aa)
}


function setGnbHandler(g = null){

	let gnb = null;
	if(  g.type === "resize" )
		gnb = document.querySelector(".gnb2");
	else 
		gnb = g;

	//const gnb =  document.querySelector(".gnb2") || g ;

	//console.log( "gnb111111 - ", g, g.type );

	let selectedItem = gnb.querySelector(".on") || gnb.querySelectorAll(".btn")[0];
	const targetClassName = gnb.dataset.target;
	let currentItem = gnb.querySelector(".on") ;

	

	return function(e) {
		

		if( e.type !== "resize" && !e.target.closest(".btn") ) return;

		if( e.type === "resize" ) currentItem = gnb.querySelector(".on") ;
		else currentItem = e.target.closest(".btn");

		console.log( "gnb2222222 - ", e.type,  currentItem);

		if( e.type !== "resize" && selectedItem === currentItem ) return; 


		if( selectedItem ) { 
			selectedItem.classList.remove("on");
			selectedItem.removeAttribute("aria-current"); 
		}

		gnb.style.setProperty("--x", currentItem.offsetLeft); // + menuBtn.offsetWidth/2 
		gnb.style.setProperty("--w", currentItem.offsetWidth); // + menuBtn.offsetWidth/2 
		currentItem.setAttribute("aria-current", "page") ;
		currentItem.classList.add("on");

		selectedItem = currentItem;


		/* 아이템 정렬 */
		let z = ["opacity0", "test"];
		for( let child of document.querySelector( "." + targetClassName ).children ) {

			if( currentItem.dataset.category == "모두" ){
				child.classList.remove(...z);
				child.classList.remove("off");
			} else if( child.dataset.category !== currentItem.dataset.category ){
				child.classList.add(...z);
				setTimeout(() => child.classList.add("off"), 400);
			} else {
				child.classList.remove(...z);
				child.classList.remove("off");
			}
			
		}
	};

}




function introHandler(request) {

	//console.log("test load items",request.arguments, JSON.parse(request.responseText))
	let itemsData = JSON.parse(request.responseText);

	//메인에만 노출
	let idx = 0;
	var html = ``;
	
	let testElem = document.querySelector(".cardList2") || document.querySelector(".cardList");

	if( testElem.classList.contains("main") ){

		for( let i=0; i<itemsData.length; i++ ){
			
			if( itemsData[i].main ){
				html = html + card.typeA(itemsData[i]);
				idx++;
			}
			if( idx > 2 ) break;
		}
	} else {
		console.log("test resub- ", itemsData);

		for( let i=0; i<itemsData.length; i++ ){
			//html = html + component.mainCardType1(itemsData[i]);
			html = html + card.typeA(itemsData[i]);
		}
		
	}
	testElem.innerHTML = html;
	testElem.addEventListener("click", cardListHandler );


	/* gnb 임시 */
	if( !document.querySelector(".gnb2") ){
		let gnb = cf.CreateElement({ tag : "NAV", class : "gnb2", "data-target":"cardList2"});
		console.log(" click gnb");
		let itemGroup = cf.CreateElement({ tag : "UL", class : "tabType2"});

		let category = [];
		itemsData.forEach( item => {
			if( category.length === 0 ) category.push('모두');
			if( category.findIndex( v => v ===  item.category) < 0 )  category.push( item.category);
		});

		for( let i=0; i<category.length; i++ )	
			itemGroup.innerHTML += `<li><button type="button" class="btn" data-category="${category[i]}">${category[i]}</button></li>`

		
		gnb.appendChild(itemGroup);
		gnb.addEventListener("click", setGnbHandler(gnb) );
		window.addEventListener("resize", cf.debounce(setGnbHandler(gnb).bind(gnb)) );
		

		//document.querySelector("header.common").appendChild(gnb);		
		document.querySelector("header.common2 > .hello2").insertBefore(gnb, document.querySelector("header.common2 .contact2"));

		gnb.style.setProperty("--x", 0 );
		gnb.style.setProperty("--w", itemGroup.children[0].offsetWidth); // + menuBtn.offsetWidth/2 
		gnb.querySelectorAll(".btn")[0].setAttribute("aria-current", "page") ;
		gnb.querySelectorAll(".btn")[0].classList.add("on");		
	}

}





function cardListHandler(e){

	if( !e.target.closest('[data-ui-util]') ) return;

	let uiUtil = e.target.closest('[data-ui-util]').dataset.uiUtil;
	let clickElem = e.target.closest('[data-ui-util]');

	switch (uiUtil){
		case "zoomin":
			console.log( " util test - ",  Modal );
			Modal.Zoomin( { target: JSON.parse(clickElem.dataset.uiTarget) , tId : e.timeStamp } );
			//Modal.Alert( { message: "aaaaaaaa~!!!!!", class :"alert" } );
			//Modal.Alert( { message: "test test test"} );
			//Modal.alert({test : "test"})

			break;
		case "detail":
			
			cf.fileHandler._load( { 
				url: '../main/data/bmh.json', 
				success : function(request){
					
					let items = JSON.parse(request.responseText);

					Modal.detail({ 
						html : component.detailViewPage( items, JSON.parse(clickElem.dataset.uiTarget)  ),
						class:"popup",
						eventListeners : {
							"load" : () => { console.log("click___test_attach eventListeners") } ,
							"click" : [cardListHandler ,testFunction]
						},
						 tId : e.timeStamp
					})
				},
				loadType:"item", done: "items" 
			});

			break;
		case 'extraInfo':
			cf.fileHandler._load( { 
				url: '../main/data/bmh.json', 
				success : function(request){
					
					let items = JSON.parse(request.responseText);
					let item = items.find( o => o.id === parseInt(JSON.parse(clickElem.dataset.uiTarget)) );

					Modal.extraInfo({ 
						html : component.extraInfo(item.description),
						class: "popup",
						eventListeners : {
							"load" : () => { console.log("click___test_attach eventListeners") } ,
							"click" : [testFunction]
						},
						tId : e.timeStamp
					})
				},
				loadType:"item", done: "items" 
			});
			break;
		case "noteSticky":
			console.log("noteStickyHandler - ", clickElem);
			clickElem.classList.toggle("on");
			document.querySelector("." + clickElem.dataset.uiTarget).classList.toggle("on");
			
			break;
		case "preview":
			console.log( " util test_preview - ");
			//document.querySelector("body").classList.toggle("openShadowDom");

			//console.log("spv - ", clickElem.dataset.sampleName, JSON.parse(clickElem.dataset.samplePage));
			let spArr = JSON.parse(clickElem.dataset.samplePage);

			let rootPath = `../main/data/sample/` + clickElem.dataset.sampleName + "/";

			const spv = new SamplePageview(clickElem.dataset.sampleName, spArr, rootPath, "../main/assets/css/samplepageView.css");
			document.querySelector("body").appendChild(spv);


			break;
		default:
			console.log( " util test_default - ", e.target.dataset );
			break;
	}
}




function launchArocket(e){

	if( !e.target.closest("button") ) return;

	console.log("launch a rocket!! ");
	let filePath = '../main/data/spacestation.json';
	cf.fileHandler._load( { 
		url: filePath, 
		success : function(request){
			loadingMessage.off();
			console.log("file success - ", request);

			document.querySelector("body").appendChild(new ShuttleSpace(filePath, request, "../main/assets/css/samplepageView.css"));

		},
		error : function(request){
			//loadingMessage.off();
			console.log("file err",e.currentTarget, e.target.closest("button"))

			let pos = ` left: ${e.target.closest("button").offsetLeft}px; 
						top: ${e.target.closest("button").offsetTop}px; 
						transform: translate(-60%, -100%);
					`;
			let errHtml = cf.CreateElement({tag: "div", class: "minialarm message", style : pos });
			errHtml.textContent  = "준비중임";
			let b = cf.CreateElement({tag: "button", class: "btn close", type: "button", "title" : "메시지상자 닫는 버튼", "aria-label" : "메시지상자 닫는 버튼"  });
			//b.innerHTML = `<i class="fa-solid fa-clone"></i>`;
			b.addEventListener("click", e => {

				console.log("minialarm - ", e.currentTarget)

				e.currentTarget.parentNode.classList.add("off");
				let ch = e.currentTarget.parentNode;
				setTimeout(function(){
					document.querySelector("body").removeChild(ch)
				}, 400);
			});

			errHtml.appendChild(b);
			document.querySelector("body").appendChild(errHtml);
		},
		progress: function(abc){
			console.log("??? progress", abc);
			loadingMessage.on("??? 진행상황 끌어옴");
			if (abc.lengthComputable) {
				const percentComplete = (abc.loaded / abc.total) * 100;

				loadingMessage.on(cf.CreateElement({tag: "i", class: "icon-svg-no" }) );
				//loadingMessage.on(`transfer?? test??${abc.loaded}`);
				//console.log("1111111The transfer is updateProgress.", percentComplete);
				// ...
				console.log("333 transfer is updateProgress.", percentComplete);
			} else {
				// Unable to compute progress information since the total size is unknown
				console.log("444transfer is updateProgress.");
			}
		},
		loadType:"item", 
		done: "items" 
	});

}

var loadingMessage =  {
	isThere : null,
	newMsg : null,
	on : function (msg = null){

		if( this.isThere ){
			console.log("common  --22 this.isThere - ",typeof msg=== "object",  this.isThere);
			if( typeof msg === "object"){
				this.newMsg.appendChild(msg);
			} else {
				msg ? this.isThere.textContent =  msg : "" ;
			}
			return;
		}

		console.log("common  -- 11 this.isThere - ",msg,  this.isThere)

		this.newMsg = document.createElement("div");
		this.newMsg.setAttribute("class", "loadingMessage");

		if( typeof msg === "object"){
			this.newMsg.appendChild(msg);
		} else {
			this.newMsg.textContent =  msg || "loading_test";
		}
		
		this.isThere = this.newMsg;
		document.querySelector('body').appendChild(this.newMsg);

	},
	off : function() {   console.log("common 0000 -- off", this);
		if( !this.isThere ) return;
		
		this.isThere.parentNode.removeChild(this.isThere);
		this.isThere = null;
		this.newMsg = null;

		console.log("common  -- off", this);

	}
};
