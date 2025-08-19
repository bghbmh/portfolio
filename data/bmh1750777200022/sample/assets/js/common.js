import * as cf from './commonFunction.js';
import { listItemType3 } from '../compmnents/list-item-type3.js';
import { projectDetail } from '../compmnents/project-detail.js';
import { userInfo } from '../compmnents/user-info.js';
// import { Modal } from '../../components/modal.js';

// import { tamplateModalHTML } from './markupHTML.js';

import { ct, tempDB, origin, filedburl, sampleurl, memberlisturl } from '../../../../data/tempCategoryListl.js';

console.log("DOMContentLoaded dashboard2", filedburl)  

//document.addEventListener("DOMContentLoaded", () => {
	console.log("DOMContentLoaded 999 ", filedburl)  

	cf.fileHandler._load( { 
		url: memberlisturl,
		success : (request) => {
			
			try {
				throw request.responseText; 
			} catch (text) {
				if ( text ) {

					console.log(" memberlisturl - ",text, JSON.parse(text)) 
					let items = JSON.parse(text);
					document.querySelector("#userInfo").outerHTML = userInfo.view(items[0]);
					//document.querySelector("#listTest").textContent = listItemType3.view(text);

				} else {
					console.log("error", text)
					return;
				}
			}
		},
		error: (request) =>  console.log("err - ",request.arguments.msg)
	});

	cf.fileHandler._load( { 
		url: filedburl,
		success : (request) => {
			
			try {
				throw request.responseText; 
			} catch (text) {
				if ( text ) {
					const storedData = sessionStorage.getItem('clickedElementData');
					// spa ---------------------------------------------
					if (storedData) {
						const elementInfo = JSON.parse(storedData);
						

					}







					// //spa ---------------------------------------------

					//console.log(" text - ",text, JSON.parse(text)) 
					//document.querySelector("#listTest").textContent = listItemType3.view(text);

					let items = JSON.parse(text);
					let listBox = document.querySelector(".tCom008");

					if( listBox ){
						listBox.innerHTML += items.slice().reverse().map( item => listItemType3.view(item) ).join('');
					
						items.slice().reverse().map( (item, idx) => { 
							document.querySelector("#listTest").innerHTML += `<div>--${idx}- ${item.category[0].name} / ${item.category[0].type}</div>`;

						});
					}



					

					if (storedData) {
						// JSON 문자열을 다시 객체로 파싱
						const elementInfo = JSON.parse(storedData);

						console.log('클릭된 요소 정보:', elementInfo);

						// 정보 사용 예시
						

						let x = items.find( a => a.order === parseInt(elementInfo.dataValue) );

						console.log( `Data Value: ${elementInfo.dataValue}` );


						const container = document.querySelector("#container");
						container.innerHTML = projectDetail.view(x);


						if( container ){
							container.addEventListener("click", e => {
								console.log("spa aaa - ");

								const order = e.target.closest("[data-order]");
								let clickedBtn = e.target.closest('[data-spa-action]');
								const elementInfo = {
									dataValue: order, // data 속성 등 필요한 정보
									spaAction : clickedBtn ? clickedBtn.dataset.spaAction : null,
									pageLayout : clickedBtn ? clickedBtn.dataset.pageLayout : null,
									// ... 필요한 다른 정보 추가
								};

								// if( elementInfo.spaAction === "list" ){
								// 	sessionStorage.setItem('clickedElementData', JSON.stringify(elementInfo));
								// 	container.innerHTML = projectDetail.edit(x);
								// }
							
								// 정보를 JSON 문자열로 변환하여 sessionStorage에 저장
								
							});
						 }

						console.log( `Data Value:  `, x , document.querySelector("a"));

						document.querySelector("#container a").addEventListener("click", e => {
							console.log( `event  `, );
							sessionStorage.removeItem('clickedElementData');
						});
						

						// 필요하다면 정보 사용 후 sessionStorage에서 삭제 (선택 사항)
						//sessionStorage.removeItem('clickedElementData');
					} else {
						console.log('저장된 클릭 요소 정보가 없습니다.');
					}
					

					// const uurl = new URL(location.href);
					// const params = uurl.searchParams;
					// //const params = new URLSearchParams(location.href);
					// let parList = params.get("list");
					// console.log(" pathname - ",params, parList) 
					// //setView(request)
					// if( location.pathname === '/' ||  !parList ){ // location.pathname.indexOf('sub') >= 0
					// 	initMain(request);
					// } else {
					// 	initSub(request);
					// }

					//initSub(request);
				} else {
					console.log("error", text)
					return;
				}
			}
		},
		error: (request) =>  console.log("err - ",request.arguments.msg)
	});


//});



// 상세보기 페이지 test
let itemlist = document.querySelector(".tCom008");
if( itemlist ){
	itemlist.addEventListener("click", e => {

		let clickedBtn = e.target.closest('[data-spa-action]');
		
		let o = e.target.closest(".list-item-type3");

		const elementInfo = {
			dataValue: o.getAttribute('data-order'), // data 속성 등 필요한 정보
			spaAction : clickedBtn ? clickedBtn.dataset.spaAction : null,
			pageLayout : clickedBtn ? clickedBtn.dataset.pageLayout : null,
			// ... 필요한 다른 정보 추가
		};
	
		// 정보를 JSON 문자열로 변환하여 sessionStorage에 저장
		sessionStorage.setItem('clickedElementData', JSON.stringify(elementInfo));
	
		// 다음 페이지로 이동
		//window.location.href = 'page2.html';
		window.location.href = `/dashboard02?sub=pageLayout${elementInfo.pageLayout}&acticon=${elementInfo.spaAction}`;

		console.log("click elem - ", e.target.closest(".list-item-type3"), o, elementInfo );


	});
}


function checkSpaAction(){

}

