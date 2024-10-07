import * as cf from './commonFunction.js';
import { Modal } from '../../components/modal.js';
import { myDBCardType1 } from '../../components/myDBCardType1.js';
import { ct } from '../../components/tempCategoryListl.js';

window.URL = window.URL || window.webkitURL;


let origin = location.origin;
console.log("url - ",location.origin, window.URL );


document.addEventListener("DOMContentLoaded", () => {
	
	console.log("DOMContentLoaded ")
	cf.fileHandler._load( { //bmh.json
		url: origin + '/data/myList.json', 
		success : (request) => {
			
			try {
				throw request.responseText; 
			} catch (re) {
				if ( re ) {
					//console.log("success", re);
					let html = ``;
				let itemsData = JSON.parse(request.responseText);
					for( let i=itemsData.length-1; i>=0; i-- ){
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

	document.querySelector(".maincategory").innerHTML += tempCategoryList("main","maincategory");
	document.querySelector(".subcategory").innerHTML += tempCategoryList("sub","subcategory");
	document.querySelector(".hash").innerHTML += tempCategoryList("hash","hash");
	console.log("cate - ",document.querySelector(".maincategory"), tempCategoryList("main","maincategory") )

});

function tempCategoryList(str, name){  

	if( str === 'hash'){
		return ct[str].map( (c, idx) => `<label><input type="checkbox" name="${name}" value="${c}" >${c}<span role="button" data-action="delete" title="삭제" aria-label="삭제">X</span></label>`  ).join('');
	} else {
		return ct[str].map( (c, idx) => `<label><input type="radio" name="${name}" value="${c}" data-label="${str}" data-type="${idx+1}" >${c}</label>`  ).join(''); // class="label ${c.label}"
	}

}


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

		fetch(origin + '/upload', { //localhost   210.101.173.162:3000    192.168.35.246:3000
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

	//console.log("d.extra - ",d, d.samplefile  );

	d.samplename.value ? formData.append('directoryName', d.samplename.value ) : '';

	let jfile = {
		mainOpen : d.mainOpen.checked,
		mainOpenImages : multipleImageFileInfo(d.mainOpenImages, "mainOpenImages") ,
		category :[],
		'hash' : [...d.hash].filter( h =>  h.checked ).map( el => el.value ),
		title : d.title.value,
		description : d.description.value,
		'extraInfo': setExtra(d.extra),
		'externalLink': setExternalLink(d.externalLink),
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
	
	//console.log("jfile.samplefile - ",jfile   );
	
	
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


	function setExternalLink(exLinks, box={}){

		if( !exLinks ) return box;
		for( let i=0; i<exLinks.length; i+=2 ){
			if( exLinks[i].value) {
				//console.log("setExternalLink 22 - ",exLinks[i].value )
				box[exLinks[i].value] = exLinks[i+1].value ;
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
	

	
	//jsonD = {...jfile};
	
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
		
			let str = clickedElem.dataset.markup;
			if( str === "imagepreview" ) addHTML(clickedElem.dataset.markup, clickedElem, e.target.parentNode.querySelector(".fileBox"))
			else if( str === "sample-file" ) e.target.parentNode.parentNode.querySelector(".fileBox").appendChild(addHTML(clickedElem.dataset.markup))
			else if( str === "extraInfo" ) e.target.parentNode.parentNode.querySelector(".item-wrap").appendChild(addHTML(clickedElem.dataset.markup))
			else if( str === "external-link" ) e.target.parentNode.parentNode.querySelector(".fileBox").appendChild(addHTML(clickedElem.dataset.markup))
			else e.target.parentNode.parentNode.querySelector(".item-wrap").innerHTML += addHTML(clickedElem.dataset.markup)

			break;
		case "delete": console.log(t, clickedElem.closest('.item-wrap'));
			clickedElem.closest('.item-wrap').removeChild(clickedElem.closest('.item'));
			e.stopPropagation();
			
			break;
		case "save": console.log(t, e.target.parentNode.control.value  );
			
			html = `<label class="ml5">
							<input type="checkbox" name="hash" value="${e.target.parentNode.control.value}">${e.target.parentNode.control.value}
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
				url: origin + '/data/myList.json',
				success : (request) => {
					
					let orderNum = clickedElem.closest('[data-order]').dataset.order;
					let item = JSON.parse(request.responseText).find( o => o.order === parseInt(orderNum) );
					//console.log("success", item);
					mm = Modal.open({
						tamplateHTML : addHTML("dbModalHtml", item),
						addEvent : () => { console.log("common에서 보낸 이벤트입니다"); }
					});

					// mm.addEventListener("click", e => { 
					// 	console.log("common에서 보낸 이벤트입니다", e); 
					// 	formButtonHandler(e)  });

					let editForm = document.querySelector(`form[data-order='${orderNum}']`);
					editForm.addEventListener("click", formButtonHandler);

					let editFormFileBoxes = editForm.querySelectorAll(".fileBox");

					let [ fileBox1 ] = [...editFormFileBoxes].filter( box => box.dataset.label === 'mainimage' );
					item.mainimage.forEach( (file, idx) => {
						requestInputFile( fileBox1.children[idx].querySelector("[type='file']"), file, origin + '/data/files/'+ file.name )
					});
					//console.log("fileBox1 - ", fileBox1)

					let [ fileBox2 ] = [...editFormFileBoxes].filter( box => box.dataset.label === 'subimage' );
					item.subimage.forEach( (file, idx) => {
						requestInputFile( fileBox2.children[idx].querySelector("[type='file']"), file, origin + '/data/files/'+ file.name )
					});

					let [ fileBox3 ] = [...editFormFileBoxes].filter( box => box.dataset.label === 'samplePage' );
					item.samplePage.forEach( (file, idx) => {
						requestInputFile( fileBox3.children[idx].querySelector("[type='file']"), file, origin + '/data/sample/'+item.sampleName +'/html/'+ file.name  )
					});
					//console.log("fileBox3 - ", fileBox3)

					async function requestInputFile( inputfile, file, url ){
						const data = await fetch(url);
						const blob = await data.blob();
						const reader = new FileReader();
						let newFileList = new DataTransfer();

						reader.onload = () => {
							newFileList.items.add(new File([blob], file.name, { type: file.type, } ));
							inputfile.files = newFileList.files;
							//console.log("file.name - ", file.name, inputfile.files);
						}
						reader.readAsDataURL(blob);
					}
					
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
			e.stopPropagation();

			updateJson(clickedElem.form);

			break;
		case "testCancel": console.log(t);
			e.stopPropagation();
			Modal.close();
			break;
	}

	
}


async function updateJson(form){  console.log("updateJson--", location.origin, form);

	const formData = new FormData();
	formData.append('update', form.dataset.order);
	
	try{
		const response = await fetch( origin + '/update', { 
			method: 'POST', 
			mode: "cors",
			credentials: "same-origin",
			body:  setFormData(form, formData)//JSON.stringify(jfile) formData   body 부분에 폼데이터 변수를 할당
		});

		if (response.ok) {
			console.log("성공 - ", response)
			Modal.close();

			let [ reItem ] = [...document.querySelector(".itemList").children].filter( child => child.dataset.order === form.dataset.order );
			resetViewItem(reItem);
		}
		//const result = await response.json();
	} catch (error){
		console.log("front error - ", error)
	}
}

function resetViewItem(reItem){
	cf.fileHandler._load( { //bmh.json
		url: origin + '/data/myList.json', 
		success : (request) => {
			
			try {
				throw request.responseText; 
			} catch (re) {
				if ( re ) {
					let [ itemsData ] = JSON.parse(request.responseText).filter( a => a.order === parseInt(reItem.dataset.order) );
					reItem.outerHTML = myDBCardType1.view(itemsData);
					console.log("reItem 33 - " )

				} else {
					console.log("error", re)
					return;
				}
			}
			
		},
		error: (request) => {
			console.log("err - ",request.arguments.msg)
		},
		loadType:"item", 
		done: "items" 
	});
}

const formTest = document.querySelector('#formTest');

//formTest.addEventListener('change', uploadTest);
//formTest.addEventListener('keyup', formdataTest);
formTest.addEventListener('submit', formdataTest);
formTest.addEventListener('click', formButtonHandler);



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

		sampleItem.innerHTML += `<div class="ctrl">
									<button type="button" data-action="delete" class="btn">삭제</button>
								</div>`;
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



					// [...editForm.querySelectorAll(".fileBox")].forEach( async fileBox => {
					// 	if( fileBox.children.length ){

					// 		[...fileBox.children].forEach( fileitem => {

					// 		});
							
					// 		let img = fileBox.querySelector("img");
					// 		let inputfile = fileBox.querySelector("[type='file']");
					// 		let fileInfo = item[inputfile.name];
					// 		let aaa = fileInfo.filter( f => img.src.indexOf(f.name) > -1 );

					// 		const data = await fetch(img.src);
					// 		const blob = await data.blob();
					// 		const reader = new FileReader();
						
					// 		let newFileList = new DataTransfer();

					// 		console.log("item aUrl",img);
						
					// 		reader.onload = () => {
					// 			const base64data = reader.result;
					// 			console.log(data);
					// 			console.log("====img===========");
					// 			console.log(blob.arrayBuffer());
					// 			console.log("====//img===========");
					// 			console.log(blob);

								
						
					// 			newFileList.items.add(new File([blob], fileInfo[0].name, { type: fileInfo[0].type, } ));
					// 			inputfile.files = newFileList.files;
						
					// 			console.log( inputfile );
					// 		}
					// 		reader.readAsDataURL(blob);
							

					// 	}

					// });