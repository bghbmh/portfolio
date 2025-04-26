import * as cf from './commonFunction.js';
import { Modal } from '../../components/modal.js';
import { myDBCardType1 } from '../../components/myDBCardType1.js';
import { ct, tempDB, origin  } from '../../data/tempCategoryListl.js';

import { addHTML } from './markupHTML.js';

import Sortable from 'https://esm.sh/sortablejs';


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
					for( let i=itemsData.length-1; i>-1; i-- ){
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

	document.querySelector(".temp-create").addEventListener("click", formButtonHandler);
	document.querySelector('.on-off-set').addEventListener("click", formButtonHandler)
	

});

function formButtonHandler(e){
	
	//e.stopPropagation();

	if( !e.target.closest('[data-action]') ) return;

	let clickedElem = e.target.closest('[data-action]');

	let strAction = e.target.closest('[data-action]').dataset.action;

	let html;
	let tempBox=null;

	console.log( strAction );
		
	switch( strAction ){
		case "changeOrder":  
			changeOrder(clickedElem, document.querySelector(".itemList"));

			break;
		case "cancelOrder":  
			console.log( strAction );
			clickedElem.parentNode.querySelector(".changeOrder").classList.remove("changeOrder");
			document.querySelector(".itemList").classList.remove("changeOrder");
			// let [ reItem ] = [...document.querySelector(".itemList").children].filter( child => child.dataset.order === form.dataset.order );
			// resetViewItem(reItem);

			break;
		case "create": 
			document.querySelector("body").classList.add("overflow-hidden");

			let card = addNewCard();
			document.querySelector("body").appendChild( card );
			setTimeout(() => {
				console.log("create - " );
				card.style.left = "1rem";
			}, 100);

			break;
		case "createCancel": 
			const xxForm = clickedElem.closest("form");
			xxForm.style.left = "-105%";
			setTimeout(() => {
				console.log(" upload card 취소 - ", e.target );
				xxForm.removeEventListener('submit', submitData);
				xxForm.removeEventListener('click', formButtonHandler);
				xxForm.parentNode.removeChild(xxForm);
				document.querySelector("body").classList.remove("overflow-hidden");
			}, 400);
			break;
		case "add":
			addNewCardItemHTML(clickedElem.dataset.markup, clickedElem, e.target.parentNode)
			break;
		case "delete":
			clickedElem.closest('.item-wrap').removeChild(clickedElem.closest('.item'));
			e.stopPropagation();
			break;
		case "save": 
		

			break;
		case "cancel": 
			e.target.parentNode.remove();
			break;
		case "edit":   console.log("err - ",)
			cf.fileHandler._load( { 
				url: origin + '/data/' + tempDB,
				success : (request) => {
					let orderNum = clickedElem.closest('[data-order]').dataset.order;
					let editItem = JSON.parse(request.responseText).find( o => o.order === parseInt(orderNum) );
					console.log("success", editItem);

					let mm = Modal.open({
						tamplateHTML : `
							<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable"> 
								<div class="modal-content">
									<div class="modal-header">
										<h5 class="modal-title">
											<span>edit_test</span>
										</h5>
										<button type="button" class="btn-close modal-close" data-bs-dismiss="modal" aria-label="Close"></button>
									</div>
									<div class="modal-body formType1 ">
										${myDBCardType1.edit(editItem)}
									</div>
								</div> 
							</div>`,
						onInit: function (elem) {
							console.log("onInit - ", elem);
							const f = elem.querySelector('form');
							f.addEventListener("click", formButtonHandler);
							f.addEventListener('submit', submitDataUpdate);
							elem.querySelectorAll('.modal-close').forEach( btn => {
								btn.addEventListener("click", () => {
									console.log("btn - ", btn);
									f.removeEventListener("click", formButtonHandler);
									f.removeEventListener('submit', submitDataUpdate);
									let m = elem.closest(".modal");

									document.body.removeChild(m);
								});
							});

							// 파일 연결
							let il = ['mainOpenImages', 'mainimage', 'subimage', 'samplePage' ];
							let editFormFileBoxes = f.querySelectorAll(".fileBox");
							let path = '/data/files/';

							il.forEach( name => {  console.log("name - ", name)
								if( name === 'samplePage' ) {
									path = '/data/sample/' + editItem.sampleName +'/html/';
									console.log("path - ", path)
								}

								let [ fileBox ] = [...editFormFileBoxes].filter( b => b.dataset.label === name );
								editItem[name].forEach( (file, idx) => {
									requestInputFile( fileBox.children[idx].querySelector("[type='file']"), file, origin + path + file.name )
								});
							});


						}
					});
				},
				error: (request) => {
					console.log("err - ",request.arguments.msg)
				},
				loadType:"item", 
				done: "items" 
			});
			break;
		case "update": 
			

			break;
		// case "testCancel": 
			
		// 	break;
	}

	
}

