

document.querySelector(".edu_main").addEventListener("click", mouseClickEvent);

function mouseClickEvent(e){
	
	let a = findClickElement(e.target, ["BUTTON", "A"]);

	if( a === null ) return;

	switch(a.className){
		case "btn_close_window":
			break;
		case "btn_close_subpage":
			document.querySelector(".makeCnt_sub").classList.remove("on");
			break;
		case "makeCnt":
			e.preventDefault();
			document.querySelector(".makeCnt_sub").classList.add("on");
			break;
	}

	function findClickElement(elem, tagName){
		let t = { result: null, arr: []};
		let ori = elem;
		let isThere = true;	
		
		for( let i=0; i<tagName.length; i++ ){
			
			while( elem.nodeName !== tagName[i] )
			{
				elem = elem.parentNode;
				if( elem === document ){
					isThere = false;
					t.arr[i] = null;
					break;	
				} 
			}

			if( isThere ) t.arr[i] = elem;			

			elem = ori;
			isThere = true;	
		}	

		for( let i=0; i<t.arr.length; i++ )
			if( t.arr[i] !== null ) t.result = t.arr[i];

		return t.result;
	}

}