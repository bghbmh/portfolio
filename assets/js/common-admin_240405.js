import * as cf from './commonFunction.js';
import { Modal } from '../../components/modal.js';
import { myDBCardType1 } from '../../components/myDBCardType1.js';
import { ct, tempDB, origin  } from '../../data/tempCategoryListl.js';

import { addHTML } from './markupHTML.js';

window.URL = window.URL || window.webkitURL;

document.addEventListener("DOMContentLoaded", () => {
	
	console.log("DOMContentLoaded ",location.origin )
	cf.fileHandler._load( { //bmh.json
		url: origin + '/data/' + tempDB, 
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

		},
		error: (request) => {
			console.log("err - ",request.arguments.msg)
		},
		loadType:"item", 
		done: "items" 
	});

	// document.querySelector(".maincategory").innerHTML += tempCategoryList("main","maincategory");
	// document.querySelector(".subcategory").innerHTML += tempCategoryList("sub","subcategory");
	// document.querySelector(".hash").innerHTML += tempCategoryList("hash","hash");
	// console.log("DOMContentLoaded - ",document.querySelector(".maincategory"), tempCategoryList("main","maincategory") )


	document.querySelector(".temp-create").addEventListener("click", formButtonHandler)

});

function tempCategoryList(str, name){  

	if( str === 'hash'){
		return ct[str].map( (c, idx) => `<label><input type="checkbox" name="${name}" value="${c}" >${c}<span role="button" data-action="delete" title="삭제" aria-label="삭제">X</span></label>`  ).join('');
	} else {
		return ct[str].map( (c, idx) => `<label><input type="radio" name="${name}" value="${c}" data-label="${str}" data-type="${idx+1}" >${c}</label>`  ).join(''); // class="label ${c.label}"
	}

}


