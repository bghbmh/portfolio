import { fileHandler } from "./fileHandler.js";
import { url } from "./linkAddress.js";

/*
샘플 컴포넌트 테스트용_230714
html을 createElement로 만들지 않고
퍼블된 태그 구조를 그대로 사용
*/

export var Sample = (function() {

	let _itemsData = null;
	let _dataUrl = null;
	let _space = null;
	let _category = [];
	let _sampleItems = {};
	let _nav = null;
	let _navData = null;
	let _itemsBox = null;
	let _selectedCategory = null;

	return {
		setItems: function( selectedCategory = null ){

			if( !_itemsBox ){   console.log("init _itemsBox" );
				_itemsBox = CreateElement( { tag : "section", class: "sample"} );
				this.setEvent("click", _itemsBox, testSampleHtmlEvent);
				_space.appendChild( _itemsBox );
			}
			
			if( !_category.length ){   console.log("init _category", _category);
				_itemsData.forEach( item => {
					if( _category.findIndex( v => v ===  item.category) < 0 ) {
						_category.push( item.category);
					}
				}); 
			}

			if( !Object.entries(_sampleItems).length ){  console.log("init _sampleItems" );
				_itemsData.forEach( item => {

					let isThere = false;
					for( let key in _sampleItems ) {
						if( key === item.category ) isThere = true;					
					}

					if( !isThere ) {
						_sampleItems[item.category] = [];
					}

					if( item.description ) {
						_sampleItems[item.category].push(item);
					}

				}); 

				return;
			}
				
			// if( selectedCategory &&  _category.findIndex( v => v ===  selectedCategory) >= 0 ){
			// 	_itemsBox.innerHTML = "";
			// 	_selectedCategory = selectedCategory;
			// 	console.log("there is a selectedCategory in Arr [_category] - ",_sampleItems, _itemsBox.innerHTML, selectedCategory);
				
			// } else {
			// 	console.log(" no selectedCategory - ", selectedCategory);
			// 	return;
			// }

			this.render(_itemsBox, this.sampleHtml( _sampleItems ));

		},
		setNav: function(){ console.log("setNav");
			if( !_nav ){
				_nav = CreateElement( { tag : "nav", class: "design"} );
				this.setEvent("click", _nav, sampleNavEvent);
				_space.insertBefore( _nav, _space.firstChild );
			}

			this.render(_nav, this.navHtml( _navData ));
		},
		dataSetUp: function(request) {

			if( request.arguments.loadType === "nav" ){
				_navData = JSON.parse(request.responseText);
				this.setNav();
			}

			if( request.arguments.loadType === "items"  ){
				_itemsData =  JSON.parse(request.responseText);;
				this.setItems();
			}

		},
		init: function( space = null, dataUrl = null ){

			_space = space;
			//this.setNav(_space.parentNode );
			
			if( dataUrl ){
				_dataUrl = dataUrl;
				fileHandler._load( { url: './data/sampleNav.json', callback : this.dataSetUp.bind(this), loadType: "nav" });
				fileHandler._load( { url: dataUrl, callback : this.dataSetUp.bind(this), loadType: "items" });
			}
		},
		navHtml: function (btns){
			return `<div class="menubar" role="menubar">
						${this.addButtons(btns)}
					</div>`;
		},
		addButtons: function(btns){
			let buttons = ``;

			for( let i=0; i<btns.length; i++ ){					
				buttons += `<button type="button" role="menuitem" data-selected="false" data-category="${btns[i].category}" class="${btns[i].class}">
								${btns[i].menu}<small>${btns[i].sub}</small>
							</button>`;					
			}
			return buttons;
		},
		sampleHtml: function (){

			let html =``;

			if( !_selectedCategory || !_sampleItems[_selectedCategory] ) {				
				return `
					<div class="item none">
						등록된 이미지가 없습니다
					</div>
				`;
			}
			
			_sampleItems[_selectedCategory].forEach( item => {
				 
				html += `
					<div class="item" style="background-image : url('${item.description.bg}');" data-category=${item.category}>
						<figure class="img"><img src="${item.description.img}" alt="img title" aria-hidden="true"></figure>
						<figcaption class="info">
							${this.testDl(item.description.info)}
						</figcaption>
					</div>
				`;	
			});
			
			return html;
		},
		testDl: function(info){
			 
			let dl = ``;

			for( let key in info ){					
				dl += `<dl><dt>${key}</dt><dd>${info[key]}</dd></dl>`;					
			}
			return dl;
		},
		setEvent: function(type, target, callback = null){
			if( !callback ){
				callback = () => { console.log("sample setEvent test") };
			}
			target.addEventListener(type, (e) => {
				this.setState(callback(e));
			});
		},
		setState: function(clickMenu){
			
			_selectedCategory = url.searchParams.get("category");
			
			// try {
			// 	_addressUrl.searchParams.get("category");
			// 	_addressUrl.append("category", clickMenu.dataset.category);
			// 	// loginUser(addr.searchParams.get("user"));
			// 	// gotoPage(addr.searchParams.get("page"));
			// } catch (err) {
			// 	//showErrorMessage(err);
			// 	console.log("addr URL error - ", err)
			// }


			//console.log("url.searchParams.get category ++ sampleTest ++  ", url.searchParams.get("category"));

			// 페이지이동 임시_230706
			if( url.searchParams.get("category") === "all"  ){
				//location.href = "products.html";
				document.querySelector("main").classList.contains("design");
				return console.log("url category? all - ");
			}

			if( !clickMenu ) return console.log("list? clickMenu - ", clickMenu);

			if( _selectedCategory === clickMenu.dataset.category ) {
				//console.log("same state====== ", url);
				return;
			}

			if( clickMenu.dataset.category === "all"  ){
				//location.href = "products.html";
				document.querySelector("main").classList.contains("design");
				return console.log("click category? all - ", clickMenu);
			}


			_selectedCategory = clickMenu.dataset.category;
			url.searchParams.set("category", _selectedCategory );
			const state = { page_id: 1, user_id: 5 };
			history.pushState(state, "", url);

			if( !clickMenu.parentNode.classList.contains("on") )
				clickMenu.parentNode.classList.add("on");			

			for( const menu of clickMenu.parentNode.children ){
				menu.classList.remove("on");

				if( menu.dataset.selected === "true" )
					menu.dataset.selected === "false";
			}

			clickMenu.classList.add("on");
			clickMenu.dataset.selected = "true";

			this.setItems( _selectedCategory );
		},
		render: function(target, html = null){
			console.log("render", html );
			// let renderArea = _space;
			// if( target ) renderArea = target;
			( target ? target : _space ).innerHTML = html;
			 
		}
	};

} )();




