

export let typeA =  (item) => {
		if( !item ){
			return `
			<div class="col12 item">
				no item test
			</div>
			`;
		}
		return `
			<article class="cardType2 row-span${item.rowSpan}" data-category="${item.category}">
				<header>
					<h3 aria-label="${item.title ? item.title : '제목없음'}">${item.title ? item.title : ''}</h3>
					<div class="util">
						${buttonList2(item)}					
					</div>
				</header>

				<div class="main">
					${imgList2(item)}
				</div>

				<footer>
				${buttonList3(item)}	
				</footer>
			</article>
		
		`;
};


function buttonList2(item){
	//console.log("button2 item - ", tempImgbox(item))
	let html='';

	html += `<button type="button" class="btn icon" title="이미지크게보기" aria-label="이미지크게보기" data-ui-util="zoomin" data-ui-target='${JSON.stringify(tempImgbox(item))}'><i class="icon-svg-zoom-in" aria-hidden="true"></i></button>`;
	
	
	if( item.sampleName && item.samplePage ){
		html += `<button type="button" class="btn icon" title="샘플페이지보기" aria-label="샘플페이지보기" data-ui-util="preview" data-sample-name="${item.sampleName}" data-sample-page='${JSON.stringify(item.samplePage)}'><i class="icon-svg-monitor-01" aria-hidden="true"></i></button>`;
	}
	return html;
}

function buttonList3(item){
	//console.log("button item - ", item.sampleName)
	if( !item.description ) return '';
	
	return	`<button type="button" class="btn icon" title="추가설명있음" aria-label="추가설명있음" data-ui-util="extraInfo" data-ui-target="${item.id}"><i class="icon-svg-message-plus-square" aria-hidden="true"></i></button>`;
	
}

function imgList2(item, html = ''){
	//console.log("zxczxc - ", item, item.image );

	if( !item.image.length ){	
		return `<img src="./assets/img/no-img.gif" alt="등록한 이미지가 없습니다">`;
	} 

	for( let i=0; i<item.image.length; i++ ){

		switch(item.image[i].template){
			case "main":
				html += `<img src="${item.image[i].fileName}" alt="메인이미지">`;
			
				break;
			case "sub":
				html += `<img src="${item.image[i].fileName}" alt="서브이미지">`;
			
				break; 
		}
	}
	return html;
}

// 임시_어디가 더 적절한지 모르겠는데, 일단 여기서 배열로 넣어둠_240318
function tempImgbox(item, html = ''){
	let arr = [];	
	
	if( !item.image.length )
		return arr.push("./assets/img/no-img.gif");

	for( let i=0; i<item.image.length; i++ ){
		
		switch(item.image[i].template){
			case "main":
				arr.push(item.image[i].fileName);
				break;
			case "sub":
				arr.push(item.image[i].fileName);
				break; 
		}

		//console.log("tempImgbox item - ", arr)
	}

	//console.log("---tempImgbox - ", item.tempImgbox)

	return arr;
}











function imageType1(items, str = '') {
	let html = '';
	items.filter( o => o.template === str )
		.forEach( t => html += imageType1_html(t) );

	return html;
}


function imageType1_html(o) {
	return `<figure class="item">
				<img src="${o.fileName}">
				<figcaption class="figcaption">
					<dl class="option">
						<dt class="title">${o.fileName}</dt>
						<dd>${checkFileSize(o.fileSize)}</dd>
					</dl>
				</figcaption>
			</figure>`;
}


function sampleFile(item) {

	let html = "";

	for (let i = 0; i < item.length; i++) {
		html += `
		<figure class="item">
			<img src="${item[i]}">
			<figcaption class="figcaption">
				<dl class="option">
					<dt class="title">${item[i]}</dt>
					<dd>7.6KB</dd>
				</dl>
			</figcaption>
		</figure>
		`;

	}
	return html;
}



function imageType1edit(items, str = '') {
	let html = '';

	items.filter( o => o.template === str )
		.forEach( t => html += imageType1edit_html(t) );

	//임시
	if ( str === "main" && html == '' ){
		html = `
			<label class="btn" title="파일을 선택하세요" data-upload-id="${o.template}" data-ui-placeholder="파일을 선택하세요 ccccc">
				<span class="hidden">파일을 선택하세요 ccccc</span>
				<input type="file" name="image" accept="image/*">
				<i class="fa-solid fa-plus" aria-hidden="true"></i>
			</label>
		`;
	}
	return html;
}


function imageType1edit_html(o) {
	return `<figure class="item">
				<img src="${o.fileName}">
				<figcaption class="figcaption">
					<dl class="option">
						<dt class="title">${o.fileName}</dt>
						<dd>${checkFileSize(o.fileSize)}</dd>
					</dl>
					<div class="ctrl">
						<button type="button"  data-ui-action="delete" class="btn" aria-label="삭제하기 버튼" title="삭제하기 버튼"><i class="fa-solid fa-xmark" aria-hidden="true"></i></button>
					</div>	
				</figcaption>
			</figure>`;
}

function sampleFileedit(item) {

	let html = "";

	for (let i = 0; i < item.length; i++) {
		html += `
		<figure class="item">
			<img src="${item[i]}">
			<figcaption class="figcaption">
				<dl class="option">
					<dt class="title">${item[i]}</dt>
					<dd>7.6KB</dd>
				</dl>
				<div class="ctrl">
					<button type="button"  data-ui-action="delete" class="btn" aria-label="삭제하기 버튼" title="삭제하기 버튼"><i class="fa-solid fa-xmark" aria-hidden="true"></i></button>
				</div>	
			</figcaption>
		</figure>
		`;

	}
	return html;
}





function checkFileSize(number) {
	if (number < 1024) {
		return number + "bytes";
	} else if (number >= 1024 && number < 1048576) {
		return (number / 1024).toFixed(1) + "KB";
	} else if (number >= 1048576) {
		return (number / 1048576).toFixed(1) + "MB";
	}
}

function hashType(hash) {

	let html = "";

	for (let i = 0; i < hash.length; i++) {
		html += `<button type="button" class="btn hash" data-ui-hash="${hash[i]}">${hash[i]}</button>`;
	}
	return html;
}