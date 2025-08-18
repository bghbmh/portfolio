

class CommonContainer extends HTMLElement {

	constructor() {
		super(); // HTMLElement의 constructor 호출
		const shadowRoot = this.attachShadow({ mode: 'open' });

		const sheet = new CSSStyleSheet();
		sheet.replaceSync(`	:host{
			display: block;
			
		}`);
		this.shadowRoot.adoptedStyleSheets = [sheet];
	}

}

customElements.define('common-container', CommonContainer);
