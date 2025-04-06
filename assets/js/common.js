import * as cf from './commonFunction.js';
import { Modal } from '../../components/modal.js';
import { cardStyle } from '../../components/cardStyle.js';
import { tamplateModalHTML } from './markupHTML.js';

import { ct, tempDB, origin, filedburl, sampleurl } from '../../data/tempCategoryListl.js';



document.addEventListener("DOMContentLoaded", () => {
	console.log("DOMContentLoaded ", filedburl)  

	cf.fileHandler._load( { 
		url: filedburl,
		success : (request) => {
			
			try {
				throw request.responseText; 
			} catch (text) {
				if ( text ) {
					
					const uurl = new URL(location.href);
					const params = uurl.searchParams;
					//const params = new URLSearchParams(location.href);
					let parList = params.get("list");
					console.log(" pathname - ",params, parList) 
					//setView(request)
					if( location.pathname === '/' ||  !parList ){ // location.pathname.indexOf('sub') >= 0
						initMain(request);
					} else {
						initSub(request);
					}

					//initSub(request);
				} else {
					console.log("error", text)
					return;
				}
			}
		},
		error: (request) =>  console.log("err - ",request.arguments.msg)
	});
});


// 서브페이지 ==================================
function initSub(request){console.log("initSub - "); 
	let items = JSON.parse(request.responseText);
	let cntBox = document.querySelector("main");

	//메뉴
	let globalNav = cf.CreateElement({tag:"form", class: "search hashtag", "data-mockup-ui":"gnbgnb"});
	let nav = cf.CreateElement({tag:"nav", class: "d-flex gap-1 mt-3 mb-3"});
	setGlobalNav(nav);
	globalNav.appendChild(nav);
	globalNav.addEventListener('change', globalNavHandler);
	// globalNav.addEventListener('keyup', globalNavHandler);
	// globalNav.addEventListener('submit', globalNavHandler);

	cntBox.appendChild(globalNav);

	//목록
	let cardList2 = cf.CreateElement({tag:"section", class: "grid cardList2"});
	cardList2.appendChild( cf.CreateElement({tag:"h2", class: "visually-hidden", textContent : "category_0 test"}) );

	cardList2.innerHTML += items.slice().reverse().map( item => cardStyle.sub(item) ).join('');

	cardList2.addEventListener("click", cardListHandler);
	cntBox.appendChild(cardList2);
	
}

function setGlobalNav(nav){
	nav.appendChild(cf.CreateElement({ 
		tag : "label", 
		class : "btn active",
		innerHTML : `<input type="checkbox" name="hash" value="모두" checked><span>모두</span>`
	}));

	ct.hash.forEach( (str, idx) => {
		let la = cf.CreateElement({ tag : "label", class : "btn" });
		let inputText = cf.CreateElement({ tag : "input", type : "checkbox", name:"hash", value : str });
		la.appendChild(inputText);
		la.appendChild(cf.CreateElement({ tag : "span", textContent : str }) );
		nav.appendChild( la);
	})
}

function globalNavHandler(e){     
	if( e.keyCode !== undefined && e.keyCode !== 13 ) return;

	if( e.type === "change" ){  
		const nav = e.target.closest("form");

		let clickMenu = e.target;
		if( clickMenu.value === "모두" ) {
			[...nav.hash].find( n =>  n.value !== "모두" ? n.checked = false : '' );
		} else {
			[...nav.hash].find( n =>  n.value === "모두" ? n.checked = false : '' );
		}

		let selectedMenu = [...nav.hash].filter( a =>  a.checked );
		subRender(selectedMenu);

		let sl = clickMenu.parentNode.offsetLeft  - window.innerWidth/2 ;
		nav.scrollTo({ left: sl, top: 0, behavior: "smooth" });
	}

	if( e.type === "submit" ){
		e.preventDefault();
	}	
}

function subRender(hashList){
	cf.fileHandler._load({ 
		url: filedburl,
		success : (request) => {
			try {
				throw request.responseText; 
			} catch (rt) {
				if ( rt ) {

					let items = JSON.parse(rt).slice().reverse();
					let selectedItem = [];

					if( hashList.findIndex( h => h.value === "모두") > -1 ){
						selectedItem = [...items];
						console.log("reqwe - ", selectedItem );
					} else {
						let orderList =[];
						hashList.forEach( hash => {
							items.map( item => {
								if( item.hash.includes(hash.value) && orderList.findIndex( s => s === item.order ) < 0 ){
									orderList.push(item.order);
								}
							})
						});
					
						orderList.map( order => items.find( item => item.order === order ? selectedItem.push(item) : '' ) );
					}
					console.log("re - ", selectedItem );
					document.querySelector(".cardList2").innerHTML = selectedItem.map( item => cardStyle.sub(item) ).join('');
					
					
				} else {
					console.log("error", rt)
					return;
				}
			}
		},
		error: (request) => {
			console.log("err - ",request.arguments.msg)
		},
		loadType:"item", 
		done: "items" 
	});

}

