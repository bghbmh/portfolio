import * as cf from './commonFunction.js';
import { Modal } from '../../components/modal.js';
import { myDBCardType1 } from '../../components/myDBCardType1.js';

document.addEventListener("DOMContentLoaded", () => {
	
	console.log("DOMContentLoaded ")
	cf.fileHandler._load( { //bmh.json
		url: '../data/myList.json', 
		success : (request) => {
			
			try {
				throw request.responseText; 
			} catch (re) {
				if ( re ) {
					//console.log("success", re);
					let html = ``;
				let itemsData = JSON.parse(request.responseText);
					for( let i=0; i<itemsData.length; i++ ){
						html = html + myDBCardType1.view(itemsData[i]);
					}
					document.querySelector(".itemList").innerHTML += html;

					document.querySelector(".itemList").addEventListener("click",formButtonHandler )

				} else {
					console.log("error", re)
					return;
				}
			}
			
			//console.log("DOM - ", myDBCardType1.create())
			return;
			
			console.log(" request - ", itemsData );	

		},
		error: (request) => {
			console.log("err - ",request.arguments.msg)
		},
		loadType:"item", 
		done: "items" 
	});

});


window.URL = window.URL || window.webkitURL;

function formdataTest(e){

	console.log(e.type);
	
	if( e.type === "submit" ){
		e.preventDefault();

		console.log(location.origin);

		const formData = new FormData();
		
		//for (var pair of formData.entries()) jfile[pair[0]] = pair[1];
		
		// productsContainer.innerHTML = filteredProducts
		// .map( ele => {;
		// 	return ele.innerHTML;
		// })
		// .join('');
		
		//formData.append('myData', new Blob([JSON.stringify(jfile)] , {type: "application/json"}) );
		
		//return;

		fetch('http://192.168.35.246:3000/upload', { //localhost   210.101.173.162:3000    192.168.35.246:3000
			method: 'POST',
			mode: "cors",
			credentials: "same-origin",
			// headers: {
			// 	//"Content-Type": "application/json",
			// 	//'Content-Type': 'application/x-www-form-urlencoded',
			// 	'Content-Type': 'multipart/form-data'
			// },
			body:  setFormData(e.target, formData)//JSON.stringify(jfile) formData   body 부분에 폼데이터 변수를 할당
		})
		.then((response) => console.log("then - ", response))
		.catch( err => console.log("front err - ", err))

		console.log("formData - ",  formData  )
		
	}
	
}


//json 데이터 수정 테스트로 임시사용
let jsonD ;

function setFormData(d, formData){

	console.log("d.extra - ",d, d.samplefile  );

	d.samplename.value ? formData.append('directoryName', d.samplename.value ) : '';

	let jfile = {
		mainOpen : d.mainOpen.checked,
		mainOpenImages : multipleImageFileInfo(d.mainOpenImages, "mainOpenImages") ,
		category :[],
		'hash' : [...d.hash].filter( h =>  h.checked ).map( el => el.value ),
		title : d.title.value,
		description : d.description.value,
		'extraInfo': setExtra(d.extra),
		"mainimage" : multipleImageFileInfo(d.mainimage, "mainimage"),
		"subimage" : multipleImageFileInfo(d.subimage, "subimage"),
		"sampleName" : d.samplename.value,
		"samplePage" : samplePageInfo(d.samplePage),
	};
		

	function samplePageInfo(pages, box=[]){

		if( !pages ) return box;
		
		for( let i=0; i<pages.length; i+=2 ){
			console.log("file - ", pages[i], pages[i+1])
			if( pages[i+1].value === '' ) pages[i+1].value = 'sample' + (i+1);
			formData.append("page", pages[i].files[0]);
			box.push({
				label : pages[i+1].value,
				name : pages[i].files[0].name,
				size :  pages[i].files[0].size,
				type: pages[i].files[0].type,
				lastModified : pages[i].files[0].lastModified
			});
		}

		return box;
	}
	
	console.log("jfile.samplefile - ",jfile   );
	
	
	if( d.maincategory.value ) setcategory(d.maincategory);
	if( d.subcategory.value ) setcategory(d.subcategory);

	function setcategory(c){
		jfile.category.push({
			name : c.value,
			type : [...c].filter( h =>  h.checked )[0].dataset.type,
			label : [...c].filter( h =>  h.checked )[0].dataset.label
		})
	}

	function setExtra(extra, box={}){

		if( !extra ) return box;
		for( let i=0; i<extra.length; i+=2 ){
			if( extra[i].value) {
				console.log("setExtra 22 - ",extra[i].value )
				//jfile.extraInfo.push({});
				box[extra[i].value] = extra[i+1].value ;
			}
		}
		return box;
	}

	function multipleImageFileInfo(images, label, box = [] ){

		if( !images ) return box;

		if( !images.length && images.files.length ) {
			setBox(box, images.files, label)
		}
		else if( images.length && images[0].files.length ){
			for( let i=0; i<images.length; i++ ){
				setBox(box, images[i].files, label)
			}
		}
		return box;
	}

	function setBox(box, image, label ){
		//console.log("setBox - ",box, image, label)
		for ( const [idx, file] of Array.from(image).entries() ) {
			formData.append(label, file);
			box.push({
				name : file.name,
				size :  file.size,
				type: file.type,
				lastModified : file.lastModified
			});
		}
	}
	

	

	jsonD = {...jfile};
	
	//console.log("jfile - ", jfile, jsonD)
	
	formData.append('myData', JSON.stringify(jfile) );
	
	return formData;
}


