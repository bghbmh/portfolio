let uu = "https://bghbmh.github.io/main";
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
					 ${ idx !== 2 ? item.mainOpenImages.map( (t,idx) => `<img src="${uu}/data/files/${t.name}" class="${ idx === 0 ? "mp" : "dp"}" alt="${item.title}">` ).join("") : item.mainOpenImages.map( (t,idx) => `<img src="${uu}/data/files/${t.name}" class="${ idx === 0 ? "full" : "dp"}" alt="${item.title}">` ).join("") }
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
						${item.sampleName ? `<button type="button" class="btn btn-icon" data-action="modal" title="샘플페이지보기" data-sample-name="${item.sampleName}" aria-label="샘플페이지보기" data-ui-util="pageView">
							<!--<i class="bi bi-file-earmark-code-fill" aria-hidden="true"></i> -->
							<i class="icon-svg-article"></i>
						</button> `: ''}

						<button type="button" class="btn btn-icon" data-action="modal" title="이미지크게보기" aria-label="이미지크게보기" data-ui-util="zoomIn">
							<i class="icon-svg-imagesmode" aria-hidden="true"></i>
						</button>
					</div>
					
				</footer>
			</article>			
		`;
	},
}




function image(images ){

	//console.log("image check - ", images.length)
	return images.length ? images.map( t => `<img src="${uu}/data/files/${t.name}" alt="메인이미지">` ).join("") : `<div class="item" title="등록된이미지가없습니다"><i class="icon-svg-image-sharp"></i></div>`;
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
