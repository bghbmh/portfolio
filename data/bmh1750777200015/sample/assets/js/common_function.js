/*******************************************************************************
	자바스크립le트 jQuery기반 공통 함수 (통일교육원 프로젝트중 생성)
*******************************************************************************/
/**
 * 파일다운로드를 새창 없이 iframe으로 수행시키는 공통함수(jQuery)
 * @param id filerepository의 id값
 */
function fileDown(id) {
	downloadUrl = lmsFileDownload;
	// download용 iframe이 없으면 만든다.
	if ( $("#_m_download_iframe").length == 0 ) {
		iframeHtml =
			'<iframe id="_m_download_iframe" name="_m_download_iframe" style="visibility: none; display: none;"></iframe>' +
			'<form name="_m_download_form" id="_m_download_form" target="_m_download_iframe" method="post"><input type="hidden" id="encFileSn" name="encFileSn" value="'+id+'"></form>';
		$("body").append(iframeHtml);
	}
	// 폼에 action을 설정하고 submit시킨다.
	$("#_m_download_form").attr('action', downloadUrl).submit();
}

/**
 * byte를 용량에 따라 b, kb, mb, gb, tb로 계산하여 리턴함 (JavaScript)
 * @param int bytes
 * @return String
 */
function byteConvertor(bytes) {
	bytes = parseInt(bytes);
	var s = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
	var e = Math.floor(Math.log(bytes)/Math.log(1024));
	if(e == "-Infinity") return "0 "+s[0];
	else return (bytes/Math.pow(1024, Math.floor(e))).toFixed(2)+" "+s[e];
}


/**
 * 플래쉬 소스 Embed 스크립트.
 */
$M.Flash = function (trans, width, height) {
	mainbody = "<object classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' codebase='https://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0' width='"+ width +"' height='"+ height +"'>";
	mainbody += "<param name='movie' value='"+ trans +"'>";
	mainbody += "<param name='quality' value='high'>";
	mainbody += "<param name='wmode' value='transparent'>";
	mainbody += "<param name='menu' value='false'>";
	mainbody += "<embed src='"+ trans +"' quality='high' pluginspage='https://www.macromedia.com/go/getflashplayer' type='application/x-shockwave-flash' width='"+ width +"' height='"+ height +"'></embed>"
	mainbody += "</object>";
	document.write(mainbody);
	return;
};

/**
 * $M.Check 네임스페이스 설정.
 */
$M.Check = {};

/**
 * 이벤트 체크
 */
$M.Check.Event = {
	isClick :
		function(event) {
			return (event.type == 'click');
		},
	isEnter :
		function(event) {
			return (event.type == 'keydown' && event.keyCode == 13);
		},
	isClickEnter :
		function(event) {
			return ( $M.Check.Event.isClick(event) || $M.Check.Event.isEnter(event) );
		}
};

/**
 * alert 상태 클래스.
 * setMsg로 오류메시지를 표시하고 return 에 check()를 사용한다.
 */
$M.Check.Alert = function() {
	this.message = "";
	this.hasError = false;
};

$M.Check.Alert.prototype = {
	setMsg	:	// 메시지를 설정하고 에러보유로 변경
		function(msg) {
			this.message += (this.hasError) ? "\n\n" + msg : msg;
			this.hasError = true;
		},
	alert	:	// 오류가 있으면 메시지를 표시.
		function() {
			if(this.hasError)
				alert(this.message);
			return !this.hasError;
		}
};

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
 * URL 엔코딩
 */
function getUrlEncode(url) {
	var result = "";
	if (nullToEmpty(url) != "") {
		result = encodeURIComponent(url);
	}
	return result;
}


/**
 * URL 디코딩
 */
function getUrlDecode(url) {
	var result = "";
	if (nullToEmpty(url) != "") {
		result = url.replace(/\*/g,'%');
		result = decodeURIComponent(result);
	}
	return result;
}


/**
 * 파일의 확장명 반환
 */
function getFileExtention(fileName) {
	var ext = "";

	if (nullToEmpty(fileName) != "") {
		var idx = fileName.lastIndexOf(".");
		if (idx > -1) {
			ext = (fileName.substring(idx+1)).toLowerCase();
		}
	}

	return ext;
}

