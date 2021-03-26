'use strict';


/* main */

function controlClickMenu(e){

	//e.stopPropagation();

	let menuD2 = this.querySelectorAll(".depth2");

	switch ( e.type ){
		case "touchstart":
			e.preventDefault();
			console.log("1  ", e.type);
		case "mousedown":
		console.log("2  ",  e.type);
		case "mouseover":
		console.log("3  ",  e.type);
			if( e.target.tagName === "A" && e.target.parentNode.parentNode.id === "depth1")
			{
				let elem = e.target.parentNode;
				let idx = -1;

				while( elem != null )
				{
					elem = elem.previousElementSibling;
					idx++;
				}

				this.classList.add("on");
				menuD2[idx].classList.add("on");
			}

		break;
		case "touchend":
		e.preventDefault();
		console.log("4  ",  e.type);
		case "mouseup":
		console.log("5  ",  e.type);
		case "mouseout":
		console.log("6  ",  e.type);


				
			if( e.y >= this.offsetHeight )
			{
				for( let i=0; i<menuD2.length; i++ )
					menuD2[i].classList.remove("on");

				this.classList.remove("on");	
			}
			else if( e.y < menuD2[0].parentNode.offsetHeight )
			{
				console.log("out ", e.y, e.returnValue, window.event.returnValue );
					
				for( let i=0; i<menuD2.length; i++ )
					menuD2[i].classList.remove("on");

				let m = this.querySelectorAll(".depth1 > li");
				let depth1_right = depth1.getBoundingClientRect().left + ( m[0].getBoundingClientRect().width * m.length);

				if( e.y < 0 || e.x <= depth1.getBoundingClientRect().left || e.x >= depth1_right )
				{
					this.classList.remove("on");
				}
					
			}
			else
			{
				if( e.x <= 5 || e.x >= window.innerWidth-100 )
				{
					for( let i=0; i<menuD2.length; i++ )
						menuD2[i].classList.remove("on");

					this.classList.remove("on");	
				}
			}

		break;
	}
}

function controlTouchMenu(e){

	console.log("controlTouchMenu", e);

	e.preventDefault();

	let menuD2 = this.querySelectorAll(".depth2");

	switch ( e.type ){

		case "touchstart":

			console.log("touchstart");


		break;

		case "touchend":

		console.log("touchend");



		break;
	}
}

function checkXY(){

}


function loadMain(){

	

	initMenu();
	//nav.querySelector(".menuD2_depth2").addEventListener("mouseout", controlMenuD2);
}

function utility(){


}

function initMenu(){

	let nav = document.querySelector("nav");

	nav.addEventListener("mousedown", controlClickMenu);
	nav.addEventListener("mouseover", controlClickMenu);
	nav.addEventListener("mouseout", controlClickMenu);
	nav.addEventListener("touchstart", controlClickMenu);
	nav.addEventListener("touchend", controlClickMenu);

	if( window.innerWidth < 1024 )
	{
		console.log( "1024 ");
		nav.querySelector(".depth1 > li").classList.add("on");
		nav.querySelector(".depth1 > li").querySelector(".depth2").classList.add("on");

		// nav.addEventListener("touchstart", controlTouchMenu);
		// nav.addEventListener("touchend", controlTouchMenu);

	}
}



window.addEventListener('load', loadMain);
window.addEventListener('resize', loadMain);

// window.addEventListener("beforeunload", function (e) {
// event.returnValue = "\o/";
// 	//
// //   var confirmationMessage = "\o/";
// // alert("beforeunload" + confirmationMessage);
// //   (e || window.event).returnValue = confirmationMessage;     // Gecko + IE
// //   return confirmationMessage;                                /* Safari, Chrome, and other
// //                                                               * WebKit-derived browsers */
// });