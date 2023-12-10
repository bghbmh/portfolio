import { Layout } from "./layout.js";


 export let dataHandler = {

	parse (jsonObj) {

		Layout.storage( JSON.parse(jsonObj))
	}

}