/**
 * 서버경로에서 파일명만 추출하는 함수
 * @param fname
 * @return
 */
function getFileName(filePath) {
	if (filePath !="") {
		var arr = filePath.split("\\");
		var name = arr[arr.length-1];
		return	name;
	}
	else {
		return	"";
	}
}

/**
* 쿠키값 처리
*/
function getCookieVal(offset) {
	var endstr = document.cookie.indexOf (";", offset);
	if(endstr == -1) {
		endstr = document.cookie.length;
	}
	return unescape(document.cookie.substring(offset, endstr));
}

function getCookie (name) {
	var arg = name + "=";
	var alen = arg.length;
	var clen = document.cookie.length;
	var i = 0;
	while(i < clen) {
		var j = i + alen;
		if(document.cookie.substring(i, j) == arg) {
			return getCookieVal(j);
		}
		i = document.cookie.indexOf(" ", i) + 1;
		if(i == 0) {
			break;
		}
	}
	return null;
}

function setCookie(name, value, expiredays) {
	var todayDate = new Date();
	todayDate.setDate(todayDate.getDate() + expiredays);
	document.cookie = name + "=" + escape(value) + "; path=/; expires=" + todayDate.toGMTString() + ";"
}

/*
 * Url과 파라미터를 받아 URL을 완성해서 리턴한다.
 * 웹표준의 & 를 피하기 위한 방안.
 */
function generateUrl(url, param) {
	var returnUrl = "";
	returnUrl = cUrl(url);
	var i = 0;
	$.each(param, function(key, value) {
		if(value != undefined && value != "" ) {
			if(i == 0) returnUrl += "?"+key+"="+value;
			else returnUrl += "&"+key+"="+value;
			i++;
		}
	});
	return returnUrl;
}

function isNull(str) {

	if(str == "" || str == null || str == " " || str == undefined)
		return true;
	else
		return false;
}

function isNotNull(str) {
	return !isNull(str);
}

function isEmpty(str) {
	for (var i = 0; i < str.length; i++) {
		if (str.substring(i, i+1) != " ") {
			return false;
		}
	}
	return true;
}

function convertToBase64(str) {
	var output = "";
	if(str != "") {
		var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
		var text = str;
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;
		input = utf8_encode(text);
		while (i < input.length) {
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);
			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;
			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}
			output = output +
			keyStr.charAt(enc1) + keyStr.charAt(enc2) +
			keyStr.charAt(enc3) + keyStr.charAt(enc4);
		}
		return output;
	} else {
		return "";
	}
}

function utf8_encode(string) {
	string = string.replace(/\r\n/g,"\n");
	var utftext = "";
	for (var n = 0; n < string.length; n++) {
		var c = string.charCodeAt(n);
		if (c < 128) {
			utftext += String.fromCharCode(c);
		} else if((c > 127) && (c < 2048)) {
			utftext += String.fromCharCode((c >> 6) | 192);
			utftext += String.fromCharCode((c & 63) | 128);
		} else {
			utftext += String.fromCharCode((c >> 12) | 224);
			utftext += String.fromCharCode(((c >> 6) & 63) | 128);
			utftext += String.fromCharCode((c & 63) | 128);
		}
	}
	return utftext;
}

//기본 경로로 변경해서 반환하는 함수
function cUrl(url) {
	if (url.charAt(0) == "/") {
		return CONTEXT_ROOT + url;
	} else {
		return CONTEXT_ROOT + "/" + url;
	}
}

function showAttribute(obj) {
	try {
		var data = '';

		for (var attr in obj) {
			if (typeof(obj[attr]) == 'string' || typeof(obj[attr]) == 'number') {
				data = data + 'Attr Name : ' + attr + ', Value : ' + obj[attr] + ', Type : ' + typeof(obj[attr]) + '\n';
			} else if(typeof(obj[attr]) != 'function') {
				data = data + 'Attr Name : ' + attr + ', Type : ' + typeof(obj[attr]) + '\n';
			} else {
				data = data + 'Attr Name : ' + attr + ', Type : ' + typeof(obj[attr]) + '\n';
			}
		}
		return data;
	} catch (e) {
		alert(e.message);
	}
}

