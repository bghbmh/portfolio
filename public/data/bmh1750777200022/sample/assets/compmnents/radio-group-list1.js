
import commonSheet from './styles/style-common.js';
import * as DOM from './Utils-dom.js';

const radioGroupList = `

:host { 

	display: flex;
	gap: 1em;
	flex-wrap: wrap;
	padding: 0px;
}

`;

class RadioGroupList1 extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        const sheet = new CSSStyleSheet();
        sheet.replaceSync( radioGroupList );
        this.shadowRoot.adoptedStyleSheets = [commonSheet, sheet];

        // _data 속성 초기화 (이곳에서 데이터를 받아와야 합니다)
        this._data = null;
        this._groupName = ''; // 라디오 버튼 그룹 이름

		this.shadowRoot.innerHTML = `<slot name="radio-option"></slot>`; 
    }

    // 부모로부터 데이터를 받을 때 사용할 setter
    set data(value) {

		//console.log("radio-group-list1 0000: ", value);

        if ( value ) {
            this._data = value;
            this._render(); // 데이터가 설정되면 렌더링
        } else {
            console.warn("RadioGroupList: 'data' 속성은 배열이어야 합니다.");
            this._data = { items: [], value: null};
            this._render();
        }
    }

    get data() {
        return this._data;
    }

    // 기본 선택 값을 설정하는 setter
    set selectedValue(value) {
        this._selectRadioByValue(value);
    }

    get selectedValue() {  console.log('selectedValue - ', this.querySelector('input[type="radio"]:checked') );
        const checkedRadio = this.querySelector('input[type="radio"]:checked');

        return checkedRadio ? {
								"name": checkedRadio.value,
								"type": checkedRadio.dataset.type,
								"label": checkedRadio.name
							} : null;
    }

    connectedCallback() {
        if (this.hasAttribute('group-name')) {
            this.groupName = this.getAttribute('group-name');
        }
    }

    _render() {
        
		this.querySelectorAll('label[slot="radio-option"]').forEach(label => label.remove());


		let checkedNum = Number(this._data.value) - 1;
        this._data.items.forEach((item, idx) => {
            const label = document.createElement('label');
			label.setAttribute('slot', 'radio-option');
			label.innerHTML = `
				<input type="radio" 
					${item.type ? `data-type="${item.type}" ` : ''}
					 value="${item.name}" name="${this.groupName}" ${checkedNum === idx ? 'checked' : ''}>${item.name}
				${item.icon ? `<i class="icon ${item.icon}" aria-hidden="true"></i>` : ''} `;
            
            this.appendChild(label);
        });
    }

    _addChangeListener() {
        this.addEventListener('change', (event) => {
            // 이벤트의 target이 input[type="radio"]인지 확인
            if (event.target.type === 'radio' && event.target.name === this.groupName) {
                // 새로운 CustomEvent를 생성하여 현재 선택된 value를 전달
                const customEvent = new CustomEvent('radio-change', {
                    bubbles: true, // 이벤트가 DOM 트리를 버블링하도록 설정
                    composed: true, // Shadow DOM 경계를 넘어가도록 설정
                    detail: {
                        value: event.target.value,
                        element: this // 웹 컴포넌트 자체를 전달
                    }
                });
                this.dispatchEvent(customEvent);
            }
        });
	}
	
}

customElements.define('radio-group-list1', RadioGroupList1);

// 마크업 함수 ===========================================