async function formdataTest(e){

	console.log(e.type);
	
	if( e.type === "submit" ){
		e.preventDefault();

		console.log(location.origin);
		const formData = new FormData();
		
		try{
			const response = await fetch( origin + '/upload', { 
				method: 'POST',
				mode: "cors",
				credentials: "same-origin",
				// headers: {
				// 	//"Content-Type": "application/json",
				// 	//'Content-Type': 'application/x-www-form-urlencoded',
				// 	'Content-Type': 'multipart/form-data'
				// },
				body:  setFormData(e.target, formData)//JSON.stringify(jfile) formData   body 부분에 폼데이터 변수를 할당
			});
			
			console.log("submit 00 - ", response)
	
			if (response.ok) {
					
				cf.fileHandler._load( { //bmh.json
					url: origin + '/data/' + tempDB, 
					success : (request) => {
						
						try {
							throw request.responseText; 
						} catch (response) {
							if ( response ) {
								let uploadItems = JSON.parse(request.responseText);
								let pre = document.querySelector(".itemList").innerHTML;
								document.querySelector(".itemList").innerHTML = myDBCardType1.view(uploadItems[uploadItems.length - 1]) + pre;
								
			
							} else {
								console.log("error", response)
								return;
							}

							e.target.style.left = "-105%";
							

							setTimeout(() => {
								console.log("성공 upload Item 33 - ", e, e.target );
								e.target.parentNode.removeChild(e.target);
							}, 400);
						}
						
					},
					error: (request) => {
						console.log("err - ",request.arguments.msg)
					},
					loadType:"item", 
					done: "items" 
				});

			}
			//const result = await response.json();
		} catch (error){
			console.log("front error - ", error)
		}
		
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
		
		let label = -1;
		let filenum = -1;
		for( let i=0; i<pages.length; i+=2 ){
			label = i;
			filenum = i+1;
			console.log("file - ", pages[label], pages[i+1])
			if( pages[label].value === '' ) pages[label].value = 'sample' + (label);
			formData.append("page", pages[filenum].files[0]);
			box.push({
				label : pages[label].value,
				name : pages[filenum].files[0].name,
				size :  pages[filenum].files[0].size,
				type: pages[filenum].files[0].type,
				lastModified : pages[filenum].files[0].lastModified
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

	let strAction = e.target.closest('[data-action]').dataset.action;

	let html;
	let tempBox=null;

	console.log( strAction );
		
	switch( strAction ){
		case "create": 

			//const uploadNewItemwrap = cf.CreateElement({ tag : "div",  class : "modalWrap" });	
			const uploadNewItem = cf.CreateElement({ 
				tag : "form", 
				id :"uploadNewItem",
				class : "formType1 reform",
				encType : "multipart/form-data"
			});	
			uploadNewItem.innerHTML += myDBCardType1.create();

			//uploadNewItemwrap.appendChild(uploadNewItem);
			
			document.querySelector("body").classList.add("overflow-hidden");
			document.querySelector("body").appendChild(uploadNewItem);

			console.log("create - from - ", uploadNewItem )

			setTimeout(() => {
				console.log("create - " );
				uploadNewItem.style.left = "1rem";
			}, 100);
			
			//uploadNewItem.addEventListener('change', uploadTest);
			//uploadNewItem.addEventListener('keyup', formdataTest);
			uploadNewItem.addEventListener('submit', formdataTest);
			uploadNewItem.addEventListener('click', formButtonHandler);
			
			break;
		case "createCancel": 

			const xxForm = e.target.closest("form");
			xxForm.style.left = "-105%";
			setTimeout(() => {
				console.log("성공 upload Item 33 - ", e.target );
				xxForm.removeEventListener('submit', formdataTest);
				xxForm.removeEventListener('click', formButtonHandler);
				xxForm.parentNode.removeChild(xxForm);
				document.querySelector("body").classList.remove("overflow-hidden");
			}, 400);
			
			break;
		case "add":
		
			let str = clickedElem.dataset.markup; // e.target.parentNode.parentNode.querySelector(".fileBox")
			if( str === "imagepreview" ) addHTML(clickedElem.dataset.markup, clickedElem, e.target.parentNode.querySelector(".fileBox"))
			else if( str === "sample-file" ) e.target.parentNode.parentNode.querySelector(".fileBox").appendChild(addHTML(clickedElem.dataset.markup))
			else if( str === "extraInfo" ) e.target.parentNode.parentNode.querySelector(".item-wrap").appendChild(addHTML(clickedElem.dataset.markup))
			else if( str === "external-link" ) e.target.parentNode.parentNode.querySelector(".fileBox").appendChild(addHTML(clickedElem.dataset.markup))
			else e.target.parentNode.parentNode.querySelector(".item-wrap").innerHTML += addHTML(clickedElem.dataset.markup)

			break;
		case "delete":
			clickedElem.closest('.item-wrap').removeChild(clickedElem.closest('.item'));
			e.stopPropagation();
			
			break;
		case "save": 
			
			html = `<label class="ml5">
							<input type="checkbox" name="hash" value="${e.target.parentNode.control.value}">${e.target.parentNode.control.value}
							<span role="button" data-action="delete" title="삭제" aria-label="삭제">X</span>
						</label>`;
			tempBox.innerHTML += html;
			console.log(  e.target.parentNode, tempBox );
			e.target.parentNode.remove();

			break;
		case "cancel": 
			e.target.parentNode.remove();
			break;
		case "edit": 
			cf.fileHandler._load( { 
				url: origin + '/data/' + tempDB,
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

					let [ fileBox0 ] = [...editFormFileBoxes].filter( box => box.dataset.label === 'mainOpenImages' );
					item.mainOpenImages.forEach( (file, idx) => {
						requestInputFile( fileBox0.children[idx].querySelector("[type='file']"), file, origin + '/data/files/'+ file.name )
					});

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
		case "update": 
			e.preventDefault();
			e.stopPropagation();

			updateJson(clickedElem.form);

			break;
		case "testCancel": 
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
		url: origin + '/data/' + tempDB, 
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

