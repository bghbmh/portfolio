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
import { MAIN_CATEGORY, SUB_CATEGORY  } from './config.js';
import * as DOM from './Utils-dom.js';
import { getFileUrl, CheckFilesInFolder } from './Utils-api.js';
import { DispatchCustomEvent } from './Utils-event.js';

import commonSheet from './styles/style-common.js';
import { UploadFiles } from '../assets/js/custom-library/bUploadFile/export-bUploadFile.js';

import './current-state.js';
import './project-category.js';
import './extra-info.js';

import './external-link.js';
import './project-member.js'
import './preview-file.js'
import './file-uploader.js';
import './switch-type1.js';
import './category-type2.js';
import './category-type3.js';
import './radio-group-list1.js';
import './text-icon.js';
import './alert-toast.js';

class ProjectDetail extends HTMLElement {

	constructor() {
		super(); // HTMLElement의 constructor 호출
		this.attachShadow({ mode: 'open' });

		this._item = null;
		this._fileItems = {}; // 비동기로 가져올 file 데이터 저장 변수
		this._body = null;

		this.shadowRoot.adoptedStyleSheets = [ commonSheet ];
		this.loadStylesSheets([
            '/assets/js/custom-library/bUploadFile/bUploadFile.css',
			'/components/styles/projectDetail.css'
		]);
		

		this._ClickHandler = this._onClick.bind(this); 
		this._SubmitHandler = this._onSubmit.bind(this); 

		this._default = {
				"mainOpen": false,
				"mainOpenImages": [],
				"category": [],
				"hash": [],
				"title": "",
				"description": "",
				"extraInfo": {},
				"mainimage": [],
				"subimage": [],
				"sampleName": "",
				"samplePage": [],
				"order": 0,
				"externalLink": {},
				"projectNum": 0,
				"ID": "",
				"projectState": "",
				"member": []
			};

		this._initBody();
	}

	async loadStylesSheets( cssFilePaths ) {
        try {
			const loadedSheets = await Promise.all(
				cssFilePaths.map(path => this.getStyleSheet(path))
			);

			this.shadowRoot.adoptedStyleSheets = [
				...this.shadowRoot.adoptedStyleSheets,
				...loadedSheets
			];
        } catch (error) {
            console.error('Failed to apply all stylesheets:', error);
        }
    }
	
	async getStyleSheet(cssPath) {
        try {
            const response = await fetch(cssPath);
            if (!response.ok) {
                throw new Error(`Failed to load CSS: ${response.statusText} from ${cssPath}`);
            }
            const cssText = await response.text();
            const sheet = new CSSStyleSheet();
            sheet.replaceSync(cssText);
            return sheet;
        } catch (error) {
            console.error(`Error loading stylesheet ${cssPath}:`, error);
            return new CSSStyleSheet();
        }
    }

	_initBody() {
        // 컴포넌트의 기본 HTML 구조 설정
        this._body = document.createElement("section");
        this._body.setAttribute("class", "section type2 project-detail");
        this.shadowRoot.appendChild(this._body);
		this._body.addEventListener('click', this._ClickHandler);
    }

	// --- 속성 및 데이터 Getter/Setter ---
	// item 데이터를 설정하는 getter/setter (외부에서 컴포넌트 생성 후 데이터를 넘길 때 유용)
	set item(itemData) {
		//this._item = itemData;
		this._loadInitData(itemData);
	}

	get item() {
		return this._item;
	}

	set mode(mode) {
		this.setAttribute('mode', mode);
	}

	get mode() {
		return this.getAttribute('mode');
	}

	static get observedAttributes() {
		return ['mode'];
	}

	create(){
		this.setAttribute('mode', 'loading');
		this._create( this._default );
	}

	_create( defaultData){ 
		this._item = defaultData;
		this.setAttribute('mode', 'create');
		this._render();
	}

