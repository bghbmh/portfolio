import * as DOM from './Utils-dom.js';
import { ICONSET } from './config.js';

import './modal-popup.js';

const cssText = `
:host{
	display: block;
	--sssas: 5/3;
} 

.btn {
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	background-color: transparent;
	margin: 0;
	font-size: 1em;
	padding: .5em 1em;
	display: inline-flex;
	color: currentColor;
	border: 0;
	cursor: pointer;
}

.tool-name-list {
	display: flex;
	gap: 4px;
}

.tool-name-list .tool {
	display: inline-flex;
	padding: 5px 11px;
	line-height: 1;
	background-color: hsl(207 16% 68% / .2);
	border-radius:  4px;
	font-size: 13px;
	color: #1f2c3e;
	font-weight: 400;
}

@media (min-width: 768px) {
	.tool-name-list .tool {
		font-size: 15px;
	}
}

.list-item {

	display: flex;
	flex-direction: column;
	border-radius: 0px;
	overflow: hidden;
	margin: 0 1rem;

	width: calc(100% - 24px);
	max-width: 1280px;
	margin: 0 12px;
	padding: 2.5em 8px;

	/* background-color: #121314;
	background-image: url(./images/background_noise.png); */
	transition: all .3s;

	color: rgb(22, 30, 41);
	background-color: hsl(200 6% 50% / 0);

	box-sizing: border-box;
}

.list-item .tool-name-list {
	margin: 8px 0 8px;
}


.list-item-label-wrap {
	margin-bottom: 12px;
}

.list-item-label {
	display: inline-flex;
	gap: 4px;
	align-items: center;
	font-size: 1em;
	font-weight: 400;
	color: #333;
	padding: 0;
	line-height: 1;
}

.list-item-label b {
	flex: none;
	display: inline-flex;
	padding: 3px 6px;
	background-color: #333;
	border-radius: 10em;
	color: #fff;
	font-weight: 200;
	font-size: calc(1em - 1px);
}
.list-item-label b[data-type="1"] { background-color: rgb(231, 108, 102); }
.list-item-label b[data-type="2"] { background-color: rgb(77, 177, 112); }
.list-item-label b[data-type="3"] { background-color: rgb(248, 176, 29); }
.list-item-label b[data-type="4"] { background-color: hsla(205, 94%, 38%, 1.00); }

.list-item-label span {
	flex: none;
}

.list-item-image-wrap {
	display: block;
	width: 100%;
	max-width: 100%;
	/* background-color: hsl( 0 100% 100% / .3); */
}

.list-item-image-wrap .image {
	width: 100%;
	max-width: 100%;
	aspect-ratio: var(--sssas);
	/*  background-color: hsl( 0 100% 100% / .3);   */
}

.list-item-image-wrap .image img {
	width: 100%;
	height: 100%;
	object-fit: cover;
	object-position: center top;
	border-radius: 4px;
	transition: all .3s;
}

.list-item-header {
	padding-top: 16px;
}

.list-item-title {
	font-weight: 200;
	line-height: 1.2;
	font-size: 32px;
	margin: 0;
	padding: 0;
}

.list-item-info-container {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	/* gap: 1em; */
	padding-top: 12px;

	min-height: 5em;
}

.list-item-btn-wrap {
	display: flex;
	gap: 4px 1em;
	margin-top: auto;
}

.list-item-btn-wrap .btn {
	align-items: center;
	gap: 4px;
	padding: .5em .5em;
	line-height: 1;

}

.list-item-btn-wrap .btn svg {
	display: block;
	width: 22px;
	height: 22px;
}

.summary {
	margin: 0;
	padding: 0;
	line-height: 1.5;
}



.extraInfo-wrap{ margin: 0 0 auto 0; padding-bottom: 1.5em; }
.extraInfo-wrap > .info {
	display: inline-flex;
	padding-right: 1em;
}
.extraInfo-wrap > .info > dd,
.extraInfo-wrap > .info > dt{ margin: 0; padding: 0 }
.extraInfo-wrap > .info > dt{ color: rgb(22, 30, 41); font-weight: 700; }
.extraInfo-wrap > .info > dd{ color: hsla(230, 26%, 22%, 1.00);  font-weight: 700; font-weight: 300; }
.extraInfo-wrap > .info > dt + dd{ margin-left: 4px }


.extraInfo-wrap > .info:before{
	content: "";
	display: inline-flex;
	width: 3px;
	height: 3px;
	background-color: rgba(120, 119, 119, 1);
	font-weight: bold;
	margin: .5em .5em 0 .5em;
	margin-top: calc( .5em + 2px);
	line-height: 0;
}

@media (min-width: 768px) {
	.list-item {
		display: grid;
		column-gap: 1.5em;
		align-items: start;
		grid-template-rows: auto;
		/* minmax(16px, auto) */
		grid-template-columns: minmax(300px, 300px) 1fr;
		/* 2개의 동일한 너비 열 생성 */
		padding: 1.5em 8px 2.5em;
	}

	.list-item-label-wrap {
		grid-column: span 2;
	}

	.list-item-image-wrap {
		/*  background-color: hsl( 0 100% 100% / .3); */
		min-height: 13em;

		grid-row: span 3;
		display: flex;
		align-items: center;
	}

	.list-item-info-container {
		align-self: stretch;
	}
}

@media (min-width:1024px) {
	.list-item {
		grid-template-columns: minmax(30px, 80px) minmax(360px, auto) 1fr;
		column-gap: 2.5em;
		padding: 2.5em 8px 2.5em;
	}

	.list-item-label-wrap {
		grid-column: span 1;
		grid-row: span 3;
		margin-bottom: 0;

		position: relative;
		height: 100%;
	}

	.list-item-label {
		flex-direction: row-reverse;
		transform-origin: center;
		position: absolute;
		top: 0;
		right: 0;
		transform-origin: right top;
		transform: rotate(-90deg) translateX(-16px) translateY(-40px);
	}

	.list-item-image-wrap {
		min-height: 15em;
		max-width: 360px;
	}

}

@media (min-width: 1200px) {
	.list-item {
		grid-template-columns: minmax(18px, 80px) minmax(360px, auto) 1fr;
		margin: 0 auto;
		border-left: 1px solid var(--item-border-color);
		border-right: 1px solid var(--item-border-color);
	}

}

@media (min-width: 1440px) {
	.list-item {}

}

`;

