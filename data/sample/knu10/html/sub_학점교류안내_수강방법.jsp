<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html lang="ko">
	<!--common -->
	<%@ include file="../inc/h_common.jsp" %>
	<!--//common -->
	<link rel="stylesheet" type="text/css" href="../data/css/h_sub.css" />

	<body>
		<!-- mobile_lnb -->
		<%@ include file="../inc/h_mo_lnb.jsp" %>
		<!-- //mobile_lnb -->

		<div id="container">
			<div class="section">
				<div class="login_bar">
					<div class="inner"></div>
				</div>

				<!-- header -->
				<%@ include file="../inc/h_sub_top .jsp" %>
				<!-- //header -->

				<!-- sub 헤더 공통 -->
				<div class="subHeader">
					<div class="inner">
						<!--<header> -->
						<h2 class="subHeaderTtile">학점교류 안내</h2>
						<div class="breadcrumb">
							<a href="#0" class="item home" aria-label="메인"></a>
							<a href="#0" class="item">학점교류 안내</a>
							<a href="#0" class="item">수강방법</a>
						</div>
					</div>
				</div>
				<!-- //sub 헤더 공통 -->

				<!-- sub menu 공통 -->
				<nav class="subMenu">
					<div class="inner">
						<a href="#0" class="item">학점교류 일정</a>
						<a href="#0" class="item">학점교류 교과목</a>
						<a href="#0" class="item active">수강방법</a>
						<a href="#0" class="item">학점교류 규정</a>
					</div>
				</nav>
				<!-- //sub menu 공통 -->
			</div>
			<div class="section">
				<div class="inner tempbcColor">
					<!-- tempbcColor 게시판 외 안내 페이지에서만 사용하는 클래스 -->

					<!-- 서브페이지 제목 -->
					<h3 class="subContentTitle">수강방법</h3>
					<!-- //서브페이지 제목 -->

					<div class="com01 mb30">
						<img src="../data/img/img_how.png">
					</div>

					<!-- 본문_안내글 -->
					<p class="bulletDot">
						회원 가입 및 로그인
					</p>

					<p class="fclightBrown2 mt20 pl10">
						별도의 회원가입은 없습니다.<br>
						학점교류 교과목 수강신청자에 한해서 소속대학의 로그인 계정으로 학점교류 시스템에 로그인 합니다.
					</p>

					<hr class="solid mt30 mb30 fclightBrown2" aria-hidden="true">

					<p class="bulletDot">
						학점교류 교과목 수강신청
					</p>

					<p class="fclightBrown2 mt20 pl10">
						소속대학의 학사 일정 및 안내문 숙지한 후 소속대학의 수강신청 시스템에서 학점교류 교과목을 수강신청 합니다.
					</p>

					<hr class="solid mt30 mb30 fclightBrown2" aria-hidden="true">
					
					<!-- //본문_안내글 -->

					
				</div>
			</div>
		</div>
		<!-- footer  -->
		<%@ include file="../inc/h_bottom.jsp" %>
	</body>
</html>
