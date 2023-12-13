 

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
		const xhr = new XMLHttpRequest();
		//xhr.callback = null || args.callback;
		xhr.arguments = args;
		// xhr.onload = testSuccess;
		// xhr.onerror = testError;
		xhr.onreadystatechange = xhrReadystatechange;
		xhr.onprogress = UpdateProgress;
		xhr.open("GET", args.url, true);
		xhr.send(null);
	}

}


function xhrSuccess(xhr) {
	loadingMessage.off();

	if ( xhr.status === 0 || ( xhr.status >= 200 && xhr.status < 400 ) ) {
		//console.log("testSuccess - ", xhr.arguments[0] );
		fileTypeBox(xhr);
		// The request has been completed successfully
		//console.log("readystatechange status good - ", this.readyState);
	} else {
		// Oh no! There has been an error with the request!
		console.log("testSuccess 확인중_파일이 않습니다.", xhr.responseURL, "\n xhr.readyState - ", xhr.readyState);
		//alert("확인중_파일이 존재하지 않습니다." + url)
	}
}
function xhrError(xhr) {
	loadingMessage.off();
	//console.log("testError qqq- ", xhr,xhr.statusText)
	console.log("확인중_파일이 존재하지 않습니다.", xhr.responseURL, "\n this.readyState - ", xhr.readyState);

}
function xhrReadystatechange(){
	//console.log("testReadystatechange");

	loadingMessage.on("text text");
	//console.log(loadingMessage)
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
		const percentComplete = (event.loaded / event.total) * 100;
		//console.log("The transfer is updateProgress.", percentComplete);
		// ...
	} else {
		// Unable to compute progress information since the total size is unknown
	}
}

function fileTypeBox(xhr) {
	//console.log("fileTypeBox - ", xhr)

	switch ( fileType(xhr.arguments.url) ){
		case "js":
			//console.log("fileTypeBox script");
			_script(xhr.arguments);
			break;
		case "json":
			//console.log("fileTypeBox json");
			xhr.arguments.callback( xhr)
			break;
	}
}
function fileType ( fileUrl ){
	return fileUrl.slice( fileUrl.lastIndexOf('.') + 1 ) ;
}
function _css ( options = {} ){


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


// var loadingMessage =  {
// 	isThere : null,
// 	newMsg : null,
// 	on : function (msg = null){
// 		//console.log("on");
// 		this.isThere = document.querySelector(".loadingMessage");

// 		if( this.isThere ) return;

// 		this.newMsg = document.createElement("div");
// 		this.newMsg.setAttribute("class", "loadingMessage")
// 		this.newMsg.textContent =  msg || "loading_test";
// 		document.querySelector('body').appendChild(this.newMsg);

// 	},
// 	off : function() {
// 		if( !this.isThere ) return;
// 		//console.log("off", this);
// 		this.isThere.parentNode.removeChild(this.isThere);
// 		this.isThere = null;
// 		this.newMsg = null;

// 	}
// };



var loadingMessage = (function() {
	console.log("loadingMessage state - ");

	let isThere = null;
	let newMsg = null;

	return {
		on : function (msg = null){
			//console.log("on", msg);
			isThere = document.querySelector(".loadingMsg");

			if( isThere ) return;

			newMsg = document.createElement("div");
			newMsg.setAttribute("class", "loadingMsg")
			newMsg.textContent =  msg || "잠시만 기다려주세요";
			document.querySelector('body').appendChild(newMsg);

		},
		off : function() {

			if( !isThere ) return;
			//console.log("off");
			isThere.parentNode.removeChild(isThere);
			isThere = null;

		}
	};
} )();


