import { fileHandler } from "./fileHandler.js";


class Component{
	constructor(id = 0) {
		this._id = id;
		this._dataUrl = null;
		this._rawData = null;
		this._tagName = null;
		this._className = null;
		this._element = null;
		this._sampleItems = null;
		this._category = null;
		this._selectedCategory = null;
		this._motherBoard = null;
		this._eventHandler = {};
	}

	set tagName(t){ this._tagName = t; }
	get tagName(){ return this._tagName; }

	set rawData(d){ this._rawData = d; }
	get rawData(){ return this._rawData; }

	set className(n){ this._className = n; }
	get className(){ return this._className; }

	set element(elem){ this._element = elem; }
	get element(){ return this._element; }

	set sampleItems(s){ this._sampleItems = s; }
	get sampleItems(){ return this._sampleItems; }

	set category(c){ this._category = c; }
	get category(){ return this._category; }

	set selectedCategory(sc){ this._selectedCategory = sc; }
	get selectedCategory(){ return this._selectedCategory; }

	set dataUrl(u){ this._dataUrl = u; }
	get dataUrl(){ return this._dataUrl; }

	set motherBoard(mb){ this._motherBoard = mb; }
	get motherBoard(){ return this._motherBoard; }

	set eventHandler(ty){ this._eventHandler[ty]  }
	get eventHandler(){ return this._eventHandler; }

	addEventHandler(target, eventType, func){
		console.log("addEventHandler - ", this.eventHandler, func)
		if( !this.eventHandler.length ) this.eventHandler[eventType] = func;

		this.eventHandler[eventType] = func;

		let f;
		for( let key in this.eventHandler ){
			if( key === eventType ){
				console.log("xxx - ",this, this.eventHandler[key] == func )
			}

		}

		target.addEventListener(eventType, func);
	}
}


//
export var Grid = (function() {
 	var UI = new Component() ;
 	var idIndex = 0;
 	var index = [];

 	return {
 		// setUiData: function (jsonObj) {
 		// 	console.log("setUiData - ", jsonObj)
		// 	UI.Data =  jsonObj;
		// 	console.log("setUiData -- - ", UI)
		// },
		setuiData : function(jsonObj){
			UI.rawData = jsonObj;
			console.log("setUIData - ", UI, this  );

			if( !UI.sampleItems ) this.setItems();
			//this.draw();
		},
		// setuiData : function(jsonObj, callback = null){
		// 	rawData = jsonObj;
		// 	console.log("setUIData - ", this  );

		// 	if( callback ) callback();
		// 	this.setItems()
		// 	//this.draw();
		// },
		setItems(){
			let tempCategory = {};
			let categoryNames = [];
			for( let i=0; i<UI.rawData.length; i++ ) { //UI.rawData.length

				if( UI.rawData[i].category == undefined ) continue;
				if( UI.rawData[i].description == undefined ) continue;

				let idx = UI.rawData[i].category;
				if( tempCategory[idx] == undefined ) {
					tempCategory[idx] = [];
					categoryNames.push(UI.rawData[i].category);
				}

				tempCategory[idx].push(UI.rawData[i]);
			}

			UI.category = [...categoryNames];
			UI.sampleItems = {...tempCategory};
			console.log("this.tempCategory00 - ", UI )
		},
 		init: function( uiClassName = null, uiDataUrl = null ){

 			// if( !UI.length )
 			// {
 			// 	UI.push({ "uiClassName" : uiClassName, "guid" : idIndex++ , "component" : new GridStyle() });
 			// 	console.log("this.tempCategory00 - ", UI );
 			// } else {
 			// 	UI.push({ "uiClassName" : uiClassName, "guid" : idIndex++ , "component" : new GridStyle() });
 			// 	console.log("this.tempCategory11 - ", UI )
 			// }
 				
			if( uiClassName ) UI.className = uiClassName;

			if( uiClassName && document.querySelector("." + uiClassName) ) {
				UI.element = document.querySelector("." + uiClassName);// || CreateElement(uiTag, UI.name );
				UI.className = uiClassName;
				UI.tagName = UI.element.tagName;
			} else {
				if( !UI.tagName ) UI.tagName = "div";
				UI.element = CreateElement( { tag : UI.tagName, class: UI.name }  ); 

				// 화면에 붙이는거 임시추가
				document.querySelector("main").appendChild(UI.element);
			}

			if( uiDataUrl ) {
				UI.dataUrl = uiDataUrl;
				fileHandler._json(uiDataUrl, this.setuiData.bind(Grid));
			}
			else console.log("Grid init - no data url, uiClassName - ", uiClassName)

			// console.log("init - ",uiTag ,  uiClassName , uiDataUrl )
		},
		draw : function( selectedCategory = null  ) {
			//this.setUiData(jsonObj);
			
			console.log("selected - ", selectedCategory, UI   )
			if( selectedCategory ) UI.selectedCategory = selectedCategory;

			if( !UI.rawData && UI.dataUrl ){
				console.log("ddd - ", UI);
				fileHandler._load(UI.dataUrl, this.draw.bind(Grid));
				// return;
			}
			switch ( UI.name  ) {
				case "products":
					//products.render(UI.element, UI.Data) ;
					products.render(UI) ;

					break;
				case "sample":
					UI.element.innerHTML = '';
					sample.render(UI) ;

					break;
				default:
					break;
			}
		}
 	};
 })();

