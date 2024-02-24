import * as cf from './commonFunction.js';


export class ShuttleSpace extends HTMLElement {
	constructor(f = null, d=null, ch='') {
		// Always call super first in constructor
		super();

		this.stationRoot="spacestation"+"/";

		this.rocketList = f;
		this.rowData = d;
		this.cssHref = ch;

		this.launch = '';

		this.contentsBody = document.createElement("iframe");//new ShadowContents();
		this.contentsBody.setAttribute("id", "rocket");
		// this.contentsBody.style = `
		// 	position: fixed;
		// 	z-index: 99;
		// 	display: block;
		// 	width: 96%;
		// 	height: 96%;
		// 	background-color: #fff;
		// 	left: 2%;
		// 	top: 100%;
		// 	transition: top .2s;
		// `;

		// Create a shadow root
		const shadow = this.attachShadow({ mode: "open" });
		this.setAttribute("class", "shuttleSpace");

		if( !this.rocketList ){
			console.log("no json file");
			return;
		}

		console.log("--- ShuttleSpace constructor ---"  );

		const linkElem = document.createElement("link");
		linkElem.setAttribute("rel", "stylesheet");
		linkElem.setAttribute("href", this.cssHref);
		
		shadow.appendChild(linkElem);

		let station = cf.CreateElement({tag: "div", class: "station", "aria-label" : "테스트 공간 모달" });


		// 커스텀 태그 header
		let header = cf.CreateElement({tag: "header", class: "samplePageGnb", "aria-label" : "샘플페이지 메뉴" });
		station.appendChild(header);

		const shadowModalCloseBtn = cf.CreateElement({tag: "button", class: "btn", type: "button", "aria-label" : "close", "data-ui-action":"close" });
		shadowModalCloseBtn.innerHTML = `<i class="fa-solid fa-clone"></i>`;
		shadowModalCloseBtn.addEventListener("click", e => {
			console.log( "spv - ", this, e.target.closest("[data-ui-action]") );
			if( !e.target.closest("[data-ui-action]") ) return; 

			this.parentNode.classList.remove("openShadowDom");
			this.parentNode.removeChild(this);
		});
		header.appendChild(shadowModalCloseBtn);


		

		let itemList = JSON.parse(this.rowData.response);

		let nav = cf.CreateElement({tag: "nav", class: "spaceStation", "aria-label" : "아이템 메뉴" });
		nav.addEventListener("click", e => {
			
			if( !e.target.closest("button") ) return; 

			let btn = e.target.closest("button");
			

			this.launch = this.stationRoot + btn.ariaLabel;
			this.setAttribute("current", this.launch );
			station.classList.add("back");
			this.contentsBody.classList.add("on");

		});

		itemList.forEach( (item, idx) => {
			let b = cf.CreateElement({tag: "button", class: "btn", "aria-label" : `${item.title}` })
			let c = cf.CreateElement({tag: "span", "aria-hidden" : "true", "data-word" : `${item.title.charAt(0)}` });
			let d = cf.CreateElement({tag: "div", "class":"title" });
			d.textContent = item.title;
			b.appendChild(c);
			b.appendChild(d);
			nav.appendChild(b);
		});
		
		station.appendChild(nav);
	
		document.querySelector("body").classList.toggle("openShadowDom");
		shadow.appendChild(station);

		shadow.appendChild(this.contentsBody);



		//iframe 닫을라고
		let iframeClosingBtn = cf.CreateElement({tag: "button", type:"button", class: "btn iframeClosingBtn", "data-ui-action":"close","data-ui-target":"iframe", "aria-label" : "샘플테스트 닫는 버튼" });
		iframeClosingBtn.innerHTML = `<i class="fa-solid fa-clone"></i>`;
		iframeClosingBtn.addEventListener("click", e => {
			console.log('setTimeout 000', this)

			this.contentsBody.classList.remove("on");
			station.classList.remove("back");
			setTimeout(function(){
				console.log('setTimeout ???', shadow.querySelector("iframe").src="")
				//this.contentsBody.src = '';
			}, 400);
		});
		shadow.appendChild(iframeClosingBtn);

	}

	connectedCallback() {
		console.log("----SamplePageview connectedCallback - 11111 " );

		console.log("----SamplePageview setAttribute current 1111----")
		//this.setAttribute("current", this.launch );
		console.log("----SamplePageview setAttribute current 222----")

		//addSamplePage(this.contentsBody, this.rootPath, this.getAttribute("current"));

	}

	static get observedAttributes() {
		console.log("----SamplePageview observedAttributes ----")
		return ["current"];
	}

	attributeChangedCallback(name, oldValue, newValue){
		console.log("--- ShuttleSpace attributeChangedCallback ---" );
		addSamplePage(this.contentsBody, this.getAttribute("current")+".html");

		
	}

}

// Define the new element
customElements.define("shuttle-space", ShuttleSpace);

function addSamplePage(host,  url ){  //this.contentsBody, this.rootPath, this.currentPage

	fetch( url).then(function(response){
		response.text().then(function(text){
			//document.querySelector('article').innerHTML = text;

			//console.log("fetch - ",host, response, text );

			host.src = url;//new ShadowContents();

			console.log("fetch - ",host.querySelector('#rocket') );

			//host.shadowRoot.appendChild(host.contentsBody);

		})
	});
}
