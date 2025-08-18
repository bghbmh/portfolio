
function setCssStyle(){
	// CSS 파일 연결
	return `

:host{

}
.slider-before-after-container{
	display: inline-grid;
	place-content: center;
	position: relative;
	overflow: hidden;
	border-radius: 8px;
	--position: 50%;


	// --slider-img-aspect-ratio : 4/3;
	// --slider-max-width: 800px;
}
.slider-image-container{
	position: relative;
	max-width: var(--slider-max-width);
	max-height: calc( var(--slider-max-width) * ( 1px / var(--slider-img-aspect-ratio) ) );
	aspect-ratio: var(--slider-img-aspect-ratio);
}
.slider-image-container .slider-image{	width: 100%; overflow: hidden; }
.slider-image-container .image-before.slider-image{
	position: absolute;
	inset: 0;
	width: var(--position);
	/*
	filter: grayscale(100%)
	*/
}
.slider-image-container .image-after.slider-image{
	height: 100%;
}
.slider-image-container .slider-image img{
	display: block;
	max-width: 100%;
	width: 100%;
	min-width: var(--slider-max-width);
	height: 100%;
	object-fit: cover;
	object-position: left;

	min-height: calc( var(--slider-max-width) * ( 1px / var(--slider-img-aspect-ratio) ) );
	max-height: calc( var(--slider-max-width) * ( 1px / var(--slider-img-aspect-ratio) ) );
}
.slider-button-container{ position: absolute; 	inset: 0; }
.slider-button-container input[type="range"]{
	position: absolute;
	inset: 0;
	cursor: pointer;
	opacity: 0; /* for Firefox */ 	
	width: 100%;
	height: 100%;
}
.slider-button-container::before{
	content: '';
	position: absolute;
	inset: 0;
	left: 0px;
	width: .2rem;
	height: 100%;
	background-color: #222;
	z-index: 10;
	left: var(--position);
	transform: translateX(-50%);
	pointer-events: none;
}
.slider-button {
	position: absolute;
	background-color: #222;
	color: #fafafa;
	padding: .5rem;
	border-radius: 100vw;
	display: grid;
	place-items: center;
	top: 50%;
	left: var(--position);
	transform: translate(-50%, -50%);
	pointer-events: none;
	z-index: 20; /* */
	box-shadow: 1px 1px 1px hsl(0, 50%, 2%, .5);
}
@media(max-width: 768px){
	// .slider-before-after-container{ --slider-max-width: 90vw; }
}

`
}

class ImageComparison extends HTMLElement {

	constructor() {
		super(); // HTMLElement의 constructor 호출
		this.attachShadow({ mode: 'open' });
		this._body = this.shadowRoot ;

		this._data = null;

		const sheet = new CSSStyleSheet();
		sheet.replaceSync( setCssStyle() );
		this.shadowRoot.adoptedStyleSheets = [ sheet];

		let tempURL = `"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="color photo"`;

		let beforeUrl = this.getAttribute('data-before') || tempURL;
		let afterUrl = this.getAttribute('data-after') || tempURL;
		
		this._body.innerHTML = `
			<div class="slider-before-after-container">
				<div class="slider-image-container">
					<div class="image-before slider-image">
						<img src="./data/${beforeUrl}" />
					</div>
					<div class="image-after slider-image">
						<img src="./data/${afterUrl}" />
					</div>
				</div>
				<!-- step="10" -->
				<label class="slider-button-container">
					<input type="range" min="0" max="100" value="50" aria-label="Percentage of before photo shown" />
					<div class="slider-button" aria-hidden="true">
						<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 256 256">
							<rect width="256" height="256" fill="none"></rect>
							<line x1="128" y1="40" x2="128" y2="216" fill="none" stroke="currentColor" stroke-linecap="round"
								stroke-linejoin="round" stroke-width="16"></line>
							<line x1="96" y1="128" x2="16" y2="128" fill="none" stroke="currentColor" stroke-linecap="round"
								stroke-linejoin="round" stroke-width="16"></line>
							<polyline points="48 160 16 128 48 96" fill="none" stroke="currentColor" stroke-linecap="round"
								stroke-linejoin="round" stroke-width="16"></polyline>
							<line x1="160" y1="128" x2="240" y2="128" fill="none" stroke="currentColor" stroke-linecap="round"
								stroke-linejoin="round" stroke-width="16"></line>
							<polyline points="208 96 240 128 208 160" fill="none" stroke="currentColor" stroke-linecap="round"
								stroke-linejoin="round" stroke-width="16"></polyline>
						</svg>
					</div>
				</label>
			</div>
		`;
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
		//this._body.addEventListener('click', this._clickHandler);
		const container = this._body.querySelector('.slider-before-after-container');
		this._body.querySelector('.slider-button-container input').addEventListener('input', (e) => {
			container.style.setProperty('--position', `${e.target.value}%`);
		})
	}
	
	disconnectedCallback() { // 컴포넌트가 DOM에서 제거될 때 호출
		//this._body.removeEventListener('click', this._clickHandler );
	}

	// 속성 값이 변경될 때 호출 (observedAttributes에 등록된 속성만 해당)
	attributeChangedCallback(name, oldValue, newValue) {
		if (name === 'mode' && oldValue !== newValue) {
            this._render();
        }
	}


}

customElements.define('image-comparison', ImageComparison);
