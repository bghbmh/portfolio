import * as cf from './commonFunction.js';

import { myDBCardType1 } from '../../components/myDBCardType1.js';
import { ct } from '../../data/tempCategoryListl.js';


function tamplateModalHTML(modalStyle, item){
	
	console.log("pageView 111 - ", item.samplePage )

	if( modalStyle === "pageView" ) { // sample페이지 + 이미지, 제목이 없을 때 사용할 모달
		
		return `
			<div class="modal-dialog modal-extra-lg modal-dialog-centered modal-dialog-scrollable pageView"> 
				<div class="modal-content">

					<div class="modal-header">
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">닫기</button>
						<div class="extraInfo expanded">
							<h5 class="modal-title" role="button" aria-label="더보기버튼"  data-action="toggle" data-target=".extraInfo" aria-label=".extraInfo">
								<span>${item.title !== "" ? item.title : "Modal_프로젝트프로필" }</span>
								<i class="bi bi-chevron-up" aria-hidden="true"></i>
							</h5>							

							${ item.category.length ? '<div class="labels">' + item.category.map( o => `<span class="info ${o.label}" data-type=${o.type}>${o.name}</span>`).join('') + '</div>' : ''}

							${Object.keys(item.extraInfo).length ? '<dl class="extraInfo-wrap">' + Object.entries(item.extraInfo).map( arr => `<dd class="info" aria-label="${arr[0]}">${arr[1]}</dd>`).join('') + '</dl>' : ''}

							${item.samplePage.length ? '<nav class="buttons">' +  item.samplePage.map( o => `<button type="button" class="btn text-start" data-sample-name="${item.sampleName}" data-link="${o.name}">${o.label}</button>`).join('') + '</nav>' : ''}
						</div>
					</div>
					<div class="modal-body" style="padding:0">
						${item.samplePage.length ? `<iframe class="iframe" src="${origin}/data/sample/${item.sampleName}/html/${item.samplePage[0].name}" style="width: 100%;height: 100%" ></iframe>` : ''}

					</div>
				</div>
			</div>`
	} else if( modalStyle === "projectView" ) { // sample페이지 + 이미지 + 제목 이 모두 있는 경우에 사용할 모달
		return `
			<div class="modal-dialog modal-extra-lg modal-dialog-centered modal-dialog-scrollable projectView"> 
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						<div class="extraInfo expanded">
							<h5 class="modal-title" role="button" aria-label="더보기버튼"  data-action="toggle" data-target=".extraInfo" aria-label=".extraInfo">
								<span>${item.title !== "" ? item.title : "Modal_프로젝트프로필" }</span>
								<i class="bi bi-chevron-up" aria-hidden="true"></i>
							</h5>							

							${ item.category.length ? '<div class="labels">' + item.category.map( o => `<span class="info ${o.label}" data-type=${o.type}>${o.name}</span>`).join('') + '</div>' : ''}
		
							${Object.keys(item.extraInfo).length ? '<dl class="extraInfo-wrap">' + Object.entries(item.extraInfo).map( arr => `<dd class="info" aria-label="${arr[0]}">${arr[1]}</dd>`).join('') + '</dl>' : ''}
						</div>
					</div>
					<div class="modal-body">
						${item.mainimage.map( img => `<img src="${origin}/data/files/${img.name}">` ).join("")  }
						${item.subimage.map( img => `<img src="${origin}/data/files/${img.name}">` ).join("")}
					</div>
					<!-- <div class="modal-footer">
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
					</div> -->
				</div>
			</div>`
	} else if( modalStyle === "zoomIn" ) {
		return `
			<div class="modal-dialog modal-extra-lg modal-dialog-centered modal-dialog-scrollable zoomIn"> 
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title">
							<span>Modal_이미지리스트</span>
						</h5>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body">
						${item.mainimage.length ? item.mainimage.map( img => `<img src="${origin}/data/files/${img.name}">` ).join("") : '<!--img src="" alt="동록한이미지가없습니다"-->' }
						${item.subimage.length ? item.subimage.map( img => `<img src="${origin}/data/files/${img.name}">` ).join("") : '<!--img src="" alt="동록한이미지가없습니다"-->' }
					</div>
					<!-- <div class="modal-footer">
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
					</div> -->
				</div>
			</div>`
	}
}


			
				
// cf.fileHandler._load( { 
// 	url: '../0_last/data/test.json', 
// 	success : function(request){
		
// 		let items = JSON.parse(request.responseText);

// 		Modal.detail({ 
// 			html : component.detailViewPage( items, JSON.parse(clickElem.dataset.uiTarget)  ),
// 			class:"popup",
// 			eventListeners : {
// 				"load" : () => { console.log("click___test_attach eventListeners") } ,
// 				"click" : [cardListHandler ,testFunction]
// 			},
// 			 tId : e.timeStamp
// 		})
// 	},
// 	loadType:"item", done: "items" 
// });



