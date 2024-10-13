

import { imgfileurl } from '../data/tempCategoryListl.js';

export let cardStyle = {	
	//let item = items.find( o => o.id === parseInt(selectedItem) );
	
	main : (item, idx) => {

		//console.log("cardStyle", item)
		return `
			<article class="item shape${idx+1}"  data-order="${item.order}">
				<header>
					${categories(item.category)}
					<h4>${item.title}</h4>
					<div class="util">
						<button type="button" class="btn" data-action="modal"  data-ui-util="${ item.sampleName ? "pageView" : "zoomIn"}" data-target="#exampleModal">더보기</button>
					</div>
				</header>
				<div class="contents">
					<div class="images-wrap">
						${mainOpenList( idx, item)}
					</div>
					<div class="bg" aria-hidden="true">
						<i class="clip01" aria-hidden="true"></i>
						<i class="clip02" aria-hidden="true"></i>
						<i class="clip03" aria-hidden="true"></i>
					</div>
				</div>
			</article>
		`;
	},
	sub : (item) => { //console.log(`sub`,item.title,  item.extraInfo )
		return `
			<article data-order="${item.order}" class="cardType1 ${ item.sampleName ? `col6` : 'col3'} row-span2">
				<div class="contents">
					${image(item.mainimage)}
				</div>
				<header>
					${item.title ? `<h4>${item.title}</h4>` : ''}
					${categories(item.category)}
					${item.extraInfo ? extraInfo(item.extraInfo) : ''}
				</header>

				<footer >
					<div class="util">
						<!--<button type="button" class="btn btn-icon" data-action="modal" title="wwwww" aria-label="소스보기" data-ui-util="wwwww">
							<i class="bi bi-moon-stars-fill" aria-hidden="true"></i>
						</button>최근파일 한 개만 해당


						<button type="button" class="btn btn-icon" data-action="modal" title="projectView" aria-label="보기" data-ui-util="projectView">
							<i class="bi bi-moon-stars-fill" aria-hidden="true"></i>
						</button>-->
						

						<!--테스트용-->
						<!--//테스트용-->

						${sampleFile(item)}

					</div>
					
				</footer>
			</article>			
		`;
	},
}

function img(url, alt="이미지", className=''){
	return `<img src="${url}" class="${className}" alt="${alt}">`
}

function mainOpenList(num, item){

	let html = '';
	if( num === 2 ){ 
		html = item.mainOpenImages.map( (t,idx) => `<img src="${imgfileurl}${t.name}" class="${ idx === 0 ? "full" : "dp"}" alt="${item.title}">` ).join("");
	} else { 
		html = item.mainOpenImages.map( (t, idx) => `<img src="${imgfileurl}${t.name}" class="${ idx === 0 ? "mp" : "dp"}" alt="${item.title}">` ).join("") ;
	}
	return html;
}

function sampleFile(item){
	//console.log(item.externalLink)

	let html ='';

	if( item.sampleName && item.samplePage.length ){
		html += `
			<button type="button" class="btn btn-icon" data-action="modal" data-sample-name="${item.sampleName}" data-ui-util="pageView">
				<!--<i class="bi bi-file-earmark-code-fill" aria-hidden="true"></i> -->
				<i class="icon-svg-article"></i> 샘플보기
			</button> `;
	}
	
	if( ("externalLink" in item) && Object.entries(item.externalLink).length ){
		for( let key in item.externalLink ){
			html += `<a target="_blank" class="btn" href="${key}" >
				<svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 16 16" width="20" aria-hidden="true" class=""><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>
				${item.externalLink[key]}
			</a>`;
			
		}
	} else {
		html +=`<button type="button" class="btn btn-icon" data-action="modal" data-ui-util="zoomIn"><i class="icon-svg-imagesmode" aria-hidden="true"></i> 크게보기</button>`;
	}

	

	return html;

}


function image(images ){

	//console.log("image check - ", images.length)
	return images.length ? images.map( t => `<img src="${imgfileurl}${t.name}" alt="메인이미지">` ).join("") : `<div class="item" title="등록된이미지가없습니다"><i class="icon-svg-image-sharp"></i></div>`;
}

function categories(category){
	//console.log(category.map( c => `<span class="label primary">${c.name}</span>`).join(''))

	return category.length ? '<div class="labels">' + category.map( c => `<span class="label ${c.label}" data-type="${c.type}">${c.name}</span>`).join('') + '</div>' : '';
}

function labels(hash){
	return hash.length ? '<div class="labels">' + hash.map( h => `<span class="label primary">${h}</span>`).join('') + '</div>' : '';
}

function extraInfo(info){

	return Object.keys(info).length ? '<dl class="extraInfo-wrap">' + Object.entries(info).map( arr => `<dd class="info" aria-label="${arr[0]}">${arr[1]}</dd>`).join('') + '</dl>' : '';

}
