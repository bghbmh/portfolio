import * as cf from './commonFunction.js';


export class SamplePageview extends HTMLElement {
	constructor(n = null, p = null, rt=null) {
		// Always call super first in constructor
		super();

		console.log("SamplePageview");

		this.sampleName = n;
		this.samplePage = p;
		this.rootPath = rt;
		//this.contentsBody = new ShadowContents();

		this.contentsBody = document.createElement("iframe");//new ShadowContents();

		this.currentPage = '';



		// Create a shadow root
		const shadow = this.attachShadow({ mode: "open" });
		this.setAttribute("class", "testSamplepage");

		let rootPath = `../main/data/sample/` + ( this.sampleName || "temp1");

		const linkElem = document.createElement("link");
		linkElem.setAttribute("rel", "stylesheet");
		linkElem.setAttribute("href", "../main/assets/css/samplepageView.css");


		const linkElem2 = document.createElement("link");
		linkElem2.setAttribute("rel", "stylesheet");
		linkElem2.setAttribute("href", this.rootPath+ this.sampleName +"-" + "roothost.css");
		
		shadow.appendChild(linkElem);
		//shadow.appendChild(linkElem2);




		// 커스텀 태그 header
		let header = cf.CreateElement({tag: "header", class: "samplePageGnb", "aria-label" : "샘플페이지 메뉴" });
		shadow.appendChild(header);

		

		let nav = null;
		if( this.samplePage.length > 1 ){
			//console.log("샘플페이지 메뉴 생성 ");

			nav = cf.CreateElement({tag: "nav", "aria-label" : "샘플페이지 메뉴" });

			let html = '';
			this.samplePage.forEach( (href, idx) => {
				if( idx === 0 ){
					html += `<button type="button" aria-selected="true" data-sample-num="${idx}" data-sample-href="${this.rootPath +"html/"+ href}">샘플<span>${idx}</span></button>`;
				} else {
					html += `<button type="button" aria-selected="false" data-sample-num="${idx}" data-sample-href="${this.rootPath +"html/"+ href}">샘플<span>${idx}</span></button>`;
				}
				
			});
			nav.innerHTML = html; 
		} else {

		}

		if( nav ){
			
			nav.addEventListener("click", e => {
				let c = e.target.closest("button");

				if( c ){
					for( let b of c.parentNode.children) b.ariaSelected = "false"; 
				}
				this.setAttribute("current", c.dataset.sampleHref );
				this.currentPage = c.dataset.sampleHref;
				c.ariaSelected = "true";

				//console.log("현재페이지 - ", this.currentPage)
				// this.contentsBody.setAttribute("href", e.target.dataset.sampleHref) ;
				// this.contentsBody.setAttribute("rootpath", this.rootPath ) ;
				//this.contentsBody.reSet( this.rootPath) ;

				//addSamplePage(this.contentsBody, this.rootPath, e.target.dataset.sampleHref, e.target.dataset.sampleNum );
			});
			header.appendChild(nav);

			

		} else {
			console.log("첨부페이지 1개임");
		}
		


		// const btn = document.createElement("button");
		// btn.setAttribute("type", "button");

		const shadowModalCloseBtn = cf.CreateElement({tag: "button", class: "btn", type: "button", "aria-label" : "close", "data-ui-action":"close" });
		shadowModalCloseBtn.innerHTML = `<i class="fa-solid fa-clone"></i>`;
		shadowModalCloseBtn.addEventListener("click", e => {
			console.log( "spv - ", this, e.target.closest("[data-ui-action]") );
			if( !e.target.closest("[data-ui-action]") ) return; 

			this.parentNode.classList.remove("openShadowDom");
			this.parentNode.removeChild(this);
		});
		header.appendChild(shadowModalCloseBtn);

		if( this.contentsBody ){
			shadow.appendChild( this.contentsBody );
		}

		document.querySelector("body").classList.toggle("openShadowDom");v
	}

	connectedCallback() {
		//console.log("----SamplePageview connectedCallback - 11111 " );

		//console.log("----SamplePageview setAttribute current 1111----")
		this.setAttribute("current", this.rootPath +"html/"+this.samplePage[0] );
		//console.log("----SamplePageview setAttribute current 222----")

		//addSamplePage(this.contentsBody, this.rootPath, this.getAttribute("current"));

	}

