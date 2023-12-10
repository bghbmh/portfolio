

export function mainCardType1(item){
	//console.log("tttt -", item.description ? item.description.title : 'aaa' )
	let str = `<button type="button" class="btn icon" aria-label="상세내용보기" data-ui-util="detail" data-ui-target="${item.id}"><i class="fa-solid fa-clone"></i></button>`;
	return `
		<article class="cardType1" data-category="${item.category}"  style="background-image: url(${item.description ? item.description.bg : ''})">  
			<header>
				<h3 aria-label="${item.description ? '' : '제목없음'}">${item.description ? item.description.title : ''}</h3>
				<div class="util">
					${item.description ? str : ''}
					<button type="button" class="btn icon" aria-label="크게보기" data-ui-util="zoomin" data-ui-target="${item.src}"><i class="fa-solid fa-magnifying-glass-plus"></i></button>
					
				</div>
			</header>
			<img src="${item.src ? item.src : '../assets/img/no-img.gif'}" alt="${item.alt ? item.alt : '이미지 설명이 없습니다'}" class="img">
			<footer>
				<nav>
					${hashType(item.hash)}
				</nav>
			</footer>
		</article>
	`;
}

export function hashType(hash){

	let html = "";

	for( let i=0; i<hash.length; i++ ){
		html += `<button type="button" class="btn hash" data-ui-hash="${hash[i]}">${hash[i]}</button>`;
	}
	return html;
}

export function titleType1(str){
	return `
		<dl class="titleType1">
			<dt class="title">${str.title}</dt>
			<dd class="descript">${str.descript}</dd>
		</dl>
	`;
}

export function extraInfoType1(extraInfo){

	let html = "";
	let bg = "";
	let src = "";
	let mainColor = "";
	let link = "";
	let designer = "";
	let coding = "";
	let story = "";
	let concept = "";
	let targetAge = "";

	// 임시_항목 순서때문에 문자열을 각각 나눠서 나중에 취합하는걸로 바꿈

	for( let key in extraInfo ){
		switch(key){
			case "bg":
				//console.log("bg")
				break;
			case "src":
				//console.log("img")
				
				break;
			case "designer":
				//console.log("bg")
				designer = titleType1({title : "디자인" , descript : extraInfo[key]});
				break;
			case "coding":
				//console.log("img")
				coding = titleType1({title : "코딩" , descript : extraInfo[key]});
				break;

			case "story":
				//console.log("img")
				story = titleType1({title : "참고" , descript : extraInfo[key]});
				break;

			case "concept":
				//console.log("img")
				concept = titleType1({title : "콘셉트" , descript : extraInfo[key]});
				break;
			case "targetAge":
				//console.log("img")
				targetAge = titleType1({title : "대상층" , descript : extraInfo[key]});
				break;


			case "mainColor":
				let color = "";
				for( let i=0; i<extraInfo[key].length; i++) {
					color = color + `<span class="colorType" style="background-color:${extraInfo[key][i]}"></span>`;
				}
				mainColor = titleType1({ title : "주 색상" , descript : color });
				//html += titleType1({ title : key , descript : color });
				
				break;
			case "link":
				//let link = "";
				link = link + `<a href="${extraInfo[key]}" class="btn " target="_blank" data-link="${extraInfo[key]}">샘플보기</a>`;
				//html += titleType1({ title : key , descript : link });
				link = titleType1({ title : "링크" , descript : link });
						
				break;
			default:
				//html += titleType1({title : key , descript : extraInfo[key]});
				break;
		}
	}

	html = designer + coding  + targetAge + concept + mainColor + story;



	return html;
}

export function detailViewPage(items, selectedItem){
	
	let item = items.find( o => o.id === parseInt(selectedItem) );
	console.log("success - ",item, items );
	return `
		<div class="header">
			<h3 aria-label="상세보기"><span class="hidden">${item.description ? item.description.title : '??'}</span></h3>
			<button type="button" class="btn icon modalClose" aria-label="팝업닫기" title="닫기"></button>
		</div>
		<div class="contents">
			
			<div class="viewArea" style="background-image: url(${item.description.bg ? item.description.bg : ''})">
				<div class="img">
					<img src="${item.description.src ? item.description.src : '../assets/img/no-img.gif'}" alt="${item.description.alt ? item.description.alt : '이미지 설명이 없습니다'}">
				</div>
				<div class="extra">
					<h4 class="title">${item.description.title}</h4>
					${extraInfoType1(item.description)}
				</div>
				<button type="button" class="btn icon noteSticky" data-ui-util="noteSticky" data-ui-target="extra" aria-label="상세내용보기"><i class="fa-regular fa-note-sticky"></i></button>
			</div>

			<!-- 관련 아이템 리스트 -->
			<nav class="hashList">
				${item.hash ? hashType(item.hash) : ""}
			</nav>
			<section class="cardList linkedItem" data-columns="3" >
				${linkedItem(item, items)}

			</section>
			<!-- //관련 아이템 리스트 -->
		</div>	
	`;

}

function linkedItem(item, itemsBox){
	
	let arr = [];
	let html = "";

	for( let i=0; i<item.hash.length; i++ ) {
		for( let j=0; j<itemsBox.length; j++ )
		{	
			if( itemsBox[j].hash.find( h => h === item.hash[i] ) && !arr.find( t => t.id === itemsBox[j].id ) ) {
				arr.push(itemsBox[j]);
				if( item.id === itemsBox[j].id ) continue;
				html += mainCardType1(itemsBox[j]);
			}
		}
	}

	return html;

}

