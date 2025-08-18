

import commonSheet from './styles/style-common.js';
import './member-profile.js'

function setCssStyle(){
	return `
	
:host([type="view"]) {
	position: relative; display: inline-flex; justify-content: center; 
}
:host([type="edit"]){ 
	display: flex;
	gap: 4px 8px;
	flex-wrap: wrap;
}
member-profile{ 
	border-radius: 100em; 
}
member-profile[type="view"]{ 
	width:38px;
	height: 38px;
	box-shadow: 0 0 0px 5px var(--section-background-color);  
}
:host([type="view"]) member-profile + member-profile{ margin-left: -8px; }


.plus-more{
	position: absolute;
	font-size: 12px;
	line-height: 1;
	padding: 2px 4px;
	box-shadow: 0 0 10px hsl(0 0% 0% / .05);
	border-radius: 100em;
	letter-spacing: 2px;
	bottom: -.7em;
	left: calc( 50% + .5em );
	z-index: 1;
	background-color: #fff;
}
.plus-more i{  font-style: inherit;  }

@media(max-width: 1024px){
	:host([type="view"]) member-profile + member-profile{ margin-left: -2px; }


}




	`;
}

class ProjectMember extends HTMLElement {

	constructor() {
		super(); // HTMLElement의 constructor 호출
		this.attachShadow({ mode: 'open' });

		this._data = null;
		this._body = this.shadowRoot;
		const sheet = new CSSStyleSheet();
		sheet.replaceSync( setCssStyle() );
		
		this.shadowRoot.adoptedStyleSheets = [ commonSheet, sheet ];
	}

	// 컴포넌트가 DOM에 추가될 때 호출
	connectedCallback() {
		this._render(); // 임시
	}
	
	disconnectedCallback() {
	}

	// --- 렌더링 및 내부 로직 메서드 ---
	_render() {

		const type = this.getAttribute('type');

		switch (type) {
			case 'loading':
				console.log("loading - ", this._items)
				this._body.innerHTML = 'loading';
				break;
			case 'view': console.log("view - ", this._items);
				this._body.innerHTML = `
				<member-profile type="${type}"></member-profile>
				<member-profile type="${type}"></member-profile>
				<span class="plus-more" class="추가 이미지 개수"><i class="icon">+</i>2</span>
				`;
				break;
			case 'edit':
				this._body.innerHTML = `
				<member-profile type="${type}"></member-profile>
				<member-profile type="${type}" test='2'></member-profile>
				<member-profile type="${type}" test='3'></member-profile>
				`;
				break;
		}
	}

}

customElements.define('project-member', ProjectMember);

// 마크업 함수 ===========================================


// projectDetail 전체 마크업

const MarkUp = {

	view : (item) => {
		return  `
		
	<div class="member-wrap">
		<figure class="member circle"><img src="/assets/img/common/icon-svg-no-user.svg" alt="참여자이름"><figcaption><span>참여자이름</span></figcaption></figure>

		<figure class="member circle no-member"><img src="/assets/img/common/icon-svg-folder-empth-member.svg" alt="참여자이름"><figcaption><span>참여자이름</span></figcaption></figure>

		<span class="plus-more" class="추가 이미지 개수">
			<i class="icon">+</i>2
		</span>
	</div>
		
		`
	},
	
}