	static get observedAttributes() {
		return ["current"];
	}

	attributeChangedCallback(name, oldValue, newValue){
		console.log("SamplePageview attributeChangedCallback");

		// this.shadowRoot.innerHTML='';

		// const style = document.createElement("style");
		// style.textContent = this.defaultCss;
		// this.shadowRoot.appendChild(style);

		// this.contentsBody.shadowRoot.innerHTML = `
		// 	<style>
		// 	:host{
		// 		width: 100%;
		// 		height: 100%;
		// 	}

		// 		.shadowWrap{
		// 			width: 100%;
		// 			height: 100%;
		// 			overflow-y : auto;
		// 			/*max-width: 95%;
		// 			margin: 3rem auto;*/
					
		// 		}

		// 		.wrapper {
		// 			position: relative;
		// 		}
		// 		</style>

		// 	`;


		//addSamplePage(this.contentsBody.shadowRoot, this.rootPath, this.getAttribute("current"));
		addSamplePage(this.contentsBody, this.rootPath, this.getAttribute("current"));

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
		console.log("----ShadowContents - constructor----" );


		const style = document.createElement("style");
		style.textContent = this.defaultCss;


		shadow.appendChild(style);
	}
	connectedCallback() {

	}

}
// Define the new element
customElements.define("shadow-contents", ShadowContents);



function addSamplePage(host, rootPath, filePath ){  //this.contentsBody, this.rootPath, this.currentPage



	host.src = filePath;
	return;

	//host.shadowRoot.innerHTML='';


	let body = host;
	//cnt.setAttribute("page", menuIdx);

	if( body.querySelector("template") ){
		console.log(" host - 111")
		body.removeChild(body.querySelector("template"));
	}

	let temp = document.createElement("template");
	body.appendChild(temp);



	cf.fileHandler._load( {  //  '../html/testMain.html'
		url: filePath, 
		callback : function(request){

			console.log("testpath - ", rootPath  );

			if( !request.arguments.done ){
				console.log("fail - ", rootPath, filePath, request );
				return;
			}

			temp.innerHTML = request.response;

			
		
			let hHtml = document.createElement("html");	
			
			body.appendChild(hHtml);
		
			// 템플릿 엘리먼트의 컨텐츠 존재 유무를 통해
			// 브라우저가 HTML 템플릿 엘리먼트를 지원하는지 확인합니다
			let scriptFiles = [];
			if ("content" in document.createElement("template")){

				let t = body.querySelector("template");

				let clone = document.importNode(t.content, true);

				clone.querySelectorAll("link").forEach( child => {
					//console.log("child - ", child, child.attributes.href ? child.attributes.href.nodeValue.indexOf(".css"):"//")
					
					if( child.attributes.href.nodeValue.indexOf(".css") > -1 ){
						child.attributes.href.nodeValue = child.attributes.href.nodeValue.replaceAll('../', rootPath);
						//linkCsslist.push(child);
						//body.appendChild(child);
						hHtml.appendChild(child);
					}
				})

				console.log( clone.querySelectorAll("script")  )
				
				clone.querySelectorAll("script").forEach( (child,idx) => {
					
					
					if(  child.attributes.src ? child.attributes.src.textContent.indexOf(".js") > -1 : false ){
						console.log("child - ", idx,  child.attributes.src.textContent.indexOf(".js") )
						child.attributes.src.nodeValue = child.attributes.src.nodeValue.replaceAll('../', rootPath);
						//linkCsslist.push(child);
						scriptFiles.push(child.attributes.src.nodeValue);
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

			


			const shadowWrap = document.createElement("body");
			shadowWrap.setAttribute("class", "shadowWrap dark");
			shadowWrap.innerHTML = html.replaceAll('../', rootPath);


			console.log(`현재 target의 위치는-`, body, temp);

			hHtml.appendChild(shadowWrap);

			scriptFiles.forEach( child =>  {
				let ss = document.createElement("script");
				ss.src = child;
				hHtml.appendChild(ss);
			});


			console.log("scriptFiles - ", scriptFiles );

			body.removeChild(temp);

		},
		loadType:"text/html", 
		done: true 
	});
}
