

class ModalType{
	constructor(n) { // { parentElement : "부모노드", class: "sample"} 
		console.log(" ModalType constructor", this)
		this._name = n;
		this._element = null;
		this._parentElement = null;
	}

	set Name(n){ this._name = n; console.log("set ModalType Name")  }
	get Name(){ return this._name; }

	set element(elem){ this._element = elem; }
	get element(){ return this._element; }

	set parentElement(par){ this._parentElement = par; }
	get parentElement(){ return this._parentElement; }

	draw(){
		//console.log("Modal init - " );
		this._parentElement = document.querySelector("body");
		

		//testModal(msg, btnStr, UI);

		if( !this._element || !this._parentElement ) {
			console.log("there is No Element - " , this);
			return;
		}

		this._parentElement.classList.add("modal"+this._name);
		if( !this._element.classList.contains("."+this._name) ) this._element.classList.add(this._name);
		this._element.classList.add("on");

		this._parentElement.appendChild(this._element);

		console.log("Modal draw" + this._name , " - ", this  );
	}

	attachEvent(eTarget, eType, eFunc) {
		//console.log('eFunc - ',eFunc, typeof eFunc)
		if( typeof eFunc !== "function" ){
			//console.log('eFunc33 - ',eFunc, typeof eFunc)
			for( let f of eFunc ) eTarget.addEventListener(eType, f );
			return;
		}
		eTarget.addEventListener(eType, eFunc );
	}

	static creat(n){
		return new this(n);
	}

}
 

//
export var Modal = {
		// Alert : function( args) {
		// 	UI.Type = "alert";
		// 	UI.element = CreateElement({ 
		// 		tag: "DIV",  
		// 		class : args.class ? args.class : "popup alert ",
		// 		role: "alert" });
			
		// 	this.draw(); // args
		// },
		// Prompt : function( args) {
			
		// 	console.log("Modal Prompt - ",args );
		// 	this.draw();
		// },
		// Confirm : function(args ) {
			
		// 	console.log("Modal Confirm - ",args );
		// 	this.draw();
		// },
		isUI : null,
		Zoomin : function(args){
			let UI =  ModalType.creat("zoomin"); // new ModalType();

			UI.tId = args.tId;
			UI.element = CreateElement({tag: "DIV", class: args.class ? classGroup(args.class) : `popup ${UI.Name}`,  role: "dialog" });

				//category.findIndex( v => v ===  item.category)
	
			UI.element.innerHTML = `
				<div class="wrap">
					<div class="header">
						<button type="button" class="btn icon modalClose" aria-label="팝업닫기" title="닫기"></button>
					</div>
					<div class="contents">
						${imgList(args.target)}
					</div>
				</div>
				`;
			UI.attachEvent(UI.element, "click", e => {
				if( !e.target.closest(".modalClose") ) return;
				UI.element.classList.remove("on");
				UI.parentElement.classList.remove("modal"+UI.Name);
				setTimeout(() => {
					UI.parentElement.removeChild(UI.element); 
					UI = null; 
				}, 400);
			});
			UI.draw();
		},
		detail : function(args){
			/* 상세보기 있는지 확인 */

			if( !this.isUI ){
				console.log("new isUI- ", this.isUI )
				//console.log( " CreateElement - ", args.class, isElement);
				let UI = new ModalType("detail");
				UI.element = CreateElement({tag: "DIV",  
											class: args.class ?  args.class : `popup ${UI.Name}`, 
											role: "dialog" });
				UI.attachEvent(UI.element, "click", e => {
					if( !e.target.closest(".modalClose") ) return;
					console.log("detail111 - ", UI, this.isUI)

					UI.element.classList.remove("on");
					UI.parentElement.classList.remove("modal"+UI.Name);
					setTimeout(() => {
						UI.parentElement.removeChild(UI.element); 
						UI = null;   this.isUI = null; 
						console.log("detail222 - ", UI, this.isUI)
					}, 400);
				});

				//console.log("eventListeners- ", args )

				for( let prop in args ){
					switch (prop){
						case "eventListeners":

							for( let eType in args[prop] )
							UI.attachEvent(UI.element, eType, args[prop][eType] );
							//UI.element.addEventListener(eType, args[prop][eType] );
							
							break;
						default :
							//script[prop] = options[prop];
							//console.log("options - ",prop);
							break;
					}
			
				}
				this.isUI = UI;
			}
			this.isUI.element.innerHTML = `<div class="wrap">${args.html}</div>`;
			
			this.isUI.draw();

		}


};

function classGroup(arr){
	let c = '';
	arr.forEach( a => c += " " + a );
	return c;
}

function CreateElement(attributes = {}) { // { tag : "div", class: "sample"} 
	if (!attributes.hasOwnProperty("tag")) return alert("no Tag, check attributes + tagName");

	let tag = document.createElement(attributes.tag);
	for (let prop in attributes) {
		if (prop == "tag") continue;
		tag.setAttribute(prop, attributes[prop]);
	}
	return tag;
}


function imgList(item, html = ''){
	
	if( !item.length ){		
		return `<img src="../assets/img/no-img.gif" alt="등록된 이미지가 없습니다">`;
	} 

	item.forEach( src => { html += `<img src="${src}" alt="이미지">` });	
	return html;
}
/* 나중에 따로 모아두기 */



