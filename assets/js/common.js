// import './web-components.js';
import './components/common-header.js';
import './components/common-footer.js';
import './components/card-type1.js';
import './components/modal-popup.js';

import * as DOM from './components/Utils-dom.js';
import { HASH_LIST , ORIGIN} from './components/config.js';

import * as MAIN from  './temp.js';

const CONTAINER = document.querySelector("main.container");

document.addEventListener('DOMContentLoaded', () => {
	console.log("DOMContentLoaded - ");

	//window.location.href = '/';
	console.log('URL ',location.origin, window.location.pathname);

	const uurl = new URL(location.href);
	const params = uurl.searchParams;
	let parList = params.get("list");

	if( location.pathname === '/' ||  !parList ) initSetPage('main');
	else  initSetPage('list'); 
});

async function initSetPage(webComponent){
	const itemsData = await jsonDB('./data/testDB.json'); 

	if( webComponent === 'main' ){
		console.log('URL- load webComponent ', );
		MAIN.initMain( itemsData );
		document.querySelector(".recent-product").addEventListener("click", mainCardhandler);
		document.querySelector(".recent-work").addEventListener("click", mainCardhandler);
	} else if( webComponent === 'list' ){
		setGlobalNav();
		
		const wrap = DOM.CreateElement({tag:'section', class:"grid cardList2"});
		CONTAINER.appendChild(wrap);
		setList(wrap, itemsData);
	}

}

function setGlobalNav(){
	let globalNav = DOM.CreateElement({tag:"form", class: "search hashtag", "data-mockup-ui":"gnbgnb"});
	CONTAINER.appendChild(globalNav);
	globalNav.addEventListener('change', globalNavHandler);

	let nav = DOM.CreateElement({tag:"nav", class: "d-flex gap-1 mt-3 mb-3"});
	globalNav.appendChild(nav);
	nav.appendChild(DOM.CreateElement({ tag : "label",  class : "btn active",
		innerHTML : `<input type="checkbox" name="hash" value="모두" checked><span>모두</span>`
	}));

	HASH_LIST.forEach( (hash, idx) => {
		let la = DOM.CreateElement({ tag : "label", class : "btn" });
		let inputText = DOM.CreateElement({ tag : "input", type : "checkbox", name:"hash", value : hash });
		la.appendChild(inputText);
		la.appendChild(DOM.CreateElement({ tag : "span", textContent : hash }) );
		nav.appendChild( la);
	})
}

function globalNavHandler(e){     
	if( e.keyCode !== undefined && e.keyCode !== 13 ) return;

	if( e.type === "change" ){  
		const nav = e.target.closest("form");

		let clickMenu = e.target;
		if( clickMenu.value === "모두" ) { 
			nav.hash.forEach( n => n.checked = false );
			clickMenu.checked = true; 
		} else {
			nav.hash[0].checked = false;
			if( ![...nav.hash].filter( n => n.checked === true ).length ){
				nav.hash[0].checked = true;
			}
		}

		let selectedMenu = [...nav.hash].filter( a =>  a.checked ).map( b => b.value);
		subRender(selectedMenu);

		let sl = clickMenu.parentNode.offsetLeft  - window.innerWidth/2 ;
		nav.scrollTo({ left: sl, top: 0, behavior: "smooth" });
	}
}

async function subRender(hashList){
	
	let wrap = document.querySelector(".cardList2");
	const itemsData = await jsonDB('./data/testDB.json'); 
	let renderList = [];
	
	wrap.innerHTML='';
	if( hashList.findIndex( h => h === "모두") > -1 ){
		
		renderList = [...itemsData];
	} else {
		
		console.log("renderlist - ", hashList)
		let selected = [];
		hashList.forEach( hash => {
			itemsData.forEach( item => {
				if( item.hash.includes(hash) && !selected.find( a => a === item) ){
					selected.push(item);
				}
			});
		});

		selected.forEach( sel  => {
			let isItem = [...wrap.children].find( wr => Number(wr.dataset.order) === Number(sel.order) );
			
			if( !isItem ){
				renderList.push(sel);
			}
		});
		
	}

	setList(wrap, renderList);
}