function changeOrder(clickedElem, itemList){
	if( clickedElem.classList.contains("changeOrder") ){
		console.log("changeOrder",  );
		clickedElem.classList.remove("changeOrder");
		itemList.classList.remove("changeOrder");

		updateOrder( [...itemList.children] );

		return;
	}

	itemList.classList.add("changeOrder");
	[...itemList.children].forEach( (a, idx) => a.dataset.orderInit = idx+1 );
	clickedElem.classList.add("changeOrder");

	var sortable = new Sortable(itemList, {
		animation: 150,
		swapThreshold: 0.65,
		ghostClass: 'sortable-ghost',
		chosenClass: 'sortable-chosen',
		onEnd: function (evt) {
			[...evt.target.children].forEach( (a, idx) => a.dataset.order = idx+1 );
		}
	});
}

async function updateOrder( obj ){  console.log("updateJson--", location.origin);

	const formData = new FormData();
	//formData.append('update', form.dataset.order);
	let jsonFile = [];

	obj.map( o => jsonFile.push( { "init": o.dataset.orderInit, "now" : o.dataset.order } ))

	formData.append('updateOrder', JSON.stringify(jsonFile) );

	console.log("updateOrder - ", formData)
	
	try{
		const response = await fetch( origin + '/updateorder', { 
			method: 'POST', 
			mode: "cors",
			credentials: "same-origin",
			body:  formData//JSON.stringify(jfile) formData   body 부분에 폼데이터 변수를 할당
		});

		if (response.ok) {
			console.log("성공 - ", response)
			
			//let [ reItem ] = [...document.querySelector(".itemList").children].filter( child => child.dataset.order === form.dataset.order );
			//resetViewItem(reItem);
		}
		//const result = await response.json();
	} catch (error){
		console.log("front error - ", error)
	}
}

function addNewCard(){
	const uploadNewItem = cf.CreateElement({ 
		tag : "form", 
		id :"uploadNewItem",
		class : "formType1 reform",
		encType : "multipart/form-data"
	});	
	uploadNewItem.innerHTML += myDBCardType1.create();

	uploadNewItem.addEventListener('submit', submitData);
	uploadNewItem.addEventListener('click', formButtonHandler);

	return uploadNewItem;
}

function addNewCardItemHTML(item, clickedElem, p){
	if( item === "imagepreview" ) {
		addHTML(item, clickedElem, findMarkUpWrap(clickedElem,".fileBox"));// p.querySelector(".fileBox")
	} else if( item === "sample-file" ) {
		findMarkUpWrap(clickedElem,".fileBox").appendChild(addHTML(item))
	} else if( item === "extraInfo" ) {
		findMarkUpWrap(clickedElem,".item-wrap").appendChild(addHTML(item))
	} else if( item === "external-link" ) {
		findMarkUpWrap(clickedElem,".fileBox").appendChild(addHTML(item))
	} else {
		findMarkUpWrap(clickedElem,".item-wrap").innerHTML += addHTML(item)
	}	
}

async function submitDataUpdate(e){
	e.preventDefault();
	console.log(e.type);
	
	if( e.type === "submit" ){

		const formData = new FormData();

		let updateOrder = e.target.dataset.order;

		formData.append('update', updateOrder);

		e.target.samplename.value ? formData.append('directoryName', e.target.samplename.value ) : '';
		const jt =  setJSON(e.target, formData);
		formData.append('myData', JSON.stringify(jt) );

		console.log(location.origin, jt);

		try{
			const response = await fetch( origin + '/update', { 
				method: 'POST',
				mode: "cors",
				credentials: "same-origin",
				body:  formData//JSON.stringify(jfile) formData   body 부분에 폼데이터 변수를 할당
			});
			
			if (response.ok) {
					
				cf.fileHandler._load( { //bmh.json
					url: origin + '/data/' + tempDB, 
					success : (request) => {
						
						try {
							throw request.responseText; 
						} catch (response) {
							if ( response ) {
								let [ reItem ] = [...document.querySelector(".itemList").children].filter( child => child.dataset.order === updateOrder );

								let [ updateData ] = JSON.parse(request.responseText).filter( a => a.order === parseInt(updateOrder) );
								reItem.outerHTML = myDBCardType1.view(updateData);

								let m = document.querySelector(".modal");

									document.body.removeChild(m);
								
			
							} else {
								console.log("error", response)
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
			//const result = await response.json();
		} catch (error){
			console.log("front error - ", error)
		}
		
	}
}

async function submitData(e){
	e.preventDefault();
	console.log(e.type);
	
	if( e.type === "submit" ){

		const formData = new FormData();

		e.target.samplename.value ? formData.append('directoryName', e.target.samplename.value ) : '';
		const jt =  setJSON(e.target, formData);
		formData.append('myData', JSON.stringify(jt) );

		console.log(location.origin, jt);

		
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
				body:  formData//JSON.stringify(jfile) formData   body 부분에 폼데이터 변수를 할당
			});
			
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

function setJSON(d, formData){

	//console.log("d.extra - ",d, d.samplefile  );

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
	
	return jfile;
}

function render(item = null, markUp = ''){

}

function findMarkUpWrap(element, classname){
	let current = element ;//.parentElement;
  
	while (current) {
	  if (current.querySelector(classname)) {
		return current.querySelector(classname);
	  }
	  current = current.parentElement;
	}
  
	return false;
}

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