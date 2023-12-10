

class ModalType{
	constructor() {
		this._type = null;
		this._element = null;
		this._motherBoard = null;
	}

	set Type(Type){ this._type = Type; }
	get Type(){ return this._type; }

	set element(elem){ this._element = elem; }
	get element(){ return this._element; }

	set motherBoard(motherBoard){ this._motherBoard = motherBoard; }
	get motherBoard(){ return this._motherBoard; }

}
 

//
export var Modal = {
 	 UI : new ModalType(),

 	
		attachEvent : function(eTarget, eType, eFunc) {
			eTarget.addEventListener(eType, eFunc );
		},
 		draw: function( ){
			//console.log("Modal init - " );
			this.UI.motherBoard = document.querySelector("body");
			

			//testModal(msg, btnStr, UI);

			if( !this.UI.element || !this.UI.motherBoard ) {
				console.log("there is No Element - " , UI);
				return;
			}

			this.UI.motherBoard.classList.add("openModal");
 			this.UI.element.classList.add("on");

			this.UI.motherBoard.appendChild(this.UI.element);

			console.log("Modal draw" + this.UI.Type , " - ", this.UI  );
		},
		Alert : function( args) {
			this.UI.Type = "alert";
			this.UI.element = CreateElement({ 
				tag: "DIV",  
				class : args.class ? args.class : "popup alert ",
				role: "alert" });
			
			this.draw(); // args
		},
		Prompt : function( args) {
			
			console.log("Modal Prompt - ",args );
			this.draw();
		},
		Confirm : function(args ) {
			
			console.log("Modal Confirm - ",args );
			this.draw();
		},
		Zoomin : function(args){
			// this.motherBoard = document.querySelector("body");
			console.log("Modal tId" + this.UI.tId  );

			this.UI.tId = args.tId;
			this.UI.Type = "zoomin";
			this.UI.element = CreateElement({ 
				tag: "DIV",  
				class: args.class ?  args.class : "popup zoomin", 
				role: "dialog" });

				//console.log("test  Zoomin - ", UI);
	
			this.UI.element.innerHTML = `
				<div class="header">
					<button type="button" class="btn icon modalClose" aria-label="팝업닫기" title="닫기"></button>
				</div>
				<div class="contents">
					<img src="${args.target}" alt="modal img test">
				</div>
				`;
			this.UI.element.querySelector(".modalClose").addEventListener("click", e => {
				let childNode = e.currentTarget.closest(".popup");
				childNode.classList.remove("on");
				setTimeout(() => this.UI.motherBoard.removeChild(childNode), 400);
			});
			this.draw();
		},
		detail : function(args){
			//console.log("test detail Viewpage - ", args);

			this.UI.Type = "detail";


			/* 상세보기 있는지 확인 */
			
			let isElement = '';
			args.class.split(" ").forEach( str => isElement += "." + str);
			

			if( document.querySelector(isElement) || document.querySelector(".popup.detail") ){
				//console.log( " isElement - ", args.class, isElement);
				this.UI.element = document.querySelector(isElement) || document.querySelector(".popup.detail");
				
			} else {
				//console.log( " CreateElement - ", args.class, isElement);
				this.UI.element = CreateElement({ 
					tag: "DIV",  
					class: args.class ?  args.class : "popup detail", 
					role: "dialog" });
			}


			
	
			this.UI.element.innerHTML = args.html;
			this.UI.element.querySelector(".modalClose").addEventListener("click", e => {
				let childNode = e.currentTarget.closest(".popup");
				childNode.classList.remove("on");
				setTimeout(() => this.UI.motherBoard.removeChild(childNode), 400);
			});

			for( let prop in args ){
				switch (prop){
					case "eventListeners":
						for( let eType in args[prop] ){
							this.attachEvent(this.UI.element, eType, args[prop][eType] )
							//this.UI.element.addEventListener(eType, args[prop][eType] );
						}
						
						break;
					default :
						//script[prop] = options[prop];
						//console.log("options - ",prop);
						break;
				}
		
			}

			this.draw();

		}

 	};

function CreateElement(attributes = {}) { // { tag : "div", class: "sample"} 
	if (!attributes.hasOwnProperty("tag")) return alert("no Tag, check attributes + tagName");

	let tag = document.createElement(attributes.tag);
	for (let prop in attributes) {
		if (prop == "tag") continue;
		tag.setAttribute(prop, attributes[prop]);
	}
	return tag;
}

/* 나중에 따로 모아두기 */



