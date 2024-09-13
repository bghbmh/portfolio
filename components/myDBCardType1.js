

import { ct } from './tempCategoryListl.js';


export let myDBCardType1 = {	
	//let item = items.find( o => o.id === parseInt(selectedItem) );

	view : (item) => {
		return `
			<div class="col6 item" data-order="${item.order}">
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
		
						<div class="upload type3 w-100per margin-top-1"> <!-- 파일 업로드할때 -->
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
		
						<hr class="w-100per dot">
		
						<div class="w-100per">
							<span class="guide">test_해시_검색키워드</span>
							<p>${hashType(item.hash)}</p>
						</div>
		
						<hr class="w-100per dashed">
		
						<div class="w-100per">
							<span class="guide">제목</span>
							<p>${item.title ? item.title : ''}</p>
						</div>
		
						<hr class="w-100per dot">
		
						<div class="w-100per">
							<span class="guide">추가항목</span>
							<p>${item.extraInfo ? extraInfo(item.extraInfo) : ''}</p>
						</div>
		
						<hr class="w-100per dot">
		
						<div class="w-100per">
							<span class="guide">샘플이름</span>
							<p>${item.sampleName ? item.sampleName : ''}</p>
						</div>
		
						<hr class="w-100per dot">
		
						<div class="upload type1 w-100per"> 
							<span class="guide">test_샘플페이지</span>
							<div class="fileBox">
							${item.samplePage ? sampleFile(item.samplePage) : ''}
									
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
	edit : (item) => { console.log(`edit`)
		return `
			<form class="col6 item" data-order="${item.order}">

				<header class="d-flex">
					<label class="margin-left-auto" title="메인에 보이게 할지말지 선택하는 버튼">
						<span class="">선택하기</span>
						<input type="checkbox" data-ui-action="toggle" name="mainOpen" ${item.mainOpen ? `checked` : ''}>
					</label>
				</header>

				<div class="field">
					<div class="file-handler">
						<h5>이미지</h5>

						<label>
							<input type="file" data-label="mainOpenImages" name="mainOpenImages" multiple=""> <!--multiple-->
						</label>
						<div class="fileBox"></div>
					</div>
				</div>

				<div class="field margin-top-3">
					<div class=" upload type2">
						<!-- <label class="btn" data-ui-placeholder="파일을 선택하세요">
							<input type="file" name="image" data-label="main" accept="image/*" aria-label="파일을 선택하세요" title="파일을 선택하세요">
							<i class="fa-solid fa-plus" aria-hidden="true"></i>
						</label> -->
						<button type="button" data-action="add" data-label="mainimage" data-markup="imagepreview" class="btn" title="추가" aria-label="추가">추가</button>

						<div class="item-wrap fileBox" data-file="0" data-label="main">
							${imgType222(item.mainimage, "mainimage")}
						</div>
					</div>

					<div class=" upload type3 margin-top-1">

						<button type="button" data-action="add" data-label="subimage" data-markup="imagepreview" class="btn" title="추가" aria-label="추가">추가</button>

						<div class="item-wrap fileBox" data-file="0" data-label="sub">
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
						<button type="button" data-action="add" data-markup="upload-type1" class="btn " title="파일 추가" aria-label="파일 추가">+</button>
					</header>

					<div class="item-wrap fileBox" data-file="0" data-label="file">
						${item.samplePage ? sampleFile_edit(item.samplePage) : ''}

					</div>
				</div>

				<div class="field">
					<label class="">
						<h5>설명</h5>
						<textarea name="description"  title="설명" rows="2"></textarea>
					</label>
				</div>
					
				<footer class="d-flex">					
					<button type="button" class="btn btn-default flex-1" data-action="testCancel">취소</button>
					<button type="submit" class="btn btn-primary flex-1" data-action="update">저장</button>
				</footer>
			</form>		
		
		`;
	},
	create : () => { console.log(`create`)
		return `
			<div class="col4 item">
				<header class="d-flex">
					<label class="margin-left-auto" title="메인에 보이게 할지말지 선택하는 버튼">
						<span class="">선택하기</span>
						<input type="checkbox" data-ui-action="toggle" name="mainopen">
					</label>
				</header>

				<div class="cnts grid">
					<div class="col5 ">

						<div class="upload fileList type2 w-100per">
							<label class="btn" data-ui-placeholder="파일을 선택하세요test">
								
								<input type="file" name="image" data-ui-template="main" accept="image/*" aria-label="파일을 선택하세요" title="파일을 선택하세요">
								<i class="fa-solid fa-plus" aria-hidden="true"></i>
							</label>

						</div>

						<div class="upload fileList type3 w-100per margin-top-1"> <!-- 파일 업로드할때 -->
							<label class="btn" data-ui-placeholder="파일을 선택하세요_testTest">	
								<input type="file" name="image" data-ui-template="sub" accept="image/*" aria-label="파일을 선택하세요" title="파일을 선택하세요" multiple> <!-- multiple -->	
								<i class="fa-regular fa-image" aria-hidden="true"></i>
							</label>

						</div>
							
					</div>

					<div class="col7 d-flex flex-column align-items-start gap3">
						<label class="w-100per">	
							<span class="guide">test_titlexxx</span>						
							<input type="text" placeholder="" name="title" value="선택하세요_testTest" required >
						</label>

						<label class="w-100per">	
							<span class="guide">test_123456</span>						
							<input type="text" placeholder="" name="title" required >
						</label>

						<label class="w-100per">	
							<span class="guide">test_select</span>						
							<select name="category">
								<option value="default">카테고리</option>
								<option value="ca11">ca11</option>
								<option value="ca22">ca22</option>
							</select>
						</label>

						<div class="upload type1 w-100per"> <!-- 파일 업로드할때 -->
							<span class="guide">test_파일을 선택하세요</span>
							<label class="btn" data-ui-template="list" data-ui-placeholder="">	
								<input type="file" name="samplepage" aria-label="파일을 선택하세요" title="파일을 선택하세요" multiple> <!-- multiple -->	
								<i class="fa-solid fa-paperclip" aria-hidden="true"></i>
							</label>

							<div class="fileList">
								
							</div>
							
						</div>

						<label class="w-100per">
							<span class="guide">test_guideTitle</span>
							<span class="error" aria-live="polite"></span>
							<input type="text" placeholder="test_샘플이름" name="samplename" required>
						</label>

						<label class="w-100per">
							<select name="c1234">
								<option value="default">카테고리</option>
								<option value="ca11">ca11</option>
								<option value="ca22">ca22</option>
							</select>
						</label>
					</div>
				</div>			
				
				<footer class="">					
					<button type="submit" class="btn"><i class="fa-solid fa-cloud-arrow-up" aria-hidden="true"></i>저장</button>
				</footer>
			</div>				
		`;
	}

}

function categories(category){
	return category.length ?  category.map( c => `<span data-type="${c.type}">${c.name}</span>`).join('') : ''; // class="label ${c.label}"
}


function categories222(category, label){  

	console.log(`categories222 - `,ct )
	let a = category.filter( o => o.label === label );

	
	return ct[label].map( (c, idx) => a.find( d => d.name === c ) ? `<label><input type="radio" name="${label}category" value="${c}" data-label="main" data-type="${idx+1}" checked>${c}</label>` : `<label><input type="radio" name="${label}category" value="${c}" data-label="main" data-type="${idx+1}" >${c}</label>`  ).join(''); // class="label ${c.label}"
}




function hashType(hash){
	return hash.length ? hash.map( h => `<span data-ui-hash="${h}">${h}</span>`).join('') : '';
} // class="label hash"

function hashType222(hash, label){

	if( !hash.length ) return "no";

	return ct[label].map( (c, idx) => hash.find( d => d === c ) ? `<label><input type="checkbox" name="${label}" value="${c}" checked />${c}</label>` : `<label><input type="checkbox" name="${label}" value="${c}" />${c}</label>`  ).join('');

} // class="label hash"



function extraInfo(info){
	return Object.keys(info).length ? '<dl class="extraInfo-wrap">' + Object.entries(info).map( arr => `<dd class="info" aria-label="${arr[0]}">${arr[1]}</dd>`).join('') + '</dl>' : '';

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
			<input type="file" style="display: none" name="${label}">
		</figure>
		` ).join("");
}



