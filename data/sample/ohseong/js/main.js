$(document).ready(function () {
	const $sect01Slider = $(".event_zone .slider");
	$sect01Slider
		.slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
			dots: false,
		})
		.on("beforeChange", function (event, slick, currentSlide, nextSlide) {
			$(".current").text(nextSlide + 1);
		});

	$(".control_pause").on("click", function () {
		$(this).removeClass(AC).siblings("button").addClass(AC);
		$(this).parent().siblings(".slider").slick("slickPause");
	});
	$(".control_play").on("click", function () {
		$(this).removeClass(AC).siblings("button").addClass(AC);
		$(this).parent().siblings(".slider").slick("slickPlay");
	});

	const $anmailStorySlider = $(".basic_edu .slider");
	$anmailStorySlider.slick({
		slidesToScroll: 1,
		slidesToShow: 3,
		autoplay: false,
		dots: false,
	});

	const $lawStorySlider = $(".law_story .slider");
	$lawStorySlider.slick({
		slidesToScroll: 1,
		slidesToShow: 1,
		autoplay: true,
		autoplaySpeed: 4000,
		arrows: false,
		dots: true,
		vertical: true,
	});

	//리스트 sort
	clickAC(".sort button");

	$(".section02 .select .title").on("click", function () {
		active(this, "active");
	});

	//scrollAC(".section")
	setTimeout(function () {
		$(".section").addClass(AC);
	}, 100);

	$(".slider_list").slick({
		infinite: true,
		arrows: true,
		dots: false,
		// autoplay: true,
		autoplaySpeed: 5000,
		slidesToShow: 5,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					fade: false,
					slidesToShow: 4,
				},
			},
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
					slidesToShow: 2,
				},
			},
			{
				breakpoint: 380,
				settings: {
					dots: true,
					slidesToShow: 1,
				},
			},
		],
	});

	/********** main popzone **********/
	$(".pop-latest").slick({
		infinite: true,
		arrows: true,
		dots: false,
		autoplay: true,
		autoplaySpeed: 4000,
		fade: false,
		slidesToShow: 1,
		responsive: [
			{
				breakpoint: 1217,
				settings: {
					fade: false,
					slidesToShow: 1,
				},
			},
			{
				breakpoint: 786,
				settings: {
					fade: false,
					slidesToShow: 1,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
				},
			},
		],
	});

	/********** popupBox **********/
	$(".popup-close")
		.unbind("click")
		.bind("click", function (e) {
			$(".popup-wrap, .popup-close").hide();
		});
	$(".popup-open").on("click", function () {
		$(".popup-wrap, .popup-close").css("display", "flex");
		$("#slides").get(0).slick.setPosition();
	});

	/********** main hot news **********/
	$(".news_slider_list").slick({
		infinite: true,
		arrows: true,
		dots: false,
		// autoplay: true,
		autoplaySpeed: 5000,
		slidesToShow: 4,
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
					slidesToShow: 2,
				},
			},
			{
				breakpoint: 380,
				settings: {
					dots: true,
					slidesToShow: 1,
				},
			},
		],
	});
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
