import {loadMultipleStylesheets} from './Utils-api.js';

let cssText = `
			:host{
				background-color: var(--bs-body-bg);

				/* 임시 */
				position: sticky;
				z-index: 3;
				top: -8px;
				transition: all 1s;
				display: block;
			} `;

class CommonHeader extends HTMLElement {

	constructor() {
		super(); // HTMLElement의 constructor 호출
		const shadowRoot = this.attachShadow({ mode: 'open' });

		const cssFilePaths = ['../assets/css/reset.css','../assets/css/common.css'];
		let self = new CSSStyleSheet();
		self.replaceSync(cssText);
		loadMultipleStylesheets(cssFilePaths).then(sheets => {
            shadowRoot.adoptedStyleSheets = [...sheets, self];
        }).catch(error => {
            console.error(" css ", error);
        });

		


		//this.shadowRoot.adoptedStyleSheets = [...shadowRoot.adoptedStyleSheets, self];

console.log("////////////////////// render ", this.shadowRoot.adoptedStyleSheets )
		this.shadowRoot.innerHTML = `
			<!-- header class="common" -->    
				<div class="header-common-util">
					<a href="/portfolio" class="logo"><b>포트폴리오</b></a>
					
					<h1 class="title">박민희</h1>
				
					<a class="btn btn-link" href="mailto:bghbmh@gamil.com">bghbmh@gamil.com</a>
				</div>
			<!-- /header -->
		`;
	}
	
}

customElements.define('common-header', CommonHeader);


// 마크업 함수 ===========================================
 
const MarkUp = {
	loading : () => {
		return `
			loading
			`
	},
	view : (item, fileItems) => {
		return  ` `
	}
}
