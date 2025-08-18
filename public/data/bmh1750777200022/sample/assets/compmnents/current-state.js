
import commonSheet from './styles/style-common.js';
import * as DOM from './Utils-dom.js';
import { STATE_STEP } from './config.js';

function setCssStyle(){
	return `
	
:host{
	display: inline-block;
}
	
.state-before,
.state-ongoing,
.state-complete,
.state-unknown{
	display: inline-flex;
	align-items: center;
	min-width: auto;
	gap: 4px;
	font-size: calc(1em - 1px);
	line-height: 1;
	color: var(--dark-600);
	padding: 6px 8px;
	white-space: nowrap;
	flex: none;
	background-color: transparent;
	/* border: solid 1px #d6dbd8; */
	border-radius: 100em;
}
.state-before i,
.state-ongoing i,
.state-complete i,
.state-unknown  i{ position: relative; overflow: visible    }
.state-before i:before,
.state-ongoing i:before,
.state-complete i:before,
.state-unknown i:before{ 
	position: absolute;
	width: calc( 100% + 6px );
	height: calc( 100% + 6px );
}

.state-before{
	background-color: var(--dark-100);
}
.state-ongoing{
	color: #009e97;
	/* border: solid 1px #b9eeec; */
	background-color: #daf6f5;
}
.state-complete{
	color: #107fe8;
	/* border: solid 1px #cfe6fc; */

	background-color: #ecf5fe;
}


:host([type="edit"]){ display: flex; gap: 1em 1em;  flex-wrap:wrap;  font-size: 1em;  }
:host([type="edit"]) div { 
	flex: 0 1 calc( 25% - (3em / 4));  
	display: flex;
	align-items: center;
	gap: 4px;
	min-height: 44px;
	min-width: 12em;
}
:host([type="edit"]) div label{ flex: 0 1 6em }
:host([type="edit"]) div label .guide {
	flex: 0 0 2em;
	display: inline-block;
	color: var(--dark-500);
	font-size: 0.8em;
	text-align: center;
}

:host([type="edit"]) div label:has(.guide){
	display: inline-flex;
	gap: 4px 8px;
	min-width: 1em;
	align-items: center;
	border: 1px solid var(--dark-300);
	border-radius: var(--border-radius-8px);
}
:host([type="edit"]) div label:has(.guide) input { min-width: 2em; border: 0px; }
:host([type="edit"]) div label:has(.guide) input:focus {
  outline: none;
  border-color: transparent;
}
label:has(input[type=text]:focus) {
  outline: 2px solid var(--primary-500);
  border-color: transparent;
}

@media(max-width: 600px){
	:host([type="edit"]) div { flex: 0 0 100% }
}



	
	`;
}


class CurrentState extends HTMLElement {
	constructor() {
		super(); // HTMLElement의 constructor 호출
		this.attachShadow({ mode: 'open' });

		this._body = null;

		const sheet = new CSSStyleSheet();
		sheet.replaceSync( setCssStyle() );

		this._state = null;
		
		this.shadowRoot.adoptedStyleSheets = [ commonSheet, sheet ];
		this._bindUiClickHandler = this._onClick.bind(this);
		this._initBody();
	}

	_initBody() {
		// 컴포넌트의 기본 HTML 구조 설정
		this._body = this.shadowRoot ;
		this._body.addEventListener("click", this._bindUiClickHandler )
	}

	set state(s){
		this._state = s;
		this.setAttribute('state', s)
	}

	get state(){
		return this._state;
	}

	static get observedAttributes() {
		return ['mode','state'];
	}

	// --- 라이프사이클 콜백 ---
	connectedCallback() {// 컴포넌트가 DOM에 추가될 때 호출
		this.setAttribute("mode", 'loading');
		this._loadInitData( this.getAttribute('state') );
	}
	
	disconnectedCallback() { // 컴포넌트가 DOM에서 제거될 때 호출
		this._body.removeEventListener('click', this._bindUiClickHandler );
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if ( oldValue !== newValue) {

			if( name === 'state' ){
				this._state = newValue;
				this.setAttribute('state', newValue);
				this._render();

			} else if ( name === 'mode' ) {
				this._render();
			}            
        }
	}

	// --- 데이터 처리 ---
	_loadInitData(state, type='') { 
		this._state = state || '' ;

			this.setAttribute('mode','view');
    }	

	// --- 렌더링 및 내부 로직 메서드 ---
	_render() {
		
		const type = this.getAttribute("type");
		const mode = this.getAttribute('mode');
		
		//console.log("loading current-state 000 ",STATE_STEP,mode, type , this._state)
		
		switch (mode) {
			case 'loading':
				this._body.innerHTML = 'loading';
				break;
			case 'view':	
				this._body.innerHTML = '';
				let currentState = this.getAttribute('state' );

				if( type === 'edit' ){
					let checked, isChecked = false, ongoingOption='';
					this._body.innerHTML = STATE_STEP.map( (state, idx) => {
						if( state.key === this._state ) {
							checked = true;
							isChecked = true;
						} else checked = false;

						if( STATE_STEP.length - 1 === idx && !isChecked ){ 
							checked = true;
							this.setAttribute('state', 'unknown');
							this._state = 'unknown';
						}

						if( this._state === 'ongoing' && checked ){
							ongoingOption = `<label aria-label="현재 진행 수준"><input type="text" name="stateNumber" value="" ><span class="guide">%</span></label>`;
						} else ongoingOption='';

						return `<div><label><input type="radio" name="state" value="${state.key}" ${checked ? 'checked' : ''}><span>${state.text}</span></label>${ongoingOption}</div>`;

					}).join('');
				} else {
					let a = STATE_STEP.find( s => s.key === this._state );
					//console.log("loading current-state 111", a)
					this._body.innerHTML = `<div class="state-${this._state}">${a.icon}${a.text}</div>`;
				}
				break;
		}

	}

	_onClick(e) {
		const label = e.target.closest('label');
		if ( !label ) return;

		console.log("loading current-state 999", label)

		if( label.querySelector("input").type !== 'radio' ) return;

		let state = label.querySelector("input").value;
		this.setAttribute('state', state);
    }
}
customElements.define('current-state', CurrentState);