function cardListHandler(e){

	if( !e.target.closest('[data-action]') ) return;

	let clickElem = e.target.closest('[data-action]');

	switch (clickElem.dataset.action){
		case "modal":
			console.log( " action - ",  clickElem.dataset.action , clickElem.closest('[data-order]').dataset.order );

			cf.fileHandler._load( { //bmh.json
				url: filedburl,
				success : (request) => {
					
					try {
						throw request.responseText; 
					} catch (re) {
						if ( re ) {
							let z = clickElem.closest('[data-order]').dataset.order;
							let item = JSON.parse(re).find( o => o.order === parseInt(z) );

							console.log("item",z, item)
							
							let mmm = Modal.open({
								id : clickElem.dataset.uiUtil,
								tamplateHTML : tamplateModalHTML(clickElem.dataset.uiUtil, item),
								onInit: function (elem) {
									elem.querySelectorAll("[data-link]").forEach( link => {
										e.stopPropagation();
										console.log("Modal", clickElem)
										link.addEventListener("click", e => { 
											e.stopPropagation();
											elem.querySelector("iframe").src = `${sampleurl}${e.currentTarget.dataset.sampleName}/html/${e.currentTarget.dataset.link}`;
										});
									});

									elem.querySelector('.btn.ttt').addEventListener("click", e => {
										e.target.classList.toggle("xx");
										e.target.parentNode.nextElementSibling.classList.toggle("expanded");
									});

									elem.querySelector('.btn-close').addEventListener("click", e => {
										let m = e.target.closest(".modal");
										document.body.removeChild(m);
										document.querySelector("body").classList.remove("modalOpen");
									});
								}
							});

							document.querySelector("body").classList.add("modalOpen");
						} else {
							console.log("error", re)
							return;
						}
					}
				},
				error: (request) => {
					console.log("err - ",request.arguments.msg)
				},
				loadType:"item", 
				done: "items" 
			});
			break;
		default:
			console.log( " util default - ", e.target.dataset );
			break;
	}
}
// 서브페이지 ==================================


// 메인 ======================================
function initMain(request){console.log("initMain - "); 
	let items = JSON.parse(request.responseText);
	let cntBox = document.querySelector("main");
	cntBox.classList.add("main");

	// hello
	cntBox.innerHTML = hello();

	//메인화면용 아이템
	let mainOpenitems = items.filter( it => it.mainOpen );
	cntBox.appendChild( recentProduct(mainOpenitems) );
	cntBox.appendChild( recentWork() );

	const observerOptions = {
		root: null,
		rootMargin: "0px",
		threshold: [0.0],
	};
	
	let intersectionObserver = new IntersectionObserver(function (entries) {
		entries.forEach((entry) => {
			const adBox = entry.target;
	
			if (entry.isIntersecting) {
				//if (entry.intersectionRatio >= 0.75) {
					//console.log("intersectionRatio >= 0  ", entry.target.textContent);
					entry.target.classList.add("on");
				//}
			} else {
				//if ( entry.intersectionRatio === 0.0 ) {
					//console.log("intersectionRatio == 0.0  ");
					entry.target.classList.remove("on");
				//}
			}
		});
	}, observerOptions);
	
	document.querySelectorAll(".recent-product .item").forEach( oe => intersectionObserver.observe(oe) );
}

function hello(){
	return `
		<section class="hello">
			<header>
				<h2 data-title="박민희">박민희</h2>
			</header>
			<div class="contents-wrap">
				<p><small>UXUI</small> <strong>designer</strong></p>
				<span>+</span>
				<p><small>UI</small> <strong>development</strong></p>
			</div>

			<section class="bg text-animation">
				<div class="textLoop"></div>
			</section>

		</section>	
	`;
}

function recentProduct(mainOpenitems){

	let recentProduct = cf.CreateElement({tag:"section", class: "recent-product"});

	recentProduct.appendChild( cf.CreateElement({tag:"h3", class: "visually-hidden", textContent : "최근 작업"}) );

	let itemsWrap = cf.CreateElement({tag:"div", class: "contents-wrap items-wrap"});
	itemsWrap.innerHTML += mainOpenitems.slice().reverse().map( (m, idx) => idx < 3 ? cardStyle.main(m, idx) : '' ).join(''); 
	itemsWrap.addEventListener("click", cardListHandler);
	recentProduct.appendChild(itemsWrap);

	recentProduct.appendChild( cf.CreateElement({tag:"div", class: "bg text-animation", innerHTML : `<div class="textLoop type2"></div>`}) );

	return recentProduct;
}

function recentWork(){

	let html = `
			<header>
				<h3 class="">최근 작업</h3>
				<a href="?list=on" class="btn btn-link">더보기</a>
			</header>
			
			<div class="contents-wrap">
				<div class="list-type1 items-wrap">

					<!--item-->
					<button class="btn item"  data-order="13" data-action="modal" title="pageView" aria-label="샘플페이지보기" data-ui-util="pageView">
						<strong>CMDS</strong>
						<i class="btn icon" aria-hidden="true"></i>
						<span class="labels d-inline-flex gap-2">
							<b class="label main" data-type="1">웹</b><b class="label sub" data-type="2">구축</b>
						</span>
						
					</button>
					<!--/item-->
					
					<!--item-->
					<button class="btn item"  data-order="16" data-action="modal" title="pageView" aria-label="샘플페이지보기" data-ui-util="pageView">
						<strong>HYCU</strong>
						<i class="btn icon" aria-hidden="true"></i>
						<span class="labels d-inline-flex gap-2">
							<b class="label main" data-type="1">웹</b><b class="label sub" data-type="2">구축</b>
						</span>
						
					</button>
					<!--/item-->
					
				</div>
				
			</div>`;
	let recentWork = cf.CreateElement({tag:"section", class: "recent-work", innerHTML : html});
	recentWork.addEventListener("click", cardListHandler);
	return recentWork;
}
// 메인 ======================================