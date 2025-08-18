/**
 * Dialog Box 생성
 * 
 * 생성:
 * 		var dialog = UiDialog(id, title, option);
 * 			id: 	dialog id값
 * 			title: 	dialog title
 * 			option:	dialog option
 * 				width: 		너비(숫자)
 * 				height: 	높이(숫자)
 * 				resizable: 	사이즈 변경 가능 여부(true/false, 기본값:false)
 * 				modal: 		modal dialog 여부(true/false, 기본값:false)
 * 				draggable:	dragle 가능 여부(true/false, 기본값:false)
 * 				autoresize:	dialog 자동 크기 변경 (true/false, 기본값:false, iframe 삽입할 경우만 적용)
 * 		예) var dialog = UiDialog("dialogId", "제목", "width=400,height=400,resizable=true,draggable=true,modal=true,autoresize=true");
 * 
 * dialog 에 내용 넣기:
 *  	dialog.html("내용....");
 *  
 * dialog.open()	: 열기
 * dialog.close()	: 닫기
 * dialog.clear()	: dialog 내용 지우기
 * dialog.option()	: dialog option 변경
 * dialog.addUrl(URL) : dialog URL 넣기
 */

var UI_DIALOG_LIST = new Object();

/**
 * Dialog Box
 */
function UiDialog(id, title, option, extClass) {
	id = "DIALOG_"+id;
	
	var dialog = UI_DIALOG_LIST[id];
	if (dialog != undefined) {
		$("#"+id).remove();
	}
	
	var width		= getAttributeValue(option, "width");
	var height		= getAttributeValue(option, "height");
	var resizable	= getAttributeValue(option, "resizable");
	var modal		= getAttributeValue(option, "modal");
	var draggable	= getAttributeValue(option, "draggable");
	var autoResize	= getAttributeValue(option, "autoresize");
	var fullscreen	= getAttributeValue(option, "fullscreen") == "true" ? true : false;
	var fixFull	    = getAttributeValue(option, "fixfull") == "true" ? true : false;
	
	if (resizable == "true") resizable = true;
	else resizable = false;
	
	if (modal == "true") modal = true;
	else modal = false;
	
	if (draggable == "true") draggable = true;
	else draggable = false;
	
	if (autoResize == "true") autoResize = true;
	else autoResize = false;
	
	if (fixFull) {
		resizable = false;
		draggable = false;
		modal = true;
	}
	
	if (width > $(window).width()) {
		width = $(window).width() - 50;
	}
	
	var dialogBox = document.createElement("div");
	dialogBox.id = id;
	dialogBox.title = title;
	dialogBox.style.display = "none";
	document.body.appendChild(dialogBox);
	
	width = parseInt(width) + getAddUiSize();
	height = parseInt(height) + getAddUiSize();
	
	var dialogOpt = {
			autoOpen: false,
			width: width,
			height: height,
			resizable: resizable,
			modal: modal,
			draggable: draggable,
			close: function() {
				//$(this).html("");
				$("#"+id).remove();
			},
			open: function() {
				if (fullscreen) {
					dialog.setFullscreen();
				}
			}
		};
	
	if (extClass != null && extClass != "") {
		dialogOpt["classes"] = {"ui-dialog": extClass};
	}
	
	if (fullscreen) {
		dialogBox.parScrollTop = $(window).scrollTop();
		$(window).scrollTop(0);
	}
	
	// dialog 초기화
	dialog = $( "#"+id ).dialog(dialogOpt);
	
	// fullscren 적용
	dialog.setFullscreen = function() {
    	//$('html, body').css({'overflow': 'hidden', 'height': '100%'});
		$('body').addClass("overflow-hidden");
        $('html, body').on('scroll touchmove mousewheel', function(event) {
            	event.preventDefault();
            	event.stopPropagation();
            	return false;
        });
        
        if (!fixFull && fullscreen) {
        	var fullBtn = $("<button type='button' class='ui-button full-btn ui-corner-all ui-widget ui-button-icon-only' title='Full screen'><span class='ui-button-icon ui-icon ui-icon-newwin'></span><span class='ui-button-icon-space'> </span>Full screen</button>");
        	dialog.parent().find(".ui-dialog-titlebar button").before(fullBtn);
            dialog.isFull = false;
            
            fullBtn.click(function(){
            	if (!dialog.isFull) {
            		dialog.dialogW = $(dialog).width();
            		dialog.dialogH = $(dialog).height();
            		
    	            $(dialog).parent().css({
    	                'width': $(window).width(),
    	                'height': $(window).height(),
    	                'top': '0px',
    	                'left': '0px'
    	            });
    	            var titH = $(dialog).parent().find(".ui-dialog-titlebar").height();
           			$(dialog).height($(window).height()-titH-30);
           			dialog.isFull = true;
            	}
            	else {
            		var winW = $(window).width();
           			var winH = $(window).height();
           			if (dialog.dialogW > winW) dialog.dialogW = winW - 40;
           			if (dialog.dialogH > winH) dialog.dialogH = winH - 40;
            		
            		$(dialog).parent().css({
    	                'width': dialog.dialogW,
    	                'height': dialog.dialogH,
    	                'top': (winH - dialog.dialogH) / 2,
    	                'left': (winW - dialog.dialogW) / 2
    	            });
            		
            		var titH = $(dialog).parent().find(".ui-dialog-titlebar").height();
           			$(dialog).height(dialog.dialogH-titH-30);
           			dialog.isFull = false;
            	}
            });
        }
        
        dialog.dialog({
        	resizeStop: function( event, ui ) {
        		var titH = $(dialog).parent().find(".ui-dialog-titlebar").height();
       			$(dialog).height(ui.size.height-titH-30);
        	},
        	close: function( event, ui ) {
      			$('html, body').off('scroll touchmove mousewheel');
      			//$('html, body').css({'overflow': 'auto', 'height': 'auto'});
      			$('body').removeClass("overflow-hidden");
      			$(window).scrollTop(dialogBox.parScrollTop);
      		 }
        });
	}
	
	dialog.onFullscreen = function(orient) {
		dialog.dialogW = $(dialog).width();
		dialog.dialogH = $(dialog).height();

		var w = $(window).width();
		var h = $(window).height();
		
		if (orient == 0) {
			h += 80;
		}
		else if (orient == 1) {
			h += 50;
		} 
		
        $(dialog).parent().css({
            'width': w,
            'height': h,
            'top': '0px',
            'left': '0px'
        });
        var titH = $(dialog).parent().find(".ui-dialog-titlebar").height();
		$(dialog).height(h-titH-30);
		dialog.isFull = true;
	}
	
	dialog.dialogId = id;
	dialog.open		= UiDialogOpen;
	dialog.openPos	= UiDialogOpenPosition;
	dialog.close	= UiDialogClose;
	dialog.clear	= UiDialogClear;
	dialog.option	= UiDialogOption;
	dialog.addUrl	= UiDialogAddUrl;
	dialog.autoResize = autoResize;
	
	if (fullscreen) {
		let lessonWinResizeTimer = null;
		$(window).on('resize', function(){
			clearTimeout(lessonWinResizeTimer);
			lessonWinResizeTimer = setTimeout(function(){
				dialog.onFullscreen();
			}, 500);
		});
	}
	
	UI_DIALOG_LIST[id] = dialog;
	
	return dialog;
}

