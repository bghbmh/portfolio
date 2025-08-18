

function ttt22(){

	console.log("ttt22 " );
	if( document.querySelector("#gnb") ){
		if( window.innerWidth >= 1280)
			document.querySelector("#gnb").classList.add("expanded")
		else document.querySelector("#gnb").classList.remove("expanded")
	
		document.querySelectorAll(".ctrl-gnb").forEach( btn => 
			btn.addEventListener("click", e => { 
				document.querySelector("#gnb").classList.toggle("expanded");
				e.stopPropagation();
			})
		);
	
		document.querySelector(".userInfo > .btn").addEventListener("click", e => {
			let b = e.currentTarget;
			b.classList.toggle("expanded");
			b.nextElementSibling.querySelector(".btn-close").addEventListener("click", e => b.classList.toggle("expanded") , { once : true });
		});
	
		document.querySelector("#gnb").addEventListener("click", e => {
			if( !e.currentTarget.classList.contains("expanded") ){
				e.preventDefault();
				e.stopPropagation();
				e.currentTarget.classList.add("expanded")
			}
		});

		window.addEventListener('resize', resize());
		function resize(){
			let timer;
			return function(e) {
				clearTimeout(timer);
				timer = setTimeout( () => { 
					if( window.innerWidth >= 1280) document.querySelector("#gnb").classList.add("expanded");
					else document.querySelector("#gnb").classList.remove("expanded");
				} , 200);
			}
		}
	}
	

	if( document.querySelector('[data-ui-action="collapse"]') ){
		document.querySelectorAll('[data-ui-action="collapse"]').forEach( btn => btn.addEventListener("click", e => btn.classList.toggle("expanded")))
	}


	if( document.querySelector('.alert-message .btn-collapse') ){
		document.querySelectorAll('.alert-message .btn-collapse').forEach( btn => btn.addEventListener("click", e => btn.classList.toggle("expanded")))
	}

	if( document.querySelector('[data-ui-action="popover"]') ){

		document.querySelectorAll('[data-ui-action="popover"]').forEach( btn => btn.addEventListener("click", e => { 
			document.querySelector(btn.dataset.uiTarget).classList.toggle("expanded"); 

			console.log('oo - ', document.querySelector(btn.dataset.uiTarget).querySelector(".btn-close"))
			document.querySelector(btn.dataset.uiTarget).querySelector(".btn-close").addEventListener("click", () => document.querySelector(btn.dataset.uiTarget).classList.toggle("expanded") , { once : true });
		}))
	}

	if( document.querySelector('.custom-select') ){

		document.querySelectorAll('.custom-select [role="label"]').forEach( btn => btn.addEventListener("click", e => { 
			e.currentTarget.parentNode.classList.toggle("expanded"); 

		}))

		document.querySelectorAll('.custom-select [role="option"] input').forEach( btn => btn.addEventListener("click", e => {
			e.stopPropagation();
			e.currentTarget.parentNode.parentNode.parentNode.classList.toggle("expanded");
		}))			
			
	}




	$.datepicker.setDefaults({
		dateFormat: 'yy-mm-dd',
		prevText: '이전 달',
		nextText: '다음 달',
		monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
		monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
		dayNames: ['일', '월', '화', '수', '목', '금', '토'],
		dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
		dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
		showMonthAfterYear: true,
		yearSuffix: '년'
	});
	
	$('#datepicker1').datepicker();
	$('#datepicker2').datepicker();



	let ss = document.createElement("script");
	ss.src ="../assets/summernote/lang/summernote-ko-KR.js";
	ss.type= "text/javascript";
	document.body.appendChild(ss);

	setTimeout(function(){
		$('#summernote').summernote({
			lang: 'ko-KR',
			placeholder: '입력하세요', 
			height: 300,
			fontNames: ['맑은 고딕','궁서','굴림체','굴림','돋움체','바탕체','Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Verdana','Tahoma','Times New Roamn'],
			toolbar: [
				['fontname', ['fontname']],
				['fontsize', ['fontsize']],
				['style', ['bold', 'italic', 'underline','strikethrough', 'clear']],
				['color', ['forecolor','backcolor']],
				['table', ['table']],
				['para', ['ul', 'ol', 'paragraph']],
				['height', ['height']],
				['insert',['picture','link','video']],
				['view', ['codeview','fullscreen']]
			]
			
		});
	}, 400);
	


	if( document.querySelector('.tab-type1') ){
		document.querySelectorAll(".tab-type1").forEach( tab => {

			tab.addEventListener("click", e => {
				e.preventDefault();
				e.stopImmediatePropagation();

				let a = e.target.closest("a");
				if( !a ) return;

				let cc = null;
				if( a.hash.indexOf("#") > -1 ) cc = document.querySelector(a.hash);

				e.currentTarget.querySelectorAll("a").forEach( elem => {
					elem.classList.remove("current");

					if( elem.hash.indexOf("#") > -1 ){
						document.querySelector(elem.hash) ? document.querySelector(elem.hash).style.display = "none" : '';
					}					
				} );
				a.classList.add("current");
				cc ? cc.style.display = "block" : '';
			});
		});
	}

	if( document.querySelector('.tab-type2') ){
		document.querySelectorAll(".tab-type1").forEach( tab => {

			tab.addEventListener("click", e => {
				e.preventDefault();
				e.stopImmediatePropagation();

				let a = e.target.closest("a");
				if( !a ) return;

				let cc = null;
				if( a.hash.indexOf("#") > -1 ) cc = document.querySelector(a.hash);

				e.currentTarget.querySelectorAll("a").forEach( elem => {
					elem.classList.remove("current");

					if( elem.hash.indexOf("#") > -1 ){
						document.querySelector(elem.hash) ? document.querySelector(elem.hash).style.display = "none" : '';
					}					
				} );
				a.classList.add("current");
				cc ? cc.style.display = "block" : '';
			});
		});
	}














}



function includeHTML(cb){
	console.log("render includeHTML")
	var file, xhttp;
	for ( let elem of document.querySelectorAll("[include-html]") ) {

		file = elem.getAttribute("include-html");
		if (file) {
			xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4) {
					if (this.status == 200) {
						elem.outerHTML = this.responseText;
						if( file.indexOf("-head9") > -1 ){
							//console.log("script test - ", file )
							let temp = document.createElement("template");
							temp.setAttribute("id", "script");
							temp.innerHTML = this.responseText;
							document.body.appendChild(temp);
						}
					}
					if (this.status == 404) {elem.innerHTML = "Page not found.";}
					elem.removeAttribute("include-html");
					includeHTML(cb);
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

function ttt(){
	console.log("ttt test - " )
	if( !document.querySelector("template#script") ) return;

	let cn = document.querySelector("template#script").content.cloneNode(true);
	cn.querySelectorAll("script").forEach( (nn, i) => {
		//console.log("script ",i, nn, );
		let ss = document.createElement("script");
		nn.src ? ss.src= nn.src : ss.innerHTML = nn.innerHTML;
		ss.async = false;
		ss.type= "text/javascript";
		document.body.appendChild(ss);
	});

	document.body.innerHTML +=  `<!--//하단의 스크립트들은 목업용임_개발시 무시-->`;
	setTimeout(ttt22, 1000);
}


