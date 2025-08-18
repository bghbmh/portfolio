import * as DOM from './Utils-dom.js';
import './main-item.js';


function setCssStyle(){
	// CSS 파일 연결
	return `

:host{

	display: flex;
	flex-direction: column;
	gap: 2rem;
	width: 100%;
	max-width:calc( var(--contents-container-width) + 12px + 12px);
    margin: 0 auto; /* 가운데 정렬 */
	padding: 100px 12px; 
}

main-item{ margin-top: 10em; opacity: 0; transition: all .3s; }
main-item.on{ margin-top: 0em; opacity: 1; transition: all .3s; }

@media (min-width: 600px) {

}
@media (min-width: 768px) {

}
@media (min-width: 1024px) {

}
@media (min-width: 1440px) {
	.sample-item-container {  }

}
`
}

class MainItemWrap extends HTMLElement {

	constructor() {
		super(); // HTMLElement의 constructor 호출
		this.attachShadow({ mode: 'open' });
		this._body = this.shadowRoot ;

		this._rawdata = null;
		this._mainItem = null;

		const sheet = new CSSStyleSheet();
		sheet.replaceSync( setCssStyle() );
		this.shadowRoot.adoptedStyleSheets = [ sheet];

		//this._clickHandler = this._onClick.bind(this); 
	}

	static get observedAttributes() {
		return ['mode'];
	}

	// --- 라이프사이클 콜백 ---
	connectedCallback() {// 컴포넌트가 DOM에 추가될 때 호출
		this._loadInitData();
		//this._body.addEventListener('click', this._clickHandler);
	}
	
	disconnectedCallback() { // 컴포넌트가 DOM에서 제거될 때 호출
		//this._body.removeEventListener('click', this._clickHandler );
	}

    async _loadInitData( ) {   

		try {
			this._rawdata = await jsonDB('./data/testDB.json'); 	
			this._setItems();		
			this.setAttribute('mode', 'view'); // 데이터 로드 완료 후 'view' 모드로 변경
			
		} catch (error) {
			console.error('[InitialLoad] 데이터 로딩 오류:', error);
			this.setAttribute('mode', 'error');
		}
    }

	_setItems(){
		let cc = this._rawdata.filter( it =>it.mainOpen );
		console.log("_loadInitData - ", cc );

		cc.forEach( item => {
			const a = DOM.CreateElement({ tag: 'main-item' });
			this._body.appendChild(a);
			a.data = item;
			
		});

	}

}

customElements.define('main-item-wrap', MainItemWrap);


async function jsonDB(router) {
	try {
		const response = await fetch( router, { method: 'GET' });
		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(` error! status: ${response.status}, message: ${errorText}`);
		}
    	const result = await response.json();
		return result;
	} catch (error) {
		console.error('전송 중 오류 발생:', error);
    	throw error;
	}

}

