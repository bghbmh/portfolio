import * as cf from './commonFunction.js';
import { Modal } from '../../components/modal.js';
import { cardStyle } from '../../components/cardStyle.js';

let uu = "https://bghbmh.github.io/main";

document.addEventListener("DOMContentLoaded", () => {
	console.log(location, location.origin);
	console.log("DOMContentLoaded ")
	cf.fileHandler._load( { //bmh.json
		url: uu+'/data/myList.json',
		success : (request) => {
			
			try {
				throw request.responseText; 
			} catch (e) {
				if ( e ) {
					setView(request)
				} else {
					console.log("error", e)
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


	const searchHashtag = document.querySelector('.search.hashtag');

	if(searchHashtag ){
		searchHashtag.addEventListener('change', resetView);
		searchHashtag.addEventListener('keyup', resetView);
		searchHashtag.addEventListener('submit', resetView);
	}

	

});

function testScrollNav(e){

	let g =e.target.closest("[data-mockup-ui]");
			
	let btn = e.target.closest(".btn");

	let sl = 0;


	if( btn.dataset.action ){
		let value=btn.firstElementChild.value;
		btn.parentNode.removeChild(btn);
		[...g.hash].find( a =>  a.value === value ).checked = false;
		[...g.hash].find( a =>  a.value === value ).parentNode.classList.toggle("active");

		console.log("action 00", btn.firstElementChild.checked )
		sl = btn.offsetLeft  - window.innerWidth/2 ;
		g.querySelector(".wrap").scrollTo({ left: sl, top: 0, behavior: "smooth" });
		return;
	}

	if( btn.firstElementChild.checked ){

		if( btn.firstElementChild.value === "모두"){
			[...g.querySelector("nav").children].map( h => h.firstElementChild.checked = false );
			btn.firstElementChild.checked = true
		} else {
			[...g.querySelector("nav").children].find( h => h.firstElementChild.value === "모두" ).firstElementChild.checked = false
		}
	} else {
		let dbtn = [...g.querySelector(".hashList").children].find( h => h.firstElementChild.value === btn.firstElementChild.value );
		g.querySelector(".hashList").removeChild(dbtn);
	
		return;
	}

	let cloneBtn = btn.cloneNode(true);
	cloneBtn.dataset.action = "delete";
	g.querySelector(".hashList").appendChild(cloneBtn);

	//filteredProducts.map( ele => productsContainer.appendChild(ele.cloneNode(true)))

	btn.classList.toggle("active");

	console.log("testScrollNav", window.innerWidth, btn.firstElementChild.checked )

	sl = btn.offsetLeft  - window.innerWidth/2 ;
	g.querySelector(".wrap").scrollTo({ left: sl, top: 0, behavior: "smooth" });
}


function resetView(e){

	testScrollNav(e);
	
	if( e.keyCode !== undefined && e.keyCode !== 13 ) return;

	if( e.type === "change" ){
	
		cf.fileHandler._load( { //bmh.json
			url: uu+'/data/myList.json',
			success : (request) => {
				
				try {
					throw request.responseText; 
				} catch (e) {
					if ( e ) {

						let testJson = JSON.parse(request.responseText);
						let selectedhash = [...this.hash].filter( o => o.checked );
	
						let selectedAll = [];
						
						if( selectedhash[0].value === "모두"){
							//임시
							
							selectedAll = testJson.map( item => item.order) ;
							console.log("all all all", selectedAll)
						} else {
							selectedhash.forEach( hash => {

								let selecteItem = testJson.filter( item => item.hash.includes(hash.value)).map( item => item.order) ;
					
								for( let i=0; i<selecteItem.length; i++ ){
									if( selectedAll.includes(selecteItem[i]) ) continue;
									else selectedAll.push(selecteItem[i])
								}
						
							});
						}
			
						

						setView222(request, selectedAll)
					} else {
						console.log("error", e)
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

		//e.preventDefault();
		//displayProducts();
	}

	if( e.type === "submit" ){
		e.preventDefault();
	}	

}

function setView222(request, orderList = null){
	let items = JSON.parse(request.responseText);
	console.log("setView - ", document.querySelector(".recent-work .items-wrap")); 


	if( document.querySelector(".recent-product") ){

		let mi = items.filter( it => it.mainOpen );

		document.querySelector(".recent-product .items-wrap").innerHTML += mi.map( (m, idx) => cardStyle.main(m, idx) ).join('');
		document.querySelector(".recent-product .items-wrap").addEventListener("click", cardListHandler);

		

	} else if( document.querySelector(".cardList2") ) {

		document.querySelector(".cardList2").innerHTML += items.map( item => cardStyle.sub(item) ).join('');
		document.querySelector(".cardList2").addEventListener("click", cardListHandler);

	}

	if( orderList.length ){
		
		let orderItems = [];
		orderList.map( vv => items.find( item => item.order === vv ? orderItems.push(item) : '' ) );
		console.log("setView orderList - ",orderList, orderItems );

		document.querySelector(".cardList2").innerHTML = orderItems.map( item => cardStyle.sub(item) ).join('');
		
	}
	
}




function setView(request){
	let items = JSON.parse(request.responseText);
	console.log("setView - "); 


	if( document.querySelector(".recent-product") ){

		let mi = items.filter( it => it.mainOpen );

		document.querySelector(".recent-product .items-wrap").innerHTML += mi.map( (m, idx) => cardStyle.main(m, idx) ).join('');
		document.querySelector(".recent-product .items-wrap").addEventListener("click", cardListHandler);

		document.querySelector(".recent-work .items-wrap").addEventListener("click", cardListHandler);

	} else if( document.querySelector(".cardList2") ) {

		document.querySelector(".cardList2").innerHTML += items.map( item => cardStyle.sub(item) ).join('');
		document.querySelector(".cardList2").addEventListener("click", cardListHandler);

	}
	
}



function cardListHandler(e){

	if( !e.target.closest('[data-action]') ) return;

	let clickElem = e.target.closest('[data-action]');

	switch (clickElem.dataset.action){
		case "modal":
			console.log( " action - ",  clickElem.dataset.action , clickElem.closest('[data-order]').dataset.order );

			cf.fileHandler._load( { //bmh.json
				url: uu+'/data/myList.json',
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
										Modal.box.querySelector("iframe").src = `${uu}/data/sample/${e.currentTarget.dataset.sampleName}/html/${e.currentTarget.dataset.link}`;
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


function tamplateModalHTML(modalStyle, item){
	
	console.log("pageView 111 - ", item.samplePage )

	if( modalStyle === "pageView" ) { // sample페이지 + 이미지, 제목이 없을 때 사용할 모달
		
		return `
			<div class="modal-dialog modal-extra-lg modal-dialog-centered modal-dialog-scrollable pageView"> 
				<div class="modal-content">

					<div class="modal-header">
						
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">닫기</button>
		
						<div class="extraInfo expanded">
							<h5 class="modal-title" role="button" aria-label="더보기버튼"  data-action="toggle" data-target=".extraInfo" aria-label=".extraInfo">
								<span>${item.title !== "" ? item.title : "Modal_프로젝트프로필" }</span>
								<i class="bi bi-chevron-up" aria-hidden="true"></i>
							</h5>							

							${ item.category.length ? '<div class="labels">' + item.category.map( o => `<span class="info ${o.label}" data-type=${o.type}>${o.name}</span>`).join('') + '</div>' : ''}
							
		
							${Object.keys(item.extraInfo).length ? '<dl class="extraInfo-wrap">' + Object.entries(item.extraInfo).map( arr => `<dd class="info" aria-label="${arr[0]}">${arr[1]}</dd>`).join('') + '</dl>' : ''}

							${item.samplePage.length ? '<nav class="buttons">' +  item.samplePage.map( o => `<button type="button" class="btn text-start" data-sample-name="${item.sampleName}" data-link="${o.name}">${o.label}</button>`).join('') + '</nav>' : ''}
						</div>
					</div>


					<div class="modal-body" style="padding:0">
						${item.samplePage.length ? `<iframe class="iframe" src="${uu}/data/sample/${item.sampleName}/html/${item.samplePage[0].name}" style="width: 100%;height: 100%" ></iframe>` : ''}

					</div>
				</div>
			</div>`
	} else if( modalStyle === "projectView" ) { // sample페이지 + 이미지 + 제목 이 모두 있는 경우에 사용할 모달
		return `
			<div class="modal-dialog modal-extra-lg modal-dialog-centered modal-dialog-scrollable projectView"> 
				<div class="modal-content">
					<div class="modal-header">
						
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
		
						<div class="extraInfo expanded">
							<h5 class="modal-title" role="button" aria-label="더보기버튼"  data-action="toggle" data-target=".extraInfo" aria-label=".extraInfo">
								<span>${item.title !== "" ? item.title : "Modal_프로젝트프로필" }</span>
								<i class="bi bi-chevron-up" aria-hidden="true"></i>
							</h5>							

							${ item.category.length ? '<div class="labels">' + item.category.map( o => `<span class="info ${o.label}" data-type=${o.type}>${o.name}</span>`).join('') + '</div>' : ''}
							
		
							${Object.keys(item.extraInfo).length ? '<dl class="extraInfo-wrap">' + Object.entries(item.extraInfo).map( arr => `<dd class="info" aria-label="${arr[0]}">${arr[1]}</dd>`).join('') + '</dl>' : ''}
						</div>
					</div>
					<div class="modal-body">
						${item.mainimage.map( img => `<img src="${uu}/data/files/${img.name}">` ).join("")  }
						${item.subimage.map( img => `<img src="${uu}/data/files/${img.name}">` ).join("")}
		
					</div>
					<!-- <div class="modal-footer">
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
					</div> -->
				</div>
			</div>`
	} else if( modalStyle === "zoomIn" ) {
		return `
			<div class="modal-dialog modal-extra-lg modal-dialog-centered modal-dialog-scrollable zoomIn"> 
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title">
							<span>Modal_이미지리스트</span>
						</h5>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body">
						${item.mainimage.length ? item.mainimage.map( img => `<img src="${uu}/data/files/${img.name}">` ).join("") : '<!--img src="" alt="동록한이미지가없습니다"-->' }
						${item.subimage.length ? item.subimage.map( img => `<img src="${uu}/data/files/${img.name}">` ).join("") : '<!--img src="" alt="동록한이미지가없습니다"-->' }
					</div>
					<!-- <div class="modal-footer">
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
					</div> -->
				</div>
			</div>`
	}
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





