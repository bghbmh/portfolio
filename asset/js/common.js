
import { fileHandler } from "./fileHandler.js";
import { url } from "./linkAddress.js";
import { Grid } from "./GridStyle.js";
//import { gridTest } from "./GridStyle.js";
import { Modal } from "./ModalStyle.js";
import { Component } from "./Component.js";
import { Sample } from "./sampleTest.js";


//fileHandler._script('js/test.js', {type : 'text/javascript', async : true});


//fileHandler._script('../asset/js/test2.js');
fileHandler._load({
		"type" : "script",
		"url": './asset/js/test33.js'
	});
fileHandler._load({
		"type" : "script",
		"url": './asset/js/test2.js' ,
		"eventListeners" : {
			"load" : () => { console.log( "===load callbackFile===", this) },
			'error' : () => { console.log( "===cerror allbackFile===",this) }
		}
	});

window.addEventListener("DOMContentLoaded", () => {
	//console.log("readyState11 - ",document.readyState );
	//console.log("DOMContentLoaded 11", document.querySelector("img").naturalWidth);


});
window.addEventListener("load", () => {
	//Layout.init("section", "sample", '../testJS/data/bmh.json');
	//Layout.init("section", "products", 'data/bmh2.json');
	//Layout.init();
//임시 추가

	// var sample33 = new Sample();
	// var sample = new Sample();

	// sample33.init("sample", '../bmh.json');
	// sample.init("sampl33e", '../testJS/data/bmh.json');
	// console.log(" ==================== ",  ) 

console.log("load ---  url.searchParams.get category - ", url.searchParams.get("category"));

	new Component("aaa");

	//new SampleTest(document.querySelector('main'));
	//SampleTest.render(document.querySelector('sample'))

	document.querySelector('nav.global').addEventListener("click", (e) => {

		console.log("global - ", e.target.closest("button").dataset.page );
		
		document.querySelector("#msg").textContent="test Msg-- click";

		switch ( e.target.closest("button").dataset.page ){
			case "design" :
				document.querySelector("#msg").textContent="test Msg-- switch design";
				//Sample.init( document.querySelector('main'), './data/test.json' ) ;
				break;
			case "forndDevelop" :

				break;
		}

		document.querySelector('main').classList = "";
		document.querySelector('main').classList.add(e.target.closest("button").dataset.page);

	});






});


