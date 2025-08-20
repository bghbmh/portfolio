
import * as DOM from './Utils-dom.js';
import { ICONSET } from './config.js';

import './image-comparison.js';
import './modal-popup.js';

function setCssStyle(){
	// CSS 파일 연결
	return `

:host{
	--smw: calc( 100vw - 2rem - 24px);
	--sssas: 5/3;

	--slider-img-aspect-ratio : var(--sssas);
	--slider-max-width: var(--smw);
}

*, ::after, ::before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}


[class*="icon-pop-"]{
	--pop-w: 1.5em;
	display: inline-flex;
	font-size: 1em;
	width: var(--pop-w);
	height: var(--pop-w);
	line-height: 0;
	--bg-img : url('/assets/img/common2/icon-svg-test.svg');
	background-image: var(--bg-img);
	background-size: contain;
	background-position: center;
	background-repeat: no-repeat;
}
.icon-pop-image{ --bg-img : url('./assets/img/common2/icon-pop-image.svg'); }
.icon-pop-image2{ --bg-img : url('./assets/img/common2/icon-pop-image2.svg'); }




.overview {
    display: block;
    list-style: none;
    padding: 0;
    margin: 0;
	font-size: 1em;
}

.overview li {
	display: flex;
	gap: 8px 1em;
    padding: .7em .5em .7em 20px;
    position: relative;
	font-size: 1em;
}

.overview li::before {
    content: "•";
    position: absolute;
    left: 2px;
    color: #555;
    font-weight: bold;
}
.overview li + li{ border-top: 1px dotted hsl( 0 0% 0% / .2); }
.overview b {
    display: block;
    font-weight: 600;
}


.btn{
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



.tool-name-list{ display: flex; gap: 4px; }
.tool-name-list .tool{
	display: inline-flex;
	padding: 5px 11px;
	line-height: 1;
	background-color: hsl(207 16% 68% / .3);
	border-radius: 1em 4px 1em 4px;
	font-size: 13px;
	color: #1f2c3e;
	font-weight: 300;
}
@media (min-width: 768px) {
	.tool-name-list .tool{ font-size: 15px; }
}





.main-item {
    display: flex;
    flex-direction: column;
    border-radius: 0px;
    overflow: hidden;

	 /* background-color: #121314;
	background-image: url(/assets/img/common2/background_noise.png); */


	border: 1px dotted var(--item-border-color);
	color: rgb(22, 30, 41);
	background-color: hsl(200 6% 50% / .03);


}
.image-wrap{ text-align: center; width: 100%; padding: 12px; }
.image-wrap .image{  
	width: 100%; 
	max-width: 100%;
	aspect-ratio: var(--sssas);  
	/* background-color: hsl( 0 100% 100% / .3); */
}
/* .image-wrap:has(.slider-before-after-container){ padding: 12px; } */

.image-wrap .image img {
	width: 100%;
	height: 100%;
	object-fit: cover;
	object-position: center top;
	border-radius: 4px;
	transition: all .3s;
}



.main-item .item-header,
.main-item .info-container{ padding: 0 1em }
.item-header {
	display: flex;
	flex-direction: column;
	gap: 8px 12px;
	margin: 8px 0 0px;
}
.option-title-label {
    font-size: 1.2rem;
    font-weight: bold;
    color: #333;
    padding: 10px;
}
.option-label-wrap{
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
  gap: 8px;
 }
.title-label{
	display: inline-flex;
	gap: 4px;
	align-items: center;
    font-size: 1em;
    font-weight: 400;
    color: #333;
    padding: 0;
	line-height: 1;
}
.title-label b{
	display: inline-flex;
	padding: 3px 6px;
	background-color: #333;
	border-radius: 10em;
	color: #fff;
	font-weight: 200;
	font-size: calc( 1em - 1px);
	
}




.item-title {
    margin: 0;
    font-size: 32px;
	font-weight: 200;
}
.main-item .info-container { padding-bottom: 1em; padding-top: 1em;   }
.info-container .overview{ 
	font-size: 15px; 
	margin-bottom: 1em; 
	color: #2a2f48; 
	opacity: .8;
}
.info-container .overview li{  flex-direction: column; row-gap: 3px; font-weight: 400; }
.info-container .overview li b{ font-weight: 700; }
.info-container .overview li + li {   }

.main-item .btn-wrap{ display: flex;  gap: 4px 1em; }
.main-item .btn-wrap .btn {
  align-items: center;
  gap: 4px;
  padding: .5em .5em;
  line-height: 1;

}
.main-item .btn-wrap .btn svg{
	display: block;
	width: 22px;
	height: 22px;
}



@media (min-width: 600px) {
	:host{
		--slider-max-width: 360px;
	}
}
@media (min-width: 768px) {
	:host{
		--slider-max-width: 320px;
	}
    .main-item {
        display: grid; /* 그리드 레이아웃 사용 */
		grid-template-rows: minmax(64px, auto);
        grid-template-columns: minmax(320px, 320px) 1fr; /* 2개의 동일한 너비 열 생성 */
        grid-template-areas:
            "image header "
            "image info ";
        gap: 0px; /* 그리드 요소 간 간격 */
		align-items: center;
		padding: 18px 18px;
    }
	.item-title { font-weight: 400; }

    /* 그리드 영역 지정 */
    .image-wrap { grid-area: image; padding: 0;  }
    .item-header {  grid-area: header;  }
    .info-container {  grid-area: info;   }

	.image-wrap:has(image-comparison){ padding: 0px; }

}
@media (min-width: 1024px) {
	:host{
		--slider-max-width: 400px;
	}

	.main-item { grid-template-columns: minmax(400px, 400px) 1fr; column-gap: 1em;  }
	.info-container .overview li{  flex-direction: row; flex-wrap: wrap;   }

}
@media (min-width: 1200px) {
	:host{
		--slider-max-width: 420px;
	}

	.main-item { 
		grid-template-columns: minmax(420px, 420px) 1fr; 
		column-gap: 2.5em; 
		padding: 36px 36px;   
	}
	.main-item .image-wrap {
		display: flex;
		align-items: center;
		box-sizing: content-box;
	}

}


`
}

