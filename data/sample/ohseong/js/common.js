$(document).ready(function () {
	($wrap = $("#wrap")), ($header = $(".header")), ($depth1 = $(".topmenu .depth1")), ($schLayer = $(".sch_layer")), ($goTop = $(".go_top")), ($footer = $(".footer"));

	//header fixed
	fix(".header");
	$("#skipNav a").on("click", function () {
		$("html,body").stop().animate(
			{
				scrollTop: 0,
			},
			800,
		);
	});

	//gnb
	gnb();
	//오픈왁스때문에 추가
	$(".topmenu .depth1>a").on("click", function (e) {
		e.preventDefault();
	});

	//search
	$(".btn_sch_open").on("click", function () {
		$schLayer.add($header).addClass(AC);
	});
	$(".btn_sch_close").on("click", function () {
		$schLayer.add($header).removeClass(AC);
	});

	//sns
	$(".sns_btn").on("click", function () {
		active(this, "toggle", 1);
	});
	// 탭메뉴
	$(".tabs .tab_nav").on("click", function () {
		tabs(this, ".tab_cont");
	});

	//아코디언
	$(".accordion>li>a").on("click", function () {
		active(this, "accordion");
	});

	//모달 팝업
	$(".modal_close").on("click", function () {
		$("body").css("overflow", "auto");
		$(".modal_popup_wrap").fadeOut();
	});

	// footer
	$(".relate_site .title").on("click", function () {
		active(this, "toggle", 1);
	});

	//서브 왼쪽메뉴
	$("#snb .is-depth3>a").on("click", function (e) {
		active(this, "toggle");
		e.preventDefault();
	});

	// 탭갯수를 구해 클래스 부여(반응형)
	var tabLi = $(".content .depth4 li");
	tabLi.each(function () {
		$(this)
			.parent()
			.addClass("num" + tabLi.length + "");
	});
	var tabDepthLi = $(".content .depth5 li");
	tabDepthLi.each(function () {
		$(this)
			.parent()
			.addClass("num" + tabDepthLi.length + "");
	});

	// web accessibility
	$("[class*='xi-']").attr("aria-hidden", "true");
	$("a[target='_blank']").attr("title", "새창으로 열림");

	/* 입력폼 label floating
	 ie11에서 placeholder-shown이 적용이 안되므로 스크립트로 해결*/
	//input에 값이 있을때 placeholder삭제
	$(".form-floating input").on("focusout keyup", function () {
		if (!$(this).val()) {
			$(this).next("label").show();
		} else {
			$(this).next("label").hide();
		}
	});

	//팝업레이어
	var $popLayer = $(".popup_wrap");
	$(".popup_open").on("click", function () {
		$popLayer.fadeIn();
	});
	$popLayer
		.find(".popup_close")
		.add(".close")
		.on("click", function () {
			$popLayer.fadeOut();
		});

	// 푸터 배너 슬릭이벤트 추가_221103
	$(".foot_banner .container").slick({
		infinite: true,
		arrows: false,
		dots: false,
		autoplay: false,
		slidesToShow: 5,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					dots: true,
					slidesToShow: 3,
					autoplay: true,
					autoplaySpeed: 3000,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 768,
				settings: {
					dots: true,
					slidesToShow: 2,
					autoplay: true,
					autoplaySpeed: 3000,
					slidesToScroll: 1,
				},
			},
		],
	});

	/********** Summernote Editor **********/
	$("#editor").summernote({
		height: 400,
		lang: "ko-KR",
		placeholder: "내용을 입력하세요",
		toolbar: [
			["font", ["style", "fontsize", "color", "bold", "italic", "underline", "clear"]],
			["para", ["ul", "ol", "paragraph", "height", "table"]],
			["insert", ["link", "picture", "video", "hr", "emoji", "math"]],
			["view", ["fullscreen", "codeview"]],
		],
	});
});

/* 팝업 - 하루동안 열지 않기 */
//get 쿠키
function getCookie(name) {
	var nameOfCookie = name + "=";
	var x = 0;
	while (x <= document.cookie.length) {
		var y = x + nameOfCookie.length;
		if (document.cookie.substring(x, y) == nameOfCookie) {
			if ((endOfCookie = document.cookie.indexOf(";", y)) == -1) endOfCookie = document.cookie.length;
			return unescape(document.cookie.substring(y, endOfCookie));
		}
		x = document.cookie.indexOf(" ", x) + 1;
		if (x == 0) break;
	}
	return "";
}

// 레이어 팝업 열기
function openLayer(arg) {
	var pop = document.getElementById(arg);
	pop.style.display = "block";
}
// 레이어 팝업 닫기
function closeLayer(arg) {
	var pop = document.getElementById(arg);
	pop.style.display = "none";
}
// set 쿠키
function setCookie(name, value, expiredays) {
	var todayDate = new Date();
	todayDate.setDate(todayDate.getDate() + expiredays);
	document.cookie = name + "=" + escape(value) + "; path=/" + "; expires=" + todayDate.toGMTString() + ";";
}
function check_close(id, arg) {
	if (document.getElementById(id).checked) {
		setCookie(arg, "done", 1);
	} else {
		setCookie(arg, "f", 1);
	}
}
