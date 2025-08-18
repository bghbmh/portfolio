
import commonSheet from './styles/style-common.js';
import * as DOM from './Utils-dom.js';
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
flex:0 1 10em;
	display: inline-flex; 
	min-width: 9em 
}
label i[class*="-svg2-"]{ 
	padding: 7px ; 
	border-radius: 100em;
	margin-left: auto;
}
label {
	flex: 1;
	position: relative;
	display: inline-flex;
	align-items: center;
	gap: 8px;
	min-height: 3em;
	border-radius: 100em;
	background-color: transparent;
	border: 1px solid var(--dark-50);
	padding: 0 .5em 0 .5em;
	padding-left: 0.8em;
	font-size: calc(1em - 1px);
	line-height: 1.3
}
label input[type="radio"] { border-radius: 100em;  }
label:has(input:checked){
	background-color: var(--primary-500);
	border-color: var(--primary-500);
	color: #fff;
}

`
}

class CategoryType3 extends HTMLElement {

	constructor() {
		super(); // HTMLElement의 constructor 호출
		this.attachShadow({ mode: 'open' });

		

		const sheet = new CSSStyleSheet();
		sheet.replaceSync( setCssStyle() );
		this.shadowRoot.adoptedStyleSheets = [ commonSheet, sheet];

		this._body = this.shadowRoot;
		
		// this._body = DOM.CreateElement({tag:'label' }); ;
		// this.shadowRoot.appendChild(this._body);

		// this._checkbox = DOM.CreateElement({tag:'input', type:'radio'}); 
		// this._icon = DOM.CreateElement({tag:'i', 'aria-hidden':'true'}); 

		// this._body.appendChild(this._checkbox) ;
		// this._body.appendChild(this._icon) ;

		this._body.innerHTML = `
			<label>
				<input type="radio" value="${this.dataset.value}" >${this.dataset.value} 
				<i class="${ct.cIcon[this.dataset.idx]}" aria-hidden="true"></i>
			</label>
		`;

		this._checkbox = this._body.querySelector('input');


		// 체크박스 변경 이벤트 리스너 추가
        this._checkbox.addEventListener('change', this._onInputChange.bind(this));

	}

    // --- 속성 Setter/Getter (프로그래밍 방식 접근용) ---
    // 'checked' 프로퍼티는 boolean으로 작동하도록 setter/getter를 정의합니다.
    get checked() {
        return this.hasAttribute('checked');
    }

    set checked(value) {
        const isChecked = Boolean(value);
        if (isChecked) this.setAttribute('checked', '');
        else  this.removeAttribute('checked');
        // attributeChangedCallback이 호출되어 _updateCheckboxState()가 실행됩니다.
    }

    get name() {
        return this.getAttribute('name');
    }

    set name(value) { console.log("type333    ===== setter")
        if (value) this.setAttribute('name', value);
        else this.removeAttribute('name');
    }

    get disabled() {
        return this.hasAttribute('disabled');
    }

    set disabled(value) {
        const isDisabled = Boolean(value);
        if (isDisabled) this.setAttribute('disabled', '');
        else this.removeAttribute('disabled');
    }	

	// observedAttributes를 정의하여 'checked', 'name', 'disabled' 속성 변경을 감지합니다.
    static get observedAttributes() {
        return ['checked', 'name', 'disabled'];
    }

	// --- 라이프사이클 콜백 ---
	connectedCallback() {// 컴포넌트가 DOM에 추가될 때 호출
        // 컴포넌트가 DOM에 추가될 때 초기 상태를 반영합니다.
        // attributeChangedCallback이 constructor 이후에 호출되므로,
        // 이곳에서는 속성이 이미 설정되어 있을 가능성이 높습니다.
        // 따라서 render() 대신 _updateCheckboxState()를 호출하는 것이 좋습니다.
        this._updateCheckboxState();
        this._updateCheckboxName();
        this._updateCheckboxDisabled();
	}
	
	disconnectedCallback() { 
		// 이벤트 리스너 제거 (메모리 누수 방지)
        if (this._checkbox) {
            this._checkbox.removeEventListener('change', this._onInputChange.bind(this));
        }
	}

    // observedAttributes에 정의된 속성 변경 시 호출
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            switch (name) {
                case 'checked':
                    this._updateCheckboxState();
                    break;
                case 'name':
                    this._updateCheckboxName();
                    break;
                case 'disabled':
                    this._updateCheckboxDisabled();
                    break;
            }
        }
    }

    // --- 내부 로직 메서드 ---

    // 체크박스 상태 업데이트
    _updateCheckboxState() {
        if (this._checkbox) {
            const isChecked = this.hasAttribute('checked');
            if (this._checkbox.checked !== isChecked) {
                this._checkbox.checked = isChecked;
            }
        }
    }

    // 체크박스 name 속성 업데이트
    _updateCheckboxName() {
        if (this._checkbox) {
            const name = this.getAttribute('name');
            if (name) {
                this._checkbox.setAttribute('name', name);
            } else {
                this._checkbox.removeAttribute('name');
            }
        }
    }

    // 체크박스 disabled 속성 업데이트
    _updateCheckboxDisabled() {
        if (this._checkbox) {
            const isDisabled = this.hasAttribute('disabled');
            this._checkbox.disabled = isDisabled;
        }
    }

    // input 요소의 change 이벤트 핸들러
    _onInputChange() {
        // 내부 체크박스의 상태를 웹 컴포넌트의 'checked' 속성에 반영합니다.
        // 이렇게 하면 외부에서 'checked' 프로퍼티를 통해 항상 최신 상태를 알 수 있습니다.
        this.checked = this._checkbox.checked;

        // 부모 컴포넌트가 변경을 감지할 수 있도록 'change' 이벤트를 다시 발생시킵니다.
        // `composed: true`는 쉐도우 DOM 경계를 넘어 이벤트가 버블링되도록 합니다.
        // `bubbles: true`는 이벤트가 DOM 트리를 위로 버블링되도록 합니다.
        this.dispatchEvent(new CustomEvent('change', {
            detail: { checked: this.checked, name: this.name },
            bubbles: true,
            composed: true
        }));
    }

}

customElements.define('category-type3', CategoryType3);

// 마크업 함수 ===========================================



