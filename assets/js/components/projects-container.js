import * as DOM from './Utils-dom.js';
import './project-item.js';

const noitem = `<svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.93458 10C3.93458 6.13401 7.06858 3 10.9346 3C14.8006 3 17.9346 6.13401 17.9346 10C17.9346 13.866 14.8006 17 10.9346 17C9.8524 17 8.82637 16.7541 7.91046 16.3148L4.53264 16.9903C4.35271 17.0263 4.16752 16.9609 4.05018 16.8198C3.93284 16.6787 3.90219 16.4847 3.97034 16.3143L5.00642 13.7241C4.3274 12.6453 3.93458 11.3679 3.93458 10ZM10.9346 7.125C10.3823 7.125 9.93457 7.57271 9.93457 8.125C9.93457 8.53921 9.59878 8.875 9.18457 8.875C8.77036 8.875 8.43457 8.53921 8.43457 8.125C8.43457 6.74429 9.55386 5.625 10.9346 5.625C12.3153 5.625 13.4346 6.74429 13.4346 8.125C13.4346 9.24441 12.6989 10.192 11.6846 10.5106V10.625C11.6846 11.0392 11.3488 11.375 10.9346 11.375C10.5204 11.375 10.1846 11.0392 10.1846 10.625V9.875C10.1846 9.46079 10.5204 9.125 10.9346 9.125C11.4869 9.125 11.9346 8.67728 11.9346 8.125C11.9346 7.57271 11.4869 7.125 10.9346 7.125ZM10.9346 12.375C11.4869 12.375 11.9346 12.8227 11.9346 13.375C11.9346 13.9273 11.4869 14.375 10.9346 14.375C10.3823 14.375 9.93457 13.9273 9.93457 13.375C9.93457 12.8227 10.3823 12.375 10.9346 12.375Z" fill="url(#paint0_linear_141_2839)"/>
<defs>
<linearGradient id="paint0_linear_141_2839" x1="19.1476" y1="19.9651" x2="0.263571" y2="6.55106" gradientUnits="userSpaceOnUse">
<stop stop-color="#FFD600"/>
<stop offset="1" stop-color="#FF007A"/>
</linearGradient>
</defs>
</svg>`;

const cssText = `
	:host{
			display: flex;
		flex-direction: column;
		
		border-top: 1px dotted var(--item-border-color);
		
		border-bottom: 1px dotted var(--item-border-color);
	} 
	project-item + project-item{
		border-top: 1px dotted var(--item-border-color);
	}

	.noitem{
		display: flex;
		flex-direction: column;
		gap: 12px;
		width: 100%;
		max-width: 1280px;
		align-items: center;
		margin: auto;
		justify-content: center;
		min-height: 65vh;
		border-left: 1px dotted var(--item-border-color);
  border-right: 1px dotted var(--item-border-color);
		font-weight: 400;
		font-size: 24px;
		font-family: "Paperlogy";
	}
	.noitem svg{  transform: scale(1.5);	}

`;

class ProjectsContainer extends HTMLElement {

	constructor() {
		super(); // HTMLElement의 constructor 호출
		this.attachShadow({ mode: 'open' });

		this._rawdata = null;
		this._mainItem = null;

		const sheet = new CSSStyleSheet();
		sheet.replaceSync( cssText );
		this.shadowRoot.adoptedStyleSheets = [ sheet];
	}

	static get observedAttributes() {
		return ['mode', 'selected'];
	}

	// observedAttributes에 정의된 속성 변경 시 호출
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            switch (name) {
                case 'selected':
					const selectedNames = JSON.parse(newValue);
					let dd = null;
					if( selectedNames.includes("all") ){
						dd = [...this._rawdata];
					} else {
						const filteredItems = selectedNames.flatMap(name =>
							this._rawdata.filter(d => d.category[0].name === name)
						);
						dd = [...new Set(filteredItems)];
					}
					//console.log("items - ", dd )
					this._setItems(dd);
                    break;
                case 'name':
                    //this._updateCheckboxName();
                    break;
                case 'disabled':
                    //this._updateCheckboxDisabled();
                    break;
            }
        }
    }

	connectedCallback() { 
		this._loadInitData();
		//this._body.addEventListener('click', this._clickHandler);
	}

	disconnectedCallback() { 
		//this._body.removeEventListener('click', this._clickHandler );
	}

	async _loadInitData( ) {   

		try {
			this._rawdata = await jsonDB('../data/testDB.json'); 	
			this._setItems(this._rawdata);		
			this.setAttribute('mode', 'view'); // 데이터 로드 완료 후 'view' 모드로 변경
			
		} catch (error) {
			console.error('[InitialLoad] 데이터 로딩 오류:', error);
			this.setAttribute('mode', 'error');
		}
	}

	_setItems( renderData ){
		//let cc = this._rawdata.filter( it =>it.mainOpen );
		this.shadowRoot.innerHTML = '';
		console.log("ccc ", renderData)
		if( renderData === null || !renderData.length ){
			this.shadowRoot.innerHTML = `<div class="noitem">
			${noitem}<div>준비 중입니다</div>
			</div>`;
		}
		
		renderData.forEach( item => {
			const a = DOM.CreateElement({ tag: 'project-item' });
			this.shadowRoot.appendChild(a);
			a.data = item;
		});
	}
}

customElements.define('projects-container', ProjectsContainer);


async function jsonDB(router) {
	try {
		const response = await fetch( router, { method: 'GET' });
		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(` error! status: ${response.status}, message: ${errorText}`);
		}
    	const result = await response.json();
		return result;
	} catch (error) {
		console.error('전송 중 오류 발생:', error);
    	throw error;
	}
}