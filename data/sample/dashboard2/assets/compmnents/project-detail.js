
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

export let projectDetail = {	
	//let item = items.find( o => o.id === parseInt(selectedItem) );

	view : (item) => {
		//console.log("listItemType3 -- view : ", item.order, item.mainimage  );
		return `
			<!--섹션-->
			<section class="section type2" data-order='${item.order}'> <!-- -->
				<!--섹션 헤더-->
				<header class="section-header tCom009">
					<div class="title">
						<i class="icon-svg2-web" aria-hidden="true"></i>
						<h3 class="text">${item.title}</h3>
					</div>
					<div class="btn-wrap">
						<button type="button" class="btn default round">삭제</button>
						<button type="button" class="btn default round">수정</button>
						
					</div>
				</header>
				<!--//섹션 헤더-->

				<hr class="solid">

				<!--콘텐츠-->
				<div class="content-wrap">

					<div class="tCom010">
						<div class="info">
							<dl>
								<dt>zzz</dt>
								<dd>도담도담 / 구축</dd>
							</dl>
							<dl>
								<dt>가온누리</dt>
								<dd>2025.1.1 ~ 2025.2.1</dd>
							</dl>
							<dl>
								<dt>별빛</dt>
								<dd>
									<div class="state-before"><i class="icon-svg-"></i>진행전</div>
								</dd>
							</dl>
							<dl>
								<dt>바람꽃</dt>
								<dd>
									<div class="member-wrap">
										<figure class="member circle no-user"><img src="/sample/dashboard02/assets/img/common/icon-svg-no-user.svg" alt="참여자이름"><figcaption><span>참여자이름</span></figcaption></figure>
										<figure class="member circle no-user"><img src="/sample/dashboard02/assets/img/common/icon-svg-no-user.svg" alt="참여자이름"><figcaption><span>참여자이름</span></figcaption></figure>
										<span class="plus-more" class="추가 이미지 개수">
											<i class="icon">+</i>2
										</span>
									</div>
									
								</dd>
							</dl>
							<dl>
								<dt>설명</dt>
								<dd class="description">소록소록.</dd>
							</dl>
						</div>
						<div class="image-wrap">
							${mainimage(item.mainimage )}
							${subimage(item.subimage )}
								
						</div>

					</div>

					<div class="bottom-btn-wrap">
					<a href="/dashboard02?sub=project-detail-edit&acticon=edit" class="btn default ">임시_수정<i class="icon-svg-"></i></a>
						<button type="button" class="btn default margin-right-auto" data-spa-action="list">목록</button>

						<button type="button" class="btn default" data-spa-action="delete">삭제</button>
						<button type="button" class="btn dark" data-spa-action="edit">수정</button> 
					</div>

				</div>
				<!--//콘텐츠-->

			</section>
			<!--//섹션-->
		`;
	},
	edit : (item) => {
		//console.log("listItemType3 -- view : ", item.order, item.mainimage  );
		return `
			<!--섹션-->
			<section class="section type2" data-order='${item.order}'> 
				<!--섹션 헤더-->
				<header class="section-header tCom009">
					<div class="title">
						<i class="icon-svg2-web" aria-hidden="true"></i>
						<h3 class="text">${item.title} __testView_section TITLE123 </h3>
					</div>
					<div class="btn-wrap">
						<button type="button" class="btn default round">삭제</button>
						<button type="button" class="btn default round">수정</button>
						
					</div>
				</header>
				<!--//섹션 헤더-->

				<hr class="solid">

				<!--콘텐츠-->
				<div class="content-wrap">

					<form class="tCom011">
						<div class="info">
							<dl>
								<dt>제목</dt>
								<dd><label class="width-100per"><input type="text" value="${item.title}"></label></dd>
							</dl>
							<dl>
								<dt>카테고리</dt>
								<dd>
									<div class="option-wrap">
										<div class="option">
											<b class="title">작업</b> <!--, 인쇄 등-->
											<div class="item">
												<label><input type="radio" name="c"><span>도담도담</span></label>
												<label><input type="radio" name="c"><span>가온해</span></label>
												<label><input type="radio" name="c"><span>도서</span></label>
												<label><input type="radio" name="c"><span>함초롱</span></label>
												<label><input type="radio" name="c"><span>초롱초롱</span></label>
											</div>
										</div>
		
										<div class="option">
											<b class="title">업무</b> <!--구축, 유지보수 등-->
											<div class="item">
												<label><input type="radio" name="d"><span>도담도담</span></label>
												<label><input type="radio" name="d"><span>가온해</span></label>
												<label><input type="radio" name="d"><span>도서</span></label>
												<label><input type="radio" name="d"><span>함초롱</span></label>
												<label><input type="radio" name="d"><span>초롱초롱</span></label>
											</div>
										</div>
									</div>
									
								</dd>
							</dl>
							
							<dl>
								<dt>wkrdjqrlrks</dt>
								<dd>
									<div class="calendar-a">
										<label><input type="text" value="test value"></label>
										<label><input type="text" value="test value"></label>
									</div>
								</dd>
							</dl>
							<dl>
								<dt>상태</dt>
								<dd>
									<div class="state">
										<label><input type="radio" name="s"><span>진행전</span></label>
										<label><input type="radio" name="s"><span>진행전</span></label>
										<label><input type="radio" name="s"><span>진행전</span></label>
									</div>
									
								</dd>
							</dl>
							<dl>
								<dt>참여자</dt>
								<dd>
									<div class="tCom012">
										<button type="button" class="btn dark round">추가</button>
										<div class="list-item-wrap">
											<div class="item">
												<figure class="member no-user ">
													<img src="/sample/dashboard02/assets/img/common/icon-svg-no-user.svg" alt="참여자사진"><figcaption><span>참여자가 없습니다</span></figcaption>
												</figure>
											</div>

											<div class="item">
												<label aria-label="참여자"><input type="checkbox" checked></label>
												<figure class="member ">
													<img src="" alt="참여자사진"><figcaption><span>참여자이름이 긴 경우</span></figcaption>
												</figure>
											</div>

											<div class="item">
												<label aria-label="참여자"><input type="checkbox" checked></label>
												<figure class="member">
													<img src="" alt="참여자사진"><figcaption><span>이름이</span></figcaption>
												</figure>
											</div>
										</div>
										
									</div>								
								</dd>
							</dl>
							<dl>
								<dt>설명</dt>
								<dd class="description">
									<label class="width-100per"><textarea rows="6" class="resize-none">바나나 별하 아리아 소록소록 미리내 비나리 노트북 포도 소록소록 아련 노트북 미쁘다 감또개 우리는 비나리 소솜 함초롱하다 여우비 도담도담 곰다시 컴퓨터 바나나 별빛 산들림 여우비 안녕 도담도담 곰다시 가온해 책방 옅구름 소솜 아련 여우비 안녕 사과 여우비 나비잠 예그리나 포도 아슬라 사과 산들림 우리는 바람꽃 소록소록 별빛 별빛 가온누리 소록소록.</textarea></label>
								</dd>
							</dl>
						</div>

						<div class="image-wrap">
							<div class=" upload-type3 ">
								<button type="button" data-action="add" data-label="uploadimages" data-markup="imagepreview" class="upload-file-btn example31" title="이미지 추가하기" aria-label="이미지 추가하기">
									<span class="area" aria-hidden="true"><i class="icon-svg-" aria-hidden="true"></i></span>
								</button>
								<div class="upload-file-box example32" data-label="uploadimages">
						
									<!--item-->
									<figure class="item">
										<!-- https://design6.hullaro.com/resource/files/0/template/202407/CTnHoiDHoulujICArSfbFlIvwwbqhHZR  -->
										<img src="/sample/dashboard02/assets/img/common/test-sample22.png" alt="이미지">
										<figcaption>
											<span class="title">filename.png</span>
											<span>1234kb</span>
											<div class="ctrl">
												<button type="button" data-action="delete" class="btn" title="이미지 삭제하기" aria-label="이미지 삭제하기">
													<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed" aria-hidden="true"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
												</button>
											</div>	
										</figcaption>
										<input type="file" name="uploadimages">
									</figure>
									<!--//item-->

									<!--item-->
									<figure class="item">
										<!-- https://design6.hullaro.com/resource/files/0/template/202407/CTnHoiDHoulujICArSfbFlIvwwbqhHZR  -->
										<img src="/sample/dashboard02/assets/img/common/test-sample22.png" alt="이미지">
										<figcaption>
											<span class="title">filename.png</span>
											<span>1234kb</span>
											<div class="ctrl">
												<button type="button" data-action="delete" class="btn" title="이미지 삭제하기" aria-label="이미지 삭제하기">
													<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed" aria-hidden="true"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
												</button>
											</div>	
										</figcaption>
										<input type="file" name="uploadimages">
									</figure>
									<!--//item-->

									<!--item-->
									<figure class="item">
										<!-- https://design6.hullaro.com/resource/files/0/template/202407/CTnHoiDHoulujICArSfbFlIvwwbqhHZR  -->
										<img src="/sample/dashboard02/assets/img/common/test-sample22.png" alt="이미지">
										<figcaption>
											<span class="title">filename.png</span>
											<span>1234kb</span>
											<div class="ctrl">
												<button type="button" data-action="delete" class="btn" title="이미지 삭제하기" aria-label="이미지 삭제하기">
													<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed" aria-hidden="true"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
												</button>
											</div>	
										</figcaption>
										<input type="file" name="uploadimages">
									</figure>
									<!--//item-->
						
								</div>
							</div>
						</div>

						<div class="bottom-btn-wrap width-100per">
							<button type="button" class="btn default margin-right-auto" data-spa-action="list">목록</button>

							<button type="button" class="btn default" data-spa-action="cancel" data-page-layout="1">취소</button>
							<button type="button" class="btn primary" data-spa-action="save" data-page-layout="1">저장</button> 
						</div>

					</form>

				</div>
				<!--//콘텐츠-->

			</section>
			<!--//섹션-->
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

function mainimage(images ){
	//console.log("images - ", images )
	let img = '';
	if( images.length > 0 ){
		img = `
			<figure class="image main">
				<img src="${imgfileurl}${images[0].name}" alt="프로젝트이미지">
				<figcaption><span>프로젝트이미지</span></figcaption>
			</figure>
		`;
	} else{
		img = `
			<figure class="image main no-image">
				<img src="/sample/dashboard02/assets/img/common/icon-svg-no-image1.svg" alt="프로젝트이미지">
				<figcaption><span>프로젝트이미지</span></figcaption>
			</figure>
		`;
	}

	return img;
}

function subimage(images ){
	//console.log("images - ", images )
	let img = '';
	if( images.length > 0 ){

		img += images.map( img => `
			<figure class="image">
				<img src="${imgfileurl}${img.name}" alt="프로젝트이미지">
				<figcaption><span>프로젝트이미지</span></figcaption>
			</figure>
		` ).join(''); 
	} else{
		img = `
			<figure class="image no-image">
				<img src="/sample/dashboard02/assets/img/common/icon-svg-no-image1.svg" alt="프로젝트이미지">
				<figcaption><span>프로젝트이미지</span></figcaption>
			</figure>
		`;
	}

	return img;
}