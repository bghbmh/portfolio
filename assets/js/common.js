import * as cf from './commonFunction.js';
import { Modal } from '../../components/modal.js';
import { cardStyle } from '../../components/cardStyle.js';
import { tamplateModalHTML } from './markupHTML.js';

import { ct, tempDB, origin, filedburl } from '../../data/tempCategoryListl.js';



document.addEventListener("DOMContentLoaded", () => {
	console.log( location.pathname , location.origin);
	console.log("DOMContentLoaded ")  

	cf.fileHandler._load( { //bmh.json
		url: filedburl,
		success : (request) => {
			
			try {
				throw request.responseText; 
			} catch (e) {
				if ( e ) {
					const uurl = new URL(location.href);
					const params = uurl.searchParams;
					//const params = new URLSearchParams(location.href);
					let parList = params.get("list");
					console.log(" pathname - ",params, parList) 
					//setView(request)
					if( location.pathname === '/' ||  !parList ){ // location.pathname.indexOf('portfolio') >= 0
						initMain(request);
					} else {
						initSub(request);
					}
				} else {
					console.log("error", e)
					return;
				}
			}
		},
		error: (request) =>  console.log("err - ",request.arguments.msg)
	});
});

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
}

function initSub(request){console.log("initSub - "); 
	let items = JSON.parse(request.responseText);
	let cntBox = document.querySelector("main");

	//메뉴
	let globalNav = cf.CreateElement({tag:"form", class: "search hashtag", "data-mockup-ui":"gnbgnb"});
	let navWrap = cf.CreateElement({tag:"div", class: "wrap" });
	let nav = cf.CreateElement({tag:"nav", class: "d-flex gap-1 mt-3 mb-3"});
	setGlobalNav(nav);
	navWrap.appendChild(nav);
	globalNav.appendChild(navWrap);
	globalNav.addEventListener('change', globalNavHandler);
	globalNav.addEventListener('keyup', globalNavHandler);
	globalNav.addEventListener('submit', globalNavHandler);

	let hashList = cf.CreateElement({tag:"div", class: "hashList" });
	hashList.innerHTML = `<label class="btn" title="메뉴삭제" data-action="delete"><input type="checkbox" name="hashlist" value="모두" checked>모두</label>`;
	globalNav.appendChild(hashList);

	cntBox.appendChild(globalNav);


	//목록
	let cardList2 = cf.CreateElement({tag:"section", class: "grid cardList2"});
	cardList2.appendChild( cf.CreateElement({tag:"h2", class: "visually-hidden", textContent : "category_0 test"}) );

	cardList2.innerHTML += items.map( item => cardStyle.sub(item) ).join('');
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
		let menu =e.target.closest("[data-mockup-ui]");
		let clickedBtn = e.target.closest(".btn");

		let allBtn = [...menu.hash].find( a =>  a.value === "모두" );
		let selectedMenu = [...menu.hash].filter( a =>  a.checked );

		if( !selectedMenu.length ||  clickedBtn.control.value === allBtn.value  ) {
			[...menu.hash].map( b => b.checked = false );
			allBtn.checked = true;
			clickedBtn = allBtn.parentNode;
		} else {
			allBtn.checked = false;
			clickedBtn.classList.toggle("active");
			selectedMenu = [...menu.hash].filter( a =>  a.checked );
			//filteredProducts.map( ele => productsContainer.appendChild(ele.cloneNode(true)))
		}
		//resetHashList( clickedBtn);
		resetCardList( resetHashList( clickedBtn) );

		let sl = clickedBtn.offsetLeft  - window.innerWidth/2 ;
		menu.querySelector(".wrap").scrollTo({ left: sl, top: 0, behavior: "smooth" });
	}

	if( e.type === "submit" ){
		e.preventDefault();
	}	
}

function resetHashList( setItem){

	let hashList = document.querySelector(".hashList");
	let allBtn = [...hashList.children].find( s => s.control.value === "모두");

	if( setItem.control.checked ){
		if( setItem.control.value === "모두" ) hashList.innerHTML = '';
		else  allBtn ? hashList.removeChild(allBtn) : '';
		
		let cloneBtn = setItem.cloneNode(true);
		cloneBtn.dataset.action = "delete";
		cloneBtn.control.name = "hashlist";
		hashList.appendChild(cloneBtn);
	} else {
		let ditem;
		for( let i=0; i<hashList.children.length; i++){
			if( hashList.children[i].control.value === setItem.control.value ) 
				ditem = hashList.children[i];
		}
		hashList.removeChild(ditem);
	}
	return hashList;
	
}


