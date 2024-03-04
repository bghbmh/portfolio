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
							<a href="#0" class="item">학점교류 교과목</a>
						</div>
					</div>
				</div>
				<!-- //sub 헤더 공통 -->

				<!-- sub menu 공통 -->
				<nav class="subMenu">
					<div class="inner">
						<a href="#0" class="item">학점교류 일정</a>
						<a href="#0" class="item active">학점교류 교과목</a>
						<a href="#0" class="item">수강방법</a>
						<a href="#0" class="item">학점교류 규정</a>
					</div>
				</nav>
				<!-- //sub menu 공통 -->
			</div>
			<div class="section">
				<div class="inner tempbcColor">
					<!-- tempbcColor 게시판 외 안내 페이지에서만 사용하는 클래스 -->

					<!-- 서브페이지 제목 -->
					<h3 class="subContentTitle">학점교류 교과목</h3>
					<!-- //서브페이지 제목 -->

					<!-- 본문_안내글 -->

					<div class="option-content">
						<div class="mr-auto">
							전체 <span class="fcRed">39강좌</span>
						</div>
						<div class="button-area">
							<select class="ui dropdown">								
								<option value="2020|20">2020년 2학기</option>
								<option value="2021|10">2021년 1학기</option>
								<option value="2021|20">2021년 2학기</option>
								<option value="2022|10">2022년 1학기</option>
								<option value="2022|20">2022년 2학기</option>
								<option value="2023|10">2023년 1학기</option>
								<option value="2023|20" selected="">2023년 2학기</option>
							</select>
						</div>
					</div>

					<!-- 테이블 스타일 공통 -->
					<div class="table-wrap">
						<table>
							<colgroup>
								<col >
								<col class="w150">
								<col >
								<col class="w100">
								<col class="w100">
							</colgroup>
							<thead>
								<tr>
									<th>교과목</th>
									<th>담당 학교</th>
									<th>교과목코드</th>
									<th>담당교수</th>
									<th>강의계획서</th>
								</tr>
							</thead>
							<tbody>
								<tr> 
									<td>2023-2학기 거점국립대학 학점교류 시스템 활용법 교육워크숍</td>
									<td>강원대학교</td>
									<td>tidefloworkshop_2</td>
									<td>타이드플로</td>
									<td>								
									</td>
								</tr>
							
								<tr> 
									<td>test1</td>
									<td>강원대학교</td>
									<td>test1</td>
									<td></td>
									<td>								
									</td>
								</tr>

								<tr> 
									<td>강원문화사</td>
									<td>강원대학교</td>
									<td>1210117</td>
									<td>유재춘</td>
									<td>
										<a href="javascript:fn_showSyllabusPopup('250');">강의 계획_팝업 있음</a>
									</td>
								</tr>	
								
								<tr> 
									<td>강원문화사</td>
									<td>강원대학교</td>
									<td>1210117</td>
									<td>유재춘</td>
									<td>
										<a href="javascript:fn_showSyllabusPopup('250');">강의 계획</a>
									</td>
								</tr>	

								<tr> 
									<td>강원문화사</td>
									<td>강원대학교</td>
									<td>1210117</td>
									<td>유재춘</td>
									<td>
										<a href="javascript:fn_showSyllabusPopup('250');">강의 계획</a>
									</td>
								</tr>	
								
							</tbody>
						</table>
					</div>
					<!-- 테이블 스타일 공통 -->

					<nav aria-label="페이지네이션" class="paging2 mt30">
						<div class="pagination">
							<a class="page-item first disabled" href="#">제일앞</a>
							<a class="page-item prev" href="#">이전</a>
							<a class="page-item active" href="#">1</a>
							<a class="page-item" href="#">2</a>
							<a class="page-item" href="#">3</a>
							<a class="page-item next" href="#">다음</a>
							<a class="page-item last" href="#">제일뒤</a>
						</div>
					</nav>
					
					<!-- //본문_안내글 -->


					
				</div>
			</div>
		</div>
		<!-- footer  -->
		<%@ include file="../inc/h_bottom.jsp" %>
	</body>
</html>
