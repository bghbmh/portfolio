import * as component from './component.js';
import { fileHandler } from "./fileHandler.js";
import { Modal } from "./modalType3.js";
// import { dataHandler } from "./dataHandler.js";


class SamplePageview extends HTMLElement {
	constructor(n = null, p = null, rt=null) {
		// Always call super first in constructor
		super();

		console.log("SamplePageview constructor - ", n,p,rt);

		this.sampleName = n;
		this.samplePage = p;
		this.rootPath = rt;
		this.contentsBody = new ShadowContents();

		this.currentPage = '';



		// Create a shadow root
		const shadow = this.attachShadow({ mode: "open" });
		console.log("custom element - connectedCallback", shadow, this );

		let rootPath = `../data/sample/` + ( this.sampleName || "temp1");

		const linkElem = document.createElement("link");
		linkElem.setAttribute("rel", "stylesheet");
		linkElem.setAttribute("href", "../assets/css/samplepageView.css");


		const linkElem2 = document.createElement("link");
		linkElem2.setAttribute("rel", "stylesheet");
		linkElem2.setAttribute("href", this.rootPath+ this.sampleName + "roothost.css");
		
		shadow.appendChild(linkElem);
		shadow.appendChild(linkElem2);









		// 커스텀 태그 header
		let header = CreateElement({tag: "header", class: "samplePageGnb", "aria-label" : "샘플페이지 메뉴" });
		shadow.appendChild(header);


		this.setAttribute("current", this.rootPath +"html/"+this.samplePage[0] );

		let nav = null;
		if( this.samplePage.length > 1 ){
			console.log("샘플페이지 메뉴 생성 ");
			console.log("현재페이지 000 - ", this.currentPage)


			nav = CreateElement({tag: "nav", "aria-label" : "샘플페이지 메뉴" });

			let html = '';
			this.samplePage.forEach( (href, idx) => { html += `<button type="button" data-sample-num="${idx}" data-sample-href="${this.rootPath +"html/"+ href}">샘플<span>${idx}</span></button>` });
			nav.innerHTML = html; 
		} else {

		}

		if( nav ){
			
			nav.addEventListener("click", e => {
				e.preventDefault();
				

				this.setAttribute("current", e.target.dataset.sampleHref );
				this.currentPage = e.target.dataset.sampleHref;

				console.log("현재페이지 - ", this.currentPage)
				// this.contentsBody.setAttribute("href", e.target.dataset.sampleHref) ;
				// this.contentsBody.setAttribute("rootpath", this.rootPath ) ;
				//this.contentsBody.reSet( this.rootPath) ;

				//sampleNavTest(this.contentsBody, this.rootPath, e.target.dataset.sampleHref, e.target.dataset.sampleNum );
			});
			header.appendChild(nav);

		} else {
			console.log("첨부페이지 1개임");
		}
		


		// const btn = document.createElement("button");
		// btn.setAttribute("type", "button");

		const btn = CreateElement({tag: "button", class: "btn", type: "button", "aria-label" : "close", "data-ui-action":"close" });
		btn.innerHTML = `<i class="fa-solid fa-clone"></i>`;
		btn.addEventListener("click", e => {
			console.log( "spv - ", this, e.target.closest("[data-ui-action]") );
			if( !e.target.closest("[data-ui-action]") ) return; 

			this.parentNode.classList.remove("openShadowDom");
			this.parentNode.removeChild(this);
		});


		header.appendChild(btn);

		if( this.contentsBody ){
			shadow.appendChild( this.contentsBody );
		}



	}

	connectedCallback() {

		console.log("11111 - connectedCallback - 11111 ", " Custom square element added to page ", this);

		sampleNavTest(this.contentsBody, this.rootPath, this.getAttribute("current"));

	}

	static get observedAttributes() {
		return ["current"];
	}
	attributeChangedCallback(name, oldValue, newValue){
		console.log("attributeChangedCallback 속성확인", this);

		// this.shadowRoot.innerHTML='';

		// const style = document.createElement("style");
		// style.textContent = this.defaultCss;
		// this.shadowRoot.appendChild(style);

		this.contentsBody.shadowRoot.innerHTML = `
		<style>
		:host{
			width: 100%;
			height: 100%;
		}

			.shadowWrap{
				width: 100%;
				height: 100%;
				overflow-y : auto;
				/*max-width: 95%;
				margin: 3rem auto;*/
				
			}

			.wrapper {
				position: relative;
			}
			</style>

		`;


		sampleNavTest(this.contentsBody, this.rootPath, this.getAttribute("current"));

	}

	get collapsed() {
		return this._internals.states.has("hidden");
	}

	set collapsed(flag) {
		if (flag) {
			// Existence of identifier corresponds to "true"
			this._internals.states.add("hidden");
		} else {
			// Absence of identifier corresponds to "false"
			this._internals.states.delete("hidden");
		}
	}
}

