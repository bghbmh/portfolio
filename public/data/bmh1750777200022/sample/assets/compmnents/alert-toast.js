

import * as DOM from './Utils-dom.js';
import commonSheet from './styles/style-common.js';
// CSS 파일 연결
const modalStyles = `
:host {
   display: block; /*  기본적으로 숨김 */
    position: fixed ; /* 뷰포트 기준으로 위치 고정 */
    bottom: 5em ;
    right: 5em ;
    height: auto ; /* 뷰포트 높이 전체 */


width: 100% ;
  max-width: 350px;
  font-size: .875rem;
  background-color: rgba(255,255,255,.85);
  background-clip: padding-box;
  box-shadow: 0 .5rem 1rem rgba(0,0,0,.15);
  border-radius: .25rem;

	
    z-index: 1000 ; /* 다른 콘텐츠보다 위에 오도록 */
}

:host(.show){

}

.btn-close{
	position: absolute;
	right: 1em;
	top: 1em;
}



`;

class AlertToast extends HTMLElement {

	constructor() {
		super(); // HTMLElement의 constructor 호출
		this.attachShadow({ mode: 'open' });
		
		const sheet = new CSSStyleSheet();
		sheet.replaceSync(modalStyles);
		this.shadowRoot.adoptedStyleSheets = [ commonSheet, sheet ];

		this._body = this.shadowRoot;
		this._initBody();

		//this._ClickHandler = this._onClick.bind(this); 

	}

	_initBody() {
        // 컴포넌트의 기본 HTML 구조 설정
		const closeBtn = DOM.CreateElement({
			tag: 'button',
			type : "button" ,
			class : "btn-close" ,
			part : "btn-close" ,
			'data-action' : "modal-close" ,
			'data-bs-dismiss' : "modal", 
			'aria-label' : "알림메시지 닫기 버튼"
		});
		
		closeBtn.addEventListener("click", (e) => { 
			this.remove(); 
		} , { once : true})
		this._body.appendChild(closeBtn);

		const header = DOM.CreateElement({tag:'slot', name : 'toast-header'});
		const body = DOM.CreateElement({tag:'slot', name : 'toast-body'});

        this._body.appendChild(header);
		this._body.appendChild(body);

		const ALERT_DURATION = 3000; 
		setTimeout(() => {  this.remove(); }, ALERT_DURATION);

    }

} 

customElements.define('alert-toast', AlertToast);


// 마크업 함수 ===========================================
