	const http = require('http');
	const fs = require('fs');
	const url = require('url');//모듈 요청? url이라는 모듈 사용 요청
	const qs = require('querystring');

	let cnt = 0;
	let domainName = '/';
	let filesPath = 'files';

	var template = {
		HTML : function(title, list, body, btnset){
			return `
					<!doctype html>
					<html>
						<head>
							<title>WEB1 - ${title}</title>
							<meta charset="utf-8">
						</head>
						<body>
							<h1><a href="/">WEB</a></h1>
							${list}
							${btnset}
							<h2>${title}</h2>
							<p>${body}</p>
						</body>
					</html>
				`;
		},

		LIST : function(filelist){

			let flist = '<ul>';

			filelist.forEach( function(item, idx, arr){ 
				flist = flist + `<li><a href="${domainName}?title=${item}">${item}</a></li>`;
			});

			flist = flist + '</ul>';
			return flist;
		}
	}

	function templateHTML(title, list, body, btnset){
		return `
				<!doctype html>
				<html>
					<head>
						<title>WEB1 - ${title}</title>
						<meta charset="utf-8">
					</head>
					<body>
						<h1><a href="/">WEB</a></h1>
						${list}
						${btnset}
						<h2>${title}</h2>
						<p>${body}</p>
					</body>
				</html>
			`;
	}

	function templateLIST(filelist){

		let flist = '<ul>';

		filelist.forEach( function(item, idx, arr){ 
			flist = flist + `<li><a href="${domainName}?title=${item}">${item}</a></li>`;
		});

		flist = flist + '</ul>';

		//console.log(flist);
		return flist;

	}


	var app = http.createServer(function(request,response){

		cnt++;
		console.log('cnt : ', cnt);

		var nowUrl = request.url;
		let urlData = url.parse(nowUrl, true);
		var queryData = urlData.query;
		var path = 'files';

		console.log('111urlData.pathname : ', urlData.pathname);
		

		if(urlData.pathname === '/favicon.ico')
			return response.writeHead(404);

		console.log('urlData : ======== \n', urlData);

		if(urlData.pathname === '/')
		{

			if( queryData.title === undefined )//메인페이지인경우
				queryData.title = 'welcome';

			fs.readdir(filesPath, (err, filelist) => {

				let list = template.LIST(filelist);

				fs.readFile(filesPath+`/${queryData.title}`,  'utf8', (err, data) => {
					let btnset = '';

					if(data == undefined) data = queryData.title;//"WELCOME";

					if( queryData.title === 'welcome' )
						btnset = `<a href="/create">신청서 작성하기</a>`;
					else
						btnset = `<a href="/create">신청서 작성하기</a> 
						<a href="/update?title=${queryData.title}">수정하기</a> 
						<form action="/process_delete" method="post">
							<input type="hidden" name="title" value="${queryData.title}">
							<input type="submit" value="삭제하기">
						</form>
						`;

					var html = template.HTML(queryData.title, list, data, btnset);

					response.writeHead(200);
					response.end(html);
				});
				//
			});
		}
		else if(urlData.pathname === '/create' )
		{	

			fs.readdir(filesPath, (err, filelist) => {

				queryData.title = 'WEB - form';

				let list = template.LIST(filelist);
				let body = `
				<form action="/process_create" method="post">
					<ul>
						<li><input type="text" name="name"></li>
						<li><textarea name="description"></textarea></li>
						<li><input type="submit"></li>
					</ul>
				</form>
				`;

				var html = template.HTML(queryData.title, list, body, '');

				response.writeHead(200);
				response.end(html);

			});
		}		
		else if(urlData.pathname === '/process_create' )
		{
			
			let body = '';

			request.on('data', function(data){ //폼에 쓴 내용들 받아오기
				body = body + data;
			});

			request.on('end', function(){ // 받아온 내용 파싱 후
				let post = qs.parse(body);
				let key = Object.keys(post);

				let all = '';

				for( let i=0; i<key.length; i++ )
				{					
					if( i === key.length-1 )
					{
						all = all + post[key[i]];	//console.log('11i : ', i,' ,, ', post[key[i]]);
						break;
					}
					all = all + post[key[i]] + '\t';	//console.log('22i : ', i,' ,, ', post[key[i]]);
				}
				console.log('body data : ', all);

				fs.writeFile('askingList/list', all, 'utf8', (err) => {
					response.writeHead(302, {Location:'/'});
					response.end();
				});
			});
			
		}
		else if(urlData.pathname === '/update' )
		{	
			
			fs.readdir(filesPath, (err, filelist) => {

				fs.readFile(filesPath+`/${queryData.title}`, 'utf8', (err, data) => {

					let list = template.LIST(filelist);
					let body = `
					<form action="/process_update" method="post">
						<input type="hidden" name="original" value = "${queryData.title}">
						<ul>
							<li><input type="text" name="title" value = "${queryData.title}"></li>
							<li><textarea name="description">${data}</textarea></li>
							<li><input type="submit"></li>
						</ul>
					</form>
					`;

					var html = template.HTML(queryData.title, list, body, '');

					response.writeHead(200);
					response.end(html);

				});

			});
		}
		else if(urlData.pathname === '/process_update' )
		{
			let body = '';

			request.on('data', function(data){ //폼에 쓴 내용들 받아오기
				body = body + data;
			});

			request.on('end', function(){ // 받아온 내용 파싱 후
				let post = qs.parse(body);
				
				fs.rename(filesPath+`/${post.original}`, filesPath+`/${post.title}`, function(err){
					
					fs.writeFile(filesPath+`/${post.title}`, post.description, 'utf8', (err) => {
						response.writeHead(302, {Location:`/?title=${post.title}`});
						response.end();
					});
				});

			});
			
		}
		else if(urlData.pathname === '/process_delete' )
		{
			let body = '';

			request.on('data', function(data){ //폼에 쓴 내용들 받아오기
				body = body + data;
			});

			request.on('end', function(){ // 받아온 내용 파싱 후
				let post = qs.parse(body);

				fs.unlink(filesPath+`/${post.title}`, (err) => {
					response.writeHead(302, {Location:`/`});
					response.end();
				});

			});
			
		}
		else
		{
			response.writeHead(404);
			response.end('what???');
			return;
		}

		
	});
	app.listen(3000);

	