/**
 * Dialog 열기
 */
function UiDialogOpen() {
	this.dialog("open");
	
	if (this.autoResize) {
		var thisDialog = this;
		var frm = $(this).children("iframe");
		if (frm.length > 0) {
			frm.on("load", function() {
				var frmHeight = $(this).contents().find("body").height();
				thisDialog.dialog("option", "height", (frmHeight+45));
			});
		}
	}
	
	$("#"+this.dialogId).parent().css("z-index", 2000);
}

/**
 * Dialog 열기(위치지정)
 */
function UiDialogOpenPosition(myVal, atVal, ofVal) {
	this.dialog("option", "position", { my:myVal, at:atVal, of:ofVal });
	this.dialog("open");
}

/**
 * Dialog 닫기
 */
function UiDialogClose() {
	this.dialog("close");
}

/**
 * Dialog 내용 지우기
 */
function UiDialogClear() {
	this.html("");
}

/**
 * Dialog에 url 넣기
 */
function UiDialogAddUrl(url) {
	var boxframe = "<iframe width='100%' height='100%' frameborder='0' scrolling='auto' src=\""+url+"\"></iframe>";
	this.html(boxframe);
}

/**
 * Dialog option 변경
 * @param option
 */
function UiDialogOption(option) {
	var width		= getAttributeValue(option, "width");
	var height		= getAttributeValue(option, "height");
	var resizable	= getAttributeValue(option, "resizable");
	var modal		= getAttributeValue(option, "modal");
	var draggable	= getAttributeValue(option, "draggable");
	var title		= getAttributeValue(option, "title");
	
	if (width != "") {
		this.dialog("option", "width", width);
	}
	
	if (height != "") {
		this.dialog("option", "height", height);
	}
	
	if (resizable != "") {
		if (resizable == "true") resizable = true;
		else resizable = false;
		this.dialog("option", "resizable", resizable);
	}
	
	if (modal != "") {
		if (modal == "true") modal = true;
		else modal = false;
		this.dialog("option", "modal", modal);
	}
	
	if (draggable != "") {
		if (draggable == "true") draggable = true;
		else draggable = false;
		this.dialog("option", "draggable", draggable);
	}
	
	if (title != "") {
		this.dialog("option", "title", title);
	}
}


/**
 * Attribute의 Value 추출 (name=value 에서 value 추출
 */
function getAttributeValue(attr, name) {
	attr = nullToEmpty(attr).toLowerCase();
	var value = "";
	if (attr.length > 1) {
		var idx1 = attr.indexOf(name);
		if (idx1 != -1) {
			var idx2 = attr.indexOf("=",idx1);
			if (idx2 != -1) {
				var idx3 = attr.indexOf(",",idx2);
				var oValue = "";
				if (idx3 == -1) {
					oValue = attr.substring(idx2+1);
				}
				else {
					oValue = attr.substring(idx2+1,idx3);
				}
				for (var i = 0; i < oValue.length; i++) {
					if (oValue.charCodeAt(i) != 32) {
						value += oValue.charAt(i);
					}
				}

			}
		}
		
	}
	return value;
}

/**
 * null 값을 ""으로 변환
 */
function nullToEmpty(value) {
	if (value == null) {
		value = "";
	}
	return value;
}

/**
 * 포트 사이즈에 따라 추가할 Size
 * @returns addSize
 */
function getAddUiSize() {
	addSize = 0;
	
	try {
		var fontSize = parseInt($("body").css("font-size").replace("px",""));
		addSize = (fontSize - 12) * 24;
	} catch(e) { }
	
	return addSize;
}