	// --- 라이프사이클 콜백 ---
	connectedCallback() { // 컴포넌트가 DOM에 추가될 때 호출
		
		console.log('ProjectDetail connected!');

		this._body.setAttribute('theme', document.body.getAttribute('data-theme'));
		this.observer = new MutationObserver(this.handleBodyMutations.bind(this));

		// document.body의 속성 변경을 감지하도록 Observer 시작
		this.observer.observe(document.body, {
			attributes: true, // 속성 변경 감지
			attributeFilter: ['data-theme'] // 'data-theme' 속성만 감지하도록 필터링
		});
	}	

	disconnectedCallback() {
		this._body.removeEventListener('click', this._ClickHandler );
		this.observer.disconnect();
	}

	// 속성 값이 변경될 때 호출 (observedAttributes에 등록된 속성만 해당)
	attributeChangedCallback(name, oldValue, newValue) {
		if (name === 'mode' && oldValue !== newValue) {
            this._render();
        }
	}

	// body의 변화를 감지했을 때 호출될 콜백 함수
	handleBodyMutations(mutationsList) {

		console.log(` ///////////////////// test data-theme ${mutationsList} `);


		for (const mutation of mutationsList) {
			if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
				const newTheme = document.body.getAttribute('data-theme');
				console.log(`웹 컴포넌트: document.body의 data-theme이 ${newTheme}로 변경되었습니다.`);

				this._body.setAttribute('theme', newTheme);
				// 여기에 변경된 테마에 따라 웹 컴포넌트의 스타일을 업데이트하는 로직을 추가합니다.
				// 예: CSS 변수 업데이트, 특정 클래스 추가/제거 등
				//this.updateTheme(newTheme);
			}
        }
	}

    // --- 데이터 처리 ---
	async _setFilesData(item) { console.log("_setFilesData - " )

		this._fileItems.mainimage = await getFileUrl('image', [...this._item.mainimage]) ; 
		this._fileItems.subimage = await getFileUrl('image', [...this._item.subimage]) ;
		this._fileItems.samplePage = await  getFileUrl('sample', [...this._item.samplePage]) ;

	}

    async _loadInitData( itemData = null) {    console.log("_loadInitData - ", itemData );
        if (!itemData) {
            this.setAttribute('mode', 'empty');
            return;
        }
        this.setAttribute('mode', 'loading');
		this._item = itemData;

		try {
			await this._setFilesData(this._item);
			this.setAttribute('mode', 'view'); // 데이터 로드 완료 후 'view' 모드로 변경
		} catch (error) {
			console.error('[InitialLoad] 데이터 로딩 오류:', error);
			this.setAttribute('mode', 'error');
		}
    }

	setFormData(form, formData, action){

		//const formData = new FormData();
		if( action === 'update' ){
			formData.append('projectNumber', form.dataset.pn );		
			formData.append('update', form.dataset.pn);
		}

		let mainOpenSwitch = this._body.querySelector('switch-type1[name="mainOpen"]');

		let maincategory = this._body.querySelector('#maincategory').selectedValue;
		let subcategory = this._body.querySelector('#subcategory').selectedValue;

		let mainimage = setfile( this._body.querySelector('#mainImageUploader').zuFile, "mainimage");
		let subimage = setfile( this._body.querySelector('#subImageUploader').zuFile, "subimage");
		let samplePage = setfile( this._body.querySelector('#samplePageUploader').zuFile, "samplePage", form.samplePagelabel);
		let externalLinks = setExtra( this._body.querySelectorAll('external-link') ) ;
		let extraInfo = setExtra( this._body.querySelectorAll('extra-info') ) ;
		let projectState = this._body.querySelector('current-state').state;

		let projectData = {
			mainOpen : mainOpenSwitch.checked,
			mainOpenImages : setfile(form.mainOpenImages, "mainOpenImages") ,//
			category : [ maincategory, subcategory],
			'hash' : [...form.hash].filter( h =>  h.checked ).map( el => el.value ),
			title : form.headline.value !== '' ? form.headline.value : '',
			description : form.description.value,
			'extraInfo': extraInfo,
			'externalLink': externalLinks,
			"mainimage" : mainimage,
			"subimage" : subimage,
			"sampleName" : form.samplename.value,
			"samplePage" : samplePage,
			'projectState' : projectState,
			"member": []
		};
		
		function setfile(ff, label, options){
			if( !ff   ){console.log("파일없음", label)
				return [];
			}
			
			let files = [...ff.getSelectedFiles()];
			let arr ;
			let pLabel ;
			arr = files.map(function(f, idx){
				formData.append(label, f);
				if( label === "samplePage" ){   
					if( options.length ) pLabel = [...options].find(s => s.dataset.fileName === f.name );
					else pLabel = options;
					
					let str = pLabel.value === '' ? 'sample' + idx : pLabel.value;
					return { label : str, alt : '', ...fileDataInfo(f)}
				} else {
					return { alt : '', ...fileDataInfo(f)};
				}
			}); console.log("=================samplePage  options", arr)
			
			return arr;
		}

		function fileDataInfo(f){
			return { name : f.name, size :  f.size, type: f.type, lastModified : f.lastModified }
		}

		function setExtra(extra){
			let box = {};
			if( !extra ) return box;
			for( let i=0; i<extra.length; i++ ){
				box[extra[i].data.label] = extra[i].data.value ;
			}
			return box;
		}

		formData.append('myData', JSON.stringify(projectData) );
		
		console.log('////////// - ',formData, projectData )

		//return formData;
	}

	// --- 렌더링 및 내부 로직 메서드 ---
	_render() { 
		if (!this._body) return;

        const mode = this.getAttribute('mode');
		
        switch (mode) {
            case 'loading':
                this._body.innerHTML = MarkUp.loading();
                break;
			case 'create':   console.log("_create project 333- ", this._item)
				this._body.innerHTML = '';
				this._initSetting({
					main : { items : MAIN_CATEGORY, value : null },
					sub : { items : SUB_CATEGORY, value : null }
				}, 'create', '새 프로젝트 만들기');
                break;
            case 'edit':
				this._body.innerHTML = '';
		
                this._initSetting({
					main : { items : MAIN_CATEGORY, value : this._item.category[0].type },
					sub : { items : SUB_CATEGORY, value : this._item.category[1].type }
				}, 'edit', '프로젝트 수정하기');

                break;
            case 'view':
				this._body.dataset.pn = this._item.projectNum;
                this._body.innerHTML = MarkUp.view(this._item, this._fileItems);
                break;
            case 'error':
                 this._body.innerHTML = '<div>데이 불러오는데 문제 생김</div>';
                 break;
            case 'empty':
            default:
                this._body.innerHTML = '<div>데이터 없음/div>';
                break;
        }
        
	}

	_onClick(e){ 
		const button = e.target.closest("button");
		
		if( button && button.type ==="submit" ){
			console.log("_onClick - action : ",  e.target );
		}
		if (!button || button.type ==="submit" ) return;

		const action = button.dataset.action ;
		if (!action) return;

		e.preventDefault();

		switch (action) {
			case "view":
				this.setAttribute('mode', 'view');
				break;
			case "edit":
				this.setAttribute('mode', 'edit');
				break;
			case "ui":
				let uiWrap = this._body.querySelector('#' + button.dataset.uiAdd );
				uiWrap.appendChild( DOM.CreateElement({
					"tag":button.dataset.uiAdd, 
					"type": button.dataset.uiType,
					"data-label" : '',
					"data-value" : ''
				}) );
				console.log('ui - ',uiWrap ,  button.dataset.uiAdd );
				break;
			case "list":
			case "delete":
				
				// 외부로 이벤트를 보내 상위 컴포넌트가 처리하도록 함
				DispatchCustomEvent(this._body, 'project-detail-clicked', { action : action, order: Number(this._body.dataset.pn) });
				break;
		}	
	}
 
	async _onSubmit(e) { 
		
		// update 인지 upload 인지 구분하는 것 추가하기
		e.preventDefault();
		e.stopPropagation();

		//const action = e.target.closest("button").dataset.action ;
		console.log("_onSubmit - action : ",  e.submitter );

		const url = '/projects/' + e.submitter.dataset.action;

		const form = e.target;		
		let formData = new FormData();
		this.setFormData(form, formData, e.submitter.dataset.action);

		this.setAttribute('mode', 'loading');


		try {
			let uploadProject = await this.fetchHandler(formData, url);

			let msg = DOM.CreateElement({
				tag:'alert-toast', 
				class:"toast show type1", 
				role:"alert", 
				'aria-live' : "assertive",
				'aria-atomic' : "true" });
			msg.innerHTML = `
					<div class="toast-header" slot="toast-header"></div>
					<div class="toast-body" slot="toast-body">
						<svg width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
							<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
						</svg>
						${uploadProject.message}
					</div>`
			document.body.appendChild(msg);
			
			let resultData = JSON.parse( uploadProject.data );
			console.log("_onSubmit - ", resultData );

			await this._loadInitData( resultData );

		} catch (err) {
			console.error('Failed to update project:', err);
            this.setAttribute('mode', 'error');
		}
	}

	async fetchHandler(formData, url = ''){
		try{
			const response = await fetch( url, { 
				method: 'POST',
				body:  formData
			});
			
			// 응답 상태 확인
            if (!response.ok) {
                const errorBody = await response.text(); // 오류 본문 읽기 시도
                throw new Error(`updateProject - HTTP error! Status: ${response.status}, StatusText: ${response.statusText}, Body: ${errorBody}`);
            }
			const result = await response.json();
			return result;
		} catch (error){
			console.log("updateProject front error - ", error)
			return error;
		}
	}

	_initSetting(RadioList, type, title) {
		let header = DOM.CreateElement({ tag : 'header',  class:'section-header tCom009'})
		header.innerHTML = MarkUp.editCreateHeader(title);
		this._body.appendChild(header);

		const form = DOM.CreateElement({ tag : 'form',	encType: "multipart/form-data", 
					'data-pn': this._item.projectNum });
		form.addEventListener('submit', this._SubmitHandler );
		this._body.appendChild(form);

		const wrap = DOM.CreateElement({ tag : 'div', class:'tCom011', })
		wrap.innerHTML = MarkUp.edit(this._item);
		form.appendChild(wrap);
		

		let bottomButtons = DOM.CreateElement({ tag : 'div',  class:'bottom-btn-wrap width-100per'})
		bottomButtons.innerHTML = type === 'edit' ? MarkUp.editBottomButtons() : MarkUp.createBottomButtons();
		form.appendChild(bottomButtons);

		const mainRadioList = form.querySelector('#maincategory');
		const subRadioList = form.querySelector('#subcategory');
		mainRadioList.data = RadioList.main;
		subRadioList.data = RadioList.sub;

		let extraInfoWrap = form.querySelector('#extra-info');
		extraInfoWrap.addEventListener("clicked-item", e => {
			console.log('ui -  delete-one  ',e.target, e.detail );
			e.target.remove();
		});

		let externalLinkWrap = form.querySelector('#external-link');
		externalLinkWrap.addEventListener("clicked-item", e => {
			console.log('ui -  delete-one  ',e.target, e.detail );
			e.target.remove();
		});
		
		
		// 미리보기 파일 업로드 초기화
		let samplepage = form.querySelector(".example11");
		samplepage.files = this._fileItems.samplePage || [];
		//samplepage.onPreviewMarkUp = upload1markup;
		samplepage.onPreviewMarkUp = (file, objectURL) => {
			let o = this._fileItems.samplePage?.find( f => f.name === file.name ) || null;
			return upload1markup(file, objectURL,o )
		} ;

		let mainimage = form.querySelector(".example22");
		mainimage.files = this._fileItems.mainimage || [];
		mainimage.onPreviewMarkUp = upload2markup;

		let subimage = form.querySelector(".upload-type3");
		subimage.files = this._fileItems.subimage || [];
		subimage.onPreviewMarkUp = upload2markup;
		
	}


} 

