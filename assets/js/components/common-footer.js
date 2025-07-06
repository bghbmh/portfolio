import {loadMultipleStylesheets} from './Utils-api.js';

class CommonFooter extends HTMLElement {

	constructor() {
		super(); // HTMLElement의 constructor 호출
		const shadowRoot = this.attachShadow({ mode: 'open' });

		const cssFilePaths = ['./assets/css/reset.css','./assets/css/common.css'];
		
		loadMultipleStylesheets(cssFilePaths).then(sheets => {
			shadowRoot.adoptedStyleSheets = sheets;
		}).catch(error => {
			console.error(" css ", error);
		});

		this.shadowRoot.innerHTML = `
		<footer class="common">
			<div class="contents-wrap">
				<div>
					<a class="btn btn-link" href="mailto:bghbmh@gamil.com">bghbmh@gamil.com</a>
					<p><small>markup + javascript = 박민희 </small></p>
				</div>
				<span class="madein">c - 2025ㅂㅁㅎ</span>
			</div>
		</footer>
		`
		//this._bindUiClickHandler = this._uiClickHandler.bind(this); 
	}

}

customElements.define('common-footer', CommonFooter);
