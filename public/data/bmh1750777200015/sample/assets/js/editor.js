
/**
 * HTML 에디터 생성 (Synap Editor)
 * @param id
 * @param theme
 * @param uploadPath
 * @returns
 */
function HtmlEditor(id, theme, uploadPath) {
	let eventListeners = {
	    initialized: function (e) {
	        var editor = e.editor;
	    },
	    initializedSync: function (e) {
	        var editor = e.editor;
	        
	        $("button[name=source].se-button").on('click', function(){
	        	$("#"+id).find(".se-code-viewer").css("max-width", $("#"+id).width()+"px");
	        });
	    }
	};

	let text = "";
	let tagName = $("#"+id).prop('tagName').toLowerCase();
	if (tagName === "div" || tagName === "span") {
		text = $("#"+id).html();
	}
	
	if (theme == "dark") { 
		synapEditorConfig["editor.ui.theme"] = "dark-gray";
	}

	if (uploadPath == null) {
		uploadPath = "";
	}
	
	// 이미지 업로드 설정
	synapEditorConfig["editor.upload.image.api"] = "/common/editorUpload.do?path="+uploadPath;
	
	// 에디터 설정
	let snapEditor = new SynapEditor(id, synapEditorConfig, text, eventListeners);
  	
	$(".se-classic-editor").css("z-index", 999);
	
  	return snapEditor;
}