/**
 * 언어별 메시지값 가져오기
 */
function getCommonMessage(key, arg0, arg1, arg2, arg3) {

	var message = "";
	if (localeKey == "ko") {
		message = commonMessage_ko[key];
	}
	else if (localeKey == "en") {
		message = commonMessage_en[key];
	}
	else if (localeKey == "jp") {
		message = commonMessage_jp[key];
	}
	else if (localeKey == "cn") {
		message = commonMessage_cn[key];
	}
	else {
		message = commonMessage_ko[key];
	}

	if (arg0 != null && arg0 != "") {
		var idx = message.indexOf("{0}", 0);
		var msg1 = message.substring(0, idx);
		var msg2 = message.substring(idx+3);
		message = msg1 + arg0 + msg2;

		if (arg1 != null && arg1 != "") {
			idx = message.indexOf("{1}", 0);
			msg1 = message.substring(0, idx);
			msg2 = message.substring(idx+3);
			message = msg1 + arg1 + msg2;

			if (arg2 != null && arg2 != "") {
				idx = message.indexOf("{2}", 0);
				msg1 = message.substring(0, idx);
				msg2 = message.substring(idx+3);
				message = msg1 + arg2 + msg2;

				if (arg3 != null && arg3 != "") {
					idx = message.indexOf("{3}", 0);
					msg1 = message.substring(0, idx);
					msg2 = message.substring(idx+3);
					message = msg1 + arg3 + msg2;
				}
			}
		}
	}

	return message;
}

//메시지(한국어)
var commonMessage_ko = {
		msg001:"잘못된 주민등록번호입니다.",
		msg002:"이메일 주소 형식이 잘못 되었습니다.",
		msg003:"잘못된 IP주소 입니다.",
		msg004:"도메인 형식이 잘못 되었습니다.",
		msg005:"등록 ",
		msg006:"조회 ",
		msg007:"수정 ",
		msg008:"삭제 ",
		msg009:"권한이 없습니다.",
		msg010:"{0}을(를) 입력하십시오.",
		msg011:"{0}은(는) {1}자리를 입력해야 합니다.",
		msg012:"{0}은(는) {1}자리를 넘을 수 없습니다. 현재 글자수({2})",
		msg013:"{0} 길이가 {1}을{를} 넘습니다.",
		msg014:"{0} 형식이 올바르지 않습니다.",
		msg015:"{0} 값이 최소값({1}) 미만입니다.",
		msg016:"{0} 값이 최대값({1})을 초과합니다.",
		msg017:"{0} 값이 최대값({1})을 초과합니다.\n초과 길이 : {2}",
		msg018:"{0} 값이 최소값({1}) 미만입니다.\n부족 길이 : {2}",
		msg019:"비밀번호는 숫자만으로 구성할 수 없습니다.",
		msg020:"비밀번호는 문자만으로 구성할 수 없습니다.",
		msg021:"비밀번호가 아이디와 4자 이상 중복되거나, \n연속된 글자나 순차적인 숫자를 4개이상 사용해서는 안됩니다.",
		msg022:"비밀번호에 연속된 글이나 순차적인 숫자를 4개이상 사용해서는 안됩니다.",
		msg023:"비밀번호에 반복된 문자/숫자를 4개이상 사용해서는 안됩니다.",
		msg024:"숫자만 입력 가능합니다.",
		msg025:"한글만 입력 가능합니다.",
		msg026:"영문자만 입력 가능합니다.",
		msg027:"영문자, 숫자, '_', '-' 만 사용 가능합니다.",
		msg028:"입력할 수 있는 최대값은 {0}입니다.",
		msg029:"{0} 권한이 없습니다.",
		msg030:"현재 사이트의 팝업이 차단되어 있습니다. 차단을 해제해 주십시오.",
		msg031:"{0}이 {1}~{2} 입니다. \n일자는 {3}내로 설정해 주십시오.",
		msg032:"시작일이 종료일 보다 작아야 합니다.",
		msg033:"에디터 로딩중 설정에 필요한 값이 충분하지 않습니다.",
		msg034:"서버에서 파일을 처리하던 도중 오류가 발생했습니다. (오류정보 : {0} : {1})",
		msg035:"파일 첨부 제한갯수 {0}개 까지만 첨부가 가능합니다.",
		msg036:"파일을 삭제하면 복구할 수 없습니다.\n\n삭제 하시겠습니까?",
		msg037:"시간의(시) 의 설정값은 00이상 23 이하로 등록하여 주시기 바랍니다.",
		msg038:"시간의(분) 의 설정값은 00이상 59 이하로 등록하여 주시기 바랍니다.",
		msg039:"파일(폴더)명은 영문, 숫자, 언더바만 사용할 수 있습니다.",
		msg040:"첨부파일 용량 오류!\n\n제한 용량 : {0}\n현재 파일 : {1}",
		msg041:"입력 형식에 맞지 않습니다.",
		msg042:"SMS",
		msg043:"Email",
		msg044:"쪽지",
		msg045:"{0}는 허용하지 않는 확장자 입니다."
};

