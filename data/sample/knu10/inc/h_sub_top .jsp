<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!-- Header 영역 부분 -->

<header class="sub">
	<div class="login_bar">
		<div class="inner">
			<a href="#">LMS바로가기</a>
			<a href="#">로그아웃</a>
		</div>
	</div>
	<div class="inner-box">
		<div class="gnb_wrap">
			<h1>
				<a href="#0"><img src="../data/img/logo_w_light.png" alt="거점국립대학교 로고" /></a>
			</h1>
			<div class="hr_cont">
				<div class="mo-menu ml15"><i class="ion-navicon"></i></div>
			</div>
			<!-- pc 메뉴 -->
			<div id="gnb">
				<h2 class="blind">전체 메뉴</h2>
				<ul class="gnbList main_menu">
					<li>
						<h3><a href="#0">사업소개</a></h3>
						<div class="twoDep">
							<ul>
								<li><a href="#0">인사말</a></li>
								<li><a href="#0">학점교류 소개</a></li>
								<li><a href="#0">참여대학 안내</a></li>
							</ul>
						</div>
					</li>
					<li>
						<h3><a href="#0">학점교류 안내</a></h3>
						<div class="twoDep">
							<ul>
								<li><a href="#0">학점교류 일정</a></li>
								<li><a href="#0">학점교류 교과목</a></li>
								<li><a href="#0">수강방법</a></li>
								<li><a href="#0">학점교류 규정</a></li>
							</ul>
						</div>
					</li>
					<li>
						<h3><a href="#0">커뮤니티</a></h3>
						<div class="twoDep">
							<ul>
								<li><a href="#0">공지사항</a></li>
								<li><a href="#0">자료실</a></li>
							</ul>
						</div>
					</li>
					<li>
						<h3><a href="#0">고객센터</a></h3>
						<div class="twoDep">
							<ul>
								<li><a href="#0">자주하는 질문</a></li>
								<li><a href="#0">제안 및 불편 사항 접수</a></li>
								<li><a href="#0">Q&A</a></li>
								<li><a href="#0">원격지원</a></li>
								<li><a href="#0">학습환경 안내</a></li>
							</ul>
						</div>
					</li>
				</ul>
			</div>
			<script>
				/********** NAV 메뉴 **********/
				// getLocationInfo();
				jQuery(".gnbList")
					.children("li")
					.each(function (q) {
						jQuery(this).hover(
							function () {
								jQuery("#gnb").stop().animate(
									{
										height: 300,
									},
									200,
								);
							},
							function () {
								jQuery("#gnb").stop().animate(
									{
										height: 80,
									},
									200,
								);
							},
						);
						jQuery(this).focusin(function () {
							jQuery("#gnb").stop().animate(
								{
									height: 300,
								},
								200,
							);
						});
						jQuery(this).focusout(function () {
							jQuery("#gnb").stop().animate(
								{
									height: 80,
								},
								200,
							);
						});

						$("#gnb li").on("mouseover focusin", function (e) {
							e.preventDefault();
							// $("header").removeClass("on");
							$("header").addClass("on");
							$("#gnb li").removeClass("active");
							$(this).addClass("active");
						});

						$("header").on("mouseleave focusout", function (e) {
							e.preventDefault();
							$("header").removeClass("on");
							$(this).children("#gnb li").removeClass("active");
						});
					});
			</script>
		</div>
	</div>
</header>
<script>
	$("button.header_myarea").click(function (e) {
		e.preventDefault();
		$("header .util").toggleClass("on");
	});
	$("button.log_btn").click(function (e) {
		e.preventDefault();
		$("header.log_in .util").toggleClass("on");
	});
</script>
<!-- //Header 영역 부분 -->