customElements.define('project-detail', ProjectDetail);


// 마크업 함수 ===========================================

function searchHash(act, data=null){
	let wrap = '';
	if( act === 'view' ){
		wrap = 'test ----';
	} else if( act === 'edit' ){
		wrap = `
			<div class="hash-wrap">
				${ct.hash.map( v => `<label><input type="checkbox" name="hash" value="${v}" ${data.includes(v) ? 'checked' : ''}>${v}</label>` ).join('')}
			</div>`;
	}else {
		wrap = `
			<div class="hash-wrap">
				${ct.hash.map( v => `<label><input type="checkbox" name="hash" value="${v}">${v}</label>` ).join('')}
			</div>`;
	}
	return wrap;
}

function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function previewFile(c = '', files){
	//console.log(' previewFile :', files, files?.length);

	let folder = CheckFilesInFolder(c, [...files]);

	if( folder.empth ){
		if(  c === 'item' ) c += ' no-item';
		if( c === 'image' ) c += ' no-image';
	}
	
	return folder.files.map( f => {
		let test = { class: c, ...f};
		return `<preview-file type="view" data="${escapeHtml(JSON.stringify(test))}"></preview-file>` }).join('');
}


function upload1markup(file, objectURL, args = null ){

	console.log("111111111 = ",file, objectURL,args);

	const image = file.type.startsWith('image/');
	const tempUrl = 'https://bghbmh.github.io/simple-ui-test/UploadFiles/icon-svg-double-paper.svg';

	let fileItemWrap = document.createElement("figure");
	fileItemWrap.setAttribute("class", "item");
	fileItemWrap.innerHTML = `
		<img src="${image ? objectURL : tempUrl}" alt="이미지">
		<figcaption>
			<label><span class="guide">라벨</span><input name="samplePagelabel" data-file-name="${file.name}" type="text" value="${args?.label || ''}" placeholder="라벨을 입력하세요"></label>
			<span class="option title">${file.name}</span>
			<span class="option">${(file.size / 1024).toFixed(2)} KB</span>
		</figcaption>
	`;
	return fileItemWrap;

}

