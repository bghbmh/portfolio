
document.addEventListener('DOMContentLoaded', () => {

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
	
		// document.querySelector("#gnb").addEventListener("click", e => {
		// 	if( !e.currentTarget.classList.contains("expanded") ){
		// 		e.preventDefault();
		// 		e.stopPropagation();
		// 		e.currentTarget.classList.add("expanded")
		// 	}
		// });

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
		document.querySelectorAll(".tab-type2").forEach( tab => {

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

});

