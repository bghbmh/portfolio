import * as DOM from './Utils-dom.js';
import { NAME } from './config.js';


const cssText = `
	:host{
			display: block;
	} 
	.hello{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		min-height: 90vh;

		position: relative;
		z-index: 1;
		padding: 0 1em;
		box-sizing: border-box;
	}
	header{
		display: block;
		width: 100%;
		margin-top: -8em;
		transition: all .3s;
	}
	h2{
		margin:0;
		padding: 0;
	}
	h2 .h2g{
		position: relative;
		display: flex;
			justify-content: center;
			align-items: center;
			gap: 24px;
			width: 100%;
		font-size: 1em;
		z-index: 1;
		transition: all .7s;
		margin: 0;
		line-height: 1;
		font-family: "Paperlogy";
		font-weight: 900;	
		padding: 0 12px;
		box-sizing: border-box;

		height: 100px;
		transition: all .3s;
	}
	.h2g + .h2g{ margin-top: -1em }
	h2  .g{
		display: flex;
		    justify-content: center;
		flex: 0 1 auto;
		flex-wrap: wrap;
		gap: 24px;
	}
	h2 .g svg{ transform: scale(.5); }

	h2 .ga{
		display: flex;
		    justify-content: center;
		flex: 0 1 auto;
		flex-wrap: wrap;
		gap: 24px;
	}
	h2 .a{ 
		display: block; 
		    transform: scale(.5);
	}
	@media(min-width: 768px){
		h2 .h2g{ height: auto; 	}
		header{ margin-top: 0; }
	}




	h2 .color svg path{
		fill:hsl(205deg 20.9% 13.62% / 87%);
		stroke: hsl(0 100% 100% / 1);
	}
	h2 svg{ transform: scale(.5);  transform-origin: center center; }
 	@keyframes rotate {
		from {
			transform: rotate(0deg) scale(.5);
		}
		to {
			transform: rotate(360deg) scale(.5);
		}
	}

	
	h2 img{   max-width: 100%; width: auto; }
	h2::after{
		position: absolute;
		display: none;
		white-space: nowrap;
		content: attr(data-title);
		color: transparent;
		-webkit-text-stroke: 0.5px #494949;
		top: 3px;
		left: 4px;
		z-index: -1;
	}
	/*
	<h2 data-title="박민희">
		<span>박</span>
		<span>민</span>
		<span>희</span>
	</h2>*/
	h2 .text{ 
		position: relative; 
		display: inline-block; 
		background-size: 3px 3px;
		background-image: linear-gradient( 0deg, hsla(0,0%,0%,0) 0, hsla(0,0%,28%,1) 3px), linear-gradient( 90deg, hsla(0,0%,0%,0) 0, hsla(0,0%,10%,1) 5px);
		-webkit-background-clip: text;
		color: transparent;
		line-height: 1;

		font-size: 130px;
	}
	



	.hello .contents-wrap {
		width: calc(100% - 40px);
		max-width: 1440px;
		margin-left: auto;
		margin-right: auto;

			display: flex;
		flex-direction: column;
		align-items: center;
	}
	.job{ 
		display: flex;
		justify-content: center;
		gap: 8px;
		font-size: 16px; 
		margin : 1em;

		font-family: "Paperlogy"; 
	}
	.job > *{ margin: 0; padding: 0; }
	.job small{ font-size: 80%; font-weight: 300;}
	.job strong{ font-weight: 900; }
	.overview{ 
	font-family: "Paperlogy"; 
		font-size: 15px; line-height: 1.9; word-break: keep-all;   
	}
	@media(min-width: 768px){
		/* .hello h2{ font-size: 130px; } */
		.hello h2::after{ top: 6px; left: 10px; }
		.job{ font-size: 20px;  }
		.overview{ font-size: 17px; line-height: 1.6;   }
	}



	.text-animation{
		-webkit-user-select: none;
		user-select: none;
		pointer-events: none;
		position: absolute;
		width: calc(100% + 0px);
		height: auto;
		overflow: hidden;
		left: 0px;
		top: 100%;
		z-index: -1;
		transform: translateY(-87%);

		/*! scale: .8; */
	}
	.textLoop {
		animation: textLoop 30s linear infinite;
		background-image: url("/assets/img/common/ㅂㅁㅎ3.svg") ;
		background-repeat: repeat-x;
		background-size: auto;
		width: calc(100% + ( 1062px ));
		height: 160px;
		backface-visibility: hidden;
		will-change: transform;
		opacity: .3; 
		/* scale: .8; */
	}
	.textLoop.type2{ background-image: url("/assets/img/common/ㅂㅁㅎ.svg") ;  opacity: 1;  }
	@keyframes textLoop {
		100% { transform: translate3D(-1062px, 0, 0); }
	}


	.mouse {
		position: absolute;
		width: 2.5em;
		height: 4em;
		border: 4px solid rgb(31, 43, 61);
		border-radius: 10em;
		z-index: 0;

		bottom: 5em;
		font-size: 12px;
		transition: all .3s;
	}
	.mouse::before {
		content: "";
		width: 11px;
		height: 11px;
		position: absolute;
		top: 10px;
		left: 50%;
		transform: translateX(-50%);
		background-color: rgb(255, 121, 114);
		border-radius: 100px;
		opacity: 1;
		animation: 2s infinite wheel;
		z-index: 5;
	}
	@keyframes wheel {
		to {
			opacity: 0;
			top: 60px;
		}
	}
		@media(min-width: 768px){
			.mouse { bottom: 1em; }
		}

`;

