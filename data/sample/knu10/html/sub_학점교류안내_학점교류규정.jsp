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
							<a href="#0" class="item">학점교류 규정</a>
						</div>
					</div>
				</div>
				<!-- //sub 헤더 공통 -->

				<!-- sub menu 공통 -->
				<nav class="subMenu">
					<div class="inner">
						<a href="#0" class="item">학점교류 일정</a>
						<a href="#0" class="item">학점교류 교과목</a>
						<a href="#0" class="item">수강방법</a>
						<a href="#0" class="item active">학점교류 규정</a>
					</div>
				</nav>
				<!-- //sub menu 공통 -->
			</div>
			<div class="section">
				<div class="inner tempbcColor">
					<!-- tempbcColor 게시판 외 안내 페이지에서만 사용하는 클래스 -->

					<!-- 서브페이지 제목 -->
					<h3 class="subContentTitle">학점교류 규정</h3>
					<!-- //서브페이지 제목 -->

					<!-- 본문_안내글 -->

					<!-- 테이블 스타일 공통 -->
					<div class="table-wrap">
						<table>
							<colgroup>
								<col width="20%">
								<col width="">
							</colgroup>
							<thead>
								<tr>
									<th>구분</th>
									<th>내용</th>
								</tr>
							</thead>
							<tbody>
								<tr> 
									<td>학점교류 운영</td>
									<td class="tl">
										<p class="bulletDot fcDark3">학점교류는 고등교육법 시행령 제14조의 2 관련 「일반대학의 원격수업 운영에 관한 훈령」 (교육부 훈령 제367호, 2021.02.15.) 및 「대학등의 원격수업 운영에 관한 훈령」(교육부 훈령 제397호, 2022.01.17., 시행일 2022.3.25) 을 준수하여 운영</p>
										<p class="bulletDot fcDark3">매학기 개강 3개월 이전에 희망교과목 추천 및 2주일 이전에 폐강 과목 공지</p>
										<p>※ 전체 수강인원 50명 미만은 폐강 원칙</p><p class="bulletDot fcDark3">수강신청은 학생 소속 대학의 수강신청 시스템을 이용</p>
										<p class="bulletDot fcDark3">동일 대학에서 개설한 교과목 수강신청은 1과목으로 한정</p>
										<p class="bulletDot fcDark3">수강 후 취득한 학점은 참여대학별로 졸업 학점에 가산</p>
									</td>
								</tr>
							
								<tr> 
									<td>수업진행 및 성적 평가방법</td>
									<td class="tl">
										<p class="bulletDot fcDark3">학사운영은 정규학기(1학기, 2학기), 계절학기(하계, 동계)로 함</p>
										<p class="bulletDot fcDark3">각 주차별 강의는 개강일 00:00(자정)부터 매주 화요일 12:00(정오)를 원칙으로 함</p>
										<p class="bulletDot fcDark3">정기시험(중간, 기말)은 각 대학별로 개설된 과목을 동일 시간으로 편성</p>
										<p class="bulletDot fcDark3">성적평가는 참여대학별 평가를 원칙으로 하며, 각 대학의 학사운영규정을 적용함</p>
									</td>
								</tr>		
								<tr> 
									<td>콘텐츠 관리</td>
									<td class="tl">
										<p class="bulletDot fcDark3">각 대학별로 품질심사를 거친 과목 개설</p>
									</td>
								</tr>					
								
							</tbody>
						</table>
					</div>
					<!-- 테이블 스타일 공통 -->

					<div class="com01 mt50">
						<img src="../data/img/full_rule.png">
					</div>
					
					<!-- //본문_안내글 -->


					
				</div>
			</div>
		</div>
		<!-- footer  -->
		<%@ include file="../inc/h_bottom.jsp" %>
	</body>
</html>
