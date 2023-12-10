import { fileHandler } from "./fileHandler.js";



class Components{
	constructor() {
		this._data = null;
		this._name = null;
		this._element = null;
	}

	set Data(data){ this._data = data; }
	get Data(){ return this._data; }

	set name(name){ this._name = name; }
	get name(){ return this._name; }

	set element(elem){ this._element = elem; }
	get element(){ return this._element; }
}

let dataHandler = {
	parse (jsonObj) {
		console.log("httpRequest dataHandler - ", JSON.parse(jsonObj))
		Layout.draw( JSON.parse(jsonObj))
	}
}
//
export let Layout = (function() {
 	let UI = new Components();

 	return {
 		// setUiData: function (jsonObj) {
 		// 	console.log("setUiData - ", jsonObj)
		// 	UI.Data =  jsonObj;
		// 	console.log("setUiData -- - ", UI)
		// },
 		init: function( uiTag = null,  uiName = null, uiDataUrl = null ){
 			if( !uiDataUrl ) uiTag = "div";

			if( uiDataUrl ) fileHandler._json(uiDataUrl, this.draw);
			else alert("no data url")

			if( uiName ) UI.name = uiName;

			if( !UI.element ) {
				UI.element = document.querySelector("." + uiName) || CreateElement(uiTag, UI.name );
			}

			console.log("test - ",this, UI )
		},
		draw : function( jsonObj ) {
			//this.setUiData(jsonObj);
			UI.Data = jsonObj;
			console.log("UI.Data - ", UI.Data )
			switch ( UI.name  ) {
				case "products":
					products.render(UI.element, UI.Data) ;

					break;
				default:
					break;
			}
		}
 	};
 })();



let products = {
	html : ``,
	render(parNode, items){
		let tt;

console.log("render - ", parNode, items )

		items.forEach( item => {
			let figure = CreateElement( { tag : "figure", class: "item"} );
			let figcaption = CreateElement( { tag : "figcaption", class: "caption"} );
			let optionContent  = '';
			let hashWrap = '';
			let description = '';

			// for( let key in item.description ){
			// 	if( description == '' ) description = CreateElement( { tag : "div", class: "description"} );

			// 	switch ( key ){
			// 		case "bg":
			// 			break;
			// 		case "img":
			// 			break;
			// 		default:
			// 			description.innerHTML  += `<div><dt>${key}</dt><dd>${item.description[key]}</dd></div>`;
			// 			break;
			// 	}
			// }

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
