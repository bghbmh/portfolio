import * as DOM from './Utils-dom.js';
import { DispatchCustomEvent } from './Utils-event.js';

import { HASH_LIST , ORIGIN} from './config.js';


function setCssStyle(){
	// CSS 파일 연결
	return `

:host{
	display:block;
}

.select-nav-list {
	display: flex;
	gap: 8px;
	width: 100%;
	max-width: calc( var(--contents-container-width) + 12px + 12px);
	padding: 0 12px;
	margin: 1em auto;
	font-size: 16px;
	transition: all .3s;
	box-sizing: border-box;
	overflow: auto;
	-ms-overflow-style: none;
	scrollbar-width: none; 
}
.select-nav-list::-webkit-scrollbar {  display: none; }
.select-nav-list .btn{
	flex: none;
	background-color: transparent;
	display: inline-flex;
	align-items: center;
	color: currentcolor;
	margin: 0px;
	font-size: calc(1em - 1px);
	padding: 0.5em 1em;
	gap: 0px;
	font-weight: 300;
	border: 1px solid rgb(85, 85, 85);
	border-radius: 0.2em;
	transition: 0.3s;
	cursor: pointer;
}
.select-nav-list input{  
	--w: 0em;
	appearance: none;
	-moz-appearance: none;
	-webkit-appearance: none;
	flex: none;
	font-size: 1em;
	width: var(--w);
	height: var(--w);
	color: #fff;
	cursor: pointer;
	padding: 0px;
	margin: 0;
	opacity: .5;

	--maskimg : url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 6L9 17L4 12' stroke='black' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
		
}
.select-nav-list input:before {
	content: '';
	display: block;
	width: 100%;
	height: 100%;
	background-color: currentColor;
	-webkit-mask-size: contain;
	-webkit-mask-position-x: 50%;
	-webkit-mask-position-y: calc(50% - 0px);
	-webkit-mask-repeat: no-repeat;
	mask-size: contain;
	mask-position-x: 50%;
	mask-position-y: 50%;
	mask-repeat: no-repeat;

	-webkit-mask-image: var(--maskimg);
	mask-image: var(--maskimg);

	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}


.select-nav-list input:checked{	--w: 1.5em; padding: 4px;	opacity: 1; }
.select-nav-list .btn:has(input:checked){
	column-gap: .7em;
	background-color: #222; 
	border-color: #222;
	color: #f0f0f0;
	font-weight: 200;
	border-radius: 6em;
	padding: 0.5em 2em .5em 1em ;
}
	
`
}

class SelectListNav extends HTMLElement {

	constructor() {
		super(); // HTMLElement의 constructor 호출
		this.attachShadow({ mode: 'open' });

		this._data = null;

		const sheet = new CSSStyleSheet();
		sheet.replaceSync( setCssStyle() );
		this.shadowRoot.adoptedStyleSheets = [ sheet];

		this._nav = DOM.CreateElement({ tag:"nav", class:`select-nav-list`, });
		this.checkList = [];
		
		this._all = DOM.CreateElement({ tag : "label", class : "btn" });
		this._all.input = DOM.CreateElement({ tag : "input", type : "checkbox", name:"hash", value : "all", checked: true });
		this._all.textNode = document.createTextNode("모두보기");
		this._all.appendChild(this._all.input);	
		this._all.appendChild(this._all.textNode);
		this._nav.appendChild(this._all);

		HASH_LIST.forEach( (hash, idx) => {
			let label = DOM.CreateElement({ tag : "label", class : "btn" });
			let input = DOM.CreateElement({ tag : "input", type : "checkbox", name:"hash", value : hash });
			let textNode = document.createTextNode(hash);
			label.appendChild(input);
			label.appendChild( textNode);
			this._nav.appendChild( label);
		})
		

		this._clickHandler = this._onClick.bind(this); 
	}

	// item 데이터를 설정하는 getter/setter (외부에서 컴포넌트 생성 후 데이터를 넘길 때 유용)
	set data(data) {
		this._data = data;
		//console.log("dardtype2 - ", this._data)
		this._loadInitData();
	}
	get data() {
		return this._data;
	}

	static get observedAttributes() {
		return ['mode'];
	}

	// --- 라이프사이클 콜백 ---
	connectedCallback() {// 컴포넌트가 DOM에 추가될 때 호출
		this.shadowRoot.appendChild(this._nav);
		this._nav.addEventListener('click', this._clickHandler);
		
	}
	
	disconnectedCallback() { // 컴포넌트가 DOM에서 제거될 때 호출
		this._nav.removeEventListener('click', this._clickHandler );
	}

	// 속성 값이 변경될 때 호출 (observedAttributes에 등록된 속성만 해당)
	attributeChangedCallback(name, oldValue, newValue) {
		if (name === 'mode' && oldValue !== newValue) {
            this._render();
        }
	}

	_onClick(e){
		if (e.target.matches('input[type="checkbox"]')) {
			const clickedInput = e.target;

			if( clickedInput.value === "all" &&  clickedInput.checked ) { 
				this._nav.querySelectorAll("input").forEach( n => n.checked = false );
				clickedInput.checked = true; 
				this.checkList.length = 0;
				this.checkList = [clickedInput.value];
			} else {
				if( this._all.input.checked ){
					this._all.input.checked = false;
					let index = this.checkList.indexOf(this._all.input.value);
					this.checkList.splice(index, 1);
				}

				if( clickedInput.checked ){
					this.checkList.unshift(clickedInput.value);
				} else {
					let index = this.checkList.indexOf(clickedInput.value);
					this.checkList.splice(index, 1);
				}
			}

			if( this.checkList.length === 0 ) {
				this.checkList = ['all'];
				this._all.input.checked = true;
			}
			
			DispatchCustomEvent(this.shadowRoot, 'clicked-select-list', { 
				value : this.checkList
			});
		}
	}


}

customElements.define('select-list-nav', SelectListNav);


