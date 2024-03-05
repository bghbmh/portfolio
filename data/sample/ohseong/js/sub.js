$(function () {
	//첨부파일 삭제버튼
	$attArea = $(".attach_area");
	attName = ".attach_name";
	$attArea.on("click", ".attach_close", function () {
		$(this).closest(attName).remove();
		if (!$(attName).is(attName)) {
			$(".attach_list").remove();
		}
	});

	/*  해시태그  */
	$hr = $(".hash_area");
	$hi = $(".hash_input");
	//해시태그 추가
	$(".hash_add").on("click", function () {
		$iT = $hi.val();

		// text 수 제한
		if ($iT.length > 10) {
			alert("10자 이상 택스트를 작성할 수 없습니다.\n다시 작성 해주세요.");
			$hi.val("");
			return false;
		}

		// '#' Text 막기
		if ($iT.indexOf("#") > -1) {
			alert("'#'은 사용할 수 없습니다.\n다시 작성 해주세요.");
			$hi.val("");
			return false;
		}

		if ($iT) {
			$hr.append("<button type='button' class='hash_tag'><span class='tagSpan'>#" + $iT + "</span><i class='xi-close-circle'></i><span class='sr-only'>파일삭제</span></button>");
			$hi.val("");
		}
	});
	$hi.on("keyup", function (key) {
		if (key.keyCode == 13) {
			$(".hash_add").trigger("click");
		}
	});

	//해시태그 삭제
	$hr.on("click", "button", function () {
		$(this).remove();
	});

	//리스트 sort
	clickAC(".sort button");

	//리스트 슬라이드
	$listUl = $(".list_slide .list_li");
	if ($listUl.length > 3) {
		bizSlider(".list_slide .list_ul");
	}

	//댓글
	$(".commentList .btn-recomment").on("click", function () {
		$(this).closest("li").toggleClass("active");
	});

	//FAQ
	$(".listFaq .question").on("click", function () {
		active(this, "accordion");
	});

	if ($(".admin_btn").text() != "") {
		$(".admin_btn").closest(".btns").addClass("justify-content-between");
	}
});

//갤러리 리스트 슬라이드 옵션
var bizSlickOption = {
	slidesToShow: 3,
	slidesToScroll: 1,
	autoplay: false,
	infinite: true,
	arrows: true,
	speed: 1000,
	responsive: [
		{
			breakpoint: 767,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
			},
		},
	],
};
function bizSlider(obj) {
	$(obj).slick(bizSlickOption);
}

/* 좋아요 */
function randomNum(m, n) {
	return Math.floor(Math.random() * (n - m + 1) * 100) / 100 + m;
}
function heartAnimation() {
	$this = $(".etc_info .heart_ani");
	var heartCount = ($this.width() / 50) * 5;
	for (var i = 0; i < heartCount; i++) {
		var heartSize = randomNum(50, 100) / 10;
		$this.append(
			'<i class="xi-heart" style="top: ' +
				randomNum(-30, 80) +
				"%; left: " +
				randomNum(0, 80) +
				"%; font-size: " +
				heartSize +
				"rem; animation-delay: " +
				randomNum(0, 1) +
				"s; animation-duration: " +
				heartSize / 10 +
				's"></i>',
		);
	}
}

/* 탭메뉴 */
function depth4(id) {
	$(id).show().siblings("div").hide();
}

/* sub slide */
$(".slider_system").slick({
	centerMode: true,
	centerPadding: "150px",
	infinite: true,
	arrows: true,
	dots: true,
	autoplay: false,
	autoplaySpeed: 4000,
	fade: false,
	slidesToShow: 1,
	responsive: [
		{
			breakpoint: 1217,
			settings: {
				fade: false,
				centerMode: true,
				centerPadding: "40px",
				slidesToShow: 1,
			},
		},
		{
			breakpoint: 786,
			settings: {
				fade: false,
				centerMode: true,
				centerPadding: "10px",
				slidesToShow: 1,
			},
		},
		{
			breakpoint: 480,
			settings: {
				arrows: false,
				centerMode: false,
				slidesToShow: 1,
			},
		},
	],
});

$(".slider_photo").slick({
	infinite: true,
	arrows: true,
	dots: false,
	autoplay: true,
	autoplaySpeed: 5000,
	slidesToShow: 3,
	slidesToScroll: 1,
	responsive: [
		{
			breakpoint: 950,
			settings: {
				dots: true,
				slidesToShow: 3,
			},
		},
		{
			breakpoint: 620,
			settings: {
				dots: true,
				arrows: false,
				slidesToShow: 2,
			},
		},
		{
			breakpoint: 480,
			settings: {
				dots: true,
				arrows: false,
				slidesToShow: 1,
			},
		},
	],
});

