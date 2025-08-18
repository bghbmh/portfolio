
import commonSheet from './styles/style-common.js';

import * as DOM from './Utils-dom.js';
import { DispatchCustomEvent } from './Utils-event.js';

function setCssStyle(){
	// CSS 파일 연결
	return `

:host{
	display: flex; 
	gap: 1em;
	align-items: center;
	height: 100%;
	padding: 6px 6px;
	border-radius: var(--border-radius-default);
	background-color: var(--section-background-color);
	min-height: 4em;
	color: var(--text-dark-0);
	cursor: pointer;
}
i{ 
	padding: 18px !important;
	box-sizing: content-box;
	border-radius: var(--border-radius-default);
}

@media(max-width: 1280px){
	i { padding: 0px;  }
}
@media(max-width: 768px){
	:host{
    	padding: .5em;
	}
	i { padding: 18px;  }
}

`
}

class GlobalNav extends HTMLElement {

	constructor() {
		super(); // HTMLElement의 constructor 호출
		this.attachShadow({ mode: 'open' });

		this._body =  this.shadowRoot ;

		const sheet = new CSSStyleSheet();
		sheet.replaceSync( setCssStyle() );
		this.shadowRoot.adoptedStyleSheets = [ sheet];

	}

	set data(data){
		this._data = data;
		this._init();
	}

	get data(){
		return this._data
	}

	_init(){
		console.log("aaaa - ", this._data)
		this.dataset.order = this._data.order;
		this._body.innerHTML = `
			<i class="${this._data.icon}" aria-hidden="true"></i>
			${this._data.title}
		`;
	}


}

customElements.define('global-nav', GlobalNav);

// 마크업 함수 ===========================================