function sampleNavEvent(e) {

	let clickMenu = e.target.closest("button");
	return e.target.closest("button");

}

function testSampleHtmlEvent(e) {
	
	let clickElem = e.target.closest(".item");

	for( let child of clickElem.parentNode.children ){
		console.log("child - ", child.classList.remove("expand"))
	}
	clickElem.classList.add("expand");

	return null;

}


let sampleNavHtml = `
				<nav class="design">
					<div class="menubar" role="menubar">
						<button type="button" role="menuitem" data-selected="false" data-category="웹" class="icon-pf-21">
							test<small>Web / UI / UX</small>
						</button>
						<button type="button" role="menuitem" data-selected="false" data-category="인쇄" class="icon-pf-22">
							test<small>Print / Illust</small>
						</button>
						<button type="button" role="menuitem" data-selected="false" data-category="콘텐츠" class="icon-pf-24">
							test<small>Content / Illust</small>
						</button>
						<button type="button" role="menuitem" data-selected="false" data-category="브랜딩" class="icon-pf-23">
							test<small>Branding / CI / BI</small>
						</button>
						<button type="button" role="menuitem" data-selected="false" data-category="모두" class="icon-pf-23">
							모두 보기<small>모두 보기</small>
						</button>
					</div>
				</nav>
			`;

// import { fileHandler } from "./fileHandler.js";


// class Component {
// 	_space;
// 	_state;
// 	constructor (tar) {
// 		this._space = tar;
// 		this.setup();
// 		this.render();
// 	}
// 	setup () {};
// 	template () { return ''; }
// 	render () {
// 		this._space.innerHTML = this.template();
// 		this.setEvent();
// 	}
// 	setEvent () {}
// 	setState (newState) {
// 		this._state = { ...this._state, ...newState };
// 		this.render();
// 	}
// }


// class SampleTest22 extends Component {
// 	template () { 
// 		return `
// 			<div>div 태그입니다</div>
// 		`; 
// 	}

// 	setEvent () {
// 		this.$target.querySelector('button').addEventListener('click', () => {
// 			const { items } = this.$state;
// 			this.setState({ items: [ ...items, `item${items.length + 1}` ] });
// 		});
// 	}
// }


// export var SampleTest = (function() {
//  	var target = null;
//  	var idIndex = 0;
//  	var dataUrl = null;
// 	var rawData = null;
// 	var className = null;

//  	return {
//  		init: function( jsonObj = null ){
//  			rawData = jsonObj;

//  		},
//  		setup () {
//  			dataUrl = '../testJS/data/bmh.json';
//  			target = document.querySelector('.sample');
//  			fileHandler._json(uiDataUrl, this.init.bind(this));
//  		},
// 		template : function () { 
// 			return `
// 				<div class="item">
// 					<figure class="img"><img src="" alt="img alt"></figure>
// 					<div class="info">
// 						<dl><dt>title1111</dt><dd>sub_story</dd></dl>
// 					</div>
// 					<div class="hashWrap">
// 						<button type="button" class="hash">hash11</button>
// 						<button type="button" class="hash">hash22</button>
// 					</div>
// 				</div>
// 			`; 
// 		},

// 		render : function (tar) { 
// 			console.log("render - ", target)
// 			tar.innerHTML = this.template(); // 
// 			this.setEvent();
// 		},

// 		setEvent : function () {
// 			target.addEventListener('click', (e) => {

// 				console.log("SampleTest setEvent  - ",e.currentTarget, e.target)
// 				//const { items } = this.$state;
// 				//this.setState({ items: [ ...items, `item${items.length + 1}` ] });
// 			});
// 		}
//  	};
//  })();
