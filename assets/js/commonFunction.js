export function CreateElement(attributes = {}) { // { tag : "div", class: "sample", ...} 
	if (!attributes.hasOwnProperty("tag")) return alert("no Tag, require the Tag");

	let tag = document.createElement(attributes.tag);
	for (let prop in attributes) {
		if (prop == "tag") continue;
		if( prop == "textContent" || prop == "innerHTML" ){
			tag[prop] = attributes[prop];
			continue;
		}
		tag.setAttribute(prop, attributes[prop]);
	}
	return tag;
}


export const throttle = (callback, timeout = 600) => {
	let timer;
	return (...args) => {
		if (!timer) {
			timer = setTimeout(() => {
				callback.apply(this, args);
				timer = undefined;
			}, timeout);
		}
	};
};
  

export const debounce = (callback, timeout = 400) => {
	let timer;
	return (...args) => {
		clearTimeout(timer);
		timer = setTimeout(() => { callback.apply(this, args);  console.log("debounce") }, timeout);
	};
};



export class fileHandler {
	/*
	{
		"type" : "script",
		"url": '../asset/js/test2.js' ,
		"eventListeners" : {
			"load" : () => { console.log( "===load callbackFile===", this) },
			'error' : () => { console.log( "===cerror allbackFile===",this) }
		}
	}
	*/
	static _load = ({...args}) => {
		//console.log("_load - ",args );
		const xhr = new XMLHttpRequest();
		//xhr.callback = null || args.callback;
		xhr.arguments = args;
		// xhr.onload = testSuccess;
		// xhr.onerror = testError;
		xhr.onreadystatechange = xhrReadystatechange;
		xhr.onprogress = args.progress || UpdateProgress;
		xhr.open("GET", args.url, true);
		xhr.send(null);
	}

}
	

function xhrSuccess(xhr) {
	//loadingMessage.off();

	if ( xhr.status === 0 || ( xhr.status >= 200 && xhr.status < 400 ) ) {
		//console.log("testSuccess - ", xhr.arguments[0] );
		fileType(xhr);
		// The request has been completed successfully
		//console.log("readystatechange status good - ", this.readyState);
	} else {
		// Oh no! There has been an error with the request!
		console.log("testSuccess 확인중_파일이 않습니다.", xhr.responseURL, "\n xhr.readyState - ", xhr.readyState);
		//alert("확인중_파일이 존재하지 않습니다." + url)
	}
}
function xhrError(xhr) {
	//loadingMessage.off();
	xhr.arguments.done = false;
	xhr.arguments.msg = "test ERROR message";
	//xhr.arguments.error();

	xhr.arguments.error ? xhr.arguments.error(xhr) : console.log("확인중_파일이 존재하지 않습니다.", xhr.responseURL, "\n this.readyState - ", xhr.readyState);
	
	//xhr.arguments.callback(xhr)

}
function xhrReadystatechange(){
	//console.log("testReadystatechange");

	//loadingMessage.on("xhrReadystatechange");
	if (this.readyState === XMLHttpRequest.DONE) {
		const status = this.status;
		if ( this.status === 0 || ( this.status >= 200 && this.status < 400 ) ) {
			// The request has been completed successfully
			
			xhrSuccess(this);
		} else {
			// Oh no! There has been an error with the request!
			xhrError(this);
		}
	}
}
function UpdateProgress(event) {
	 
	if (event.lengthComputable) {
		const percentComplete = (event.loaded / event.total) * 100;   //loadingMessage.on("UpdateProgress");
		//console.log("1111111The transfer is updateProgress.", percentComplete);
		// ...
		console.log("xxxxx- The transfer is updateProgress.", percentComplete);
	} else {
		// Unable to compute progress information since the total size is unknown
		console.log("2222222The transfer is updateProgress.");
	}
}

function fileType(xhr) {
	//console.log("fileType - ", xhr)

	switch ( fileCheck(xhr.arguments.url) ){
		case "js":
			//console.log("fileType script");
			_script(xhr.arguments);
			break;
		case "html":
			//console.log("fileType script");
			//_html(xhr.arguments);
			xhr.arguments.success(xhr)
			break;
		case "json":
			//console.log("fileType json");
			xhr.arguments.success( xhr)
			break;
		case "nofile":
			//console.log("fileType json");
			xhr.arguments.url = "nofile";
			xhr.arguments.success( xhr);
			break;
	}
}
function fileCheck ( fileUrl ){
	return fileUrl.lastIndexOf('.') === -1 ? "nofile" : fileUrl.slice( fileUrl.lastIndexOf('.') + 1 ) ;
}
function _css ( options = {} ){


}

function _html ( options = {} ){
	console.log("loaded html successfully", options)

}


function _script ( options = {} ){

	let nowWindow = document.querySelector("html");
	let fileName = options.url.slice( options.url.lastIndexOf('/') + 1 ) ;
	let isThere = false;
	nowWindow.querySelectorAll('head script').forEach( (scriptFile, idx) => {
		if( scriptFile.attributes.src.textContent.indexOf(fileName) >= 0 ) isThere = true;
	});

	var script = document.createElement('script');
	script.src = options.url;//url;//this.requestUrl;
	//script.type= type;
	for( let prop in options ){
		switch (prop){
			case "eventListeners":
				//console.log("eventListeners - ",options[prop]);
				for( let type in options[prop] )
					attachEvent(type, script, options[prop][type]);
				break;
			default :
				//script[prop] = options[prop];
				//console.log("options - ",prop);
				break;
		}

	}

	nowWindow.querySelector('head').appendChild(script);

	//console.log("it was loaded a file==============")
	return;

}

function attachEvent (eType, eTarget, eFunc) {
	eTarget.addEventListener(eType, eFunc );
}

function transferComplete(evt) {
	//console.log("The transfer is complete.",this, JSON.parse(evt.target.response) );
}

function transferFailed(evt) {
	//console.log("An error occurred while transferring the file.");
}

function transferCanceled(evt) {
	//console.log("The transfer has been canceled by the user.");
}

	