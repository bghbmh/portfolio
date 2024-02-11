/**
 * 파일의 확장자를 판별해서 적절한 아이콘 이미지 URL을 반환한다.
 */
$M.findFileIcon = function(filename) {
	var ext     = filename.slice(filename.lastIndexOf(".")+1).toLowerCase();
	var iconUrl = lmsIconPath + "filetype/";
	var iconFile= "";

	var iconMap = {
		"alz"	: 	"alz.gif",
		"zip"	: 	"zip.gif",
		"rar"	: 	"rar.gif",
		"7z"	: 	"zip.gif",

		// 오피스
		"doc"	: 	"doc.gif",
		"docx"	: 	"doc.gif",
		"ppt"	: 	"ppt.gif",
		"pptx"	: 	"ppt.gif",
		"xls"	: 	"xls.gif",
		"xlsx"	: 	"xls.gif",

		// HTML
		"html"	: 	"html.gif",
		"htm"	: 	"html.gif",

		// 문서
		"hwp"	: 	"hwp.gif",
		"pdf"	: 	"pdf.gif",
		"xml"	: 	"xml.gif",
		"txt"	: 	"text.gif",

		// 오디오
		"mp3"	: 	"mp3.gif",
		"wma"	: 	"mp3.gif",
		"wav"	: 	"mp3.gif",

		// 비디오
		"avi"	: 	"movie.gif",
		"wmv"	: 	"movie.gif",
		"ra"	: 	"ra.gif",

		// 사진
		"gif"	: 	"gif.gif",
		"jpg"	: 	"jpg.gif",
		"bmp"	: 	"bmp.gif",
		"png"	: 	"image.gif",

		"_default":	"default.gif"
	};

	for(var i in iconMap) {
		if (i == ext) {
			iconFile = iconMap[i];
			break;
		}
	}

	if(iconFile == "")
		iconFile = iconMap['_default'];

	return iconUrl + iconFile;
};


/**
 * Jquery fileupload plug-in
 * 첨부파일을 표현하는 기본 클래스
 * this.data 의 기본 설정값을 잘 이용할 것.
 */
$M.JqueryFileUpload = function(option) {

	this.data = {
		"varName"			: "",
		"size"				: 0,
		"files" 			: new Array(),
		"fileEncSns"		: "",
		"uploaderId"		: "fileupload", // input type='file' 의 id
		"fileListId"		: "fileList",  // 업로드후 보여줄 파일 목록의 id
		"progressId"		: "progress", // 업로드시 보여지 progress-bar의 id
		"allowExt"			: "", // 허용확장자
		"maxcount"			: 10, // 파일 업로드 제한 겟수
		"maxsize"			: 256, // MB 단위로 파일 1개 제한 용량.
		"totalLimitSize"	: 256, // MB 단위로 전체 파일의 제한 용량.
		"previewImage"		: false, // 이미지 첨부인 경우 true , 썸네일이 보이는 목록반환
		"infoUse"	: false,		//사이즈 안내문구 사용여부
		"previewImageMaxWidth" : "",
		"onAppend"			: jQuery.proxy(this, "onAppend"),
		"userAppendCallback": "", // 파일 첨부완료 후 호출할 콜백함수명 지정
		"userRemoveCallback": "", // 파일 삭제 후 호출할 콜백함수명 지정
		"uploadSetting"	: {	// uploadify 기본 설정 default 값.
			'url'			: '/file/upload.do', //Context.JQUERY_FILE_UPLOAD,	// upload url
			'dataType'		: 'json',
			'dropZone'		: '',
			'formData'		: { 'repository': 'GENERAL',		// 파일 저장소 코드
                                'organization' : '',
								'type'		: 'file',
								'sendToFileBoxYn'         : 'N'
							  },			// 추가 파라매터
			'add'			: jQuery.proxy(this, "add"),
			'done'			: jQuery.proxy(this, "done"),
			'fail'			: jQuery.proxy(this, "fail"),
			"progressall"   : jQuery.proxy(this, "progressall"),
		}
	};
	// 설정값 병합
	this.data.uploadSetting = jQuery.extend(this.data.uploadSetting, option.uploadSetting);
	option.uploadSetting = this.data.uploadSetting;
	this.data = jQuery.extend(this.data, option);

	// 설정 점검용 코드
	if(this.data.varName == "") {
		alert('Failed Initialize file uploader !! ');
		return false;
	}

	// 첨부파일 번호목록으로 초기화
	if(this.data.fileEncSns != "") {
		this.appendBySn(this.data.fileEncSns);
	}

	if(this.count() > 0 ) {
		if(this.data.files[0].encFileSn == undefined)
			this.data.files = new Array();
		this.onAppend();
	}

	this.initFileuploder();
};

