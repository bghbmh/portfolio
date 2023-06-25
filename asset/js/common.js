
import { fileHandler } from "./fileHandler.js";
import { Layout } from "./layout.js";



//fileHandler._script('js/test.js', {type : 'text/javascript', async : true});
fileHandler._script('js/test2.js');
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
	Layout.init("section", "products", 'data/bmh.json');
	//Layout.init("section", "products", 'data/bmh2.json');
	//Layout.init();
//임시 추가
	document.querySelectorAll("nav.global button").forEach( (menuBtn, idx) => {
		if( idx === 0 ) menuBtn.parentNode.style.setProperty("--x", menuBtn.offsetLeft + menuBtn.offsetWidth/2 );

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




});

function removeClass(elem, cleanClass){
	for( let i=0 ; i< elem.length; i++ ){
		if( elem[i].classList.contains(cleanClass) ) elem[i].classList.remove(cleanClass);
		//elem[key].classList.remove(cleanClass);
	}
}
//window.addEventListener("scroll", resizeImgFromScroll);//상단 인물 이미지 스크롤_리사이징 설정

document.querySelector(".products").addEventListener("click", dataSetClickHandler);

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








