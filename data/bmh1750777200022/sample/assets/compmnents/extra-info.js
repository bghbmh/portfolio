
import commonSheet from './styles/style-common.js';
import * as DOM from './Utils-dom.js';
import { DispatchCustomEvent } from './Utils-event.js';

function setCssStyle(){
	return `
	
:host {
	flex: 0 1 auto;
  display: inline-flex;
  min-width: 2em;
}
:host([type="edit"]){ width: 100%;  }
:host([type="view"]){ gap: 8px 1em;  }

.extra-info {
	display: grid;
	grid-template-columns: minmax(4em, auto) 4em;
	grid-auto-flow: row;
	gap: 4px 4px;
	width: 100%;
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


.extra-info-item{
	display: inline-flex;
	gap: 4px 1em;
	padding: .3em 1em .3em .3em;
	border-radius: var(--border-radius-circle);
	color: var(--blue-900);
	background-color: var(--blue-50);
	border: 0px solid var(--blue-200);
}
.extra-info-item:before{
	content: attr(aria-label);
	font-size: .8em;
	padding: .3em .7em;
	border-radius: var(--border-radius-circle);
	color: var(--blue-100);
	background-color: var(--blue-500);
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
.btn.delete-one:hover{ background-color: var(--dark-100); }

@media(min-width: 576px){
	.extra-info {
		display: flex;
		flex-wrap: wrap;
		gap: 4px 4px;
		align-items: center;
	}
	.extra-info > label{  flex: 0 1; min-width: 13em; }
	.extra-info > label.info-value{ flex : 1 }
	.btn{ padding: 6px 6px; }
}

	`;
}

class ExtraInfo extends HTMLElement {
	constructor() {
		super(); // HTMLElement의 constructor 호출
		this.attachShadow({ mode: 'open' });

		this._data = null;
		this._body = null;
		const sheet = new CSSStyleSheet();
		sheet.replaceSync( setCssStyle() );
		
		this.shadowRoot.adoptedStyleSheets = [ commonSheet, sheet ];
		this._initBody();
		//this._loadInitData( this.getAttribute('data') );

		this._queryType = null;
		this._inputChangeHandler = this._onInputChange.bind(this);
		this._clickHandler = this._onClick.bind(this);
	}

	_initBody() {
		// 컴포넌트의 기본 HTML 구조 설정
		this._body = this.shadowRoot;
	}
	
	set data(data) {
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
		//console.log('////////////onnectedCallback - ',aa, this.dataset, this._emptyData  )
		
		delete this.dataset.label;
		delete this.dataset.value;

		
		this._body.addEventListener('input', this._inputChangeHandler );
		this._body.addEventListener('click', this._clickHandler );
		
		this._loadInitData( aa );
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
		
		//console.log("//////////////sdfgsdfgsdfg//////// ",this.getAttribute("mode"), this._data)

		if( Object.keys(this._data).length ) { 
			this.setAttribute('mode','view');
		}
		else {  
			this.setAttribute('mode', 'empty');
		}
    }


	// --- 렌더링 및 내부 로직 메서드 ---
	_render(mode) {

		//console.log("////////////////////// render ", mode, this._data)



		const type = this.getAttribute("type");

		switch(mode){
			case 'loading':
				this._body.innerHTML = `<div class="no-item">확인중</div>`;
			break;
			case 'view':
				if( type === 'edit' ){
					this._body.innerHTML = `
					<div class="extra-info">
						<label class="info-label">
							<span class="guide">라벨</span>
							<input type="text" name="label" value="${this._data?.label || '' }" placeholder="라벨">
						</label>
						<label class="info-value">
							<span class="guide">내용</span>
							<input type="text" name="value" value="${this._data?.value || ''}" placeholder="내용">
						</label>
						<button type="button" class="btn delete-one" data-action="delete">삭제</button>
					</div>`;
				} else {
					this._body.innerHTML = `<span class="extra-info-item" aria-label="${this._data?.label || ''}">${this._data?.value || ''}</span>`; 
				}
			break;
			case 'empty':
				this.classList.add("no-item");
				this._body.innerHTML = `<div class="guide">등록한 추가 정보가 없습니다</div>`;
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
customElements.define('extra-info', ExtraInfo);
