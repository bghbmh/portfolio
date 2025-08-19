/**
 * https://fooplugins.github.io/FooTable/docs/jsdocs/FooTable.html#toc4
**/
var footableEventJson = {
	"resize.ft.table": function(e, ft){
		if(typeof fn_footable_interface === 'function') fn_footable_interface(e, ft);
    }
	,"collapse.ft.row": function(e, ft){
		if(typeof fn_footable_interface === 'function') fn_footable_interface(e, ft);
    }
	,"expand.ft.row": function(e, ft){
		if(typeof fn_footable_interface === 'function') fn_footable_interface(e, ft);
    }
	,"destroy.ft.rows": function(e, ft){
		if(typeof fn_footable_interface === 'function') fn_footable_interface(e, ft);
    }
	,"init.ft.rows": function(e, ft){
		if(typeof fn_footable_interface === 'function') fn_footable_interface(e, ft);
    }
	,"preinit.ft.rows": function(e, ft){
		if(typeof fn_footable_interface === 'function') fn_footable_interface(e, ft);
    }
	,"ready.ft.table": function(e, ft){
		if(typeof fn_footable_interface === 'function') fn_footable_interface(e, ft);
    }
	,"after.ft.breakpoints": function(e, ft){
		if(typeof fn_footable_interface === 'function') fn_footable_interface(e, ft);
    }
	,"init.ft.columns": function(e, ft){
		if(typeof fn_footable_interface === 'function') fn_footable_interface(e, ft);
    }
	,"after.ft.paging": function(e, ft){
		if(typeof fn_footable_interface === 'function') fn_footable_interface(e, ft);
    }
	,"before.ft.filtering": function(e, ft, filters){
		if(typeof fn_footable_interface === 'function') fn_footable_interface(e, ft);		
    }
	,"after.ft.filtering": function(e, ft, filters){
		if(typeof fn_footable_interface === 'function') fn_footable_interface(e, ft);		
	}
}