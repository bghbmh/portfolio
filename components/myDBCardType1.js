
import * as cf from '../assets/js/commonFunction.js';
import { ct } from '../data/nameList-es6.js';


let noItem =  {
	type1 : function (msg){
		return  `<div class="item" title="${msg}"><i class="icon-svg-image-sharp"></i></div>`
	},
}

let addImageIcon = `
	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M12.5 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21H17C17.93 21 18.395 21 18.7765 20.8978C19.8117 20.6204 20.6204 19.8117 20.8978 18.7765C21 18.395 21 17.93 21 17M19 8V2M16 5H22M10.5 8.5C10.5 9.60457 9.60457 10.5 8.5 10.5C7.39543 10.5 6.5 9.60457 6.5 8.5C6.5 7.39543 7.39543 6.5 8.5 6.5C9.60457 6.5 10.5 7.39543 10.5 8.5ZM14.99 11.9181L6.53115 19.608C6.05536 20.0406 5.81747 20.2568 5.79643 20.4442C5.77819 20.6066 5.84045 20.7676 5.96319 20.8755C6.10478 21 6.42628 21 7.06929 21H16.456C17.8951 21 18.6147 21 19.1799 20.7582C19.8894 20.4547 20.4547 19.8894 20.7582 19.1799C21 18.6147 21 17.8951 21 16.456C21 15.9717 21 15.7296 20.9471 15.5042C20.8805 15.2208 20.753 14.9554 20.5733 14.7264C20.4303 14.5442 20.2412 14.3929 19.8631 14.0905L17.0658 11.8527C16.6874 11.5499 16.4982 11.3985 16.2898 11.3451C16.1061 11.298 15.9129 11.3041 15.7325 11.3627C15.5279 11.4291 15.3486 11.5921 14.99 11.9181Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
	</svg>
`;

