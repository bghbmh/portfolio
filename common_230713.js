
import { fileHandler } from "./fileHandler.js";
import { Grid } from "./GridStyle.js";
//import { gridTest } from "./GridStyle.js";
import { Modal } from "./ModalStyle.js";


//fileHandler._script('js/test.js', {type : 'text/javascript', async : true});


//fileHandler._script('../asset/js/test2.js');
fileHandler._script('../testJS/asset/js/test2.js');


// fileHandler._script('js/test2.js',
// 	{
// 		"eventListeners" : {
// 			'load' : () => { console.log( "===callbackFile===", this) },
// 			'error' : () => { console.log( "===callbackFile===",this) }
// 		}
// 	});

//console.log("readyState00 - ",document.readyState );

window.addEventListener("DOMContentLoaded", () => {
	//console.log("readyState11 - ",document.readyState );
	//console.log("DOMContentLoaded 11", document.querySelector("img").naturalWidth);


});
window.addEventListener("load", () => {
	//Layout.init("section", "sample", '../testJS/data/bmh.json');
	//Layout.init("section", "products", 'data/bmh2.json');
	//Layout.init();
//임시 추가

	console.log("Grid1 - ", Grid.init("sample", '../bmh.json')) 
	console.log("Grid2 - ", Grid.init("sample1", '../testJS/data/bmh.json'))








	document.querySelectorAll("nav.global button").forEach( (menuBtn, idx) => {
		if( idx === 0 )
			menuBtn.parentNode.style.setProperty("--x", menuBtn.offsetLeft + menuBtn.offsetWidth/2 );

		menuBtn.addEventListener("click", () => {
			for( const child of menuBtn.parentNode.children) { child.removeAttribute("aria-current"); }
			menuBtn.setAttribute("aria-current", "page") ;
			menuBtn.parentNode.style.setProperty("--x", menuBtn.offsetLeft + menuBtn.offsetWidth/2 );
			//임시 추가
			removeClass(document.querySelector(".products").children, "off");
			if( menuBtn.dataset.category === "모두" ) return;

			for( let i=0 ; i<  document.querySelector(".products").children.length; i++ ){

				if( menuBtn.dataset.category !==  document.querySelector(".products").children[i].dataset.category ){
					document.querySelector(".products").children[i].classList.add("off")


					if( document.querySelector(".products").children[i].dataset.category === undefined ){

						console.log("oofff - ", document.querySelector(".products").children[i])
					}
				}
				//console.log(document.querySelector(".products").children[key].dataset.category)
			}


		})
	});

/* 대표 디자인만 보여줄때 */
	if( document.querySelector("nav.design") ){
		document.querySelector("nav.design").addEventListener("click", (e) => {

			if( !document.querySelector(".sample") || document.querySelector(".sample").children.length === 0 ) {
				console.log("init -- sample");
				Grid.init( "sample2", '../test.json');
			}

			let clickMenu = e.target.closest("button");

			// 페이지이동 임시_230706
			if( clickMenu.dataset.category === "모두" ){
				location.href = "products.html";
				return;
			}

			if( !clickMenu.parentNode.classList.contains("on") )
				clickMenu.parentNode.classList.add("on");

			console.log("nav.design", e.target );

			for( const menu of clickMenu.parentNode.children ){
				menu.classList.remove("on");

				if( menu.dataset.selected === "true" )
					menu.dataset.selected === "false";
			}

			clickMenu.classList.add("on");
			clickMenu.dataset.selected = "true";
			Grid.draw(clickMenu.dataset.category);


		});
	}



	if( document.querySelector(".products") ) {  console.log("querySelector -- products");
		if( document.querySelector(".products").children.length === 0 ){
			Grid.init("section", "products", '../testJS/data/bmh.json'); //     ../data/bmh.json
			//Grid.init("section", "products", '../data/bmh.json'); //     ../data/bmh.json

		}
		//document.querySelector(".products").addEventListener("click", dataSetClickHandler);
		Grid.draw();
		document.querySelector("nav.design").addEventListener("click", (e) => {

			// let clickMenu = e.target.closest("button");

			// if( !clickMenu.parentNode.classList.contains("on") )
			// 	clickMenu.parentNode.classList.add("on");

			// console.log("nav.design", e.target );
			
			// for( const menu of clickMenu.parentNode.children ){
			// 	menu.classList.remove("on");

			// 	if( menu.dataset.selected === "true" )
			// 		menu.dataset.selected === "false";
			// }

			// clickMenu.classList.add("on");
			// clickMenu.dataset.selected = "true";
			Grid.draw();
	
		});
	}

	if( document.querySelector("nav.front") ){
		document.querySelector("nav.front").addEventListener("click", (e) => {
			console.log("nav.front - ", e.target.closest("[data-ui]") )

			let returnValue ;
			switch ( e.target.closest("[data-ui]").dataset.ui ){
				case "Alert":
					Modal.Alert( "test msg", { ok : "확인" } ) ;
					break;
				case "Prompt":
					returnValue = Modal.Prompt( "test title", { ok : "확인, 네", cancle : "취소, 아니요" }, 'initValue' ) ;
					break;
				case "Confirm":
					returnValue = Modal.Confirm( "test msg", { ok : "확인, 네", cancle : "취소, 아니요" } ) ;
					break;
				default:
					break;
			}
		});
	}



});



function removeClass(elem, cleanClass){
	for( let i=0 ; i< elem.length; i++ ){
		if( elem[i].classList.contains(cleanClass) ) elem[i].classList.remove(cleanClass);
		//elem[key].classList.remove(cleanClass);
	}
}
//window.addEventListener("scroll", resizeImgFromScroll);//상단 인물 이미지 스크롤_리사이징 설정



function dataSetClickHandler(e){

	let clickElem = findDateSet(e.target);
	if( !clickElem ) return;

	console.log("dataSetClickHandler - ",clickElem)

	switch ( clickElem.dataset.ui ) {
		case "modal":
			let parNode = clickElem.closest(".item");
			console.log("modal", parNode.querySelector("img").attributes.src)
			let contents = {
				"src" : parNode.querySelector("img").attributes.src.nodeValue,
				"description" : parNode.querySelector(".description") ? parNode.querySelector(".description").cloneNode(true) : null
			};
			showModal(document.querySelector("body"),contents);

			break;
		default:
			break;
	}
}

function findDateSet(target){
	return target.closest("[data-ui]");
}

/* 임시_모달로 처리*/
function showModal(body, contents, modalSize = null ){

	if( document.querySelector(".modal") ) return;

	body.classList.add("onModal");

	let modal = CreateElement( { tag : "div", class: "modal"} );
	modal.addEventListener("click", (e) => {
		if( !e.target.closest(".modalBody") ){
			body.classList.remove("onModal");
			body.removeChild(modal);
		}
	});
	if( modalSize ) modal.classList.add(modalSize);

	let modalBody = CreateElement( { tag : "div", class: "modalBody"} );

	console.log("showModal", modal, contents)

	for( let key in contents ){
		if( !contents[key] ) continue;
		switch ( key ){
			case "src":
				console.log("SRC - ", contents)
				let img = CreateElement( { tag : "img", src: contents[key] } );
				modalBody.appendChild(img);
				break;
			case "description":
				modalBody.appendChild(contents[key]);
				modal.classList.add("type2");
				break;
		}
	}

	let closeBtn = CreateElement( { tag : "button", class: "close"} );
	closeBtn.addEventListener("click", () => {
		body.classList.remove("onModal");
		body.removeChild(modal);
	});
	modalBody.appendChild(closeBtn);
	modal.appendChild(modalBody);

	body.appendChild(modal);

}








