
import commonSheet from './styles/style-common.js';
import * as DOM from './Utils-dom.js';



function setCssStyle(){
	return `
	
:host{
	display: block
}


.item{ 
	position: relative;
	display: flex; 
	align-items: center;
	gap: 8px;
	width: 100%;
	padding: .5em;
	margin:0;
	border-radius: var(--border-radius-8px);
	background-color: var(--body-background-color);
	font-size: 1em;
}
.item img{
	display: none;
	display: block;  /*  */
	line-height: 0;
	width: 3em;
	height: 3em;
	object-fit: contain;
	background-color: hsl(0 0% 97%);
	border-radius: var(--border-radius-8px);
}
.item figcaption{  flex: 1; display: block; }
.item figcaption > *{  line-height: 1.6;  }
.item figcaption .option{ color: var(--text-dark-3) }
.item figcaption .option.title{ color: var(--text-dark-0) }


.image{
	position: relative;
	display: block;
	width: 100%;
	height: 100%;
	background-color: var(--gray-f9);margin: 0;
	border-radius: var(--border-radius-8px);
	line-height: 0;
	overflow: hidden;
	border: 1px solid var(--dark-100);
}

.image figcaption{ display: none; }
.image img{
	position: absolute;
	width: 100%; height: 100%;
	object-fit: contain;
	left : 50%;
	top: 50%;
	transform: translate(-50%, -50%);
}
.image img[src*="no-image"]{ width: 4.5em; height: auto; }
.image.no-image img{ 
	width: 4.5em; 
	height: auto;
	object-fit:unset;
}










	`;
}

class PreviewFile extends HTMLElement {
	constructor() {
		super(); // HTMLElement의 constructor 호출
		this.attachShadow({ mode: 'open' });

		this._data = null;
		this._body = null;
		const sheet = new CSSStyleSheet();
		sheet.replaceSync( setCssStyle() );
		
		this.shadowRoot.adoptedStyleSheets = [ commonSheet, sheet ];
		this._initBody();
	}

	_initBody() {
		// 컴포넌트의 기본 HTML 구조 설정
		this._body = this.shadowRoot;
	}
	
	set data(data) {
		this._data = data;	
	}

	get data() {
		return this._data;
	}

	static get observedAttributes(){
		return ['type', 'data'];
	}

	// --- 라이프사이클 콜백 ---
	connectedCallback() {// 컴포넌트가 DOM에 추가될 때 호출
		//console.log("connectedCallback - preview-image ", this.getAttribute('data') );
		this._loadInitData( this.getAttribute('data') );
	}
	
	disconnectedCallback() { // 컴포넌트가 DOM에서 제거될 때 호출
		//this._body.removeEventListener('click', this._bindUiClickHandler );
	}

	attributeChangedCallback(name, oldValue, newValue){
		if( name === 'type' && oldValue !== newValue ) this._render();
	}

	// --- 데이터 처리 ---
	_loadInitData(data) {

		//this.setAttribute('type', 'loading');

		try {
			this._data = JSON.parse(data);
			this._render();

		} catch (e) {
			console.error("Failed to parse data attribute:", e, "Data string:", data);
			this._data = null; // 파싱 실패 시 데이터 초기화
		}
		
    }

	// --- 렌더링 및 내부 로직 메서드 ---
	_render() {   // console.log(" preview-image 11 ", this._data );
		if (!this._data) return;

		let icon = '/assets/img/common/icon-svg-double-paper.svg';

		this._body.innerHTML = `
		
		<figure class="${this._data.class}">
			<img src="${ this._data.class === 'item' ? icon : this._data.webUrl}" alt="${this._data.alt !== '' ? this._data.alt : this._data.name}">
			<figcaption>
				<span class="option title">${this._data.name}</span>
				${ this._data.size > 0 ? '<span class="option">' + (this._data.size / 1024).toFixed(2) + 'KB</span>' : ''} 
			</figcaption>
		</figure>`;

	}	
}

customElements.define('preview-file', PreviewFile);