class HelloEveryone extends HTMLElement {

	constructor() {
		super(); // HTMLElement의 constructor 호출
		this.attachShadow({ mode: 'open' });

		const sheet = new CSSStyleSheet();
		sheet.replaceSync( cssText );
		this.shadowRoot.adoptedStyleSheets = [ sheet];

		this.shadowRoot.innerHTML = `
		<section class="hello">
			<header>
				<!--
				<h2 aria-label="박민희">
					<div class="ga">
						<span class="a">${NAME.ㅂ}</span>
						<span class="a">${NAME.ㅏ}</span>
						<span class="a">${NAME.ㄱ}</span>
						</div>
						<div class="ga">
						<span class="a">${NAME.ㅁ}</span>
						<span class="a">${NAME.ㅣ}</span>
						<span class="a">${NAME.ㄴ}</span>
						</div>
						<div class="ga">
						<span class="a">${NAME.ㅎ}</span>
						<span class="a">${NAME.ㅢ}</span>
					</div>
				</h2>

				<h2 aria-label="박민희">
					<span class="g">${NAME.ㅂ}${NAME.ㅏ}${NAME.ㄱ}</span>
					<span class="g">${NAME.ㅁ}${NAME.ㅣ}${NAME.ㄴ}</span>
					<span class="g">${NAME.ㅎ}${NAME.ㅢ}</span>
				</h2>
				-->

				<h2 aria-label="박민희">
					<span class="h2g">${NAME.ㅂ}${NAME.ㅏ}${NAME.ㄱ}${NAME.ㅁ}${NAME.ㅣ}${NAME.ㄴ}${NAME.ㅎ}${NAME.ㅢ}</span>
					<span class="h2g">${NAME.ㅂ}${NAME.ㅏ}${NAME.ㄱ}${NAME.ㅁ}${NAME.ㅣ}${NAME.ㄴ}${NAME.ㅎ}${NAME.ㅢ}</span>
					<span class="h2g color">${NAME.ㅂ}${NAME.ㅏ}${NAME.ㄱ}${NAME.ㅁ}${NAME.ㅣ}${NAME.ㄴ}${NAME.ㅎ}${NAME.ㅢ}</span>
					<span class="h2g">${NAME.ㅂ}${NAME.ㅏ}${NAME.ㄱ}${NAME.ㅁ}${NAME.ㅣ}${NAME.ㄴ}${NAME.ㅎ}${NAME.ㅢ}</span>
				</h2>
				

					
			</header>
			<div class="contents-wrap">
				<div class="job">
					<p><small>UXUI</small> <strong>design</strong></p>
					<span>+</span>
					<p><small>UXUI</small> <strong>development</strong></p>
				</div>
				<div class="overview">
					UX/UI 디자이너이자 웹 퍼블리셔로, 구조 설계와 반응형 UI, 접근성 개선에 강점을 갖고 있습니다. Figma, HTML/CSS, JavaScript를 주로 사용하며, 사용자 경험 중심의 문제 해결에 집중합니다.
				</div>
			</div>

			<section class="bg text-animation">
				<div class="textLoop"></div>
			</section>
			
			<div class="mouse"></div>


		</section>			
		`;
	}

	static get observedAttributes() {
		return ['mode'];
	}

	connectedCallback() { 
		//this._body.addEventListener('click', this._clickHandler);

		const animatedSvgElements = this.shadowRoot.querySelectorAll('svg');
		
		animatedSvgElements.forEach((element, index) => {
			const rotationCount = (index % 2 === 0) ? 2 : 1; // 짝수 2회전, 홀수 1회전
			const duration = `${rotationCount/3}s`; // 회전 횟수에 따라 애니메이션 지속 시간 설정 (1회전에 1초)
			const delay = `${index * 0.25}s`; // 0.25초씩 순차적으로 애니메이션 시작

			element.style.animation = `rotate ${duration} linear ${rotationCount} forwards ${delay}`;
		});

	}

	disconnectedCallback() { 
		//this._body.removeEventListener('click', this._clickHandler );
	}

}

customElements.define('hello-everyone', HelloEveryone);