// $M.AttachFiles.prototype
$M.JqueryFileUpload.prototype = {
		initFileuploder	:	// file uploader 초기화
			function() {
				$('#'+this.data.progressId).hide();
				$('#'+this.data.uploaderId)
					.fileupload(this.data.uploadSetting).prop('disabled', !$.support.fileInput)
			        .parent().addClass($.support.fileInput ? undefined : 'disabled');
				$('#'+this.data.uploaderId).fileupload({ 'dropZone' : $('#'+this.data.dropZone)});
				$('#'+this.data.uploaderId).fileupload({ 'dropZone' : $('#'+this.data.uploadSetting.dropZone)});
			},
		add 	:
			function (e, data) {
				var file = data.files[0];
				if(this.count() >= this.data.maxcount) {
					alert(getCommonMessage('msg035', this.data.maxcount));
					return;
				}
				if(file.size >= (this.data.maxsize*1024*1024)) {
					alert(getCommonMessage('msg040', byteConvertor(this.data.maxsize*1024*1024), byteConvertor(file.size)));
					return;
				}
				if(this.getTotalSize() + file.size >= (this.data.totalLimitSize*1024*1024)) {
					alert(getCommonMessage('msg040', byteConvertor(this.data.totalLimitSize*1024*1024), byteConvertor(this.getTotalSize() + file.size)));
					return;
				}
				if(this.data.allowExt) {
					var ext = getFileExtention(file.name).toLowerCase();
					if($.inArray(ext, this.data.allowExt.toLowerCase().split("|")) == -1) {
						alert(getCommonMessage('msg045', ext));
						return;
					}
				} 

				//data.formData = this.data.uploadSetting.formData;  // 파일함에 내보내기 옵션
				$('#'+this.data.progressId).show();
				data.submit();
			},
		done	:	// 기본 onComplete 이벤트
			function(e, data) {
				//this.append(jQuery.parseJSON(data.result));	// 첨부파일 추가
				this.append(data.result);	// 첨부파일 추가
				$('#'+this.data.progressId).hide();
			},
		fail	:
			function(e, data) {
				alert("Error! Failed file upload.");
				/*
				alert(showAttribute(data._response.jqXHR));
				alert(data._response.jqXHR.status + " : " + data._response.jqXHR.statusText);
				alert(showAttribute(data._response));
				*/
			},
		progressall :
			function (e, data) {
				var progress = parseInt(data.loaded / data.total * 100, 10);
				$('#'+this.data.progressId+' .progress-bar').css(
					'width',
					progress + '%'
				);
			},
		reset	:	// 파일 목록 초기화 (파일 삭제 이벤트는 일어나지 않음)
			function() {
				this.data.size = 0;
				this.data.files = [];
			},
		append	:	// 첨부파일 추가.
			function(filedata) {
				// 파일정보가 유효하지 않으면 추가하지 않는다.
				if(filedata.encFileSn == undefined || filedata.encFileSn == "")
					return false;
				// 파일이 제한 갯수를 넘으면 업로드된 파일을 다시 삭제한다.
				if(this.count() >= this.data.maxcount) {
					alert(getCommonMessage('msg035', this.data.maxcount));
					$.post('/home' + Context.FILE_DELETE + filedata.encFileSn);
				} else {
					//try {
						this.data.size += filedata.filesize;
						this.data.files.push( filedata );
					//} catch (e) {}
				}
				this.data.onAppend();
			},
		appendBySn	:	// 첨부파일 정보로 추가
			function(encFileSn) {
				if(isNull(encFileSn) || encFileSn == "") return;
				$.getJSON(Context.FILE_JSONVIEW, { "fileEncSns" : encFileSn }, $.proxy(this, "appendList"));
				this.data.onAppend();
			},
		appendList :	// 파일 목록 병합
			function(fileList) {
				for(var i = 0; i < fileList.length; i++) {
					this.data.files = this.data.files.concat(fileList[i]);
				}
				this.data.onAppend();
			},
		appendPhoto :	// 사진파일 목록 병합
				function(fileList) {
					for(var i = 0; i < fileList.length; i++) {
						this.data.files = this.data.files.concat(fileList[i]);
					}
					this.listPoto();
				},
		getFileSnAll	:	// 첨부파일의 모든 고유번호 문자열 "!@!" 구분자로 구하기
			function() {
				var params = "";
				for (i = 0; i < this.count(); i++) {
					params += (params == "") ? this.data.files[i].encFileSn : "!@!" + this.data.files[i].encFileSn;
				}
				return params;
			},
		getFileName :
			function() {
				var params = "";
				for (i = 0; i < this.count(); i++) {
					params += (params == "") ? this.data.files[i].filename : "!@!" + this.data.files[i].filename;
				}
				return params;
			},
		getFileSize :
			function() {
				var params = "";
				for (i = 0; i < this.count(); i++) {
					params += (params == "") ? byteConvertor(this.data.files[i].filesize) : "!@!" + byteConvertor(this.data.files[i].filesize);
				}
				return params;
			},
		getTotalSize :
			function() {
				var totSize = 0;
				for (i = 0; i < this.count(); i++) {
					totSize += this.data.files[i].filesize;
				}
				return totSize;
			},
		count	:	// 파일목록의 갯수를 반환
			function() {
				if(this.data.files.length == undefined) return 0;
				return this.data.files.length;
			},
		remove :
			function(encFileSn) {
				if(!confirm(getCommonMessage('msg036'))) return false;
				$.getJSON(
					Context.FILE_DELETE,	// url
					{ encFileSn : encFileSn},
					jQuery.proxy(this, "removeCallBack")
				);
				return false;
			},
		removeAll:	// 첨부파일 전체 삭제.
			function() {
				$.getJSON(
					Context.FILE_DELETES,
					{files : this.getFileSnAll()},
					jQuery.proxy(this, "removeCallBack")
				);
			},
		removeCallBack	:	// 파일 삭제 콜백 (실패하면 메시지만 표시)
			function(response) {
				var file;
			
				if(response.result != 'success') {
					alert(response.result_message);
				} else if(response.result_message == 'ALL') {
					this.reset();
				} else {
					for (i = 0; i < this.count(); i++) {
						if(this.data.files[i].fileSn == response.result_message) {
						    file = this.data.files[i];
							this.data.files.splice(i, 1);	// 배열 삭제
							break;
						}
					}
				}
				this.data.onAppend();
				
				if(this.data.userRemoveCallback) {
					if(typeof window[this.data.userRemoveCallback] === "function") {
						window[this.data.userRemoveCallback].call(null, file);
					}
				}
			},
		onAppend	:	// 첨부파일 목록 표시용 html태그 반환
			function() {
				$('#'+this.data.fileListId).empty();

				for (i = 0; i < this.count(); i++) {
					if(this.data.infoUse)	$("#sizeInfo").hide();
					var file = this.data.files[i];
					var btnDelete = '<span class="btnRemoveFile" id="btnRemoveFile_'+file.encFileSn+'" onclick="'+this.data.varName+'.remove(\''+file.encFileSn+'\');" onkeydown="if($M.Check.Event.isEnter(event)){'+this.data.varName+'.remove(\''+file.encFileSn+'\');}" href="#_none">삭제</span>';
					var isflot = (this.data.previewImage) ? '' : 'float:left;';
					var imgWidth ="style='max-width:200px;'";
					$('<li id="" style="margin-top:5px;"><p><a href="javascript:fileDown(\'' + file.encFileSn + '\');" style="cursor:pointer;'+isflot +' "' +
							'title="Download: ' + file.filename + '" >' +
							file.filename + '<small>' + byteConvertor(file.filesize) + ' KB</small>' + '</a></p>'+ btnDelete+'</li>').appendTo('#'+this.data.fileListId);
					
					if(this.data.userAppendCallback) {
						if(typeof window[this.data.userAppendCallback] === "function") {
							window[this.data.userAppendCallback].call(null, file);
						}
					}
				}
			},
		addFromFileBox	:	// 파일박스에서 복사해 오기
				function(data) {
					if(this.count() >= this.data.maxcount) {
						alert(getCommonMessage('msg035', this.data.maxcount));
						return;
					}
					if(data.size >= (this.data.maxsize*1024*1024)) {
						alert(getCommonMessage('msg040', byteConvertor(this.data.maxsize*1024*1024), byteConvertor(file.size)));
						return;
					}
					if(this.getTotalSize() + data.size >= (this.data.totalLimitSize*1024*1024)) {
						alert(getCommonMessage('msg040', byteConvertor(this.data.totalLimitSize*1024*1024), byteConvertor(this.getTotalSize() + file.size)));
						return;
					}
					if(this.data.allowExt) {
						var ext = data.ext.toLowerCase();
						if($.inArray(ext, this.data.allowExt.toLowerCase().split("|")) == -1) {
							alert(getCommonMessage('msg045', ext));
							return;
						}
					}
					$('#'+this.data.progressId).show();
					$.post(cUrl("/home/copy/file"), {
						"encFileSn" : data.encFileSn,
						"repoCd" : this.data.uploadSetting.formData.repository
					}, jQuery.proxy(this, "append"));
			},
		setSendToFileBoxYn :
			function(val) {
				this.data.uploadSetting.formData.sendToFileBoxYn = val;
			},
};

$(document).bind('drop dragover', function (e) {
    e.preventDefault();
});

function uploderclick(str) {
	$("#"+str).click();
}