export let myDBCardType1 = {	
	//let item = items.find( o => o.id === parseInt(selectedItem) );

	view : (item) => {
		//console.log("view - ","externalLink" in item, Object.entries(item.extraInfo).length )
		return `
			<div class="col6 item" data-order="${item.order}" data-order-title="${item.title ? item.title : "제목앖음"}">
				<header class="d-flex">
		
					${item.mainOpen ? '<span class="label blue">main</span>' : ''}

					임시 order ${item.order}
					
				</header>
				<div class="cnts grid">
					<div class="col5 " style="">
						<div class="upload type2 w-100per">
							<div class="fileBox">
								${imgType1(item.mainimage)}
							</div>
						</div>
						<div class="upload type3 w-100per margin-top-1"> <!-- 파일 -->
							<div class="fileBox">
								${imgType1(item.subimage)}
							</div>						
						</div>
					</div>
		
					<div class="col7 d-flex flex-column align-items-start " style="">
						<div class="w-100per" data-ui-placeholder>
							<span class="guide">카테고리</span>
							<p>${categories(item.category)}</p>
						</div>
						<hr class="w-100per dot" />

						<div class="w-100per">
							<span class="guide">test_해시_검색키워드</span>
							<p>${hashType(item.hash)}</p>
						</div>
						<hr class="w-100per dashed" />
		
						<div class="w-100per">
							<span class="guide">제목</span>
							${item.title ? `<p>`+item.title+`</p>` : noItem.type1("제목앖음")}
						</div>
						<hr class="w-100per dot" />
		
						<div class="w-100per">
							<span class="guide">추가항목</span>
							${ Object.entries(item.extraInfo).length ? extraInfo(item.extraInfo) : noItem.type1("추가앖음")}
						</div>
						<hr class="w-100per dot" />
		
						<div class="w-100per">
							<span class="guide">샘플이름</span>
							${item.sampleName ? `<p>`+item.sampleName+`</p>` : noItem.type1("샘플앖음") }
						</div>
						<hr class="w-100per dot" />
		
						<div class="upload type1 w-100per"> 
							<span class="guide">test_샘플페이지</span>
							<div class="fileBox">
								${ item.samplePage.length || ( ("externalLink" in item) &&  Object.entries(item.externalLink).length ) ? sampleFile(item) :  noItem.type1("샘플앖음")}	
							</div>
						</div>
					</div>
				</div>
				<footer class="">					
					<button type="button" class="btn" data-action="edit" aria-label="수정하기 버튼" title="수정하기 버튼">수정</button>
					<button type="button" class="btn" aria-label="삭제하기 버튼" title="삭제하기 버튼">삭제</button>
				</footer>
			</div>
		`;
	},
	edit : (item) => { console.log(`edit - myDBCardType1`)
		return `
			<form encType="multipart/form-data"  class="col6 item" data-order="${item.order}">

				<header class="d-flex">
					<label class="margin-left-auto" title="메인에 보이게 할지말지 선택하는 버튼">
						<span class="">선택하기</span>
						<input type="checkbox" data-ui-action="toggle" name="mainOpen" ${item.mainOpen ? `checked` : ''}>
					</label>
				</header>

				<div class="field">
					<div class=" upload type3 margin-top-1">
						<button type="button" data-action="add" data-label="mainOpenImages" data-markup="imagepreview" class="btn" title="이미지 추가" aria-label="이미지 추가">
							${addImageIcon}
						</button>
						<div class="item-wrap fileBox" data-file="0" data-label="mainOpenImages">
							${imgType222(item.mainOpenImages, "mainOpenImages")}
						</div>
					</div>
				</div>

				<div class="field margin-top-3">
					<div class=" upload type2">
						<!-- <label class="btn" data-ui-placeholder="파일을 선택하세요">
							<input type="file" name="image" data-label="main" accept="image/*" aria-label="파일을 선택하세요" title="파일을 선택하세요">
							<i class="fa-solid fa-plus" aria-hidden="true"></i>
						</label> -->
						<button type="button" data-action="add" data-label="mainimage" data-markup="imagepreview" class="btn" title="이미지 추가" aria-label="이미지 추가">
							${addImageIcon}
							추가
						</button>

						<div class="item-wrap fileBox" data-file="0" data-label="mainimage">
							${imgType222(item.mainimage, "mainimage")}
						</div>
					</div>

					<div class=" upload type3 margin-top-1">
						<button type="button" data-action="add" data-label="subimage" data-markup="imagepreview" class="btn" title="이미지 추가" aria-label="이미지 추가">
							${addImageIcon}
						</button>
						<div class="item-wrap fileBox" data-file="0" data-label="subimage">
							${imgType222(item.subimage, "subimage")}
						</div>
					</div>
				</div>

				<div class="field">
					<label class="">	
						<span class="h5">제목</span>						
						<input type="text" placeholder="제목" name="title" value="${item.title ? item.title : ''}"  > <!-- required -->
					</label>
				</div>

				<div class="field">
					<header>
						<h5>추가항목  extraInfo1</h5>
						<button type="button" data-action="add" data-markup="extraInfo" class="btn" title="항목 추가" aria-label="항목 추가">+</button>
					</header>
					<div class="item-wrap">
						${item.extraInfo ? extraInfo_edit(item.extraInfo) : ''}
					</div>
				</div>

				<div class="field">
					<header>
						<h5>대분류--메인 카테고리</h5>
					</header>
					<div class="item-wrap d-flex flex-wrap gap-3">
						${categories222(item.category, "main")}
					</div>
				</div>

				<div class="field">
					<header>
						<h5>중분류--서브 카테고리</h5>
					</header>
					<div class="item-wrap d-flex flex-wrap gap-3">
						${categories222(item.category, "sub")}
					</div>
				</div>

				<div class="field">
					<header>
						<h5>검색키워드</h5>
						<button type="button" data-action="add" data-markup="hash" class="btn" title="키워드 추가" aria-label="키워드 추가">+</button>
					</header>
					<div class="item-wrap d-flex flex-wrap gap-3">
						${hashType222(item.hash, "hash")}
					</div>
				</div>	

				<div class="field">
					<label>
						<h5 class="guide">샘플이름</h5>
						<input class="" name="samplename" type="text" value="${item.sampleName ? item.sampleName : ''}">
					</label>
				</div>

				<div class="field upload type1 w-100per">
					<header>
						<h5>샘플 첨부파일</h5>
						<button type="button" data-action="add" data-markup="sample-file" class="btn " title="파일 추가" aria-label="파일 추가">+</button>

						<button type="button" data-action="add" data-markup="external-link" class="btn " title="링크 추가" aria-label="링크 추가">깃허브링크추가</button>
					</header>
					<div class="item-wrap fileBox" data-file="0" data-label="samplePage">
						${ item.samplePage.length || ("externalLink" in item) ? sampleFile_edit(item) : ''}	
					</div>
				</div>

				<div class="field">
					<label class="">
						<h5>설명</h5>
						<textarea name="description"  title="설명" rows="2"></textarea>
					</label>
				</div>
					
				<footer class="d-flex gap-1 margin-top-3">					
					<button type="button" class="btn btn-default modal-close flex-1" data-action="testCancel">취소</button>
					<button type="submit" class="btn btn-primary flex-1" data-action="update">저장11</button>
				</footer>
			</form>		
		
		`;
	},
	create : () => { console.log(`create uploadNewItem`)
		return `
			 <!-- <form id=""  class="formType1 reform" encType="multipart/form-data" >   -->

				<header class="d-flex">
					<label class="" title="메인에 보이게 할지말지 선택하는 버튼">
						<span class="">선택하기</span>
						<input type="checkbox" data-ui-action="toggle" name="mainOpen">
					</label>

					<button type="button" data-action="createCancel" class="btn margin-left-auto">닫기</button>
				</header>

				<div class="field">
					<header>
						<h5>메인아이템용</h5> <!-- <span class="h5">제목</span> -->
					</header>
					<div class="upload type3 margin-top-1"> <!-- 파일  -->
						<button type="button" data-action="add" data-label="mainOpenImages" data-markup="imagepreview" class="btn" title="이미지 추가" aria-label="이미지 추가">
							${addImageIcon}
						</button>
						<div class="item-wrap fileBox"></div>
					</div>

				</div>

				<div class="field">
					<div class="upload type2">
						<!--button type="button" data-action="add" data-label="mainimage" data-markup="imagepreview" class="btn" title="추가" aria-label="추가">추가</button-->
						<button type="button" data-action="add" data-label="mainimage" data-markup="imagepreview" class="btn" title="이미지 추가" aria-label="이미지 추가">
							${addImageIcon}
							추가
						</button>
						<div class="item-wrap fileBox"></div>
					</div>
					<div class="upload type3 margin-top-1"> <!-- 파일  -->
						<button type="button" data-action="add" data-label="subimage" data-markup="imagepreview" class="btn" title="이미지 추가" aria-label="이미지 추가">
							${addImageIcon}
						</button>
						<div class="item-wrap fileBox"></div>
					</div>
				</div>

				<div class="field">
					<header>
						<h5>제목</h5> <!-- <span class="h5">제목</span> -->
					</header>
					<label class="">			
						<input type="text" placeholder="제목" name="title" value=""  > <!-- required -->
					</label>
				</div>
				
				<div class="field">
					<header>
						<h5>추가항목  extraInfo1</h5>
						<button type="button" data-action="add" data-markup="extraInfo" class="btn" title="항목 추가" aria-label="항목 추가">+</button>
					</header>
					<div class="item-wrap"></div>
				</div>

				<div class="field">
					<header>
						<h5>대분류--메인 카테고리</h5>
					</header>
					<div class="maincategory item-wrap  d-flex flex-wrap gap-3">
						${tempCategoryList("main","maincategory")}
						<!--<label class="">
							<input type="radio" name="maincategory" value="웹" data-label="main" data-type="1">웹웹
						</label>-->
					</div>
				</div>

				<div class="field">
					<header>
						<h5>중분류--서브 카테고리</h5>
					</header>
					<div class="subcategory item-wrap  d-flex flex-wrap gap-3">
						${tempCategoryList("sub","subcategory")}
						<!--<label class="">
							<input type="radio" name="subcategory" value="제작" data-label="sub" data-type="1">제작
						</label>-->
					</div>
				</div>

				<div class="field">
					<header>
						<h5>검색키워드</h5>
						<button type="button" data-action="add" data-markup="hash" class="btn" title="키워드 추가" aria-label="키워드 추가">+</button>
					</header>
					<div class="hash item-wrap  d-flex flex-wrap gap-3">
						${tempCategoryList("hash","hash")}
						<!--<label class="">
							<input type="checkbox" name="hash" value="디자인">디자인디자인
							<span role="button" data-action="delete" title="삭제" aria-label="삭제">X</span>
						</label>-->
					</div>
				</div>	


				<div class="field">
					<header>
						<h5>샘플이름</h5>
					</header>
					<label>
						<input class="" name="samplename" type="text" value="">
					</label>
				</div>

				<div class="field upload type1 w-100per"> <!-- 파일  -->
					<header>
						<h5>샘플 첨부파일</h5>
						<button type="button" data-action="add" data-markup="sample-file" class="btn " title="파일 추가" aria-label="파일 추가">+</button>
						<button type="button" data-action="add" data-markup="external-link" class="btn " title="링크 추가" aria-label="링크 추가">깃허브링크추가</button>
					</header>
					<div class="item-wrap fileBox"></div>
				</div>

				<div class="field">
					<header>
						<h5>설명</h5>
					</header>
					<label class="">
						<textarea name="description"  title="설명" rows="2"></textarea>
					</label>
				</div>

				<div class="field d-flex gap-1">
					<button type="button" data-action="createCancel" class="btn" style="flex: 1;">취소</button>
					<button type="submit" class="btn btn-primary" style="flex: 2 1;">저장</button>
				</div>
				
			<!-- </form> -->
		`;
	}

}

