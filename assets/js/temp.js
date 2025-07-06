import * as DOM from '../../components/Utils-dom.js';
// 메인 ======================================

export function initMain(items){
	let cntBox = document.querySelector("main");
	cntBox.classList.add("main");

	// hello
	cntBox.innerHTML = hello();

	//메인화면용 아이템
	let cc = items.filter( it =>it.mainOpen );

	console.log("asdf - ", cc.filter( c => c.category[0].type === "1" ).slice(0,2))
	let mainItems = [
		...cc.filter( c => c.category[0].type === "1" ).slice(0,2), // 웹 2개
		...cc.filter( c => c.category[0].type === "2" ).slice(0,1) // 인쇄1 개
	]
	cntBox.appendChild( recentProduct(mainItems) );
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
	
	console.log("initMain - ", document.querySelectorAll(".recent-product .item")); 
	
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

	let rp = DOM.CreateElement({tag:"section", class: "recent-product"});
	rp.appendChild( DOM.CreateElement({tag:"h3", class: "visually-hidden", textContent : "최근 작업"}) );

	let itemsWrap = DOM.CreateElement({tag:"div", class: "contents-wrap items-wrap"});
	itemsWrap.innerHTML += mainOpenitems.map( (item, num) =>  tag.card(num, item) ).join(''); 
	//itemsWrap.addEventListener("click", cardListHandler);
	rp.appendChild(itemsWrap);

	rp.appendChild( DOM.CreateElement({tag:"div", class: "bg text-animation", innerHTML : `<div class="textLoop type2"></div>`}) );

	return rp;
}

export function recentWork(){

	let html = `
			<header>
				<h3 class="">최근 작업</h3>
				<a href="?list=on" class="btn btn-link">더보기</a>
			</header>
			
			<div class="contents-wrap">
				<div class="list-type1 items-wrap">

					<!--item-->
					<button class="btn item"  data-order="20" data-action="modal" title="pageView" aria-label="샘플페이지보기" data-ui-util="pageView">
						<strong>연세의료원 직원교육</strong>
						<i class="btn icon" aria-hidden="true"></i>
						<span class="labels d-inline-flex gap-2">
							<b class="label main" data-type="1">웹</b><b class="label sub" data-type="2">구축</b>
						</span>
						
					</button>
					<!--/item-->

					<!--item-->
					<button class="btn item"  data-order="13" data-action="modal" title="pageView" aria-label="샘플페이지보기" data-ui-util="pageView">
						<strong>CMDS</strong>
						<i class="btn icon" aria-hidden="true"></i>
						<span class="labels d-inline-flex gap-2">
							<b class="label main" data-type="1">웹</b><b class="label sub" data-type="2">구축</b>
						</span>
						
					</button>
					<!--/item-->
					
					
					
				</div>
				
			</div>`;
	let recentWork = DOM.CreateElement({tag:"section", class: "recent-work", innerHTML : html});
	//recentWork.addEventListener("click", cardListHandler);
	return recentWork;
}

const tag = {
	card : (num,item) => {
		return `
			<article class="item shape${num+1}"  data-order="${item.order}">
				<header>
					<div class="labels">  
						${ item.category.map( c => `<span class="label ${c.label}" data-type="${c.type}">${c.name}</span>`).join('') }
					</div>
					<h4>${item.title}</h4>
					<div class="util">
						<button type="button" class="btn" data-action="modal"  data-ui-util="${ item.samplePage.length ? "pageView" : "zoomIn"}" data-order="${item.order}">더보기</button>
					</div>
				</header>
				<div class="contents">
					<div class="images-wrap"> <!--test-->
						${mainOpenList( num, item)}
					</div>
					<div class="bg" aria-hidden="true">
						<i class="clip01" aria-hidden="true"></i>
						<i class="clip02" aria-hidden="true"></i>
						<i class="clip03" aria-hidden="true"></i>
					</div>
				</div>
			</article>
		`
	}
}

function mainOpenList(num, item){

	let cn = "mp";
	if( num === 2 ) cn = "full";

	return item.mainOpenImages.map( (img,idx) => `<img src="./data/${img.webUrl}" class="${ idx === 0 ?  cn : "dp"}" alt="${item.title}">` ).join("");
}

// 메인 ======================================