'use strict';


let loadFile = {

	_script : function(url){
		//console.log(11);
		let script = document.querySelectorAll('script');
		let loadSscript = this._filename(url);// 파일 이름 찾기
		
		for( let i=0; i<script.length; i++ )
		{
			if( this._filename( script[i].attributes.src.value ) == loadSscript )
			{
				return true; //script[i]				
			}
		}
		var newScript = document.createElement('script');
		newScript.src = url;//url;//this.requestUrl;
		newScript.type= 'text/javascript';

		document.querySelector('body').appendChild(newScript);

		return newScript;

	},
	_css : function(url){
		//console.log(11);
		let cssLink= document.querySelectorAll('link');
		let loadcssLink = this._filename(url);
		
		for( let i=0; i<cssLink.length; i++ )
		{			
			if( cssLink[i].attributes.rel.value != "stylesheet" ) continue;
			if( this._filename( cssLink[i].attributes.href.value ) == loadcssLink ) return true;
		}			

		var newCssLink = document.createElement('link');
		newCssLink.href = url;//url;//this.requestUrl;
		newCssLink.rel = "stylesheet";
		newCssLink.type= 'text/css';

		document.querySelector('head').appendChild(newCssLink);

	},

	_json : function(url, callback){				

		const httpRequest = new XMLHttpRequest();
		const method = "GET";
		const requestURL = url;//"./json/bmh.json"; //"../../json/"+url;//
		//let data = '123';

		//console.log('requestURL : ', url,'\n httpRequest : ',httpRequest);

		if( !httpRequest )
			alert("do not connection");

		httpRequest.open(method, url, true);
		//httpRequest.responseType = 'json';  //type안 정해줄거면 JSON.parse() 자바스크립트 객체로 변환해줘야함
		httpRequest.onreadystatechange = function(){//요청에 대한 상태가 변화할 때다 부른다고함
			// In local files, status is 0 upon success in Mozilla Firefox

			if( httpRequest.readyState === XMLHttpRequest.DONE )
			{
				if (httpRequest.status === 0 || (httpRequest.status >= 200 && httpRequest.status < 400))
				{
					console.log(XMLHttpRequest.DONE, ' ggg(complete) - (request에 대한 처리가 끝났으며 응답할 준비가 완료됨) ')
					//data = httpRequest.response;
					callback(JSON.parse(httpRequest.response));
				}
				else
				{
					// Oh no! There has been an error with the request!
				}
			}

		};

		httpRequest.send();

		
	},

	_html : function(url, request){	
		return fetch(url, request);

		// if(!window.XMLHttpRequest) 
		// {
		// 	window.setTimeout( function() { callback(false); }, 0 );
		// 	return;
		// }			

		// var done = false;
		// var xhr = new window.XMLHttpRequest();

		// xhr.onreadystatechange = function() 
		// {
		// 	if (this.readyState == 4 && !done) 
		// 	{
		// 		done = true;
		// 		console.log("_html", this.response );
		// 		// callback(!!(this.responseXML && this.responseXML.title && this.responseXML.title == "&&<"));
		// 		callback(this.response);
		// 	}
		// }

		// xhr.onabort = xhr.onerror = function() {

		// 	if (!done) 
		// 	{
		// 		done = true;
		// 		callback(false);
		// 	}
		// }

		// try 
		// {
		// 	xhr.open("GET", url);
		// 	xhr.responseType = "document";
		// 	xhr.send();
		// } 
		// catch (e) 
		// {
		// 	window.setTimeout(function() {
		// 		if (!done) 
		// 		{
		// 			done = true;
		// 			callback(false);
		// 		} }, 0);
		// }
		
	},
	
	_filename : function(url){
		//console.log("_filename", url)
		let temp=-1;
		let last;

		while( true )
		{
			temp = url.indexOf("/", temp+1);

 			if( temp == -1 )
 			{
 				return url.substring(last+1, url.length);
				//break;				
 			}
			
			last = temp;
			
		}
	}

	

};


let saveFile = {

	_json : function(requestURL){	// url, callback			

		const httpRequest = new XMLHttpRequest();
		const method = "POST";
		//const requestURL = '../json/test.json';// url;//"./json/bmh.json"; //"../../json/"+url;//
		//let data = '123';

		console.log('2222 requestURL : ', requestURL,'\n httpRequest : ',httpRequest);

		if( !httpRequest )
			alert("do not connection");

		let obj;
		let dbParam;

		httpRequest.onreadystatechange = function(){

			if( httpRequest.readyState === XMLHttpRequest.DONE )
			{
				if (httpRequest.status === 0 || (httpRequest.status >= 200 && httpRequest.status < 400))
				{
					obj = { table: "customers", limit: 20 };
					dbParam = JSON.stringify(obj);

					console.log("saveFile", dbParam);

					
				}
				else
				{
					// Oh no! There has been an error with the request!
				}
			}

		};

		httpRequest.open(method, requestURL, true);
		//httpRequest.responseType = 'json';  //type안 정해줄거면 JSON.parse() 자바스크립트 객체로 변환해줘야함
		//httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

		httpRequest.send(dbParam);
		
	}

};