function tempCategoryList(str, name){  

	if( str === 'hash'){
		return ct[str].map( (c, idx) => `<label><input type="checkbox" name="${name}" value="${c}" >${c}<span role="button" data-action="delete" title="삭제" aria-label="삭제">X</span></label>`  ).join('');
	} else {
		return ct[str].map( (c, idx) => `<label><input type="radio" name="${name}" value="${c}" data-label="${str}" data-type="${idx+1}" >${c}</label>`  ).join(''); // class="label ${c.label}"
	}

}


function categories(category){
	return category.length ?  category.map( c => `<span data-type="${c.type}">${c.name}</span>`).join('') : ''; // class="label ${c.label}"
}


function categories222(category, label){  

	//console.log(`categories222 - `,category,label )
	let a = category.filter( o => o.label === label );
	
	return ct[label].map( (c, idx) => a.find( d => d.name === c ) ? `<label><input type="radio" name="${label}category" value="${c}" data-label="${label}" data-type="${idx+1}" checked>${c}</label>` : `<label><input type="radio" name="${label}category" value="${c}" data-label="${label}" data-type="${idx+1}" >${c}</label>`  ).join(''); // class="label ${c.label}"
}


function hashType(hash){
	return hash.length ? hash.map( h => `<span data-ui-hash="${h}">${h}</span>`).join('') : noItem.type1("검색키워드없음");
} // class="label hash"

