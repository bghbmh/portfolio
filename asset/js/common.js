import * as component from './component.js';
import { fileHandler } from "./fileHandler.js";
import { Modal } from "./modalType3.js";
// import { dataHandler } from "./dataHandler.js";


document.addEventListener("DOMContentLoaded", () => {

	console.log("DOMContentLoaded ")
	fileHandler._load( { url: '../main/data/bmh.json', callback : introHandler,loadType:"item", done: "items" });


	if( document.querySelector(".listTest") ){
		document.querySelector(".listTest").addEventListener("click", listTestFunction('dt') );
	}
		

	if( document.querySelector(".noteSticky") )
		document.querySelector(".noteSticky").addEventListener("click", noteStickyHandler);

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



// function listTestFunction(){
// 	console.log("asdasd  - ", this)
// 	let elem = false;
// 	let self = null;
// 	let selectedListitem = null;
// 	return function(e){
// 		if( !self ) self = this;
// 		elem = e.target.closest("dt");
// 		if( !elem || elem.parentNode.classList.contains("on") ) {
// 			elem.parentNode.classList.remove("on")
// 			return;
// 		}
// 		//[...this.children].forEach
// 		//for( let x of self.children ) x.classList.remove("on")
// 		if( !selectedListitem ) selectedListitem.classList.remove("on")
// 		elem.parentNode.classList.add("on") ;
// 		selectedListitem = elem;



// 		console.log("listTestFunction, a - ",self,  e)
// 	};
// }



function noteStickyHandler(){
	let t = false;
	return function(e){
		console.log("noteStickyHandler - ", e)
	};
}

function testFunction(e){
	//console.log("testFunction - ", e)
}


function setGnbHandler(g, ig, it){
	const gnb = g;
	let itemGroup = ig;
	let selectedItem = it;
	const targetClassName = gnb.dataset.target;
	let currentItem = undefined ;

	return function(e) {
		if( !e.target.closest(".btn") ) return;

		if( selectedItem === ( currentItem = e.target.closest(".btn") )  ) return; 

		if( selectedItem ) { 
			selectedItem.classList.remove("on");
			selectedItem.removeAttribute("aria-current"); 
		}

		itemGroup.style.setProperty("--x", currentItem.offsetLeft); // + menuBtn.offsetWidth/2 
		itemGroup.style.setProperty("--w", currentItem.offsetWidth); // + menuBtn.offsetWidth/2 
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
	} else if( document.querySelector(".cardList") ){
		for( let i=0; i<itemsData.length; i++ ){
			html = html + component.mainCardType1(itemsData[i]);
		}
		
	}
	document.querySelector(".cardList").innerHTML = html;
	document.querySelector(".cardList").addEventListener("click", cardListHandler );
	

	/* gnb 임시 */
	if( !document.querySelector(".gnb") ){
		let gnb = CreateElement({ tag : "NAV", class : "gnb", "data-target":"cardList"});
		console.log(" click gnb");
		let itemGroup = CreateElement({ tag : "UL", class : "tabType1"});

		let category = [];
		itemsData.forEach( item => {
			if( category.length === 0 ) category.push('모두');
			if( category.findIndex( v => v ===  item.category) < 0 )  category.push( item.category);
		});

		for( let i=0; i<category.length; i++ )	
			itemGroup.innerHTML += `<li><button type="button" class="btn" data-category="${category[i]}">${category[i]}</button></li>`

		
		gnb.appendChild(itemGroup);
		gnb.addEventListener("click", setGnbHandler(gnb,itemGroup, itemGroup.children[0].children[0]));
		document.querySelector("header.common").appendChild(gnb);

		itemGroup.style.setProperty("--x", 0 );
		itemGroup.style.setProperty("--w", itemGroup.children[0].offsetWidth); // + menuBtn.offsetWidth/2 
		itemGroup.children[0].setAttribute("aria-current", "page") ;
		itemGroup.children[0].classList.add("on");		
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
			
			fileHandler._load( { 
				url: '../data/bmh.json', 
				callback : function(request){
					
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




function CreateElement(attributes = {}) { // { tag : "div", class: "sample", ...} 
	if (!attributes.hasOwnProperty("tag")) return alert("no Tag, require the Tag");

	let tag = document.createElement(attributes.tag);
	for (let prop in attributes) {
		if (prop == "tag") continue;
		tag.setAttribute(prop, attributes[prop]);
	}
	return tag;
}
