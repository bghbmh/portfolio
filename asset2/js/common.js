import * as component from './component.js';
import { fileHandler } from "./fileHandler.js";
import { Modal } from "./modalType2.js";
// import { dataHandler } from "./dataHandler.js";


document.addEventListener("DOMContentLoaded", () => {

	console.log("DOMContentLoaded ")
	fileHandler._load( { url: '../asset2/data/bmh.json', callback : introHandler,loadType:"item", done: "items" });

	if( document.querySelector(".noteSticky") )
		document.querySelector(".noteSticky").addEventListener("click", noteStickyHandler);

});

function noteStickyHandler(){
	let t = false;
	return function(e){
		console.log("noteStickyHandler - ", e)
	};
}

function introHandler(request) {

	console.log("test load items",request.arguments, JSON.parse(request.responseText))
	let itemsData = JSON.parse(request.responseText);

	//메인에만 노출
	let idx = 0;
	var html = ``;
	
	//console.log("html - ",idx, html)

	if( document.querySelector(".cardList.main") ){
		for( let i=0; i<itemsData.length; i++ ){
			//console.log("item main - ", html)
			if( itemsData[i].main ){
				html = html + component.mainCardType1(itemsData[i]);
				idx++;
			}
			if( idx > 2 ) break;
		}
		document.querySelector(".cardList.main").innerHTML = html;
		document.querySelector(".cardList.main").addEventListener("click", cardListHandler );
	} else if( document.querySelector(".cardList") ){
		for( let i=0; i<itemsData.length; i++ ){
			html = html + component.mainCardType1(itemsData[i]);
		}
		document.querySelector(".cardList").innerHTML = html;
		document.querySelector(".cardList").addEventListener("click", cardListHandler );
	}
	

	/* gnb 임시 */
	if( !document.querySelector(".gnb") ){
		let gnb = CreateElement({ tag : "NAV", class : "gnb", "data-target":"cardList"});
		let ul = CreateElement({ tag : "UL", class : "tabType1"});

		let category = [];
		itemsData.forEach( item => {
			if( category.length === 0 ) category.push('모두');
			if( category.findIndex( v => v ===  item.category) < 0 )  category.push( item.category);
		});

		for( let i=0; i<category.length; i++ ){
			ul.innerHTML += `
			<li>
				<button type="button" class="btn" data-category="${category[i]}">${category[i]}</button>
			</li>
			`
		}
		gnb.addEventListener("click", e => {
			console.log(" click gnb");
			let menuBtn = e.target.closest(".btn");
			ul.style.setProperty("--x", menuBtn.offsetLeft); // + menuBtn.offsetWidth/2 
			ul.style.setProperty("--w", menuBtn.offsetWidth); // + menuBtn.offsetWidth/2 

			for( const child of ul.children) { 
				child.children[0].classList.remove("on");
				child.children[0].removeAttribute("aria-current"); 
			}
			menuBtn.setAttribute("aria-current", "page") ;
			menuBtn.classList.add("on");

			/* 아이템 정렬 */
			let z = ["opacity0", "test"];
			for( let child of document.querySelector( "." + gnb.dataset.target ).children ) {

				if( menuBtn.dataset.category == "모두" ){
					child.classList.remove(...z);
					child.classList.remove("off");
				}
				else if( child.dataset.category !== menuBtn.dataset.category ){
					child.classList.add(...z);
					setTimeout(() => child.classList.add("off"), 400);
				} else {
					child.classList.remove(...z);
					child.classList.remove("off");
				}
				
			}
		
		});

		
		gnb.appendChild(ul);
		document.querySelector("header.common").appendChild(gnb);

		/* gnb menu init */
		ul.querySelector(".btn").classList.add("on");
		ul.querySelector(".btn").setAttribute("aria-current", "page") ;
		ul.style.setProperty("--x", 0 );
		ul.style.setProperty("--w", ul.children[0].offsetWidth); // + menuBtn.offsetWidth/2 
	}

}


function cardListHandler(e){

	if( !e.target.closest('[data-ui-util]') ) return;

	let uiUtil = e.target.closest('[data-ui-util]').dataset.uiUtil;
	let clickElem = e.target.closest('[data-ui-util]');

	switch (uiUtil){
		case "zoomin":
			console.log( " util test - ",  Modal );
			Modal.Zoomin( { target: clickElem.dataset.uiTarget, class :"popup zoomin", tId : e.timeStamp } );
			//Modal.Alert( { message: "aaaaaaaa~!!!!!", class :"alert" } );
			//Modal.Alert( { message: "test test test"} );
			//Modal.alert({test : "test"})

			break;
		case "detail":
			
			fileHandler._load( { 
				url: '../asset2/data/bmh.json', 
				callback : function(request){
					
					let items = JSON.parse(request.responseText);

					Modal.detail({ 
						html : component.detailViewPage( items, clickElem.dataset.uiTarget  ),
						class:"popup detail",
						eventListeners : {
							"load" : () => { console.log("click___test_attach eventListeners") } ,
							"click" : cardListHandler 
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
		default:
			console.log( " util test_default - ", e.target.dataset );
			break;
	}
}




function CreateElement(attributes = {}) { // { tag : "div", class: "sample"} 
	if (!attributes.hasOwnProperty("tag")) return alert("no Tag, check attributes + tagName");

	let tag = document.createElement(attributes.tag);
	for (let prop in attributes) {
		if (prop == "tag") continue;
		tag.setAttribute(prop, attributes[prop]);
	}
	return tag;
}