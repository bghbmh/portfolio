

export function CreateElement(attributes = {}) { // { tag : "div", class: "sample", ...} 
	if (!attributes.hasOwnProperty("tag")) return alert("no Tag, require the Tag");

	let tag = document.createElement(attributes.tag);
	for (let prop in attributes) {
		if (prop == "tag") continue;
		if( prop == "textContent" || prop == "innerHTML" ){
			tag[prop] = attributes[prop];
			continue;
		}
		tag.setAttribute(prop, attributes[prop]);
	}
	return tag;
}