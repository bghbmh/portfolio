

function ttt(){
	if( document.querySelector(".navbar-toggle") ){
		document.querySelector(".navbar-toggle").addEventListener("click", function() {
			document.querySelector(this.dataset.target).classList.toggle("cbp-spmenu-open");   
		});

		document.querySelector("#close").addEventListener("click", function() { 
			document.querySelector("#cbp-spmenu-s1").classList.remove("cbp-spmenu-open", "collapse", "in");
		});
	}
	
}


function includeHTML(func){
	console.log( 'load file' )
	var file, xhttp;
	for ( let elem of document.getElementsByTagName("*") ) {

		file = elem.getAttribute("include-html");
		if (file) {
			xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4) {
					if (this.status == 200) {
						
						if( file.indexOf("commonHead") > 0 ){
							console.log("elem - 엄한 데에 들어가고 있었음 임시 수정함_ head 안에서 일반 태그 사용하면 안된는거같음", elem.outerHTML);
							document.querySelector("head").innerHTML += this.responseText;
							elem.outerHTML = '';
						} else {							
							elem.outerHTML = this.responseText;
						}
						
					}
					if (this.status == 404) {elem.innerHTML = "Page not found.";}
					elem.removeAttribute("include-html");
					includeHTML(func);
				}
			}
			xhttp.open("GET", file, true);
			xhttp.send();
			return;
		}
	}
	if (func) func();
}


//window.addEventListener("DOMContentLoaded", () => {
includeHTML(ttt);

//});