class ProjectItem extends HTMLElement {

	constructor() {
		super(); // HTMLElement의 constructor 호출
		this.attachShadow({ mode: 'open' });

		this._data = null;
		this._body = this.shadowRoot;
		this.container = DOM.CreateElement({ tag: 'article', class:'list-item' });

		const sheet = new CSSStyleSheet();
		sheet.replaceSync( cssText );
		this.shadowRoot.adoptedStyleSheets = [ sheet];

		this._clickHandler = this._onClick.bind(this); 
	}

	set data(data) {
		
		this._data = data;
		//console.log("dardtype2 - ", this._data);
		this.setAttribute('mode', 'view');
		
	}
	get data() {
		return this._data;
	}

	static get observedAttributes() {
		return ['mode'];
	}

	// --- 라이프사이클 콜백 ---
	connectedCallback() {// 컴포넌트가 DOM에 추가될 때 호출
		this.setAttribute('mode', 'loading');
		this._body.appendChild(this.container);
		this._body.addEventListener('click', this._clickHandler);
	}
	
	disconnectedCallback() { // 컴포넌트가 DOM에서 제거될 때 호출
		this._body.removeEventListener('click', this._clickHandler );
	}

	// 속성 값이 변경될 때 호출 (observedAttributes에 등록된 속성만 해당)
	attributeChangedCallback(name, oldValue, newValue) {
		if (name === 'mode' && oldValue !== newValue) {
            this._render();
        }
	}

	_render() { 

        const mode = this.getAttribute('mode');
        switch (mode) {
            case 'loading':
				this.container.innerHTML = MarkUp.loading();
                break;
            case 'view':
				//console.log("_render - ",this._data );
				this.container.innerHTML = MarkUp.view(this._data);
                break;
            case 'error':
                 this._body.innerHTML = '<div>데이 불러오는데 문제 생김</div>';
                 break;
            case 'empty':
            default:
                this._body.innerHTML = '<div>데이터 없음/div>';
                break;
        }
	}

	_onClick(e){  console.log('MainItem - ' );	
		if( !e.target.closest('[data-action]') ) return;

		let clickElem = e.target.closest('[data-action]');
		if( clickElem.dataset.action ===  "modal" ){
			let modal = DOM.CreateElement({
				tag: 'modal-popup', 	
				id: "modal1", 		
				class: "modal ",
				tabindex: "-1", 		
				role: "dialog",
				size: 'extra-large',
				util: clickElem.dataset.uiUtil
			});	
			if( clickElem.dataset.uiUtil === "zoomIn" ) {
				modal.innerHTML = MarkUp.zoomIn([...this._data.mainimage, ...this._data.subimage] );	
			} else {
				modal.innerHTML = MarkUp.pagePreView( this._data );
				modal.querySelector('.btn.ttt')?.addEventListener("click", e => {
					e.target.classList.toggle("xx");
					e.target.parentNode.nextElementSibling.classList.toggle("expanded");
				});
				modal.querySelector('.ctrl-pagePreView')?.addEventListener("click", e => {
					let link = e.target.closest("[data-link]").dataset.link;
					e.stopPropagation();
					modal.querySelector("iframe").src = `./data/${link}`;
				});	
			}
			document.body.appendChild(modal);
			modal.open();
		}
	}	
}