// 메시지(영어)
var commonMessage_en = {
		msg001:"Wrong resident registration number.",
		msg002:"Wrong email format",
		msg003:"Wrong IP address",
		msg004:"Wrong domain format",
		msg005:"Add",
		msg006:"Search",
		msg007:"Edit",
		msg008:"Delete",
		msg009:"No authority",
		msg010:"Enter {0}",
		msg011:"For {0}, {1} digit number should be entered.",
		msg012:"{0} cannot be greater than {1} characters. Current number of characters({2})",
		msg013:"{0} length exceeds {1}.",
		msg014:"{0} has wrong format.",
		msg015:"{0} value is less than minimum value ({1}).",
		msg016:"{0} value exceeds maximum value ({1}).",
		msg017:"{0} value exceeds maximum value ({1}).\nExceeding Length , {2}",
		msg018:"{0} value is less than minimum value({1}).\nLacking Length , {2}",
		msg019:"Password cannot be numbers only.",
		msg020:"Password cannot be characters only.",
		msg021:"Password cannot share 4 or more characters with ID, or\n4 or more characters or numbers in sequence.",
		msg022:"Password cannot have 4 or more characters or numbers in sequence",
		msg023:"Password cannot have 4 or more repeating characters/numbers.",
		msg024:"Enter numbers only.",
		msg025:"Enter Korean characters only.",
		msg026:"Enter Alphabets only.",
		msg027:"Only alphabets, numbers, '_' and '-' are allowed.",
		msg028:"Maximum value to enter is {0}.",
		msg029:"{0} Not Authorized.",
		msg030:"Pop-up is blocked on this site. Please allow pop-ups.",
		msg031:"{0} is {1}~{2}. \nDays should be set within {3}.",
		msg032:"Start date should be smaller than end date.",
		msg033:"Not enough necessary value while loading editor.",
		msg034:"There occurred an error while processing files on server. (error info: {0} : {1})",
		msg035:"Attachments limited number of {0} can only be attached.",
		msg036:"Deleted files cannot be restored.\n\n Do you want to delete?",
		msg037:"Hour can be set from 00 to 23",
		msg038:"Minute can be set from 00 to 59",
		msg039:"File (folder) names in English, numbers, and underscores are available.",
		msg040:"Capacity error of attachments! \ N \ n limit capacity: {0} \ n the current file: {1}",
		msg041:"It does not conform to the input format.",
		msg042:"SMS",
		msg043:"Email",
		msg044:"Message",
		msg045:"{0}is a disallowed file extension."
};

//입력된 값의
function parseInteger(str) {
	var ptn = "0123456789";
	var ret = "";
	for(var i=0; i < str.length; i++) {
		for(var j=0; j < ptn.length; j++) {
			if(str.charAt(i) == ptn.charAt(j)) {
				ret = ret + str.charAt(i);
			}
		}
	}
	return ret;
}

/**
 * 오직 숫자로만 이루어져 있는지 체크 한다.
 *
 * @param   num
 * @return  boolean
 */
function isNumber(num) {
    var reg = RegExp(/^(\d|-)?(\d|,)*\.?\d*$/);
    if (reg.test(num)) return  true;
    return  false;
}

/**
 *  정수인지 검사
 */