function upload2markup(file, objectURL){
	const image = file.type.startsWith('image/');
	const tempUrl = 'https://bghbmh.github.io/simple-ui-test/UploadFiles/icon-svg-double-paper.svg';
		
	let fileItemWrap = document.createElement("figure");
	fileItemWrap.setAttribute("class", "item");
	fileItemWrap.innerHTML = `
		<img src="${image ? objectURL : tempUrl}" alt="이미지">
		<figcaption>
			<span class="option title">${file.name}</span>
			<span class="option">${(file.size / 1024).toFixed(2)} KB</span>
		</figcaption>
	`;
	return fileItemWrap;
}

// projectDetail 전체 마크업
const MarkUp = {
	view : ( item, fileItems = null ) => {
		let section = document.createElement("section");
		section.setAttribute("class", "section type2");

		console.log("testes - ", Object.keys(item.extraInfo).length , item.extraInfo.length)
		return  `
			<!--섹션-->
			<!--섹션 헤더-->
			<header class="section-header tCom009">
				<div class="title">
					<i class="${ct.cIcon[Number(item.category[0].type) - 1]}" aria-hidden="true"></i>
					<h3 class="text">${item.title ? item.title : '제목없음'}</h3>
				</div>
				<div class="btn-wrap">
					<button type="button" class="btn default" 
						data-action="delete" 
						data-page-layout="sub" 
						data-page-name="myAdmin-project-list">삭제</button>	
					<div class="dropdown">
						<button type="button" class="btn default round dropdown-toggle " data-action="toggle" title="버튼 목록 보기" aria-label="버튼 목록 보기"><i class="icon-svg-dots-vertical" aria-hidden="true"></i></button>
						<div class="dropdown-menu">
							<button type="button" class="dropdown-item" data-action="edit" data-page-layout="sub" data-page-name="myAdmin-project-detail">수정</button> 
							<button type="button" class="dropdown-item" data-action="delete" data-page-layout="sub" data-page-name="myAdmin-project-list">삭제</button>
						</div>
					</div>
				</div>
			</header>
			<!--//섹션 헤더-->

			<hr class="solid">
			<!--콘텐츠-->
			<div class="content-wrap">
				<div class="tCom010">
					<div class="info">
						<dl>
							<dt>현재 상황</dt>
							<dd>
								<current-state type="view" state="${item.projectState}"></current-state>
							</dd>
						</dl>

						<dl>
							<dt>카테고리</dt>
							<dd>
								<category-type2 data-main='${item.category[0].type}' data-sub='${item.category[1].type}'></category-type2>
							</dd>
						</dl>
						<dl>
							<dt>기간</dt>
							<dd>2025.1.1 ~ test.11.13</dd>
						</dl>
						
						<dl>
							<dt>참여자</dt>
							<dd>
								<project-member type="view" data=""></project-member>
							</dd>
						</dl>

						<dl class="flex-none w-100">
							<dt>추가 정보123</dt>
							<dd  class=" d-flex gap-2 flex-wrap "> 
								${ Object.keys(item.extraInfo).length ? Object.entries( item.extraInfo ).map( a => `<extra-info type="view" data-label='${a[0]}' data-value='${a[1]}'></extra-info>` ).join('') : `<extra-info type="view"></extra-info>`
								}
							</dd>
						</dl>

						<dl class="flex-none w-100">
							<dt>미리보기<small>test-small 미리보기</small></dt>
							<dd>
								<div class="sample-file " >
									${ previewFile('item', fileItems.samplePage) }
								</div>
								
							</dd>
						</dl>

						<dl>
							<dt>외부링크 추가</dt>
							<dd class="d-flex gap-2 flex-wrap ">
								${ Object.keys(item.externalLink).length ? 
									Object.entries( item.externalLink )
									.map( a => `<external-link type="view" data-label='${a[0]}' data-value='${a[1]}'></external-link>` ).join('') : `<external-link type="view"></external-link>`
								}
							</dd>
						</dl>

						<dl class="flex-none w-100">
							<dt>설명</dt>
							<dd class="description">${item.description ? item.description : '입력없음' }</dd>
						</dl>
					</div>
					<div class="image-wrap"> <!--임시 안보이게 style="display:none"  -->
						<div class="main">
							${ previewFile('image', fileItems.mainimage) }
						</div>
						<div class="sub">
							${ previewFile('image', fileItems.subimage) }
						</div>
					</div>
				</div>	
				
				<div class="bottom-btn-wrap">
					<button type="button" class="btn default margin-right-auto" 
						data-action="list" 
						data-page-layout="sub" 
						data-page-name="myAdmin-project-list">목록</button>

					

					<button type="button" class="btn dark" 
						data-action="edit" 
						data-page-layout="sub"
						data-page-name="myAdmin-project-detail">수정</button> 
				</div>

			</div>
			<!--//콘텐츠-->
			<!--//섹션--> `;			
	},
	edit : ( item, fileItems = null ) => { 
		// <form class="tCom011" encType="multip
		// art/form-data" data-pn="${item.projectNum || item.order}">
		return `
		<!--콘텐츠-->
		<div class="info">
			<dl>
				<dt>제목 <text-icon title="필수" class="required"></text-icon></dt>
				<dd><label class="width-100per"><input type="text" name="headline" value="${item.title}"></label></dd>
			</dl>

			<dl>
				<dt>카테고리 <text-icon title="필수" class="required"></text-icon></dt>
				<dd>
					<div class="option-wrap category">

						<div class="option">
							<b class="title">업무000</b> <!--, 인쇄 등-->
							<div class="item">
								<radio-group-list1 id="maincategory" group-name="main"></radio-group-list1>
							</div>
						</div>

						<div class="option">
							<b class="title">작업</b> <!--, 인쇄 등-->
							<div class="item">
								<radio-group-list1 id="subcategory" group-name="sub"></radio-group-list1>
							</div>
						</div>

					</div>
					
				</dd>
			</dl>

			<dl>
				<dt>검색 키워드</dt>
				<dd>
					${searchHash('edit', item.hash)}
				</dd>
			</dl>

			<dl>
				<dt>참여자</dt>
				<dd>
					<div class="tCom012">
						<button type="button" class="btn dark round">추가</button>

						<div class="list-item-wrap">	
							<project-member type="edit" data=""></project-member>
						</div>
						
					</div>								
				</dd>
			</dl>

			<dl>
				<dt>추가 정보</dt>
				<dd>
					<div id="extra-info">
						${ Object.keys(item.extraInfo).length ? Object.entries( item.extraInfo ).map( a => `<extra-info type="edit" data-label='${a[0]}' data-value='${a[1]}'></extra-info>` ).join('') : ``
						}
					</div>
					<button type="button" class="btn add-item" 
						data-action="ui" 
						data-ui-add="extra-info"
						data-ui-type="edit"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/></svg>추가</button>
				</dd>
			</dl>
			
			<dl>
				<dt>wkrdjqrlrks_기간</dt>
				<dd>
					<div class="calendar-a">
						<label><input type="text" name="calendar-start" value="test value"></label>
						<label><input type="text" name="calendar-end" value="test value"></label>
					</div>
				</dd>
			</dl>
			<dl>
				<dt>현재 상황 <text-icon title="필수" class="required"></text-icon></dt>
				<dd>
					<current-state type="edit" state="${item.projectState}"></current-state>
				</dd>
			</dl>
			<dl>
				<dt>미리보기</dt>
				<dd>
					<label class="width-100per margin-bottom-1">
						<input class="" name="samplename" type="text" value="${item.sampleName ? item.sampleName : ''}">
					</label>	
					
					<!--upload type1
					<div class=" upload-type1 example11">
						<button type="button" name="samplePage" class="upload-file-btn " title="파일 추가하기" aria-label="파일 추가하기">
							<span class="area">
								미리보기 할 목업 파일을 여기에 끌어다 놓거나,<br>
								파일 선택 버튼으로 직접 선택해주세요.
								<span class="btn primary">파일 선택</span>
							</span>
						</button>
						<div class="upload-file-box " ></div>
					</div>  -->
					<!--//upload type1-->

					<file-uploader multiple class="upload-type1 example11" id="samplePageUploader">
						<button slot="upload-button" type="button" class="upload-file-btn">
							<span class="area">
								미리보기 할 목업 파일을 여기에 끌어다 놓거나,<br>
								파일 선택 버튼으로 직접 선택해주세요.
								<span class="btn primary">파일 선택 (다중)</span>
							</span>
						</button>
						<div slot="file-box" class="upload-file-box"></div>
					</file-uploader>
					
				</dd>
			</dl>

			<dl>
				<dt>외부링크 추가</dt>
				<dd>
					<div id="external-link" >
						${ Object.keys(item.externalLink).length ? 
							Object.entries( item.externalLink )
							.map( a => `<external-link type="edit" data-label='${a[0]}' data-value='${a[1]}'></external-link>` ).join('') : ``
						}
					</div>
					<button type="button" class="btn add-item" 
						data-action="ui" 
						data-ui-add="external-link"
						data-ui-type="edit"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/></svg>추가</button>
				</dd>
			</dl>
			
			<dl>
				<dt>설명</dt>
				<dd class="description">
					<label class="width-100per"><textarea name="description" rows="6" class="resize-none" placeholder="내용을 입력하세요" value="" >${item.description}</textarea></label>
				</dd>
			</dl>

		</div>

		<dl class="image-wrap">
			<div>
				<dt>메인이미지</dt>
				<dd>
					<file-uploader class="upload-type2 example22" id="mainImageUploader">
						<button slot="upload-button" type="button" class="upload-file-btn">
							<span class="area">파일 선택</span>
						</button>
						<div slot="file-box" class="upload-file-box"></div>
					</file-uploader>
				</dd>
			</div>

			<div>
				<dt class="pb-0 mt-4">서브이미지</dt>
				<dd class="d-flex">
					<file-uploader multiple class="upload-type3" id="subImageUploader">
						<button slot="upload-button" type="button" class="upload-file-btn">
							<span class="area">파일 선택</span>
						</button>
						<div slot="file-box" class="upload-file-box"></div>
					</file-uploader>
				</dd>
			</div>
			
			<div class="d-flex align-items-center mt-4">
				<dt class="margin-right-auto padding-0">메인노출여부</dt>
				<dd class="margin-0 d-inline-flex">
					<switch-type1 name="mainOpen" title="메인에 보이게 할지말지 선택하는 버튼"></switch-type1><!-- disabled -->
				</dd>
			</div>

		</dl>
		<!--//콘텐츠-->	
		`;
	},
	editCreateHeader : (title) => {
		return `
		<!--섹션 헤더-->
		
			<div class="title">
				<h3 class="text">${title}</h3>
			</div>
			<div class="btn-wrap">
				<button type="button" class="btn default" 
						data-action="delete" 
						data-page-layout="sub" 
						data-page-name="myAdmin-project-list">삭제</button>

				<!--  div class="dropdown">
					<button type="button" class="btn default round dropdown-toggle " data-action="toggle" title="버튼 목록 보기" aria-label="버튼 목록 보기"><i class="icon-svg-dots-vertical" aria-hidden="true"></i></button>
					<div class="dropdown-menu">
						<button type="button" class="dropdown-item" data-action="edit" data-page-layout="sub" data-page-name="myAdmin-project-detail">수정</button> 
						<button type="button" class="dropdown-item" data-action="delete" data-page-layout="sub" data-page-name="myAdmin-project-list">삭제</button>
					</div>
				</div -->
			</div>
		<!--//섹션 헤더-->
		`
	},
	editBottomButtons : () => {
		return `
			<button type="button" class="btn default " 
						data-action="list" 
						data-page-layout="sub" 
						data-page-name="myAdmin-project-list">목록</button>
			<button type="button" class="btn default margin-right-auto " 
				data-action="view" 
				data-page-layout="sub" 
				data-page-name="myAdmin-project-list">취소</button>

			

			<button type="submit" class="btn primary" data-action="update">저장</button> 
`
	},
	createBottomButtons : () => {
		return `

			<button type="button" class="btn default " 
				data-action="view" 
				data-page-layout="sub" 
				data-page-name="myAdmin-project-list">취소</button>

			<button type="submit" class="btn primary" data-action="upload">저장</button> 
		`
	},
	loading : () => {
		return  `
			<!--섹션-->
			<!--섹션 헤더-->
			<header class="section-header tCom009 loading">
				<div class="title skeleton-text">
					로딩스타일
				</div>
			</header>
			<!--//섹션 헤더-->

			<hr class="solid">
			<!--콘텐츠-->
			<div class="content-wrap">
				<div class="tCom010 loading">
					<div class="info">
						<dl>
							<dt class="skeleton-text"></dt>
							<dd class="skeleton-text"></dd>
						</dl>

						<dl>
							<dt class="skeleton-text"></dt>
							<dd class="skeleton-text"></dd>
						</dl>
						<dl>
							<dt class="skeleton-text"></dt>
							<dd class="skeleton-text"></dd>
						</dl>
						
						<dl>
							<dt class="skeleton-text"></dt>
							<dd class="skeleton-text"></dd>
						</dl>

						<dl class="flex-none w-100">
							<dt class="skeleton-text"></dt>
							<dd class="skeleton-text"></dd>
						</dl>

						<dl class="flex-none w-100">
							<dt class="skeleton-text"></dt>
							<dd class="skeleton-text">
								
							</dd>
						</dl>

						<dl>
							<dt class="skeleton-text"></dt>
							<dd class="skeleton-text"></dd>
						</dl>

						<dl class="flex-none w-100">
							<dt class="skeleton-text"></dt>
							<dd class="description skeleton-text"></dd>
						</dl>
					</div>
					<div class="image-wrap"> <!--임시 안보이게 style="display:none"  -->
						<div class="main skeleton-image" >
						
						</div>
						<div class="sub skeleton-image">
						
						</div>
					</div>
				</div>	
				
				<div class="bottom-btn-wrap">
				
				</div>

			</div>
			<!--//콘텐츠-->
			<!--//섹션--> `;			
	
	}
}