function imgType1(items ){

	console.log("image check - ", items.length)
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

	//console.log("file - ", item)

	let html = "";

	for( let i=0; i<item.length; i++ ){
		html += `
		<figure class="item">
			<!--img src=""-->
			<figcaption class="figcaption">
				<dl class="option">
					<dt class="title" data-file-name="${item[i].name}">${item[i].label}</dt>
					<dd>7.6KB</dd>
				</dl>
			</figcaption>
		</figure>
		`;
		
	}
	return html;
}

function sampleFile_edit(item){

	//console.log("file - ", item)

	let html = "";

	for( let i=0; i<item.length; i++ ){
		html += `
			<div class="d-flex gap-3 item">
				<div class="ctrl">
					<button type="button" data-action="delete" class="btn">삭제1</button>
				</div>
				
				<figure class="test d-inline-flex gap-2 m-0">
					<img src="data/files/constitution2_ico3.png">
					<figcaption class="figcaption">
						<span class="title">${item[i].name}</span>
						<span>tes123</span>
					</figcaption>
				</figure>

				<label class="btn" style="display: none;"><input type="file" name="samplePage" data-label="page"></label>

				<label>
					<input class="" name="samplePage" placeholder="파일 라벨" type="text" value="${item[i].label}">
				</label>

			</div>`;
		
	}
	return html;
}
/*
<div class="d-flex gap-3">
	<label>
		<input class="" name="samplePage" placeholder="파일 라벨" type="text" value="">
	</label>

	<label class="btn"><input type="file" name="samplePage" data-label="page" ></label>

	<figure class="test item">
		<img src="data/files/constitution2_ico3.png">
		<figcaption class="figcaption">
			<span class="title">constitution2_ico3.png</span>
			<span>tes123</span>
		</figcaption>
	</figure>

</div>
*/