function isIntegerNumber(value){
    if( value === undefined || value == null || $.trim(value) == '' ) { 
        return false;
    }

    var reg = /^\d+$/;
    value += '';
    return reg.test(value.replace(/,/gi,""));
}

/**
 * 숫자이면 숫자, 숫자가 아니면 0
 */
function nvlNumber(val)
{
    if(val == "" || isNaN(val) || val == "undefined")
        return 0;

    return Number(val);
}

function isChkMaxNumber(obj, maxval,preval) {
	var val = obj.value;
	val = val.replace(",","");
	if(!isNumber(val)) {
		$("#note-box").prop("class", "warning");
        $("#note-box p").text(getCommonMessage("msg024"));
        $("#note-btn").trigger("click");
		obj.value = parseInteger(val);
		return;
	}
	if(parseInt(val,10) > maxval) {
		$("#note-box").prop("class", "warning");
        $("#note-box p").text(getCommonMessage("msg028" , maxval));
        $("#note-btn").trigger("click");
		obj.select();
		if(!isNumber(preval)){preval=0;}
		obj.value = preval;
		obj.focus();
		return;
	}
}

function isChkNumber(obj) {
	var val = obj.value;
	val = val.replace(",","");
	val = val.replace(".","");
	if(!isNumber(val)) {
		$("#note-box").prop("class", "warning");
        $("#note-box p").text(getCommonMessage("msg024"));
        $("#note-btn").trigger("click");
		obj.value = parseInteger(val);
		return;
	}
}

/**
 * 이메일 주소 체크 - 정밀하게
 */
function emailCheck(emailStr) {
	var checkTLD = 1;
	var knownDomsPat = /^(com|net|org|edu|int|mil|gov|arpa|biz|aero|name|coop|info|pro|museum)$/;
	var emailPat = /^(.+)@(.+)$/;
	var specialChars = "\\(\\)><@,;:\\\\\\\"\\.\\[\\]";
	var validChars = "\[^\\s" + specialChars + "\]";
	var quotedUser = "(\"[^\"]*\")";
	var ipDomainPat = /^\[(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\]$/;
	var atom = validChars + '+';
	var word = "(" + atom + "|" + quotedUser + ")";
	var userPat = new RegExp("^" + word + "(\\." + word + ")*$");
	var domainPat = new RegExp("^" + atom + "(\\." + atom +")*$");
	var matchArray = emailStr.match(emailPat);

	if (matchArray == null) {
		//alert(getCommonMessage("msg002"));
		return false;
	}
	var user = matchArray[1];
	var domain = matchArray[2];
	for (i=0; i<user.length; i++) {
		if (user.charCodeAt(i) > 127) {
			//alert(getCommonMessage("msg002"));
			return false;
		}
	}
	for (i=0; i<domain.length; i++) {
		if (domain.charCodeAt(i) > 127) {
			//alert(getCommonMessage("msg002"));
			return false;
		}
	}
	if (user.match(userPat) == null) {
		//alert(getCommonMessage("msg002"));
		return false;
	}
	var IPArray = domain.match(ipDomainPat);
	if (IPArray != null) {
		for (var i=1; i<=4; i++) {
			if (IPArray[i] > 255) {
				//alert(getCommonMessage("msg003"));
				return false;
			}
		}
		return true;
	}
	var atomPat = new RegExp("^" + atom + "$");
	var domArr = domain.split(".");
	var len = domArr.length;
	for (i=0; i<len; i++) {
		if (domArr[i].search(atomPat) == -1) {
			//alert(getCommonMessage("msg004"));
			return false;
		}
	}
	/*
	국가 도메인은 계속 추가되는 사항이기 때문에 제한할 수 없음. 따라서 아래 부분은 주석처리
	2008.12.18 이한찬K
	if (checkTLD && domArr[domArr.length-1].length!=2 &&
			domArr[domArr.length-1].search(knownDomsPat)==-1) {
		alert("도메인 국가지정이 잘못 기제 되었습니다." + domArr[domArr.length-1]);
		return false;
	}
	*/
	if (len < 2) {
		//alert(getCommonMessage("msg004"));
		return false;
	}
	return true;
}