class MainItem extends HTMLElement {

	constructor() {
		super(); // HTMLElement의 constructor 호출
		this.attachShadow({ mode: 'open' });

		this._data = null;
		this._body = this.shadowRoot;
		this.container = DOM.CreateElement({ tag: 'article', class:'main-item' });

		const sheet = new CSSStyleSheet();
		sheet.replaceSync( setCssStyle() );
		this.shadowRoot.adoptedStyleSheets = [ sheet];

		this._clickHandler = this._onClick.bind(this); 
	}

	// item 데이터를 설정하는 getter/setter (외부에서 컴포넌트 생성 후 데이터를 넘길 때 유용)
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
		
		const observerOptions = {
			root: null,
			rootMargin: "0px 0px 0px 0px",
			threshold: [0.0, 1.0],
		};
		
		let intersectionObserver = new IntersectionObserver(function (entries) {
			entries.forEach((entry) => {
				if (entry.isIntersecting ) {
					if (entry.intersectionRatio >= 0.0 ) {
						entry.target.classList.add("on");
					} 
				} else {
					entry.target.classList.remove("on");
				}
			});
		}, observerOptions);
		intersectionObserver.observe(this);
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

customElements.define('main-item', MainItem);

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
		<div class="image-wrap">
		${item.imageComparison ? `<image-comparison data-before="${item.imageComparison.before.webUrl}"  data-after="${item.imageComparison.after.webUrl}"></image-comparison>` : `<div class="image"><img src="./data/${item.mainOpenImages[0].webUrl}" alt="이미지"></div>`}
			
		</div>
		
		<header class="item-header">
			<div class="option-label-wrap">
				<div class="title-label" ><b data-type="${item.category[0].type}">${item.category[0].name}</b><span>${item.category[1].name}</span></div>

				${ item.tools ? `<div class="tool-name-list">
					${ item.tools.map( t => `<div class="tool">${t}</div>` ).join('') } </div>` : '' }
			</div>
			<h3 class="item-title">${item.title}</h3>			
		</header>

		<div class="info-container">
			${ item.summary ? `<p class="summary">${item.summary}</p>` : '' }

			<ul class="overview">
				${item.overview?.map( (o,idx) => `<li>${o.title ? `<b class="title">${o.title}</b>`  : ""} ${o.description ? o.description : ''}</li>`).join('') }
			</ul>

			<div class="btn-wrap">
				${ item.externalLink.figma ? `<a href="${item.externalLink.figma}" target="_blank" class="btn">${ICONSET.figma}디자인</a>` : '' }
				
				<button type="button" class="btn" data-action="modal" data-ui-util="zoomIn">
					${ICONSET.zoomIn}크게보기
				</button>

				
				${ item.externalLink.github ? `<a href="${item.externalLink.github}" target="_blank" class="btn">${ICONSET.github}소스보기_깃허브용</a>` : '' }

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







