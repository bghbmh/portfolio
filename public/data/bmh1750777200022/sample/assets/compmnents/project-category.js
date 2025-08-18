
import commonSheet from './styles/style-common.js';
import * as DOM from './Utils-dom.js';

let ct = {
	main : ["웹", "인쇄", "콘텐츠", "브랜딩", "UI"],
	sub :  ["제작", "구축","리뉴얼" ,"유지보수", "sample" ],
	hash : ["디자인",
		"마크업",
		"모바일",
		"데스크탑",
		"반응형",
		"마케팅",
		"웹",
		"콘텐츠",
		"인쇄",
		"브랜딩",
		"ui-test"
	],
	cIcon : ['icon-svg2-web', 'icon-svg2-print', 'icon-svg2-contents', 'icon-svg2-branding', 'icon-svg2-me']
};

function setCssStyle(){
	return `
	
:host([type="list"]),
:host([type="view"]){
	flex: none;
	display: inline-flex; 
	width: calc( 3em + 5em );
	gap: 12px; 
	font-size: 1em; 
	line-height: 1.3;
	align-items: center;
	margin-right: 1em;
}

i[class*="-svg2-"] {
  box-sizing: content-box;
  padding: 18px;
  border-radius: var(--border-radius-default);
}

dl{   }
dl > *{ margin: 0; }

.icon-svg2-web + dl dt{ color: #FAA329; }
.icon-svg2-print + dl dt{ color: #0EA9CF; }
.icon-svg2-contents + dl dt{ color: #FF6632; }
.icon-svg2-branding + dl dt{ color: #44C800; }
.icon-svg2-me + dl dt{ color: #0EA9CF; }

span{
font-size: 1em;
  color: var(--font-color-default);
}



:host([type="edit"]){
	display: flex;
	gap: 1em;
	flex-wrap: wrap;
	padding: 0px;
}
label { 	min-width: 9em; }
label i[class*="-svg2-"]{ 
	padding: 7px ; 
	border-radius: 100em;
	margin-left: auto;
}
label {
	position: relative;
	display: inline-flex;
	align-items: center;
	gap: 8px;
	min-height: 3em;
	border-radius: 100em;
	background-color: transparent;
	border: 1px solid var(--dark-50);
	padding: 0 .5em 0 .5em;
	padding-left: 0.8em;
	font-size: 15px;
}
label input { border-radius: 100em;  }
label:has(input:checked){
	background-color: var(--primary-500);
	border-color: var(--primary-500);
	color: #fff;
}

	`;
}

class ProjectCategory extends HTMLElement {
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
		return ['type', 'main', 'sub','label'];
	}

	// --- 라이프사이클 콜백 ---
	connectedCallback() {// 컴포넌트가 DOM에 추가될 때 호출
		console.log("project-category - ", this.dataset.main);
		
	}
	
	disconnectedCallback() { // 컴포넌트가 DOM에서 제거될 때 호출
		this._body.removeEventListener('click', this._bindUiClickHandler );
	}

	attributeChangedCallback(name, oldValue, newValue){
		console.log("loading category 00",name,  oldValue, newValue)
		if( name === 'type' && oldValue !== newValue ) this._render();
	}

	// --- 데이터 처리 ---
	_loadInitData(type = '') {

		if( type === 'edit' ){
			this._data = {
				label : this.dataset.label,
				type : parseInt(this.dataset.type),
			}
		} else {
			this._data = {
				main : parseInt(this.main),
				sub : parseInt(this.sub),
			}
		}
		
    }


	// --- 렌더링 및 내부 로직 메서드 ---
	_render() {
		if (!this._body) return;
		
		

		const type = this.getAttribute('type');
		let main ;
		let sub , num;

		switch (type) {
			case 'loading':
				this._body.innerHTML = `loading`;
				break;
			case 'edit':
				//this._loadInitData('edit');
				
				let label = this.getAttribute('label') ;

				num = parseInt( this.getAttribute('num') );

				this._body.innerHTML = ct[label].map((c, idx) => `
					<label>
						<input type="radio" name="${label}category" value="${c}" data-label="${label}" data-type="${idx+1}" ${ num-1 === idx  ? 'checked' : ''}>${c} 
						<i class="${ct.cIcon[idx]}" aria-hidden="true"></i>
					</label>`
				).join('');
				break;
		}

		

	}	
}
customElements.define('project-category', ProjectCategory);

