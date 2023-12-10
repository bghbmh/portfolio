import { fileHandler } from "./fileHandler.js";


class ModalStyle{
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
 	let UI = new ModalStyle();

 	return {
		setuiData : function(jsonObj){
			UI.Data = jsonObj;
			console.log("setUIData - ", UI, this  )
			//this.draw();
		},
		attachEvent : function(eType, eTarget, eFunc) {
			eTarget.addEventListener(eType, eFunc );
		},
 		draw: function(msg, btnStr,Type ){
			console.log("Modal init - " );
			UI.motherBoard = document.querySelector("body");
			UI.Type = Type;
			UI.element = document.createElement("div");
			UI.element.setAttribute("role", "dialog");
			UI.element.setAttribute("class", "modal");

			testModal(msg, btnStr, UI);
		},
		Alert : function( msg, btnStr) {
			
			console.log("Modal Alert - ",msg, btnStr  );
			this.draw(msg, btnStr,"Alert");
		},
		Prompt : function( msg, btnStr ) {
			
			console.log("Modal Prompt - ",msg, btnStr  );
			this.draw("Prompt");
		},
		Confirm : function( msg, btnStr ) {
			
			console.log("Modal Confirm - ",msg, btnStr  );
			this.draw("Confirm");
		}

 	};
 })();


 function testModal(msg, btnStr, UI){ // { ...attributes } = {} { tag : "div", class: "sample"} 

 	console.log("testModal0 - ", msg, btnStr, UI );

 	UI.motherBoard.classList.add("openModal");
 	UI.element.classList.add("on");

	let modalBody = CreateElement( { tag : "div", class: "modalBody " + UI.Type } );

	let content = CreateElement( { tag : "div", class: "content" } );
	content.textContent = msg;
	modalBody.appendChild(content);

	let btnArea = CreateElement( { tag : "div", class: "btnArea" } );

	console.log("testModal1 - ",  btnStr["ok"] )

	let ok ;
	let cancle ;
	for( let key in btnStr ){
		console.log("testModal1 - ", key, btnStr["ok"] )
		switch( key ){
			case "ok":
				ok = CreateElement( { tag : "button", type: "button", class: "ok" } );
				ok.textContent = btnStr[key];

				//Modal.attachEvent("click", ok, eFunc)
				ok.addEventListener("click", function btnhandler(){
					console.log("Modal ok - " );
					UI.element.classList.remove("on");
					UI.motherBoard.classList.remove("openModal");
					let tId = setTimeout(() => {
						// target.disabled = false;
						ok.removeEventListener("click", btnhandler);
						UI.motherBoard.removeChild(UI.element);
						clearTimeout(tId);
					}, 400);
				});
				btnArea.appendChild(ok);
				break;
			case "cancle":
				cancle = CreateElement( { tag : "button", type: "button", class: "cancle" } );
				cancle.textContent = btnStr[key];
				cancle.addEventListener("click", function btnhandler(){
					console.log("Modal cancle - " )
					UI.element.classList.remove("on");
					UI.motherBoard.classList.remove("openModal");
					let tId = setTimeout(() => {
						// target.disabled = false;
						cancle.removeEventListener("click", btnhandler);
						UI.motherBoard.removeChild(UI.element);
						clearTimeout(tId);
					}, 400);
				});
				btnArea.appendChild(cancle);
				break;
		}
	}			

	

	modalBody.appendChild(btnArea);

	UI.element.appendChild(modalBody);
	UI.motherBoard.appendChild(UI.element);

}