let products = {
	html : ``,
	render(UI, selected = null){
		let tt;

		let items = UI.Data;
		let parNode = UI.element;
		console.log("render - ", parNode, UI )

		items.forEach( item => {
			let figure = CreateElement( { tag : "figure", class: "item"} );
			let figcaption = CreateElement( { tag : "figcaption", class: "caption"} );
			let optionContent  = '';
			let hashWrap = '';
			let description = '';

			if( item.src ){
				figure.innerHTML += `<img src="${item.src}" alt="img title" aria-hidden="true">`;

				if( optionContent == ''  ) { optionContent = CreateElement( { tag : "div", class: "optionContent"} ); }

				if( description ) {
					optionContent.innerHTML += `<button type="button" class="label icon-description">조금 더보기</button>`; // data-ui="modal"
				} else {
					optionContent.innerHTML += `<button type="button" class="label icon-enlarge" data-ui="modal">크게보기</button>`;
				}
			} else {
				figure.innerHTML += `<div class="noContnet"><img src="asset/img/icons_pf-23.svg" alt="img title" aria-hidden="true" ></div>`;
			}

			item.hash.forEach( (hash, idx) => {
				if( hashWrap == '' ) hashWrap = CreateElement( { tag : "div", class: "hashWrap", style:"display:none"} );
				hashWrap.innerHTML  += `<button type="button" class="hash">${hash}</button>`;
			} );

			figcaption.innerHTML += `<p class="title">프로젝트이름</p>`;

			if( optionContent ) figcaption.appendChild(optionContent);
			if( hashWrap ) figcaption.appendChild(hashWrap);

			if( item.srcRatio ) figure.classList.add(item.srcRatio);
			figure.appendChild(figcaption);
			figure.dataset.ui = "modal";
			figure.dataset.category = item.category;
			if( description ) figure.appendChild(description);
			parNode.appendChild(figure);
		});

	}
}
{
// let products = {
// 	html : ``,
// 	render(parNode, items){
// 		let tt;

// 		console.log("render - ", parNode, items )

// 		items.forEach( item => {
// 			let figure = CreateElement( { tag : "figure", class: "item"} );
// 			let figcaption = CreateElement( { tag : "figcaption", class: "caption"} );
// 			let optionContent  = '';
// 			let hashWrap = '';
// 			let description = '';

// 			if( item.src ){
// 				figure.innerHTML += `<img src="${item.src}" alt="img title" aria-hidden="true">`;

// 				if( optionContent == ''  ) { optionContent = CreateElement( { tag : "div", class: "optionContent"} ); }

// 				if( description ) {
// 					optionContent.innerHTML += `<button type="button" class="label icon-description">조금 더보기</button>`; // data-ui="modal"
// 				} else {
// 					optionContent.innerHTML += `<button type="button" class="label icon-enlarge" data-ui="modal">크게보기</button>`;
// 				}
// 			} else {
// 				figure.innerHTML += `<div class="noContnet"><img src="asset/img/icons_pf-23.svg" alt="img title" aria-hidden="true" ></div>`;
// 			}

// 			item.hash.forEach( (hash, idx) => {
// 				if( hashWrap == '' ) hashWrap = CreateElement( { tag : "div", class: "hashWrap", style:"display:none"} );
// 				hashWrap.innerHTML  += `<button type="button" class="hash">${hash}</button>`;
// 			} );

// 			figcaption.innerHTML += `<p class="title">프로젝트이름</p>`;

// 			if( optionContent ) figcaption.appendChild(optionContent);
// 			if( hashWrap ) figcaption.appendChild(hashWrap);

// 			if( item.srcRatio ) figure.classList.add(item.srcRatio);
// 			figure.appendChild(figcaption);
// 			figure.dataset.ui = "modal";
// 			figure.dataset.category = item.category;
// 			if( description ) figure.appendChild(description);
// 			parNode.appendChild(figure);
// 		});

// 	}
// }
}

