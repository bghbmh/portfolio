import { fileHandler } from "./fileHandler.js";
import { Modal } from "./modalType.js";
// import { dataHandler } from "./dataHandler.js";


document.addEventListener("DOMContentLoaded", () => {

	console.log("DOMContentLoaded ")
	fileHandler._load( { url: '../assets/data/test.json', callback : introHandler,loadType:"item", done: "items" });

	 

});

function introHandler(request) {

	console.log("test load items",request.arguments, JSON.parse(request.responseText))
	let _itemsData = JSON.parse(request.responseText);
	let _category = [];
	let _sampleItems = {};

	//메인에만 노출
	let idx = 0;
	var html = ``;
	for( let i=0; i<_itemsData.length; i++ ){
		//console.log("item main - ", html)
		if( _itemsData[i].main ){
			html = html + mainCardType1(_itemsData[i]);
			
			//console.log(document.querySelector(".cardList.main"), mainCardType1(_itemsData[i]))
			idx++;
		}
		if( idx > 2 ) break;
	}
	//console.log("html - ",idx, html)

	document.querySelector(".cardList.main").innerHTML = html;

	document.querySelector(".cardList.main").addEventListener("click", cardListHandler );


	if( !_category.length ){   
		_itemsData.forEach( item => {
			if( _category.findIndex( v => v ===  item.category) < 0 ) {
				_category.push( item.category);
			}
		}); 
	}

	if( !Object.entries(_sampleItems).length ){  //console.log("init _sampleItems" );
		_itemsData.forEach( item => {

			let isThere = false;
			for( let key in _sampleItems ) {
				if( key === item.category ) isThere = true;					
			}

			if( !isThere ) {
				_sampleItems[item.category] = [];
			}

			if( item.description ) {
				_sampleItems[item.category].push(item);
			}

		}); 
	}

	//console.log("init _category", _category, _sampleItems );

}


function mainCardType1(item){
	console.log("tttt -", item.description ? item.description.title : 'aaa' )
	let str = `<button type="button" class="btn icon" data-ui-util="detail" data-ui-target="${item.id}">detail</button>`;
	return `
		<article class="cardType1">
			<header>
				<h3>${item.description ? item.description.title : ''}</h3>
				<div class="util">
					<button type="button" class="btn icon" data-ui-util="zoomin" data-ui-target="${item.img}">zoomin</button>
					${item.description ? str : ''}
				</div>
			</header>
			<img src="${item.img}" alt="img text" class="img">
			<footer>
				<nav>
					${hashType(item.hash)}
				</nav>
			</footer>
		</article>
	`;
}

function hashType(hash){

	let html = "";

	for( let i=0; i<hash.length; i++ ){
		html += `<button type="button" class="btn hash" data-ui-hash="${hash[i]}">${hash[i]}</button>`;
	}
	return html;
}

function titleType1(str){
	return `
		<dl class="titleType1">
			<dt class="title">${str.title}</dt>
			<dd class="descript">${str.descript}</dd>
		</dl>
	`;
}

function extroInfoType1(extroInfo){

	let html = "";

	for( let key in extroInfo ){
		switch(key){
			case "mainColor":
				let color = "";
				for( let i=0; i<extroInfo[key].length; i++) {
					color = color + `<span class="colorType" style="background-color:${extroInfo[key][i]}"></span>`;
				}

				html += titleType1({ title : key , descript : color });
				
				break;
			case "link":
				let link = "";
				link = link + `<button class="btn icon" data-link="${extroInfo[key]}">샘플보기</button>`;
				html += titleType1({ title : key , descript : link });
						
				break;
			default:
				html += titleType1({title : key , descript : extroInfo[key]});
				break;
		}
	}
	return html;
}

function detailViewPage(items, selectedItem){
	
	let item = items.find( obj => obj.id === parseInt(selectedItem) );
	console.log("success - ",item, items );
	return `
	<div class="header">
		<h3>${item.description ? item.description.title : '??'}</h3>
		<button type="button" class="btn icon modalClose" aria-label="팝업닫기" title="닫기"></button>
	</div>
	<div class="contents">
		
		<div class="viewArea">
			<div class="img">
				<img src="${item.description.img ? item.description.img : '../assets/img/no-img.gif'}" alt="detail img test">
			</div>
			<div class="extra">
				<h4 class="title">${item.description.title}</h4>
				${extroInfoType1(item.description)}
			</div>
		</div>

		<!-- 관련 아이템 리스트 -->
		<nav class="hashList">
			${item.hash ? hashType(item.hash) : ""}
		</nav>
		<section class="cardList" data-columns="3" >
			${linkedItem(item, items)}

		</section>
		<!-- //관련 아이템 리스트 -->
	</div>	
	`;

}

function linkedItem(item, itemsBox){
	
	let arr = [];
	let html = "";

	for( let i=0; i<item.hash.length; i++ ) {
		for( let j=0; j<itemsBox.length; j++ )
		{	
			if( itemsBox[j].hash.find( str => str === item.hash[i] ) 
			&& !arr.find( t => t.id === itemsBox[j].id ) ) {
				arr.push(itemsBox[j]);
				html += mainCardType1(itemsBox[j]);
			}
		}
	}

	return html;

}


function cardListHandler(e){

	if( !e.target.closest('[data-ui-util]') ) return;

	let uiUtil = e.target.closest('[data-ui-util]').dataset.uiUtil;
	let clickElem = e.target.closest('[data-ui-util]');

	switch (uiUtil){
		case "zoomin":
			console.log( " util test - ", e.target.dataset, Modal );
			Modal.Zoomin( { target: e.target.dataset.uiTarget, class :"popup zoomin" } );
			//Modal.Alert( { message: "aaaaaaaa~!!!!!", class :"alert" } );
			//Modal.Alert( { message: "test test test"} );
			//Modal.alert({test : "test"})

			break;
		case "detail":
			
			fileHandler._load( { 
				url: '../assets/data/test.json', 
				callback : function(request){
					
					let items = JSON.parse(request.responseText);

					Modal.detail({ 
						html : detailViewPage( items, clickElem.dataset.uiTarget  ),
						class:"popup detail",
						eventListeners : {
							"load" : () => { console.log("click___test_attach eventListeners") } ,
							"click" : cardListHandler 
						}
					})
				},
				loadType:"item", done: "items" 
			});


			
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