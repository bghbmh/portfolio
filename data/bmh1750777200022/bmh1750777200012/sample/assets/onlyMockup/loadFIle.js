

function ttt(){

	
					//$('.footabletype').footable();

					//document.querySelector("#tt").addEventListener("click", e => {  console.log("test123 - ", e) 	})

		
	if( document.querySelector("#fileupload") ) {
		$('#fileupload').fileupload({
			dataType: 'json',
			done: function (e, data) {
				console.log("ttt - ", e)
				$.each(data.result.files, function (index, file) {
					console.log("tqwett - ", file);
					let html=`
					<tr class="template-upload ">
						<td>
						<p class="name">${file.name}</p>
						<strong class="error text-danger"></strong>
						</td>
						<td>
						<p class="size">${file.size}</p>
						<div class="progress progress-striped active" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><div class="progress-bar progress-bar-success" style="width:0%;"></div></div>
						</td>
						<td>
						<button class="btn green start">
						<span>올리기</span>
						</button>

						<button class="btn cancel">
						<span>취소</span>
						</button>
						</td>
						</tr>
					`;
					//$('<p></p>').text(file.name).appendTo($(".upLoadFileList "));
					document.querySelector(".upLoadFileList .files").innerHTML = html;
				});
			}
		});
	}
			
		
	/* ui 클릭이벤트_임시 추가 태그에 data-mockup-ui 속성을 사용한 ui만 해당 */
	document.addEventListener("click", clickUiDataSetHandler);
	// document.addEventListener("touchstart", touchUiDataSetHandler);
	// document.addEventListener("touchend", touchUiDataSetHandler);


}



function includeHTML(cb){
    console.log('load file', cb)
	var file, xhttp;
	for ( let elem of document.getElementsByTagName("*") ) {

		file = elem.getAttribute("include-html");
		if (file) {
			xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4) {
					if (this.status == 200) {elem.outerHTML = this.responseText;}
					if (this.status == 404) {elem.outerHTML = "Page not found.";}
					elem.removeAttribute("include-html");
					includeHTML(ttt);
				}
			}
			xhttp.open("GET", file, true);
			xhttp.send();
			return;
		}
	}

	if( cb ) cb();
}

includeHTML(ttt);


function clickUiDataSetHandler(e){ 

		
	if( !e.target.closest("[data-mockup-ui]")) return; 

	let clickElem = e.target.closest("[data-mockup-ui]");
	let mockupUi = clickElem.dataset.mockupUi ; 
	switch( mockupUi ){
		case "sidenavcollapsebtn":
				e.target.classList.toggle("on") ; 
			break;
		case "sidenav":
			e.target.closest("[data-mockup-ui]")
				.querySelectorAll(".menu-link")
				.forEach( elem => {elem.classList.remove("active")	} );

			e.target.classList.add("active");
			clickElem.querySelector(".mobileMenuBtn").classList.remove("on");
			break;
		case "gnbgnb":
			let g =e.target.closest("[data-mockup-ui]");
			
				g.querySelectorAll(".link")
				.forEach( elem => {elem.classList.remove("active")	} );
				e.target.classList.add("active");

				let sl = e.target.parentNode.offsetLeft  - window.innerWidth/2 ;
				g.scrollTo({ left: sl, top: 0, behavior: "smooth" });
			break;
		
			
		default:
			break;
	}
}


function touchUiDataSetHandler(e){ 

	console.log("eType22 - ", e)
	e.preventDefault();

}