let sample = {
	tempCategory: {},
	render(UI){

		console.log("sample render - ", UI.selectedCategory )

		if( !UI.sampleItems ) sample.setItems(UI);

		//console.log("sample render - ", selectedCategory )
		if( UI.selectedCategory ){
			testtest( UI, UI.selectedCategory );
		} else {
			for( let key in UI.sampleItems ){	
				testtest( UI, key )
			}
		}

		if( !UI.element.closest("main").classList.contains("movingArea") ){
			UI.element.closest("main").classList.add("movingArea")
		}

		console.log("UI.sampleItems1111111- ", UI.element, UI.element.addEventListener )

		//if( UI.eventHandler ) return;

		UI.addEventHandler(UI.element, "click", function(e) {
			console.log("UI.element - ", UI)
			let elem = e.target.closest(".item");

			// if( !elem.closest("main").classList.contains("on") ){
			// 	elem.closest("main").classList.add("on")
			// }

			for( let child of elem.parentNode.children ) {
				child.classList.add("shrink")
			}

			if( elem.dataset.expand === "true") return;
			elem.dataset.expand = true;
			elem.classList.add("expand");
		} );

		UI.addEventHandler(UI.element, "click", (e) => {
			console.log("console log test")
		} );



		// UI.element.addEventListener("click", (e) => {

		// 	if( !UI.eventHandler ){
		// 		UI.eventHandler = [];
		// 		UI.eventHandler.push(e.type);
		// 	}

		// 	console.log("UI.element - ", UI)
		// 	let elem = e.target.closest(".item");

		// 	if( !elem.closest("main").classList.contains("on") ){
		// 		elem.closest("main").classList.add("on")
		// 	}

		// 	for( let child of elem.parentNode.children ) {
		// 		child.classList.add("shrink")
		// 	}

		// 	if( elem.dataset.expand === "true") return;
		// 	elem.dataset.expand = true;
		// 	elem.classList.add("expand");
		// });



	}
};