customElements.define('project-item', ProjectItem);


const MarkUp = {
	zoomIn : (images) => {
		console.log("modal - zoomIn" );

		return `
		<div class="modal-header" slot="modal-header">
			<h5 class="modal-title">이미지 크게 보기</h5>
		</div>
		<div class="modal-body" slot="modal-body">
			${ images.map( img => `<img src="./data/${img.webUrl}">` ).join('') }
		</div> `
	},
	pagePreView : (item) => {
		console.log("modal - pagePreView" );
		return `
		<div class="modal-header" slot="modal-header">
			<div class="d-flex">
				<h5 class="modal-title" role="button" aria-label="더보기버튼" data-action="toggle" data-target=".extraInfo">
					<span>${item.title !== "" ? item.title : "제목이 없습니다" }</span>
				</h5>	
				<button type="button" class="btn ttt" aria-label="접고펼치는버튼" data-on="접기" data-off="펼치기"></button>
			</div>

			<div class="extraInfo expanded">
				<div class="labels" style="display:none;">
					${ item.category.map( o => `<span class="info ${o.label}" data-type=${o.type}>${o.name}</span>`).join('') }
				</div>

				${Object.keys(item.extraInfo).length ? '<dl class="extraInfo-wrap"  style="display:none;">' + Object.entries(item.extraInfo).map( arr => `<dd class="info" aria-label="${arr[0]}">${arr[1]}</dd>`).join('') + '</dl>' : ''}

				<nav class="buttons ctrl-pagePreView">
					${ item.samplePage.map( o => `<button type="button" class="btn text-start" data-link="${o.webUrl}">${o.label}</button>`).join('')}
				</nav>
			</div>

		</div>
		<div class="modal-body" slot="modal-body">
			<iframe class="iframe" src="./data/${item.samplePage[0].webUrl}" style="width: 100%;height: 100%; border: 0;" ></iframe>
		
		</div> `
	},
	view : ( item, fileItems = null ) => {
		return `



			<div class="list-item-label-wrap">
				<div class="list-item-label"><b data-type="${item.category[0].type}">${item.category[0].name}</b><span>${item.category[1].name}</span></div>				
			</div>
			<!--   -->

			<div class="list-item-image-wrap">
				<div class="image"><img src="./data/${item.mainOpenImages[0].webUrl}" alt="이미지1"></div>
			</div>

			<header class="list-item-header">			
			
				${item.title !== "" ? `<h3 class="list-item-title">${item.title}</h3>`:''}
${ item.tools ? `<div class="tool-name-list">
					${ item.tools.map( t => `<div class="tool">${t}</div>` ).join('') } </div>` : '' }

		
			</header>

			<div class="list-item-info-container">

				${ item.summary ? `<p class="summary">${item.summary}</p>` : '' }


				${
					Object.keys(item.extraInfo).length ? '<dl class="extraInfo-wrap">' + Object.entries(item.extraInfo).map( arr => `<div class="info"><dt>${arr[0]}</dt><dd>${arr[1]}</dd></div>`).join('') + '</dl>' : ''
				}

				<div class="list-item-btn-wrap">
					${ item.externalLink.figma ? `<a href="${item.externalLink.figma}" target="_blank" class="btn">${ICONSET.figma}디자인</a>` : '' }
				
					<button type="button" class="btn" data-action="modal" data-ui-util="zoomIn">
						${ICONSET.zoomIn}크게보기
					</button>

					
					${ item.externalLink.github ? `<a href="${item.externalLink.github}" target="_blank" class="btn">${ICONSET.github}소스보기</a>` : '' }

					${ item.samplePage.length ? `<button type="button" class="btn" data-action="modal"  data-ui-util="pagePreView">${ICONSET.mockup}목업</button>` : '' }
				</div>
			</div>



		`;
	},
	loading : () => {
		return `
		<article class=" loading">
			loading...
		</article>
		`
	}


}






