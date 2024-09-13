import * as cf from './commonFunction.js';
import { Modal } from '../../components/modal.js';

document.addEventListener("DOMContentLoaded", () => {
	
	console.log("DOMContentLoaded ")
	cf.fileHandler._load( { //bmh.json
		url: '../data/myList.json', 
		success : (request) => {
			
			try {
				throw request.responseText; 
			} catch (e) {
				if ( e ) {
					
					let html = ``;
					let itemsData = JSON.parse(request.responseText);
					console.log("success", itemsData);

				} else {
					console.log("error", e)
					return;
				}
			}
			
			let cnt = {
				options : {
					addClass : " modal-extra-lg modal-dialog-centered modal-dialog-scrollable  product-view",
				},
				html : `
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					
						<div class="extraInfo expanded">
							<h5 class="modal-title" role="button" aria-label="더보기버튼"  data-action="toggle" data-target=".extraInfo" aria-label=".extraInfo">
								<span>Modal_프로젝트프로필</span>
								<i class="bi bi-chevron-up" aria-hidden="true"></i>
							</h5>
							<div class="labels">
								<span class="label">label-라벨</span>
								<span class="label">label-라벨</span>				
							</div>

							<div class="buttons">
								<button type="button" class="btn text-start" data-sample-name="sample1" data-link="testList1">샘플1</button>
								<button type="button" class="btn text-start" data-sample-name="sample1" data-link="testList2">샘플2</button>				
							</div>
					
							<dl class="extraInfo-wrap">
								<dd class="info">한글입숨</dd>
								<dd class="info">24.08 ~ 24.08</dd>
							</dl>
						</div>
					</div>
					<div class="modal-body">
						<p>이플 아슬라 나래 곰다시 산들림 여우별 안녕 소록소록 미쁘다 우리는 아슬라 도서 함초롱하다 아련 여우별 컴퓨터 바나나 도서 아리아 아련 로운 노트북 도서관 여우별 별빛 산들림 도담도담 가온누리 노트북 여우비 소솜 아련 우리는 소솜 아리아 소솜 곰다시 별빛 아련 미리내 이플 도서관 비나리 다솜 곰다시 바람꽃 예그리나 산들림 산들림 우리는.</p>
						<br><br><br><br><br><br><br><br><br><br>
					
						<p>그루잠 다솜 도담도담 바람꽃 감또개 바나나 가온누리 가온누리 미쁘다 아련 우리는
								아련 	아리아 산들림 사과 여우별 사과 감또개 아름드리 가온누리 도서관 책방.
							
							소록소록 산들림 안녕 포도 안녕 여우별 바람꽃 책방 달볓 곰다시 곰다시 소록소록 도담도담 옅구름 그루잠 포도 소솜 책방 별하 소록소록 도서 우리는 도서 다솜 아리아 아리아 바나나 아리아 컴퓨터 곰다시 아름드리 감사합니다 아름드리 도서관 바나나 책방 바나나 아련 옅구름 여우별 이플 이플 안녕 바람꽃 사과 나래 도르레 컴퓨터 나비잠 그루잠.
						</p>
						<p>그루잠 다솜 도담도담 바람꽃 감또개 바나나 가온누리 가온누리 미쁘다 아련 우리는
							아련 	아리아 산들림 사과 여우별 사과 감또개 아름드리 가온누리 도서관 책방.
							
							소록소록 산들림 안녕 포도 안녕 여우별 바람꽃 책방 달볓 곰다시 곰다시 소록소록 도담도담 옅구름 그루잠 포도 소솜 책방 별하 소록소록 도서 우리는 도서 다솜 아리아 아리아 바나나 아리아 컴퓨터 곰다시 아름드리 감사합니다 아름드리 도서관 바나나 책방 바나나 아련 옅구름 여우별 이플 이플 안녕 바람꽃 사과 나래 도르레 컴퓨터 나비잠 그루잠.
						</p>
					
					</div>
					<!-- <div class="modal-footer">
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
					</div> -->
				</div>			
			`};

			console.log("DOM - ", Modal);

			document.querySelector("body").innerHTML += Modal.view(cnt);
			return;




		},
		error: (request) => {
			console.log("err - ",request.arguments.msg)
		},
		loadType:"item", 
		done: "items" 
	});

});


window.URL = window.URL || window.webkitURL;

