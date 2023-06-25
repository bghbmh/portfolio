

export class fileHandler {
	static isThere = false;
	static fileName = false;

	static _script = (src, {...options } = {} ) => {
		let nowWindow = document.querySelector("html");
		this.fileName = src.slice( src.lastIndexOf('/') + 1 ) ;
		nowWindow.querySelectorAll('head script').forEach( (scriptFile, idx) => {
			if( scriptFile.attributes.src.textContent.indexOf(this.fileName) >= 0 ) this.isThere = true;
		});

		if( this.isThere ) return;

		var script = document.createElement('script');
		script.src = src;//url;//this.requestUrl;
		//script.type= type;
		for( let prop in options ){
			switch (prop){
			case "eventListeners":
				console.log("eventListeners - ",options[prop]);
				for( let type in options[prop] )
					this.attachEvent(type, script, options[prop][type]);
				break;
			default :
				script[prop] = options[prop];
				console.log("options - ",prop);
				break;
			}

		}

		nowWindow.querySelector('head').appendChild(script);

		console.log("it was loaded a file==============")
		return;
			
	}

	static attachEvent = (eType, eTarget, eFunc) => {
		console.log("attachEvent - ",eType, eTarget, eFunc);
		eTarget.addEventListener(eType, eFunc );
	}

	static _json = (url, callback) => {
		this.findFile(url, callback);
	};

	static findFile = (url, callback) => {
		let isFile = true;
		const httpRequest = new XMLHttpRequest();
		const method = "GET";
		const requestURL = url;

		if( !httpRequest ) alert("do not connection");

		httpRequest.addEventListener("progress", updateProgress);
		httpRequest.addEventListener("load", function(){
			console.log("The transfer is complete." );
			if( isFile )
				callback(JSON.parse(httpRequest.response));
		});
		httpRequest.addEventListener("readystatechange", () => {
			// In local files, status is 0 upon success in Mozilla Firefox
			loadingMessage("on"); console.log("readystatechange status - ", httpRequest.readyState);
			if (httpRequest.readyState === XMLHttpRequest.DONE) {
				const status = httpRequest.status;
				if (status === 0 || (status >= 200 && status < 400)) {
					// The request has been completed successfully
					loadingMessage("off");

				} else {
					// Oh no! There has been an error with the request!
					isFile = false;
					alert("no???")
					console.log("readystatechange status aaaaaaaa - ", httpRequest.readyState);
					loadingMessage("off");
				}
			}
		});
		// httpRequest.addEventListener("error", transferFailed);
		// httpRequest.addEventListener("abort", transferCanceled);

		httpRequest.open(method, url, true); // 동기 false, 비동기 true

		httpRequest.send();

	};
}


// progress on transfers from the server to the client (downloads)
function updateProgress(event) {
  if (event.lengthComputable) {
    const percentComplete = (event.loaded / event.total) * 100;
    console.log("The transfer is updateProgress.", percentComplete);
    // ...
  } else {
    // Unable to compute progress information since the total size is unknown
  }
}

function transferComplete(evt) {
  console.log("The transfer is complete.",this, JSON.parse(evt.target.response) );
}

function transferFailed(evt) {
  console.log("An error occurred while transferring the file.");
}

function transferCanceled(evt) {
  console.log("The transfer has been canceled by the user.");
}


function loadingMessage(state){
	console.log("loadingMessage state - ", state);

	let loadingElem = document.querySelector(".loadingMsg");
	if( state == "off" && loadingElem ){
		loadingElem.parentNode.removeChild(loadingElem);
		return;
	}
	if( document.querySelector(".loadingMsg") ) return;

	let loadingMsg = document.createElement("div");
	loadingMsg.setAttribute("class", "loadingMsg")
	//loadingMsg.textContent = "loading_test";
	document.querySelector('body').appendChild(loadingMsg);
}