// Define the new element
customElements.define("sample-pageview", SamplePageview);



class ShadowContents extends HTMLElement {
	constructor(rt=null) {
		// Always call super first in constructor
		super();
		this.defaultCss = `
		:host{
			width: 100%;
			height: 100%;
		}

			.shadowWrap{
				width: 100%;
				height: 100%;
				overflow-y : auto;
				/*max-width: 95%;
				margin: 3rem auto;*/
				
			}

			.wrapper {
				position: relative;
			}

		`;

		this.rootPath = rt;

		const shadow = this.attachShadow({ mode: "open" });
		console.log("custom element - connectedCallback", shadow, this );


		const style = document.createElement("style");
		style.textContent = this.defaultCss;


		shadow.appendChild(style);
	}
	connectedCallback() {

	}

}
// Define the new element
customElements.define("shadow-contents", ShadowContents);




document.addEventListener("DOMContentLoaded", () => {

	console.log("DOMContentLoaded ")
	fileHandler._load( { url: '../data/test.json', callback : introHandler,loadType:"item", done: "items" });


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

function testFunction(e){
	//console.log("testFunction - ", e)
}

function testFunction111(aa){
	console.log("testFunction11 - ", aa)
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
				url: '../data/test.json', 
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
		case "preview":
			console.log( " util test_preview - " );
			document.querySelector("body").classList.toggle("openShadowDom");

			//console.log("spv - ", clickElem.dataset.sampleName, JSON.parse(clickElem.dataset.samplePage));
			let spArr = JSON.parse(clickElem.dataset.samplePage);

			let rootPath = `../data/sample/` + clickElem.dataset.sampleName + "/";

			const spv = new SamplePageview(clickElem.dataset.sampleName, spArr, rootPath);
			document.querySelector("body").appendChild(spv);

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




function sampleNavTest(host, rootPath, filePath ){  //this.contentsBody, this.rootPath, this.currentPage



	console.log(" sampleNavTest555 - ", filePath, rootPath, host  )

	//return;

	//host.shadowRoot.innerHTML='';


	let body = host.shadowRoot;
	// let filePath = host.getAttribute("href");
	// let rootPath = host.getAttribute("rootpath");


	
	

	//return;
	

	//cnt.setAttribute("page", menuIdx);

	if( body.querySelector("template") ){
		body.removeChild(body.querySelector("template"));
	}

	const temp = document.createElement("template");
	body.appendChild(temp);



	fileHandler._load( {  //  '../html/testMain.html'
		url: filePath, 
		callback : function(request){

			console.log("testpath - ", rootPath  );

			if( !request.arguments.done ){
				console.log("fail - ", rootPath, filePath, request );
				return;
			}


			temp.innerHTML = request.response;
		
					
		
			// 템플릿 엘리먼트의 컨텐츠 존재 유무를 통해
			// 브라우저가 HTML 템플릿 엘리먼트를 지원하는지 확인합니다
			if ("content" in document.createElement("template")){

				let t = body.querySelector("template");

				let clone = document.importNode(t.content, true);


				t.content.querySelectorAll("link").forEach( child => {
					//console.log("child - ", child, child.attributes.href ? child.attributes.href.nodeValue.indexOf(".css"):"//")
					
					if( child.attributes.href.nodeValue.indexOf(".css") > -1 ){
						child.attributes.href.nodeValue = child.attributes.href.nodeValue.replaceAll('../', rootPath);
						//linkCsslist.push(child);

						
						body.appendChild(child);
					}
				})

				//console.log("template - ", typeof t.content.children );
			}

			

			let html=``;
			if(  request.response.includes("<body") ){
				let start = -1;
				let end = -1;
				let pos = -1;
				let tarStr = '<body';
				while( (pos = request.response.indexOf(tarStr, pos + 1)) != -1 ) { 
					//console.log(`현재 target의 위치는 [${pos}] 번째 입니다.`);
					if( tarStr === '<body' ) tarStr = ">";
					else if( tarStr === '>' ) break;
					
				}
				start = pos+1;

				//console.log(`xxxx [${pos}] `);

				tarStr = '</body>';
				while( (pos = request.response.indexOf(tarStr, pos + 1)) != -1 ) { 
					//console.log(`현재 target의 위치는 [${pos}] 번째 입니다.`);
					end = pos;
				}

				html = request.response.slice(start, end,);

				
			}


			const shadowWrap = document.createElement("div");
			shadowWrap.setAttribute("class", "shadowWrap");
			shadowWrap.innerHTML = html.replaceAll('../', rootPath);

			body.appendChild(shadowWrap);

			body.removeChild(temp);

		},
		loadType:"text/html", 
		done: true 
	});
}
