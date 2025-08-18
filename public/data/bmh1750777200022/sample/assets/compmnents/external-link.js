
import commonSheet from './styles/style-common.js';
import * as DOM from './Utils-dom.js';
import { DispatchCustomEvent } from './Utils-event.js';

function setCssStyle(){
	return `
	
	:host {
		display: block; 
	}
	:host([type="view"]){ display: flex; gap: 8px 1em;  }

	.link{
		flex: 1;
		display: flex;
		align-items: center;
		gap: 4px 6px;

		min-width: 13em;
		padding: 1em;
		border: 1px solid var(--dark-50);
		border-radius: var(--border-radius-8px);
		transition: all .3s;

	}
	.link .icon{ 
		display: block;
		width: 1.2em;
		height: 1.2em;
		padding: 4px;
		box-sizing: border-box;
		border-radius: 2px;
		background-color: var(--dark-500);
	}
	.link svg{ 
		display: block;
		width: 100%;
		height: 100%;
		fill: #fff;
		
	}
	.link:hover{
		background-color: var(--primary-50);
		box-shadow: 0 4px 2em hsl(0 0% 0% / .05);
		border-color: var(--primary-500);
	}
	.link:hover .icon { background-color: var(--primary-500); }

	.extra-info {
		display: grid;
		grid-template-columns: minmax(4em, auto) 4em;
		grid-auto-flow: row;
		gap: 4px 4px;
	}
	.extra-info > label{
		grid-column: 1 / 2;
		
		display: inline-flex;
		gap: 4px 8px;
		align-items: center;
		padding: 0 0 0 8px;
		border: 1px solid var(--dark-300);
		border-radius: var(--border-radius-8px);
	}

	.extra-info > label .guide{ 
		flex: none;
		display: inline-block; 
		color: var(--dark-500);
		font-size: .8em;
	}
	.extra-info > label input{ border: 0 !important;}
	.extra-info + .extra-info{ margin-top: .5em; padding-top: .5em; border-top: 1px dashed var(--dark-100); }

	.extra-info > label input:focus { outline: none !important; border-color: transparent !important;  }
	.extra-info > label:has(input:focus)  {
		outline: 2px solid var(--primary-500);
		border-color: transparent;
	}



	.btn{
		grid-column: 2 / 3; 
		grid-row: 1 / 3;

		display: inline-flex;
		gap: 4px;
		width: auto;
		height: auto;
		min-width : 3em;
		min-height: 1.5em;
		line-height: 1;
		padding: 4px;
		font-size: calc(1em - 1px);
		background-color: var(--dark-50);
	}
	.btn.delete-one::before {
		content: "";
		display: block;
		width: 1em;
		height: 1em;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 -960 960 960' width='24px' fill='%23e8eaed' aria-hidden='true'%3E%3Cpath d='m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z'/%3E%3C/svg%3E");
		background-position: center center;
		background-size: contain;
		filter: brightness(0);
	}


:host(.no-item){ 
	display: flex;
	gap: 0;
	padding: .5em;
	border: 0px;
	border-radius: var(--border-radius-8px);
	flex-basis: 100%;
	background-color: var(--body-background-color);
}
:host(.no-item) .guide{  

	display: inline-flex;
	align-items: center;
	gap: 4px;
	color: var(--dark-600);
}
:host(.no-item) .guide:before{
	content: '';
	display: inline-block;
	width: 1.5em;
	height: 1.5em;
	font-size: 0.8em;
	padding: 0;
	background-image: url("/assets/img/common/icon-svg-warning-circle-line.svg");
	background-repeat: no-repeat;
	background-position: center center;
	background-color: transparent;
	border-color: var(--gray-d);
	color: var(--gray-9);
	display: inline-flex;
	background-size: 1.5em;
	border-radius: var(--border-radius-circle);
}

	@media(min-width: 576px){
		.extra-info {
			display: flex;
			flex-wrap: wrap;
			gap: 4px 4px;
			align-items: center;
		}
		.extra-info > label{  flex: 0 1; min-width: 13em; }
		.extra-info > label.link-value{ flex : 1 }
		.btn{ padding: 6px 6px; }
	}

	.btn.delete-one:hover{ background-color: var(--dark-100); }

	`;
}

class ExternalLink extends HTMLElement {
	constructor() {
		super(); // HTMLElement의 constructor 호출
		this.attachShadow({ mode: 'open' });

		this._data = null;
		this._body = null;
		const sheet = new CSSStyleSheet();
		sheet.replaceSync( setCssStyle() );
		
		this.shadowRoot.adoptedStyleSheets = [ commonSheet, sheet ];
		this._initBody();

		this._inputChangeHandler = this._onInputChange.bind(this);
		this._clickHandler = this._onClick.bind(this);	
	}