$(".facList").slick({
	infinite: true,
	arrows: false,
	dots: true,
	autoplay: true,
	autoplaySpeed: 5000,
	slidesToShow: 1,
	slidesToScroll: 1,
	responsive: [
		{
			breakpoint: 1024,
			settings: {
				dots: true,
				slidesToShow: 1,
			},
		},
		{
			breakpoint: 600,
			settings: {
				dots: true,
				slidesToShow: 1,
			},
		},
		{
			breakpoint: 480,
			settings: {
				dots: true,
				slidesToShow: 1,
			},
		},
	],
});

/******* TAB show / hide *******/
//$(".listTab li.select a").removeAttr("href");
$(".listTab li").click(function () {
	$(".listTab li").removeClass("select");
	$(this).addClass("select");
	$("div.tab_content").hide().eq($(this).index()).show();
	var selected_tab = $(this).find("a").attr("href");
	$(selected_tab).fadeIn();

	return false;
});

$("map_right ul li").click(function () {
	$(".map_right ul li").removeClass("on");
	$(this).addClass("on");
	$("div.tab_content").hide().eq($(this).index()).show();
	var selected_tab = $(this).find("a").attr("href");
	$(selected_tab).fadeIn();

	return false;
});

/********** 더보기 **********/
document.addEventListener("DOMContentLoaded", () => {
	document.addEventListener("click", clickHandlerDataSet);
});

var testgnb;
window.addEventListener("load", () => {
	testgnb = new GNB(document.querySelector("nav"));

	if (document.querySelector("button[data-ui='moreitems']")) {
		//더보기 설정
		let d = document.querySelector(".tabitems").children;
		for (let i = 0; i < d.length; i++) {
			if (i < 6) continue;
			if (d[i].classList.contains("choice")) {
				d[i].classList.add("off");
			}
		}
	}
});

class GNB {
	addEvent(eventtype, target, callback) {
		target.addEventListener(eventtype, (e) => {
			callback(e, target, this);
		});
	}
}

function clickHandlerDataSet(e) {
	if (!findElement(e.target)) return;

	let t = findElement(e.target);

	console.log("set ui handler");

	switch (t.dataset.ui) {
		case "tabmenu": //tab
			//전체인경우
			if (e.target.dataset.category == undefined) {
				for (let i = 0; i < items.length; i++) {
					if (!items[i].classList.contains("choice")) items[i].classList.add("choice");
					if (items[i].classList.contains("off")) items[i].classList.remove("off");
				}
				document.querySelector("button[data-ui='moreitems']").classList.remove("folding");
				document.querySelector("button[data-ui='moreitems']").classList.remove("off");

				// 더보기 설정
				for (let i = 0; i < items.length; i++) {
					if (i < 6) continue;
					if (items[i].classList.contains("choice")) {
						items[i].classList.add("off");
					}
				}
				return;
			}

			// 더보기 설정
			let cc = 0;
			let restitems = 0;
			for (let i = 0; i < items.length; i++) {
				if (items[i].classList.contains("choice")) {
					if (cc < 6) {
						cc++;
						continue;
					}
					items[i].classList.add("off");
					restitems++;
				}
			}
			if (restitems > 0) {
				console.log("more btn show", restitems);
				document.querySelector("button[data-ui='moreitems']").classList.remove("off");
			} else {
				console.log("more btn hide", restitems);
				document.querySelector("button[data-ui='moreitems']").classList.add("off");
			}

			break;
		case "moreitems": // 임시
			console.log("moreitems - ", document.querySelector("." + t.dataset.uiTarget).querySelectorAll(".choice"));
			let tg = document.querySelector("." + t.dataset.uiTarget);
			let choiced = tg.querySelectorAll(".choice");
			let z = 0;

			if (e.target.classList.contains("folding")) {
				for (let i = 6; i < choiced.length; i++) {
					choiced[i].classList.add("off");
				}
				e.target.classList.remove("folding");
				return;
			}
			for (let i = 0; i < choiced.length; i++) {
				if (z > 5) return;

				if (choiced[i].classList.contains("off")) {
					choiced[i].classList.remove("off");
					z++;
				}
			}
			if (tg.querySelectorAll(".choice.off").length === 0) {
				e.target.classList.add("folding");
				return;
			}

			break;
		default:
			break;
	}
}

function findElement(elem) {
	while (elem.dataset.ui === undefined) {
		elem = elem.parentNode;
		if (elem === document) {
			return null;
		}
	}
	return elem;
}
