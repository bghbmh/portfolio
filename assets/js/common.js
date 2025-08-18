import './web-components.js';
import * as DOM from './components/Utils-dom.js';
import './components/modal-popup.js';

const header = DOM.CreateElement({ tag : "common-header" });
const container = DOM.CreateElement({ tag : "common-container", id: "container" });
const footer = DOM.CreateElement({ tag : "common-footer" });

document.addEventListener('DOMContentLoaded', () => {
	
	initSetView();

	const uurl = new URL(location.href);
	const params = uurl.searchParams;
	let current = params.get("current");

	console.log("parList - ", current);

	console.log('URL ',location.origin, window.location.pathname);

	//if( location.pathname === '/' ||  !parList ) setPage('main');
	setPage(current); 

});

window.addEventListener('popstate', (event) => {
	console.log('URL이 변경되었습니다 (popstate 이벤트 발생)', window.location.pathname);
	// 이곳에서 현재 window.location.pathname 또는 window.location.search 등을 읽어와
	// 해당 URL에 맞는 컴포넌트 또는 내용을 로드하는 함수를 호출합니다.
	//loadComponents(); // 아까 예시로 든 함수
});


function initSetView(){   console.log("initSetView - ", 		location.href);
	document.body.appendChild(header);
	header.classList.add("observeItem");// 임시
	header.addEventListener("clicked-global-nav", e => {
		console.log("common js - ", e.detail.value);
		
		setPage(e.detail.value);

		if( e.detail.value === 'contact' || e.detail.value === 'me' ) return;

		const uurl = new URL(location.href);
		const params = uurl.searchParams;
		params.set('current', e.detail.value);
		uurl.search = params.toString();

		// // 새로운 URL로 페이지 이동 (또는 히스토리 상태 변경)
		// // 1. 페이지를 실제로 이동시키는 방법
		// window.location.href = url.toString();

		// // 2. 페이지 이동 없이 URL만 변경하는 방법 (HTML5 History API)
		// //    뒤로가기/앞으로가기 버튼 동작에 영향을 줍니다.
		history.pushState({}, '', uurl.toString());
		// // 또는 history.replaceState({}, '', uurl.toString());
		
	});
	document.body.appendChild(container);
	document.body.appendChild(footer);

	
}

async function setPage(pageType = 'main'){

	console.log('pageType ',pageType);

	if( pageType === 'main' ){
		helloEveryone();
		mainItem();
		
		
	} else if( pageType === 'projects' ){
		projects();
		
	} else if( pageType === 'contact' ||  pageType === 'me' ){
		console.log('contact============ ',pageType);
		const uurl = new URL(location.href);
		const params = uurl.searchParams;
		let current = params.get("current");
		subModal(current , pageType);

	}

	header.setAttribute('current', pageType);

}


function projects(){
	container.innerHTML = '';
	const selectNav = DOM.CreateElement({ tag : "select-list-nav" });
	const projectsContainer = DOM.CreateElement({ tag : "projects-container" });

	selectNav.addEventListener("clicked-select-list", e => {
		console.log("select-nav : ", e.detail.value);
		const selectedValuesString = JSON.stringify(e.detail.value);
		projectsContainer.setAttribute('selected', selectedValuesString);
	});

	

	container.appendChild(selectNav);
	container.appendChild(projectsContainer);	
}

function mainItem(){
	const mainItemWrap = DOM.CreateElement({ tag : "main-item-wrap" })
	container.appendChild(mainItemWrap);	
}

function helloEveryone(){
	const hello = DOM.CreateElement({ tag : "hello-everyone" })
	container.appendChild(hello);	
	setObserve(hello);
}



function setObserve(trigger){

	const observerOptions = {
		root: null,
		rootMargin: "100px 0px 0px 0px", // 뷰포트 상단에서 100px 위를 기준으로 감지 시작
		threshold: [0.0, 0.5] // 요소가 뷰포트에서 사라지기 시작할 때 감지
	};

	// const onIntersect = (entries) => {
	// 	entries.forEach((entry) => {
	// 		document.querySelector("common-header").classList.add("observeItem");
	// 	})
	// }
	
	let intersectionObserver = new IntersectionObserver(function (entries) {
		entries.forEach((entry) => {
			// if (entry.isIntersecting ) {
				
			// 	document.querySelector("common-header").classList.add("observeItem");
			// } else {
			// 	document.querySelector("common-header").classList.remove("observeItem");
			// }


			if (entry.isIntersecting) {
				if (entry.intersectionRatio >= 0.5) {
					
					console.log("aaa  >= 0.5", entry.target);
				}
			} else {
				if (entry.intersectionRatio === 0.0 ) {
					console.log("bbb  === 0.0", entry.target);
				}
			}


		});
	}, observerOptions);
	intersectionObserver.observe(trigger);
}

function subModal(current, modaltype){

	const MarkUp = {
		me :  `
			<div class="modal-header" slot="modal-header">
				<img src="/assets/img/common/logo.svg">
			</div>
			<div class="modal-body" slot="modal-body">
			<img src="/assets/img/common/me.png" class="me">
			준비 중입니다
			</div> `
		,
		contact : `
			<div class="modal-header" slot="modal-header">
				<img src="/assets/img/common/logo2.svg">
			</div>
			<div class="modal-body" slot="modal-body">
				<div class="c">
					<a class="btn mailto" href="mailto:bghbmh@gmail.com">bghbmh@gmail.com</a>
					<p><small>html + css + javascript + vite  + nodejs = 박민희</small></p>
					<p><small>{ vite  , nodejs }  ⊂  beginner</small></p>
					<img src="/assets/img/common/me.png" class="me">
				</div>
				<div class="d">
					<img src="/assets/img/common/nameCard-img.svg">
				</div>
			</div> `
		
	}

	let modal = DOM.CreateElement({
					tag: 'modal-popup', 	
					id: "modal1", 		
					class: "modal ",
					tabindex: "-1", 		
					role: "dialog",
					size: 'extra-large',
					util: modaltype
				});	
	modal.innerHTML = MarkUp[modaltype];

	
	modal.addEventListener('modal-close', (e) => {
		console.log("모달이 닫히는 이벤트를 외부에서 감지했습니다!" , e.detail);
		// 모달 숨기기 등 필요한 로직 실행   
		header.setAttribute('current', current);
	});

	document.body.appendChild(modal);
	modal.open();
}

