import { fileHandler } from "./fileHandler.js";


export class Component{

	constructor(uiName){
		this._name = null;
		console.log("ComponentComponent - ", uiName  );
	}

	set name(name){ this._name = name; }
	get name(){ return this._name; }

}

export var Sample = function() {

	var tagName = null;
 	var dataUrl = null;
	var rawData = null;
	var className = "SampleTestDefault";
	var Element = null;
	var sampleItems = null;
	var Category = null;
	var selectedCategory = null;

 	return {
 		// setUiData: function (jsonObj) {
 		// 	console.log("setUiData - ", jsonObj)
		// 	UI.Data =  jsonObj;
		// 	console.log("setUiData -- - ", UI)
		// },
		setuiData : function(jsonObj, callback = null){
			rawData = jsonObj;
			console.log("setUIData - ", this  );

			if( callback ) callback();
			this.setItems();
			//draw();
		},
		setItems : function(test){
			let tempCategory = {};
			let categoryNames = [];
			for( let i=0; i<rawData.length; i++ ) { //UI.Data.length

				if( rawData[i].category == undefined ) continue;
				if( rawData[i].description == undefined ) continue;

				let idx = rawData[i].category;
				if( tempCategory[idx] == undefined ) {
					tempCategory[idx] = [];
					categoryNames.push(rawData[i].category);
				}

				tempCategory[idx].push(rawData[i]);
			}

			Category = [...categoryNames];
			sampleItems = {...tempCategory};
			console.log("Sample setItems - ",className, Element, sampleItems )
		},
 		init: function( uiClassName = "SampleTestDefault", uiDataUrl = null ){

 			console.log("init - ",uiClassName , uiDataUrl, this )

 			// if( !UI.length )
 			// {
 			// 	UI.push({ "uiClassName" : uiClassName, "guid" : idIndex++ , "component" : new Component() });
 			// 	console.log("this.tempCategory00 - ", UI );
 			// } else {
 			// 	UI.push({ "uiClassName" : uiClassName, "guid" : idIndex++ , "component" : new Component() });
 			// 	console.log("this.tempCategory11 - ", UI )
 			// }

 			if( uiClassName ) className = uiClassName;

 			if( uiClassName && document.querySelector("." + uiClassName) ) {
				Element = document.querySelector("." + uiClassName);// || CreateElement(uiTag, UI.name );
			} else {
				if( !tagName ) tagName = "div";
				Element = CreateElement( { tag : tagName, class: uiClassName }  ); 
				// 화면에 붙이는거 임시추가
				document.querySelector("main").appendChild(Element);
			}

			if( uiDataUrl ) {
				dataUrl = uiDataUrl;
				fileHandler._json(uiDataUrl, this.setuiData.bind(this) ); // setuiData.bind(Sample)
			}
			else console.log("Sample init - no data url, uiClassName - ", uiClassName)



			// console.log("init - ",uiTag ,  uiClassName , uiDataUrl )
			return this;
		},
		draw : function( selectedCategory = null  ) {
			console.log(" draw - ", className)
		}
 	};
 };



function render(UI){

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



