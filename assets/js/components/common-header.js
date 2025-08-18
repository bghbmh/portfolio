import { DispatchCustomEvent } from './Utils-event.js';
import * as DOM from './Utils-dom.js';

const cssText = `
	:host{
		/* 임시 */
		position: sticky;
		z-index: 3;
		top: -8px;
		transition: all 1s;

		display: flex;
		align-items: center;
		/*! height: 100%; */
		padding: 36px var(--bs-gutter-x) 24px !important ;
		



		   
	}
.logo{ 
	display: inline-flex; 
	/*! align-self: stretch; */
	margin-right: auto;
	gap: 8px;
}
.logo:hover{ color: var(--text-dark0)}
.logo > b{ 
	display: none;
	align-items: center;
	font-weight: 500;
}
.logo::before{
	content: url(/assets/img/common/logo.svg);
	display: inline-block;
	width: 54px;


	margin-top: -7px;
}
h1{ 
	opacity: 0; 
	font-size: 0px; 
	position: absolute; 
	z-index: -1; 
}
nav{
	display: flex;
	gap: 8px;	
}
nav > .btn{
	position: relative;
	padding: 0 4px;
	color: var(--bs-body-color);
	font-size: 1em;
	font-weight: 800;
	text-decoration: none;
	border: 0;
	background-color: transparent;
	cursor: pointer;
}
nav > .btn:after{
	position: absolute;
	content: "";
	display: inline-block;
	width: 1px;
	height: 1px;
	background-color: var(--text-dark0);
	border-radius: 100em;
	margin-left: 4px;
	bottom: -2px;
	right: 0;
	opacity: 0;
	transition: all 1s;
}	
	nav > .btn:hover:after{
		right: 100%;
    	background-color: #FF7972;
		width: 8px;
		height: 8px;
		opacity: 1;
		transition: all .2s;
	}
nav > .btn.current:after{
	right: calc(100% - 12px);
	background-color: rgb(255, 121, 114);
	width: 12px;
	height: 12px;
	opacity: 1;
	transition: 0.2s;
	z-index: -1;
}	
@media(min-width: 768px){
	.logo > b{ display: inline-flex;}
	h1{ 
		opacity: 1;  
		font-size: 20px;
		font-weight: 900;
		left: 50%; bottom: 24px;
		transform: translateX(-50%);
	}
	.util .btn-link{ 
		font-family: 'Oceanwide';
		font-weight: 600;
	}
}
@media(min-width: 1024px){
	nav{ gap: 1.5em}


}




`;

class CommonHeader extends HTMLElement {

	constructor() {
		super(); // HTMLElement의 constructor 호출
		this.attachShadow({ mode: 'open' });

		const sheet = new CSSStyleSheet();
		sheet.replaceSync(cssText);
		this.shadowRoot.adoptedStyleSheets = [sheet];

		this.nav = DOM.CreateElement({ tag: "nav" });
		this.nav.innerHTML = `
			<button type="button" data-href="me" class="btn">about me</button>
			<button type="button" data-href="projects" class="btn">projects</button>
			<button type="button" data-href="contact" class="btn">contact</button>`

		this.shadowRoot.innerHTML = `
			<a href="?current=main" class="logo"><b style="display: none">포트폴리오</b></a>
			
			<h1 class="title">박민희</h1>
			<!--
			<a class="btn btn-link" href="mailto:bghbmh@gamil.com">bghbmh@gamil.com</a>
			-->
		`;
		this.shadowRoot.appendChild(this.nav);
		this._clickHandler = this._onClick.bind(this); 
	}

	static get observedAttributes() {
		return ['current'];
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name === 'current' && oldValue !== newValue) {
           
			let btn = [...this.nav.querySelectorAll(".btn")].find( btn => btn.dataset.href === newValue );
			this.setCurrentMenu(btn);
			 console.log("CommonHeader - ",oldValue, newValue, btn);
        }
	}

	connectedCallback() {// 컴포넌트가 DOM에 추가될 때 호출
		this.shadowRoot.addEventListener('click', this._clickHandler);
	}
	
	disconnectedCallback() { // 컴포넌트가 DOM에서 제거될 때 호출
		this.shadowRoot.removeEventListener('click', this._clickHandler );
	}

	_onClick(e){  console.log('CommonHeader - ', e.target.dataset.href );	

		if( e.target.tagName !== "BUTTON" ) return;

		// this.nav.querySelectorAll(".btn").forEach( btn => btn.classList.remove("current") );
		// const btn = e.target.closest("button");
		// btn.classList.add("current");

		this.setCurrentMenu(e.target.closest("button"));

		DispatchCustomEvent(this.shadowRoot, 'clicked-global-nav', { 
			value : e.target.dataset.href
		});
	}

	setCurrentMenu(currentBtn){
		this.nav.querySelectorAll(".btn").forEach( btn => btn.classList.remove("current") );
		currentBtn?.classList.add("current");
	}

}

customElements.define('common-header', CommonHeader);


// 마크업 함수 ===========================================

const MarkUp = {
	loading: () => {
		return `
			loading
			`
	},
	view: (item, fileItems) => {
		return ` `
	}
}
