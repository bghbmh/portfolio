
import commonSheet from './styles/style-common.js';
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
	// CSS 파일 연결
	return `

:host {
flex: 0 0 auto;
  display: inline-flex;
  gap: 12px;
  font-size: 1em;
  line-height: 1.3;
  align-items: center;

}

span{
font-size: 1em;
  color: var(--font-color-default);
}

`
}

class CategoryType2 extends HTMLElement {

	constructor() {
		super(); // HTMLElement의 constructor 호출
		this.attachShadow({ mode: 'open' });

		this._body = this.shadowRoot;
		this._data = {
				main : Number(this.dataset.main),
				sub : Number(this.dataset.sub)
			};

		const sheet = new CSSStyleSheet();
		sheet.replaceSync( setCssStyle() );
		this.shadowRoot.adoptedStyleSheets = [commonSheet, sheet];

		this._body.innerHTML = `
			<div class="text">
				<span data-type="${this._data.main}">${ct.main[this._data.main - 1]}</span>/
				<span data-type="${this._data.sub}">${ct.sub[this._data.sub - 1]}</span>
			</div>
		`;

	}
}

customElements.define('category-type2', CategoryType2);

// 마크업 함수 ===========================================



