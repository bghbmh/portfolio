import * as cf from './commonFunction.js';


export class SamplePageview extends HTMLElement {
	constructor(n = null, p = null, rt=null) {
		// Always call super first in constructor
		super();

		console.log("------SamplePageview - constructo----", n,p,rt);

		this.sampleName = n;
		this.samplePage = p;
		this.rootPath = rt;
		this.contentsBody = new ShadowContents();

		this.currentPage = '';



		// Create a shadow root
		const shadow = this.attachShadow({ mode: "open" });
		

		let rootPath = `..../0_last/data/sample/` + ( this.sampleName || "temp1");

		const linkElem = document.createElement("link");
		linkElem.setAttribute("rel", "stylesheet");
		linkElem.setAttribute("href", "../0_last//assets/css/samplepageView.css");


		const linkElem2 = document.createElement("link");
		linkElem2.setAttribute("rel", "stylesheet");
		linkElem2.setAttribute("href", this.rootPath+ this.sampleName + "roothost.css");
		
		shadow.appendChild(linkElem);
		shadow.appendChild(linkElem2);




		// 커스텀 태그 header
		let header = cf.CreateElement({tag: "header", class: "samplePageGnb", "aria-label" : "샘플페이지 메뉴" });
		shadow.appendChild(header);

		

		let nav = null;
		if( this.samplePage.length > 1 ){
			console.log("샘플페이지 메뉴 생성 ");

			nav = cf.CreateElement({tag: "nav", "aria-label" : "샘플페이지 메뉴" });

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

				//addSamplePage(this.contentsBody, this.rootPath, e.target.dataset.sampleHref, e.target.dataset.sampleNum );
			});
			header.appendChild(nav);

			

		} else {
			console.log("첨부페이지 1개임");
		}
		


		// const btn = document.createElement("button");
		// btn.setAttribute("type", "button");

		const btn = cf.CreateElement({tag: "button", class: "btn", type: "button", "aria-label" : "close", "data-ui-action":"close" });
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
		console.log("----SamplePageview connectedCallback - 11111 " );

		console.log("----SamplePageview setAttribute current 1111----")
		this.setAttribute("current", this.rootPath +"html/"+this.samplePage[0] );
		console.log("----SamplePageview setAttribute current 222----")

		//addSamplePage(this.contentsBody, this.rootPath, this.getAttribute("current"));

	}

	static get observedAttributes() {
		console.log("----SamplePageview observedAttributes ----")
		return ["current"];
	}

	attributeChangedCallback(name, oldValue, newValue){
		console.log("----SamplePageview attributeChangedCallback ----", this);

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



	console.log(" addSamplePage555 - ", filePath, rootPath, host  )

	//return;

	//host.shadowRoot.innerHTML='';


	let body = host.shadowRoot;
	// let filePath = host.getAttribute("href");
	// let rootPath = host.getAttribute("rootpath");


	
	

	//return;
	

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


			console.log(`현재 target의 위치는-`, body, temp);

			body.appendChild(shadowWrap);

			body.removeChild(temp);

		},
		loadType:"text/html", 
		done: true 
	});
}