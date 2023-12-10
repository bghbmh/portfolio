function CreateElement( { ...attributes } = {} ){ // { tag : "div", ~  class: "sample"} 
	if ( !attributes.hasOwnProperty("tag") ) return;

	let tag = document.createElement(attributes.tag);
	for( let prop in attributes ){
		if( prop == "tag") continue;
		tag.setAttribute(prop, attributes[prop]);
	}
	return tag;
}

function AppendChild( parNode, childList ){

}