function hashType222(hash, label){

	//if( !hash.length ) return "no";

	return ct[label].map( (c, idx) => hash.find( d => d === c ) ? `<label><input type="checkbox" name="${label}" value="${c}" checked />${c}</label>` : `<label><input type="checkbox" name="${label}" value="${c}" />${c}</label>`  ).join('');

} // class="label hash"



function extraInfo(info){
	return Object.keys(info).length ? '<dl class="extraInfo-wrap tre">' + Object.entries(info).map( arr => `<dd class="info" aria-label="${arr[0]}">${arr[1]}</dd>`).join('') + '</dl>' : '';

}

function extraInfo_edit(info){
	
	return Object.keys(info).length ? Object.entries(info).map( arr => `<div class="d-flex gap-1 item">
		<label class=""><input class=" " data-label="label" name="extra" type="text" value="${arr[0]}" placeholder="라벨"></label>
		<label class="">
			<input class=" " data-label="info" name="extra" type="text" value="${arr[1]}" placeholder="내용">
		</label>
		<div class="ctrl">
			<button type="button" data-action="delete" class="btn">삭제</button>
		</div>
	</div>`).join('') : '';

}


function imgType222(items, label ){

	let tag = document.createElement("INPUT");
	tag.setAttribute("type", "file");

	return items.map( t => `
		<figure class="item">
			<img src="data/files/${t.name}">
			<figcaption class="figcaption">
				<span class="title">${t.name}</span>
				<span>${t.size}</span>
				<div class="ctrl">
					<button type="button" data-action="delete" class="btn">삭제</button>
				</div>	
			</figcaption>
			<input type="file" name="${label}">
		</figure>
		` ).join("");
}



