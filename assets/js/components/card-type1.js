
import * as DOM from './Utils-dom.js';
import { DispatchCustomEvent } from './Utils-event.js';
import { getFileUrl,CheckFilesInFolder , loadMultipleStylesheets} from './Utils-api.js';

let onrender = `<img alt="" loading="lazy" decoding="async" data-nimg="fill" style="height:auto;width:1.5em;display: inline-block;" src="https://cdn.sanity.io/images/hvk0tap5/production/41f8882d8e70a1e60c814c69201d1f9021a61050-50x50.svg?w=100&amp;fit=max&amp;auto=format">`;

let onrender2 = `<svg class="h-full w-full" width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M90 0H0V90H90V0Z" fill="#8A05FF"></path><path d="M75 -2.62268e-06L60 0L60 15L75 15L75 -2.62268e-06Z" fill="#E6DAFF"></path><path d="M30 15L15 15L15 30L30 30L30 15Z" fill="#E6DAFF"></path><path d="M90 15L75 15L75 30L90 30L90 15Z" fill="#E6DAFF"></path><path d="M60 15L45 15L45 30L60 30L60 15Z" fill="#E6DAFF"></path><path d="M15 30L0 30L2.62268e-06 45L15 45L15 30Z" fill="#E6DAFF"></path><path d="M45 30L30 30L30 45L45 45L45 30Z" fill="#E6DAFF"></path><path d="M90 45L75 45L75 60L90 60L90 45Z" fill="#E6DAFF"></path><path d="M60 45L45 45L45 60L60 60L60 45Z" fill="#E6DAFF"></path><path d="M45 60L30 60L30 75L45 75L45 60Z" fill="#E6DAFF"></path><path d="M60 75L45 75L45 90L60 90L60 75Z" fill="#E6DAFF"></path></svg>`;

let github = `<svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 16 16" width="20" aria-hidden="true" class=""><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>`;

let imgzoom = `<i class="icon-svg-imagesmode" aria-hidden="true"></i>`;

class CardType1 extends HTMLElement {

	constructor() {
		super(); // HTMLElement의 constructor 호출
		this.attachShadow({ mode: 'open' });

		this._data = null;
		this._fileItems = {}; // 비동기로 가져올 file 데이터 저장 변수
		this._body = null;

		const cssFilePaths = ['./assets/css/bootstrap.css','./assets/css/reset.css','./assets/css/common.css'];
		
		loadMultipleStylesheets(cssFilePaths).then(sheets => {
            this.shadowRoot.adoptedStyleSheets = sheets;
        }).catch(error => {
            console.error(" css ", error);
        });

		this._initBody();
		this._clickHandler = this._onClick.bind(this); 
	}

	_initBody() {
		this._body = this.shadowRoot ;
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

	// --- 데이터 처리 ---
	async _loadInitData() {
		if (!this._data) {
			this.setAttribute('mode', 'empty');
			return;
		}

		this.setAttribute('mode', 'loading');

		try {
			//await this._setFilesData(this._data);
			this.setAttribute('mode', 'view'); // 데이터 로드 완료 후 'view' 모드로 변경
		} catch (error) {
			console.error('[InitialLoad] 데이터 로딩 오류:', error);
			this.setAttribute('mode', 'error');
		}
	}


	// --- 렌더링 및 내부 로직 메서드 ---
	_render() {

		const mode = this.getAttribute('mode');
		switch (mode) {
			case 'loading':
				this._body.innerHTML = MarkUp.loading();
				break;
			case 'view':
				this.dataset.order = this._data.order;
				this._body.innerHTML = MarkUp.view(this._data );
				break;
			case 'error':
				this._body.innerHTML = '<div>Error loading data.</div>';
				break;
			case 'empty':
			default:
				this._body.innerHTML = '<div>No data available.</div>';
				break;
		}
		
		// 렌더링 후 새롭게 이벤트 리스너 연결
		
	}


	_onClick(e){  console.log('card22 - ', e.target.closest("button"));	

		const button = e.target.closest("button");
		if (!button || button.type ==="submit" ) return;

		DispatchCustomEvent(this._body, 'clicked-card', { action : button.dataset.action, idx : Number(this.dataset.order), util : button.dataset.uiUtil });
	}

}

customElements.define('card-type1', CardType1);


// 마크업 함수 ===========================================

const MarkUp = {
	loading : () => {
		return `
			loading
			`
	},
	view : (item) => {
		return  `
		<article class="cardType1 ${ item.sampleName ? `col6` : 'col3'} row-span2">
			<div class="contents">
				${image([...item.mainimage, ...item.subimage])}
			</div>
			<header>
				<h4>${item.title}</h4> 
				<div class="labels">  
					${ item.category.map( c => `<span class="label ${c.label}" data-type="${c.type}">${c.name}</span>`).join('') }
				</div>
				${
					Object.keys(item.extraInfo).length ? '<dl class="extraInfo-wrap">' + Object.entries(item.extraInfo).map( arr => `<dd class="info" aria-label="${arr[0]}">${arr[1]}</dd>`).join('') + '</dl>' : ''
				}
			</header>

			<footer >
				<div class="util">
					${setButtons(item)}
				</div>
				
			</footer>
		</article>		`
	}

}

function image(images ){
	return images.length > 0 ? `<img src="./data/${images[0].webUrl}" alt="메인이미지">` : `<div class="item" title="등록된이미지가없습니다"><i class="icon-svg-image-sharp"></i></div>`;
}



function setButtons(item){
	let html ='';
	if( item.samplePage.length ){
		html += `
			<button type="button" class="btn btn-icon" data-action="modal"  data-ui-util="pageView">
				<!--<i class="bi bi-file-earmark-code-fill" aria-hidden="true"></i> -->
				<i class="icon-svg-article"></i> 샘플보기
			</button> `;
	}

	let icon = '', h = '';
	if( ("externalLink" in item) && Object.entries(item.externalLink).length ){
		for( let key in item.externalLink ){

			let value = item.externalLink[key];
			// console.log("href = ", item.externalLink[key],item.externalLink[key].indexOf('github'))
			if( value.indexOf('github') > -1 ) icon = github ;
			else if( value.indexOf('onrender') > -1  ) icon = onrender ;
			
			html += `<a target="_blank" class="btn" href="${value}" >${icon}${key } </a>`
		}
	} 

	let imgs = [...item.mainimage, ...item.subimage]
	if( imgs.length ){
		html +=`<button type="button" class="btn btn-icon" data-action="modal" data-ui-util="zoomIn">${imgzoom} 크게보기</button>`;
	}

	return html;
}