

const cssText = `
	:host{
		position: relative;
	} 
	footer.common{
		margin-top: -100vh;
	}
footer.common:before{
	content: '';
	display: block;
	height: 100vh;
	position: relative;
	z-index: 0;
	

}
footer.common .contents-wrap {
	position: -webkit-sticky;
    position: sticky;
    bottom: 0;
    overflow: visible;
    padding: 13em 1.5em 2em;
    color: #fff;
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    background-color: #1f262e;
    margin-bottom: 0px;
    box-sizing: border-box;
   
}
footer.common .contents-wrap a[href*="mailto"]{
	color: #fff;
	font-size: 1.5em;
	font-family: 'Oceanwide';
	font-weight: 600;
	transition: all .2s;
	text-decoration: none;
  padding: 0px 2px;
  cursor: pointer;
}
footer.common .madein{
	display: inline-flex;
	transform: rotate(-90deg) translate(-20%, 250%);
	transform-origin: 0 0;
	flex: none;
	align-self: end;
	font-size: 12px;
}

p{ margin: 8px 0; padding: 0; }


@media(min-width: 768px){
	footer.common .contents-wrap a[href*="mailto"]{ font-size: 2.5em; }
}
@media(min-width: 1024px){
	footer.common .contents-wrap { padding: 13em 3em 2em; }
	footer.common .contents-wrap a[href*="mailto"]{ font-size: 4.5em; }
}
@media(min-width: 1440px){
	footer.common .contents-wrap { max-width: calc( 100% - 80px);  margin-left: 40px;
    margin-right: 40px;  }
}
@media(min-width: 1920px){
	footer.common .contents-wrap { max-width: 1920px; margin-left: auto;
    margin-right: auto; margin-bottom: 0px; }
}
	
	
`;


class CommonFooter extends HTMLElement {

	constructor() {
		super(); // HTMLElement의 constructor 호출
		this.attachShadow({ mode: 'open' });

		const sheet = new CSSStyleSheet();
		sheet.replaceSync( cssText );
		this.shadowRoot.adoptedStyleSheets = [ sheet];

		this.shadowRoot.innerHTML = `
		<footer class="common">
			<div class="contents-wrap">
				<div>
					<a class="btn btn-link" href="mailto:bghbmh@gmail.com">bghbmh@gmail.com</a>
					
					<p><small>html + css + javascript + react  + nodejs = 박민희</small></p>
					<p><small>{ react  , nodejs }  ⊂  beginner</small></p>
				</div>
				<span class="madein">ⓒ 2025 ㅂㅁㅎ</span>
			</div>
		</footer>
		`
		//this._bindUiClickHandler = this._uiClickHandler.bind(this); 
	}

}

customElements.define('common-footer', CommonFooter);

