import * as cf from '../assets/js/commonFunction.js';
import { cardStyle } from './cardStyle.js';


export function recentProduct(mainOpenitems){

	let recentProduct = cf.CreateElement({tag:"section", class: "recent-product"});

	recentProduct.appendChild( cf.CreateElement({tag:"h3", class: "visually-hidden", textContent : "최근 작업"}) );

	let itemsWrap = cf.CreateElement({tag:"div", class: "contents-wrap items-wrap"});
	itemsWrap.innerHTML += mainOpenitems.map( (m, idx) => cardStyle.main(m, idx) ).join('');
	
	recentProduct.appendChild(itemsWrap);

	recentProduct.appendChild( cf.CreateElement({tag:"div", class: "bg text-animation", innerHTML : `<div class="textLoop type2"></div>`}) );

	return recentProduct;
}

