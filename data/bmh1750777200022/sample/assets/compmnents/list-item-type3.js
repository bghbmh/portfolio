
import * as cf from '../../../../assets/js/commonFunction.js';
import { ct, imgfileurl } from '../../../../data/tempCategoryListl.js';


let noContents =  {
	image : function (msg){
		return  `<div class="item" title="${msg}">image</div>`
	},
	member : function (msg){
		return  `<div class="item" title="${msg}">member</div>`
	},
	file : function (msg){
		return  `<div class="item" title="${msg}">file</div>`
	},

}

export let listItemType3 = {	
	//let item = items.find( o => o.id === parseInt(selectedItem) );

	view : (item) => {
		//console.log("listItemType3 -- view : ", item.order, item.mainimage  );
		return `
			<!--list-item-type3-->
			<div class="list-item-type3" data-order="${item.order}">
				<label aria-label="항목선택" class="cb"><input type="checkbox"></label>

				<div class="info">
					<div class="category">
						${categories(item.category)}
						<!--
						<i class="icon-svg2-web" aria-hidden="true"></i>
						<dl class="text">
							<dt>이름</dt><dd>분류</dd>
						</dl>
						-->
					</div>
					<div class="title">
						<div class="text">${item.title}</div>
						<small>2025.1.1 - 2025.2.1</small>
					</div>
				</div>
				<div class="option-wrap">
					<div class="option">
						<figure class="member">
							<img src="" alt="참여자이름">
							<figcaption><span>참여자이름</span></figcaption>
						</figure>
						<figure class="member">
							<img src="" alt="참여자 없음">
							<figcaption><span>참여자 없음</span></figcaption>
						</figure>
						<span class="plus-more" class="추가 이미지 개수">
							<i class="icon">+</i>2
						</span>
					</div>
					<div class="option">
						${image( [...item.mainimage, ...item.subimage] )}
					</div>
				</div>

				<div class="state">
					<div class="state-before">
						<i class="icon-svg-"></i>진행전
					</div>
				</div>

				<div class="btn-wrap"> <!--  -->
					<a href="/dashboard02?sub=project-detail&acticon=view" class="btn default testViewDetail">상세보기<i class="icon-svg-"></i></a>
					<a href="/dashboard02?sub=project-detail-edit&acticon=edit" class="btn default ">수정<i class="icon-svg-"></i></a>


					<button type="button" class="btn dark" data-spa-action="detailview" data-page-layout="1">상세보기</button>
					<button type="button" class="btn dark" data-spa-action="edit" data-page-layout="1">수정</button>
				</div>
			</div>
			<!--//list-item-type3-->
		`;
	}

}


function categories(category){

	 if( !category ) return;
	// console.log("category - ", category )

	return `
			<i class="${ct.cIcon[ Number(category[0].type)-1 ]}" aria-hidden="true"></i>
			
			<dl class="text">
				<dt data-type="${category[0].type}">${category[0].name}</dt><dd data-type="${category[1] ? category[1].type : '확인필요'}">${ category[1] ? category[1].name : '확인필요'}</dd>
			</dl>
		`;
}

function image(images ){
	//console.log("images - ", images )

	let more = '';
	if( images.length > 1 ){
		more = `<span class="plus-more" class="추가 이미지 개수" aria-label="업로드된 전체 이미지 개수는 ${images.length+1 }개 입니다">
			<i class="icon">+</i> ${images.length-1 }
		</span>`;
	}

	return `
		<figure class="image">
			<img src="${imgfileurl}${images[0].name}" alt="프로젝트이미지" aria-hidden="true">
			<figcaption><span>프로젝트이미지</span></figcaption>
		</figure>
		${more}
		
	`;
}