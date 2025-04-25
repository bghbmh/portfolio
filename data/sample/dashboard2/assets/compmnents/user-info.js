
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

export let userInfo = {	
	//let item = items.find( o => o.id === parseInt(selectedItem) );

	view : (item) => {
		console.log("userInfo -- view : ", item );
		return `
		<!--사용자 정보-->
		<div class="user">
			<div class="info">
				<div class="option-wrap">
					${ item.nickname.check ? `<small class="option">별명 사용 중 <i class="icon-svg-check-circle-fill primary" aria-hidden="true"></i></small>` : ''}
					
				</div>
		
				<div class="main">
					<strong class="name">${ item.nickname.check ? item.nickname.value : item.name  }</strong>
					<div class="extra-info">
						<strong class="item">${ item.nickname.check ? item.name : item.nickname.value }</strong>
						<span class="item">${item.business.position}</span>
						<span class="item">${item.business.company}</span>
					</div>
				</div>
		
				<div class="btn-wrap">
					<button type="button" class="btn "><i class="icon-svg-user1" aria-hidden="true"></i>내정보</button>
				</div>
			</div>
			

			<div class="user-image-wrap" aria-hidden="true">			
				<img class="img" src="/sample/dashboard02/assets/img/common/user.png" alt="test 이미지" aria-hidden="true" />
				<svg aria-hidden="true"><clipPath id="userImageClip"><use href="#userClip" /></clipPath></svg>
				<svg class="bg" aria-hidden="true"><use href="#gShape" clip-path="url(#userbgClip)" /></svg>		
			</div>

		</div>
		<!--//사용자 정보-->
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

