

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
export var Modal = (function() {
 	let UI = new ModalType();

 	return {
		attachEvent : function(eTarget, eType, eFunc) {
			eTarget.addEventListener(eType, eFunc );
		},
 		draw: function( ){
			//console.log("Modal init - " );
			UI.motherBoard = document.querySelector("body");
			

			//testModal(msg, btnStr, UI);

			if( !UI.element || !UI.motherBoard ) {
				console.log("there is No Element - " , UI);
				return;
			}

			UI.motherBoard.classList.add("modal"+UI.Type);
 			UI.element.classList.add("on");

			UI.motherBoard.appendChild(UI.element);

			console.log("Modal draw" + UI.Type , " - ", UI  );
		},
		Alert : function( args) {
			UI.Type = "alert";
			UI.element = CreateElement({ 
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
			console.log("Modal tId" + UI.tId  );

			UI.tId = args.tId;
			UI.Type = "zoomin";
			UI.element = CreateElement({ 
				tag: "DIV",  
				class: args.class ?  args.class : "popup zoomin", 
				role: "dialog" });

				//console.log("test  Zoomin - ", UI);
	
			UI.element.innerHTML = `
				<div class="wrap">
					<div class="header">
						<button type="button" class="btn icon modalClose" aria-label="팝업닫기" title="닫기"></button>
					</div>
					<div class="contents">
						<img src="${args.target}" alt="modal img test">
					</div>
				</div>
				`;
			UI.element.querySelector(".modalClose").addEventListener("click", e => {
				let childNode = e.currentTarget.closest(".popup");
				childNode.classList.remove("on");
				console.log( "close - ",UI  )
				UI.motherBoard.classList.remove("modal"+UI.Type);
				setTimeout(() => {UI.motherBoard.removeChild(childNode); UI.motherBoard = ""}, 400);
			});
			this.draw();
		},
		detail : function(args){
			//console.log("test detail Viewpage - ", args);

			UI.Type = "detail";


			/* 상세보기 있는지 확인 */
			
			let isElement = '';
			args.class.split(" ").forEach( str => isElement += "." + str);
			

			if( document.querySelector(isElement) || document.querySelector(".popup.detail") ){
				//console.log( " isElement - ", args.class, isElement);
				UI.element = document.querySelector(isElement) || document.querySelector(".popup.detail");
				
			} else {
				//console.log( " CreateElement - ", args.class, isElement);
				UI.element = CreateElement({ 
					tag: "DIV",  
					class: args.class ?  args.class : "popup detail", 
					role: "dialog" });
			}


			
	
			UI.element.innerHTML = `<div class="wrap">${args.html}</div>`;
			UI.element.querySelector(".modalClose").addEventListener("click", e => {
				let childNode = e.currentTarget.closest(".popup");
				childNode.classList.remove("on");
				console.log( "close - ",UI  )
				UI.motherBoard.classList.remove("modal"+UI.Type);
				setTimeout(() => {UI.motherBoard.removeChild(childNode); UI.motherBoard = ""}, 400);
			});

			for( let prop in args ){
				switch (prop){
					case "eventListeners":
						for( let eType in args[prop] ){
							this.attachEvent(UI.element, eType, args[prop][eType] )
							//UI.element.addEventListener(eType, args[prop][eType] );
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
 })();

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



