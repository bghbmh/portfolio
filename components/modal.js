import * as cf from '../assets/js/commonFunction.js';

export let Modal = {	
	//let item = items.find( o => o.id === parseInt(selectedItem) );
	box : null,
	init : (item) => {
		Modal.box = cf.CreateElement({ tag : "div",  
			class: "modal fade",
			id : item.id ? item.id : 'example1',
			tabindex :-1,
			"aria-labelledby" : item.id ? item.id+"Label" : 'Label',
			"aria-hidden" : true
		})

		Modal.box.addEventListener("click", e => {
			
			if( !e.target.closest('[data-bs-dismiss]') ) return;
			
			e.stopPropagation();
			e.currentTarget.classList.remove("show");

			Modal.close();
			
			setTimeout(() => {
				//console.log("setTimeout - ",item, Modal);
			}, 5000);
		});

		Modal.outsideContentClickHandler();

		if( item.addEvent ) {
			console.log("'addEvent???", item.addEvent)
			Modal.addEvent();
		}
	},
	addEvent : () =>{
		console.log("'addEvent", this)
	},
	attachEvent(eTarget, eType, eFunc) {
		//console.log('eFunc - ',eFunc, typeof eFunc)
		if( typeof eFunc !== "function" ){
			//console.log('eFunc33 - ',eFunc, typeof eFunc)
			for( let f of eFunc ) eTarget.addEventListener(eType, f );
			return;
		}
		eTarget.addEventListener(eType, eFunc );
	},
	open : (item, mainBody = null ) => {
		//console.log(Modal)
		if( !Modal.box ) Modal.init(item);

		Modal.box.innerHTML = item.tamplateHTML;
		Modal.box.classList.add("show");

		if( !mainBody )	document.querySelector("body").appendChild(Modal.box);
		else mainBody.appendChild(Modal.box); /* 차후 문자인지 아닌지 확인절차 추가*/

		document.querySelector("body").classList.add("modalOpen");

		return Modal.box; // 부투스트랩 확인해보기
	},
	close : (id = null ) => {
		document.querySelector("body").removeChild(document.querySelector("#" + Modal.box.id))
		Modal.box = null;
		document.querySelector("body").classList.remove("modalOpen");
	},
	outsideContentClickHandler : () => {
		Modal.box.addEventListener("click", e => {
			if( e.target.closest('.modal-content') ){
				console.log("===== inside modal-content =====")
			} else {
				console.log("===== outside modal-content =====");
				e.stopPropagation();
				e.currentTarget.classList.remove("show");
				Modal.close();
			}
			
			if( !e.target.closest('[data-bs-dismiss]') ) return;
		});
	}


}


 




// import * as cf from '../assets/js/commonFunction.js';

// export let Modal = {	
// 	//let item = items.find( o => o.id === parseInt(selectedItem) );
// 	box : null,
// 	init : (item) => {
// 		Modal.box = cf.CreateElement({ tag : "div",  
// 			class: "modal fade",
// 			id : item.id ? item.id : 'example1',
// 			tabindex :-1,
// 			"aria-labelledby" : item.id ? item.id+"Label" : 'Label',
// 			"aria-hidden" : true
// 		})

// 		Modal.box.addEventListener("click", e => {
			
// 			if( !e.target.closest('[data-bs-dismiss]') ) return;
			
// 			e.stopPropagation();
// 			e.currentTarget.classList.remove("show");

// 			document.querySelector("body").removeChild(document.querySelector("#" + Modal.box.id))
// 			Modal.box = null;
// 			item = null;

// 			//console.log("close",item, Modal);
// 			document.querySelector("body").classList.remove("modalOpen");

			
// 			setTimeout(() => {
// 				//console.log("setTimeout - ",item, Modal);
// 			}, 5000);
			
			
// 		});



// 		if( item.addEvent ) {
// 			console.log("'addEvent???", item.addEvent)
// 			Modal.addEvent();
// 		}
// 	},
// 	addEvent : () =>{
// 		console.log("'addEvent", this)
// 	},
// 	attachEvent(eTarget, eType, eFunc) {
// 		//console.log('eFunc - ',eFunc, typeof eFunc)
// 		if( typeof eFunc !== "function" ){
// 			//console.log('eFunc33 - ',eFunc, typeof eFunc)
// 			for( let f of eFunc ) eTarget.addEventListener(eType, f );
// 			return;
// 		}
// 		eTarget.addEventListener(eType, eFunc );
// 	},
// 	open : (item, mainBody = null ) => {
// 		//console.log(Modal)
// 		if( !Modal.box ) Modal.init(item);

// 		Modal.box.innerHTML = item.tamplateHTML;
// 		Modal.box.classList.add("show");



// 		if( !mainBody )	document.querySelector("body").appendChild(Modal.box);
// 		else mainBody.appendChild(Modal.box); /* 차후 문자인지 아닌지 확인절차 추가*/

// 		document.querySelector("body").classList.add("modalOpen");

// 		return Modal.box; // 부투스트랩 확인해보기
// 	},
// 	close : (id = null ) => {
// 		//console.log("close",id, Modal);

// 		// e.stopPropagation();
// 		// e.currentTarget.classList.remove("show");

// 		document.querySelector("body").removeChild(document.querySelector("#" + Modal.box.id))
// 		Modal.box = null;

// 		document.querySelector("body").classList.remove("modalOpen");

// 		console.log("Modal close22",id, Modal);
// 	}


// }



// // document.querySelector("[data-action='toggle']").addEventListener("click", e => {
// // 	document.querySelector( e.currentTarget.dataset.target).classList.toggle("expanded");
// // });

// function bodyClickhandler(body, content, className = "active") {
// 	console.log("  z33- ");
// 	if (!content) return;
// 	document.querySelector("body").addEventListener("click", xxd.bind({"body" : body, "content":content, "className":className}));
// }

// function xxd(e) {
// 	e.stopPropagation();
// 	let a = findElement(e.target, this.content);
// 	if (a) return;
	
// 	this.body.classList.remove(this.className);
// 	document.querySelector("body").removeEventListener("click", xxd);
	
// }

// function findElement(elem, tar) {
// 	if (!elem && !tar) return;
// 	while (elem !== tar) {
// 		elem = elem.parentNode;
// 		if (elem === document.querySelector("body")) {
// 			return null;
// 		}
// 	}
// 	return elem;
// }


// // document.querySelectorAll("[data-action='modal']").forEach(pp => pp.addEventListener("click", e => {

// // 	e.stopPropagation();
	
// // 	let o = document.querySelector(  e.currentTarget.dataset.target);
// // 	o.classList.add("show");
// // 	console.log("  z11- ");

// // 	if (o.popoverEvent) return;
// // 	o.popoverEvent = true;
// // 	o.querySelector("[data-bs-dismiss='modal']").addEventListener("click", () => {

// // 		console.log("  z22- ");


// // 		o.classList.remove("show");
// // 		delete o.popoverEvent;
// // 	}, { once: true });

// // 	bodyClickhandler(o, o.querySelector(".modal-content"), "show")

// // }));