function imgType1(items ){
	return items.length ? items.map( t => imageType1_html(t) ).join("") : `<div class="item" title="등록된이미지가없습니다"><i class="icon-svg-image-sharp"></i></div>`;
}

function imageType1_html(o) {
	//console.log("imageType1_html - ", o.label);

	return `<figure class="item ${o.label}">
				<img src="data/files/${o.name}">
				<figcaption class="figcaption">
					<dl class="option">
						<dt class="title">${o.name}</dt>
						<dd>${checksize(o.size)}</dd>
					</dl>
				</figcaption>
			</figure>`;
}

function checksize(number) {
	if (number < 1024) {
		return number + "bytes";
	} else if (number >= 1024 && number < 1048576) {
		return (number / 1024).toFixed(1) + "KB";
	} else if (number >= 1048576) {
		return (number / 1048576).toFixed(1) + "MB";
	}
}


function sampleFile(item){

	//console.log("sampleFile - ", item.samplePage)

	let html = "";

	if( item.samplePage.length ){
		for( let i=0; i<item.samplePage.length; i++ ){
			html += `
			<figure class="item">
				<!--img src=""-->
				<figcaption class="figcaption">
					<dl class="option">
						<dt class="title" data-file-name="${item.samplePage[i].name}">${item.samplePage[i].label}</dt>
						<dd>7.6KB</dd>
					</dl>
				</figcaption>
			</figure>
			`;
		}
	}

	if( item.externalLink && Object.entries(item.externalLink).length ){
		for( let key in item.externalLink ){
			html += `
			<figure class="item">
				<a target="_blank" href="${key}" >${item.externalLink[key]}</a>
			</figure>
			`;
			
		}
	}

	return  html;
}

function sampleFile_edit(item){

	//console.log("sampleFile - ", item.samplePage)

	let html = "";
	if( item.samplePage.length ){
		for( let i=0; i<item.samplePage.length; i++ ){
			html += `
				<div class="d-flex gap-3 item">

					<label>
						<input class="" name="samplePage" placeholder="파일 라벨" type="text" value="${item.samplePage[i].label}">
					</label>
					
					<figure class="test d-inline-flex gap-2 m-0">
						<img src="data/files/constitution2_ico3.png">
						<figcaption class="figcaption">
							<span class="title">${item.samplePage[i].name}</span>
							<span>tes123</span>
						</figcaption>
					</figure>

					<label class="btn" style="display: none;"><input type="file" name="samplePage" data-label="page"></label>
					<div class="ctrl">
						<button type="button" data-action="delete" class="btn">삭제1</button>
					</div>
				</div>`;
		}
	}

	if( item.externalLink && Object.entries(item.externalLink).length ){

		html += Object.keys(item.externalLink).length ? Object.entries(item.externalLink).map( arr => `
				<div class="d-flex gap-3 item">
					<div class="ctrl">
						<button type="button" data-action="delete" class="btn">삭제1</button>
					</div>
					<label><input type="text" name="externalLink" placeholder="외부 링크 url" value="${arr[0]}"></label>
					<label><input type="text" name="externalLink" placeholder="외부 링크 라벨" value="${arr[1]}"></label>
				</div>`).join('') : '';
	}
	return html;
}

