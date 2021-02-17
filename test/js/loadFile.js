'use strict';


let loadFile = {

	_script : function(url){
		console.log(11);
		var script = document.createElement('script');
		script.src = url;//url;//this.requestUrl;
		script.type= 'text/javascript';

		document.querySelector('head').appendChild(script);

		// script.addEventListener('load', function(){
		// 	console.log('script  : ',script);
		// });

	},

	_json : function(url, callback){				

		const httpRequest = new XMLHttpRequest();
		const method = "GET";
		const requestURL = url;//"./json/bmh.json"; //"../../json/"+url;//
		//let data = '123';

		console.log('requestURL : ', url,'\n httpRequest : ',httpRequest);

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

		// httpRequest.onload = function() {
		// 	var superHeroes = httpRequest.response;
		// }
		
	}

	

};