function setList(wrap, itemsData){
	
	itemsData.forEach( item => {
		const card = DOM.CreateElement({ tag:'card-type1' });
		card.data = item;
		wrap.appendChild(card);
		

		card.addEventListener('clicked-card', e => {
			initUtilModal(e.detail.util, item);
		});
	})
}


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

const MarkUp = {
	zoomIn : (item) => {
		let images = [...item.mainimage, ...item.subimage];
		console.log("modal - ",item,images)
		return `
		<div class="modal-header" slot="modal-header">
			<h5 class="modal-title">이미지 크게 보기/h5>
		</div>
		<div class="modal-body" slot="modal-body">
		${ images.map( img => `<img src="./data/${img.webUrl}">` ).join('') }
		</div> `
	},
	pageView : (item) => {
		console.log("modal - ",item.samplePage);
		return `
		<div class="modal-header" slot="modal-header">
			<div class="d-flex">
				<h5 class="modal-title" role="button" aria-label="더보기버튼" data-action="toggle" data-target=".extraInfo">
					<span>${item.title !== "" ? item.title : "제목이 없습니다" }</span>
				</h5>	
				<button type="button" class="btn ttt" aria-label="접고펼치는버튼" data-on="접기" data-off="펼치기"></button>
			</div>

			<div class="extraInfo expanded">
				<div class="labels">
					${ item.category.map( o => `<span class="info ${o.label}" data-type=${o.type}>${o.name}</span>`).join('') }
				</div>

				${Object.keys(item.extraInfo).length ? '<dl class="extraInfo-wrap">' + Object.entries(item.extraInfo).map( arr => `<dd class="info" aria-label="${arr[0]}">${arr[1]}</dd>`).join('') + '</dl>' : ''}

				<nav class="buttons ctrl-pageview">
					${ item.samplePage.map( o => `<button type="button" class="btn text-start" data-link="${o.webUrl}">${o.label}</button>`).join('')}
				</nav>
			</div>

		</div>
		<div class="modal-body" slot="modal-body">
			<iframe class="iframe" src="./data/${item.samplePage[0].webUrl}" style="width: 100%;height: 100%; border: 0;" ></iframe>
		
		</div> `
	}

}

function mainCardhandler(e){
	if( !e.target.closest('[data-action]') ) return;

	let clickElem = e.target.closest('[data-action]');
	let order = Number( clickElem.dataset.order );
	let util = clickElem.dataset.uiUtil;

	if( clickElem.dataset.action ===  "modal" ){

		jsonDB('./data/testDB.json').then( itemsData => {
			let item = itemsData.find( item => item.order === order );
			initUtilModal( util, item);
		}).catch(error => {
            console.error(" css ", error);
        });
		
	}
}

function initUtilModal(util, item){
	let modal = DOM.CreateElement({
		tag: 'modal-popup', 	id: "modal1", 		class: "modal ",
		tabindex: "-1", 		role: "dialog",
		size: 'extra-large',
		util: util
	});			

	if( util === "zoomIn" ) modal.innerHTML = MarkUp.zoomIn( item );
	else modal.innerHTML = MarkUp.pageView( item ); // pageView 
	document.body.appendChild(modal);

	modal.querySelector('.btn.ttt')?.addEventListener("click", e => {
		e.target.classList.toggle("xx");
		e.target.parentNode.nextElementSibling.classList.toggle("expanded");
	});
	modal.querySelector('.ctrl-pageview')?.addEventListener("click", e => { 
		let link = e.target.closest("[data-link]").dataset.link;
		e.stopPropagation();
		modal.querySelector("iframe").src = `./data/${link}`;
	});	
	modal.open();
}
