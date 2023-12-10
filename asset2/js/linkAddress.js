

export var url = new URL(window.location.href);


url.resetState = function (param, value, state) {
	this.searchParams.set("category", value );

	//const state = { page_id: 1, user_id: 5 };

	//history.pushState(state, "", url);
	history.pushState(state, "", this);
	//console.log("setState111  url - ", url, this);
}
