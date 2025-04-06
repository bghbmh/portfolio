import * as cf from '../assets/js/commonFunction.js';

export class Modal {
	constructor(args) {
		this.box = cf.CreateElement({
			tag: "div",
			class: "modal fade",
			id: args.id ? args.id : "my",
			tabindex: -1,
		});
		this.box.initValue = this.initializeDefaults();
		this.initDefaultValues(args); // 사용자 정의 초기값 설정
		this.create(args); // 모달 생성
	}

	create = (args) => {
		if (this.box.initValue.tamplateHTML) {
			this.box.innerHTML = this.box.initValue.tamplateHTML;
		}

		this.box.classList.add("show");
		document.body.append(this.box);
		document.querySelector("body").classList.add("modalOpen");

		// ✅ onInit 함수 실행
		if (typeof this.box.initValue.onInit === "function") {
			this.box.initValue.onInit(this.box);
		}

	};

	// 기본 속성설정
	initializeDefaults() {
		return {
			tamplateHTML: null,
			onInit: null, // 기본은 null, 함수가 들어오면 실행
		};
	}

	// 사용자 정의 초기값 설정
	initDefaultValues = (args) => {
		if (!args) return;
		for (let key in args) {
			this.box.initValue[key] = args[key];
		}
	};

	static open(args = null) {
		return new this(args);
	}

	static close(obj = null) {
		if (!obj) return;
		console.log("close modal - ", obj);
	}
}




// document.querySelector("[data-action='toggle']").addEventListener("click", e => {
// 	document.querySelector( e.currentTarget.dataset.target).classList.toggle("expanded");
// });

function bodyClickhandler(body, content, className = "active") {
	console.log("  z33- ");
	if (!content) return;
	document.querySelector("body").addEventListener("click", xxd.bind({"body" : body, "content":content, "className":className}));
}

function xxd(e) {
	e.stopPropagation();
	let a = findElement(e.target, this.content);
	if (a) return;
	
	this.body.classList.remove(this.className);
	document.querySelector("body").removeEventListener("click", xxd);
	
}

function findElement(elem, tar) {
	if (!elem && !tar) return;
	while (elem !== tar) {
		elem = elem.parentNode;
		if (elem === document.querySelector("body")) {
			return null;
		}
	}
	return elem;
}


// document.querySelectorAll("[data-action='modal']").forEach(pp => pp.addEventListener("click", e => {

// 	e.stopPropagation();
	
// 	let o = document.querySelector(  e.currentTarget.dataset.target);
// 	o.classList.add("show");
// 	console.log("  z11- ");

// 	if (o.popoverEvent) return;
// 	o.popoverEvent = true;
// 	o.querySelector("[data-bs-dismiss='modal']").addEventListener("click", () => {

// 		console.log("  z22- ");


// 		o.classList.remove("show");
// 		delete o.popoverEvent;
// 	}, { once: true });

// 	bodyClickhandler(o, o.querySelector(".modal-content"), "show")

// }));



function modalWrap(){
	return cf.CreateElement({ tag : "div",  
		class: "modal-dialog modal-dialog-centered modal-dialog-scrollable",
		id : "my" ,
		tabindex :-1,
	})`
	<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable"> 
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">
					<span>edit_test</span>
				</h5>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body formType1 ">
				${myDBCardType1.edit(item)}
			</div>
		</div>
	</div>`
}
