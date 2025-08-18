
import commonSheet from './styles/style-common.js';

function setCssStyle(){
	// CSS 파일 연결
	return `

:host { display: inline-flex; }

label { 
	
	--size : calc(2em + 4px);
	cursor: pointer; /* label 클릭 가능함을 표시 */

	display: inline-flex; /* label이 var(--size) 너비를 가질 수 있도록 */
	align-items: center;
	gap: .5em;
	line-height: 0;
}

label .switch{
	-webkit-appearance: none; /* 기본 스타일 제거 (크롬, 사파리) */
	-moz-appearance: none;    /* 기본 스타일 제거 (파이어폭스) */
	appearance: none;         /* 기본 스타일 제거 */

	position: relative; 
	justify-content: flex-start;
	border-radius: 100em;
	height: var(--size);
	width: calc( var(--size) + 1.5em );
	margin: 0px 0px;
	border-color: transparent;
	background-color: var(--dark-300);
	outline: none; /* input 자체의 기본 포커스 아웃라인 제거 */
    cursor: pointer; /* input 자체도 클릭 가능함을 표시 */
}

label .switch:before{
	position: absolute;
	content: "";
	display: block;
	width: calc( var(--size) - 4px);
	height: calc( var(--size) - 4px);
	background-color: hsl(0, 0%, 100%);
	border-radius: 100em;
	mask-image: none;
	line-height: 1;
	padding-top: 0px;
	left: 2px;
	top: 2px;
	transition: left .15s ease-in-out, background-color .15s ease-in-out;
}
.switch:focus-within { 
	/* 내부 input에 포커스가 있을 때 label에 포커스 스타일 적용 */
	outline: 4px solid var(--form-focus-outline-color,rgb(195, 222, 250)); /* --form-focus-color 변수 사용 */
	outline-offset: 0px;
	border-radius: 100em;
}

label .switch:checked{
	background-color: var(--form-checked-bg-color, #007bff); 
}

label .switch:checked::before{
	left : calc(100% - 2px - ( var(--size) - 4px ) );
	background-color:#fff;
}

/* 비활성화 상태 스타일 */
label .switch:disabled {
	opacity: 0.6;
	cursor: not-allowed;
}
label .switch:disabled::before {
	background-color: #f0f0f0; /* 비활성화 시 핸들 색상 변경 */
}

`
}

class SwitchType1 extends HTMLElement {

	constructor() {
		super(); // HTMLElement의 constructor 호출
		this.attachShadow({ mode: 'open' });

		this._body = this.shadowRoot;
		this._checkbox = null; // 체크박스 요소에 대한 참조를 저장할 변수

		const sheet = new CSSStyleSheet();
		sheet.replaceSync( setCssStyle() );
		this.shadowRoot.adoptedStyleSheets = [ sheet];

		this._checkbox = null;

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

    set name(value) {
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
		console.log("switch-type1 - guide - ", this.getAttribute('guide'))

		let guide = this.getAttribute('guide');
		this._body.innerHTML = `
		<label part="switch">
			${ guide ? `<span class="guide">${guide}</span>` : '' }
			<input type="checkbox" class="switch">
		</label>
		`;
		this._checkbox = this._body.querySelector('input[type="checkbox"]');
		this._checkbox.addEventListener('change', this._onInputChange.bind(this));

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

customElements.define('switch-type1', SwitchType1);

// 마크업 함수 ===========================================