function resetCardList(hashList){

	cf.fileHandler._load( { 
		url: filedburl,
		success : (request) => {
			
			try {
				throw request.responseText; 
			} catch (error) {
				if ( error ) {

					let items = JSON.parse(request.responseText);
					//let hashList = [...menu.hash].filter( o => o.checked );
					let orderList =[];
					[...hashList.children].forEach( hash => {
						console.log("hash == ", hash.control )
						for( let i=0; i<items.length; i++ ){
							if( items[i].hash.includes(hash.control.value) ){
								if( orderList.find( s => s === items[i].order )) continue;
								else orderList.push(items[i].order);
							}
						}
					});

					let selectedItem = [];
					orderList.map( order => items.find( item => item.order === order ? selectedItem.push(item) : '' ) );

					if( selectedItem.length ){
						document.querySelector(".cardList2").innerHTML = selectedItem.map( item => cardStyle.sub(item) ).join('');
					} else {
						document.querySelector(".cardList2").innerHTML = items.map( item => cardStyle.sub(item) ).join('');
					}
					
				} else {
					console.log("error", error)
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
							
							let mm = Modal.open({
								id : clickElem.dataset.uiUtil,
								tamplateHTML : tamplateModalHTML(clickElem.dataset.uiUtil, item)
							});

							if( clickElem.dataset.uiUtil === 'pageView' ){
								mm.querySelectorAll("[data-link]").forEach( link => {
									e.stopPropagation();
									console.log("Modal", clickElem)
									link.addEventListener("click", e => { 
										e.stopPropagation();
										console.log("link - ",Modal.box.querySelector("iframe"), e.currentTarget.dataset);
										Modal.box.querySelector("iframe").src = `${origin}/data/sample/${e.currentTarget.dataset.sampleName}/html/${e.currentTarget.dataset.link}`;
									});
						
								});
							}

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
	itemsWrap.innerHTML += mainOpenitems.map( (m, idx) => idx < 3 ? cardStyle.main(m, idx) : '' ).join('');
	itemsWrap.addEventListener("click", cardListHandler);
	recentProduct.appendChild(itemsWrap);

	recentProduct.appendChild( cf.CreateElement({tag:"div", class: "bg text-animation", innerHTML : `<div class="textLoop type2"></div>`}) );

	return recentProduct;
}

function recentWork(){

	let html = `
			<header>
				<h3 class="">최근 작업</h3>
				<a href="/list" class="btn btn-link">더보기</a>
			</header>
			
			<div class="contents-wrap">
				<div class="list-type1 items-wrap">

					<!--item-->
					<button class="btn item"  data-order="3" data-action="modal" title="pageView" aria-label="샘플페이지보기" data-ui-util="pageView">
						<strong>CMDS</strong>
						<i class="btn icon" aria-hidden="true"></i>
						<span class="labels d-inline-flex gap-2">
							<b class="label main" data-type="1">웹</b><b class="label sub" data-type="2">구축</b>
						</span>
						
					</button>
					<!--/item-->
					
					<!--item-->
					<button class="btn item"  data-order="4" data-action="modal" title="pageView" aria-label="샘플페이지보기" data-ui-util="pageView">
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
			
				
// cf.fileHandler._load( { 
// 	url: '../0_last/data/test.json', 
// 	success : function(request){
		
// 		let items = JSON.parse(request.responseText);

// 		Modal.detail({ 
// 			html : component.detailViewPage( items, JSON.parse(clickElem.dataset.uiTarget)  ),
// 			class:"popup",
// 			eventListeners : {
// 				"load" : () => { console.log("click___test_attach eventListeners") } ,
// 				"click" : [cardListHandler ,testFunction]
// 			},
// 			 tId : e.timeStamp
// 		})
// 	},
// 	loadType:"item", done: "items" 
// });