{
		// detailITEM : function(name, idx, parentNode){

		// 	// let a = this.selectedItem[idx];
		// 	// let d = this.selectedItem[idx].detail;
		// 	let arr = this.findCategory(name);

		// 	let items =[];
		// 	for( let i=0; i<arr.length; i++ )
		// 	{
		// 		for(let key in arr[i])
		// 			if( key === "detail") items.push(arr[i]);
		// 	}

		// 	parentNode.style.backgroundImage = `url('${items[idx].detail.bg}')`;

		// 	let d = items[idx].detail;
		// 	let tag = `<img src="${d.img}">`;
		// 	let list =`<ul>`;
		// 	for( let key in d )
		// 	{
		// 		switch (key){
		// 			case 'bg' :
		// 				break;
		// 			case 'img' :
		// 				break;
		// 			case '주 사용색' :
		// 				list = list + `<li><dl><dt>${key}</dt><dd>`;
		// 				for( let i=0; i<d[key].length; i++)
		// 				{
		// 					list = list + `<span class="colors" style="background-color:${d[key][i]}"></span>`;
		// 				}
		// 				list = list + `</dd></dl></li>`;
		// 				break;
		// 			case '링크' :
		// 				list = list + `<li><dl><dt>${key}</dt><dd><button class="sampleSite" data-link="${d[key]}">샘플보기</button></dd></dl></li>`;

		// 				break;
		// 			default :
		// 				list = list + `<li><dl><dt>${key}</dt><dd>${d[key]}</dd></dl></li>`;
		// 		}
		// 	}

		// 	list = list + `<li><div class="hashtag">`;
		// 	for( let i=0; i<items[idx].hashtag.length; i++)
		// 		list = list + `<span>${items[idx].hashtag[i]}</span>`;

		// 	list = list + `</div></li></ul>`;

		// 	return tag + list;

		// },	
}



function testtest( UI, key ){
	let el = UI.sampleItems[key];
	for( let i=0; i<el.length; i++ ){
		let item = CreateElement( { tag : "div", class: "item"} ); //  off
		item.dataset.expand = "false";
		item.dataset.category = el[i].category;
		let figure = CreateElement( { tag : "figure", class: "img"} );
		let info = CreateElement( { tag : "div", class: "info"} );

		let elem = el[i].description;
		let html = ``;
		for( let key in elem ){
			//console.log("sample key - ",key, elem[key] )			

			switch (key){
				case 'bg' :
					//item.dataset.itemBg = elem[key];
					item.style.setProperty("background-image", `url("${elem[key]}")` );
					break;
				case 'img' :
					let img = CreateElement( { tag : "img", src : elem[key], alt :"descript image"  } );
					//console.log("figure img - ", img );
					figure.appendChild( img )// +=`<img src="${elem[key]}" alt="descript image">` ;
					break;
				// case 'bg' :
				// 	break;
				
				// case '주 사용색' :
				// 	html +=  `<dl><dt>${key}</dt><dd>`;
				// 	for( let i=0; i<d[key].length; i++)
				// 	{
				// 		html += `<span class="colors" style="background-color:${d[key][i]}"></span>`;
				// 	}
				// 	html += `</dd></dl>`;
				// 	break;
				// case '링크' :
				// 	html += `<dl><dt>${key}</dt><dd><button class="sampleSite" data-link="${d[key]}">샘플보기</button></dd></dl>`;

				// 	break;
				default :
					html += `<dl><dt>${key}</dt><dd>${elem[key]}</dd></dl>`;
					
			}
			

			
		}
		//console.log("figure img - ", figure);
		item.appendChild(figure);
		info.innerHTML = html;
		item.appendChild(info);

		let hashWrap = false;

		//console.log("UI.sampleItems[i] - ", el[i]);

		el[i].hash.forEach( (hash, idx) => {
			if( !hashWrap  ) hashWrap = CreateElement( { tag : "div", class: "hashWrap" } );
			hashWrap.innerHTML  += `<button type="button" class="hash">${hash}</button>`;
		} );

		if( hashWrap ) item.appendChild(hashWrap);
		//console.log("sample render - ", item);

		if( UI.element ) UI.element.appendChild(item);				
	}	
}