let mm ;
let imgFile = [];
function formButtonHandler(e){
	
	//e.stopPropagation();

	if( !e.target.closest('[data-action]') ) return;

	let clickedElem = e.target.closest('[data-action]');

	let t = e.target.closest('[data-action]').dataset.action;

	let html;
	let tempBox=null;
		
	switch( clickedElem.dataset.action ){
		case "add": console.log(t);			

			if(clickedElem.dataset.markup === "imagepreview" ){ 

				tempBox = e.target.parentNode.querySelector(".fileBox");

				let newFile = cf.CreateElement({
					tag : "input",
					type: "file",
					name: clickedElem.dataset.label,//" mainimage",
				});
				newFile.click();
				newFile.addEventListener("change", e => {
					
					let item = cf.CreateElement({
						tag : "figure",
						class: "item"
					});
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

					console.log("add change - ", newFile.files, item);

					tempBox.appendChild(item);
				})
		
			} else if( clickedElem.dataset.markup === "upload-type1" ){  
				//e.stopPropagation();
				tempBox = e.target.parentNode.parentNode.querySelector(".fileBox");

				let sampleItem = cf.CreateElement({ tag : "div", class :"d-flex gap-3 item"});
				sampleItem.innerHTML += `<div class="ctrl">
											<button type="button" data-action="delete" class="btn">삭제1</button>
										</div>`;				

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

				sampleItem.appendChild(fileLabel);
				sampleItem.appendChild(menulabel);
				
				
				tempBox.appendChild(sampleItem);

				console.log("samplePage change 00 - ");


			} else if( clickedElem.dataset.markup === "extraInfo" ){ 
				`
				<div class="d-flex gap-1 ">
					<label class="">
						<input class=" " data-label="label" name="extra" type="text" value="" placeholder="라벨">
					</label>
					<label class="">
						<input class=" " data-label="info" name="extra" type="text" value="" placeholder="내용">
					</label>
				</div>`
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

				sampleItem.innerHTML += `<div class="ctrl">
											<button type="button" data-action="delete" class="btn">삭제</button>
										</div>`;

				tempBox = e.target.parentNode.parentNode.querySelector(".item-wrap");
				tempBox.appendChild(sampleItem);


			} else {
				tempBox = e.target.parentNode.parentNode.querySelector(".item-wrap");
				tempBox.innerHTML += addHTML(clickedElem.dataset.markup);
			}
			

			//addevent();
			break;
		case "delete": console.log(t, clickedElem.closest('.item-wrap'));
			clickedElem.closest('.item-wrap').removeChild(clickedElem.closest('.item'));
			e.stopPropagation();
			
			break;
		case "save": console.log(t, e.target.parentNode.control.value  );
		
			let v = e.target.parentNode.control.value;
			
			html = `<label class="ml5">
							<input type="checkbox" name="hash" value="${v}">${v}
							<span role="button" data-action="delete" title="삭제" aria-label="삭제">X</span>
						</label>`;
			tempBox.innerHTML += html;
			console.log(  e.target.parentNode, tempBox );
			e.target.parentNode.remove();

			break;
		case "cancel": console.log(t);
			e.target.parentNode.remove();
			break;
		case "edit": console.log(t);
			cf.fileHandler._load( { 
				url: '../data/myList.json',
				success : (request) => {
					
					let z = clickedElem.closest('[data-order]').dataset.order;
					let item = JSON.parse(request.responseText).find( o => o.order === parseInt(z) );
					//console.log("success", item);
					mm = Modal.open({
						tamplateHTML : `<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable"> 
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
					});

					mm.addEventListener("click", e => { 
						//console.log("common에서 보낸 이벤트입니다", e); 
						formButtonHandler(e)  });


					setTimeout(() => {
						console.log("세 번째 메시지");
						let editForm = mm.querySelector("form[data-order='1']");
						let filekey = [ "mainOpenImages", "mainimage", "subimage", "samplePage"	]

						filekey.forEach( key => {
							let newFileList = new DataTransfer();

							item[key].map( file => {
								let path = file.type.indexOf("image") > -1 ? 'data/files/' : 'data/sample/' + item.sampleName +'/html/' + file.name;
								let url = 'http://192.168.35.246:3000/' + path;

								fetch(url)
								.then((response) => response.blob())
								.then((blob) => {
									newFileList.items.add(new File([blob], file.name, { type: file.type, } ));
								});
								
							});

							if( key === "samplePage"){
								console.log("test - ",key)
								editForm[key] ? editForm[key][0].files =  newFileList.files : '';
							} else {
								editForm[key] ? editForm[key].files = newFileList.files : '';
							}
							
							
						});

						console.log("edit - ",editForm, editForm.mainimage);					
					
					}, 2000);
					
				},
				error: (request) => {
					console.log("err - ",request.arguments.msg)
				},
				loadType:"item", 
				done: "items" 
			});

			break;
		case "update": console.log(t);
			e.preventDefault();
			console.log("update 11 - ", e.target.form )

			formdataTest222(clickedElem.form)
			break;
		case "testCancel": console.log(t);
			e.preventDefault();
			console.log("testCancel - ",e.button, clickedElem.type, Modal )
			
			Modal.close();
				//document.querySelector("body").removeChild(mm)
		
			break;
	}

	
}

function nodeListToArray(items){

	if( !items ) return [];

	let arr = [];

	if( items.length ){
		console.log("radionodelist - ", items)
		arr = [...items];
	} else {
		console.log("one - ", items)
		arr.push(items)
	}
	return arr;
	
}

function formdataTest222(form){

		console.log(location.origin);

		const formData = new FormData();

		formData.append('update', form.dataset.order);

		//setFormData(form, formData);

		console.log("update formData - ",  formData  )


		//return;

		fetch('http://192.168.35.246:3000/update', { //localhost   210.101.173.162:3000    192.168.35.246:3000
			method: 'POST',
			mode: "cors",
			credentials: "same-origin",
			// headers: {
			// 	//"Content-Type": "application/json",
			// 	//'Content-Type': 'application/x-www-form-urlencoded',
			// 	'Content-Type': 'multipart/form-data'
			// },
			body:  setFormData(form, formData)//JSON.stringify(jfile) formData   body 부분에 폼데이터 변수를 할당
		})
		.then((response) => console.log("then - ", response))
		.catch( err => console.log("front err - ", err))

		console.log("formData - ",  formData  )
		
	
}

function uploadTest(e){
	
	if( e.target.type !== "file") return;
	
	console.log("change", e.target.type );

	let html="";
	for ( const [idx, file] of Array.from( e.target.files).entries() ) {

		console.log("file - ",idx, file.name);
		html += `
			<figure class="item">
				<img src="data/files/${file.name}">
				<figcaption class="figcaption">
					<span class="title">${file.name}</span>
					<span>tes123</span>
				</figcaption>
			</figure>`

	}

	let fileBox = e.target.parentNode.parentNode.querySelector(".fileBox");
	fileBox.innerHTML += html;

}










const formTest = document.querySelector('#formTest');

//formTest.addEventListener('change', uploadTest);
//formTest.addEventListener('keyup', formdataTest);
formTest.addEventListener('submit', formdataTest);
formTest.addEventListener('click', formButtonHandler);



function addHTML(str){
	if( str === "upload-type1" ){
		return `
			<div class="d-flex gap-3 com001">
				<label>
					<input class="" name="samplePage" placeholder="파일 라벨" type="text" value="">
				</label>
				<div class="upload type1">
					<label class="btn">	
						<input type="file" name="samplePage" aria-label="파일을 선택하세요" > 
						<i class="fa-regular fa-image" aria-hidden="true"></i>
					</label>
					<div class="fileBox"></div>
				</div>
			</div>`;
	} else if( str === "extraInfo" ){
		return `
			<div class="d-flex gap-1 ">
				<label class="">
					<input class=" " data-label="label" name="extra" type="text" value="" placeholder="라벨">
				</label>
				<label class="">
					<input class=" " data-label="info" name="extra" type="text" value="" placeholder="내용">
				</label>
			</div>`;
	} else if( str === "hash" ){
		return `
			<label>
				<input name="category" type="text" value="" placeholder="추가">
				<span role="button" data-action="save" class="btn icon" title="저장" aria-label="저장">ok</span>
				<span role="button" data-action="cancel" class="btn icon" title="취소" aria-label="취소">cancel</span>
			</label>`;
	}
		
}



function FileUpload(img, file) {
	const reader = new FileReader();
	this.ctrl = createThrobber(img);
	const xhr = new XMLHttpRequest();
	this.xhr = xhr;

	const self = this;
	this.xhr.upload.addEventListener(
		"progress",
		function (e) {
			if (e.lengthComputable) {
				const percentage = Math.round((e.loaded * 100) / e.total);
				self.ctrl.update(percentage);
			}
		},
		false,
	);

	xhr.upload.addEventListener(
		"load",
		function (e) {
			self.ctrl.update(100);
			const canvas = self.ctrl.ctx.canvas;
			canvas.parentNode.removeChild(canvas);
		},
		false,
	);
	xhr.open(
		"POST",
		"https://demos.hacks.mozilla.org/paul/demos/resources/webservices/devnull.php",
	);
	xhr.overrideMimeType("text/plain; charset=x-user-defined-binary");
	reader.onload = function (evt) {
		xhr.send(evt.target.result);
	};
	reader.readAsBinaryString(file);
}