function addHTML(str, item, tagBox = null){
	if( str === "dbModalHtml" ){
		return `
			<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable"> 
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title">
							<span>edit_test</span>
						</h5>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body formType1 ">
						${myDBCardType1.edit(item)}
					</div>
				</div>
			</div>`

	} else if( str === "imagepreview"){
		let newFile = cf.CreateElement({
			tag : "input",
			type: "file",
			name: item.dataset.label,//" mainimage",
		});
		newFile.click();
		newFile.addEventListener("change", e => {
			
			let item = cf.CreateElement({ tag : "figure", class: "item" });
			item.innerHTML = `
					<img src="${window.URL.createObjectURL(newFile.files[0])}">
					<figcaption class="figcaption">
						<span class="title">${newFile.files[0].name}</span>
						<span>tes123</span>
						<div class="ctrl">
							<button type="button" data-action="delete" class="btn">삭제</button>
						</div>
					</figcaption>`;

			newFile.style.display = "none";
			item.appendChild(newFile);					
			tagBox.appendChild(item);
		})
	} else if( str === "sample-file" ){

		let sampleItem = cf.CreateElement({ tag : "div", class :"d-flex gap-3 item"});			

		let fileLabel = cf.CreateElement({ tag : "label", class:"btn"});
		let inputFile = cf.CreateElement({
			tag : "input",
			type: "file",
			name: "samplePage",
			"data-label" : "page"
		});
		inputFile.addEventListener("change", e => {
			
			let additem = cf.CreateElement({
				tag : "figure",
				class: "m-0"
			});
			additem.innerHTML = `
					<img src="${window.URL.createObjectURL(inputFile.files[0])}">
					<figcaption class="figcaption">
						<span class="title">${inputFile.files[0].name}</span>
						<span>tes123</span>
					</figcaption>`;

			
			sampleItem.insertBefore(additem, fileLabel);
			fileLabel.style.display = "none"

			console.log("add change - ", inputFile.files, additem);
		})
		fileLabel.appendChild(inputFile);

		let menulabel = cf.CreateElement({ tag : "label"});
		let inputTxt = cf.CreateElement({
			tag : "input",
			type: "text",
			name: "samplePage",
			placeholder : "파일 라벨",
			value:""
		});
		menulabel.appendChild(inputTxt);
		
		sampleItem.appendChild(menulabel);
		sampleItem.appendChild(fileLabel);

		let ctrl = cf.CreateElement({ tag : "div", class :"ctrl"});	
		ctrl.innerHTML += `<button type="button" data-action="delete" class="btn">삭제1</button>`;	
		sampleItem.appendChild(ctrl);
		
		return sampleItem;

	} else if( str === "extraInfo" ){
		let sampleItem = cf.CreateElement({ tag : "div", class :"d-flex gap-1 item"});
		let labelMenu1 = cf.CreateElement({ tag : "label"});
		let inputTxt1 = cf.CreateElement({
			tag : "input",
			type: "text",
			name: "extra",
			placeholder : "라벨",
			value:"",
			"data-label" : "label"
		});
		labelMenu1.appendChild(inputTxt1);

		let labelMenu2 = cf.CreateElement({ tag : "label"});
		let inputTxt2 = cf.CreateElement({
			tag : "input",
			type: "text",
			name: "extra",
			placeholder : "내용",
			value:"",
			"data-label" : "info"
		});
		labelMenu2.appendChild(inputTxt2);

		sampleItem.appendChild(labelMenu1);
		sampleItem.appendChild(labelMenu2);

		let ctrl = cf.CreateElement({ tag : "div", class :"ctrl"});	
		ctrl.innerHTML += `<button type="button" data-action="delete" class="btn">삭제</button>`;	
		sampleItem.appendChild(ctrl);

		return sampleItem;

	} else if( str === "hash" ){
		return `
			<label>
				<input name="category" type="text" value="" placeholder="추가">
				<span role="button" data-action="save" class="btn icon" title="저장" aria-label="저장">ok</span>
				<span role="button" data-action="cancel" class="btn icon" title="취소" aria-label="취소">cancel</span>
			</label>`;
	} else if( str === "external-link" ){
		let sampleItem = cf.CreateElement({ tag : "div", class :"d-flex gap-3 item"});
		sampleItem.innerHTML += `<div class="ctrl">
									<button type="button" data-action="delete" class="btn">삭제1</button>
								</div>`;			
		let linklabel = cf.CreateElement({ tag : "label"});
		let inputLink = cf.CreateElement({
			tag : "input",
			type: "text",
			name: "externalLink",
			placeholder : "외부 링크 url",
			value:""
		});		
		linklabel.appendChild(inputLink);					

		let menulabel = cf.CreateElement({ tag : "label"});
		let inputTxt = cf.CreateElement({
			tag : "input",
			type: "text",
			name: "externalLink",
			placeholder : "외부 링크 라벨",
			value:""
		});
		menulabel.appendChild(inputTxt);

		sampleItem.appendChild(linklabel);
		sampleItem.appendChild(menulabel);
		
		return sampleItem;
	}
		
}



export { tamplateModalHTML, addHTML}