	_initBody() {
		// 컴포넌트의 기본 HTML 구조 설정
		this._body = this.shadowRoot;
	}
	set data(data) {
		//this._data = data;
		this._loadInitData( data );
	}

	get data() {
		return this._data;
	}

	static get observedAttributes(){
		return ['mode'];
	}

	// --- 라이프사이클 콜백 ---
	connectedCallback() {// 컴포넌트가 DOM에 추가될 때 호출
		this.setAttribute("mode", 'loading');

		let aa =  Object.assign({}, this.dataset);
		delete this.dataset.label;
		delete this.dataset.value;

		this._loadInitData( aa );
		this._body.addEventListener('input', this._inputChangeHandler );
		this._body.addEventListener('click', this._clickHandler );
	}
	
	disconnectedCallback() { // 컴포넌트가 DOM에서 제거될 때 호출
		this._body.removeEventListener('input', this._inputChangeHandler );
		this._body.removeEventListener('click', this._clickHandler );
	}

	attributeChangedCallback(name, oldValue, newValue){
		if( name === 'mode' && oldValue !== newValue ) this._render(newValue);
	}

	// --- 데이터 처리 ---
	_loadInitData(data, type='') { 
		this._data = data ;

		if( Object.keys(this._data).length ) { 
			this.setAttribute('mode','view');
		}
		else {  console.log("?? - 22", this._data)
			this.setAttribute('mode', 'empty');
		}
    }

	// --- 렌더링 및 내부 로직 메서드 ---
	_render(mode) {  //console.log('_onInputChange 222- ',mode);

		const type = this.getAttribute("type");

		switch (mode) {
			case 'loading':
				this._body.innerHTML = `<div class="no-item">확인중</div>`;
				break;
			case 'view':
				if( type === 'edit' ){
					this._body.innerHTML = `
					<div class="extra-info">
						<label class="link-label"><span class="guide">라벨123</span><input type="text" name="label" value="${ this._data?.label || ''}" placeholder="외부 링크 라벨"></label>
						<label class="link-value"><span class="guide">내용</span><input type="text" name="value" value="${ this._data?.value || ''}"  placeholder="외부 링크 url"></label>
						<button type="button" class="btn delete-one">삭제</button>
					</div>`; 
				} else {
					this._body.innerHTML = `<a target="_blank" href="${this._data.value || ''}" class="link">
					<span class="icon">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l82.7 0L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3l0 82.7c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160c0-17.7-14.3-32-32-32L320 0zM80 32C35.8 32 0 67.8 0 112L0 432c0 44.2 35.8 80 80 80l320 0c44.2 0 80-35.8 80-80l0-112c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 112c0 8.8-7.2 16-16 16L80 448c-8.8 0-16-7.2-16-16l0-320c0-8.8 7.2-16 16-16l112 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 32z"/></svg>
					</span>
					${this._data?.label}</a> `;
				}
				break;
			case 'empty':
				this.classList.add("no-item");
				this._body.innerHTML = `<div class="guide">등록한 url이 없습니다</div>`;
			break;
		}

	}	

	_onInputChange(e) {
		if ( e.target.tagName !== 'INPUT') return;
		let newData = {...this._data, [e.target.name]: e.target.value   };
		this._data = newData;
    }

	_onClick(e){
		const button = e.target.closest("button");
		if (!button || button.type ==="submit" ) return;

		DispatchCustomEvent(this._body, 'clicked-item', { action : 'delete'});
	}
}
customElements.define('external-link', ExternalLink);

const MarkUp = {

	view : (data = null) => {
		return `<a target="_blank" href="${data.value || ''}" class="link">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l82.7 0L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3l0 82.7c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160c0-17.7-14.3-32-32-32L320 0zM80 32C35.8 32 0 67.8 0 112L0 432c0 44.2 35.8 80 80 80l320 0c44.2 0 80-35.8 80-80l0-112c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 112c0 8.8-7.2 16-16 16L80 448c-8.8 0-16-7.2-16-16l0-320c0-8.8 7.2-16 16-16l112 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 32z"/></svg>
		${data?.label}</a> `
	} ,
	edit : (data = null) => {
		return `
			<div class="extra-info">
				<label class="link-label"><span class="guide">라벨</span><input type="text" name="label" value="${ this._data?.label || ''}" placeholder="외부 링크 라벨"></label>
				<label class="link-value"><span class="guide">내용</span><input type="text" name="value" value="${ this._data?.value || ''}"  placeholder="외부 링크 url"></label>
				<button type="button" class="btn delete-one">삭제</button>
			</div>`;
	}

}