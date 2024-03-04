<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html lang="ko">
	<!--common -->
	<%@ include file="../inc/h_common.jsp" %>
	<!--//common -->
	<link rel="stylesheet" type="text/css" href="../data/css/h_sub.css" />

	<body class="modal-open">
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






		<!-- 팝업 --> 
		<div class="modal fade in" id="test" tabindex="-1" role="dialog" aria-labelledby="모달영역" aria-hidden="false" style="display: block;">
			<!--  <div class="modal fade" id="modal_iframe_popup" tabindex="-1" role="dialog" aria-labelledby="모달영역" aria-hidden="true"> -->
			<div class="modal-dialog modal-lg" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="닫기">
							<span aria-hidden="true">&times;</span>
						</button>
						<h4 class="modal-title">강의계획서</h4>
					</div>
					<div class="modal-body">
						<!--  -->
						<div class="table-wrap table-responsive">
							<table class="" id=" ">
								<colgroup>
									<col class="w100">
									<col class="w100">
									<col class="w100">
									<col class="w100">
									<col class="w100">
									<col class="w80">
									<col class="w80">
									<col class="w70">
								</colgroup>
								<tbody>
									<tr>
										<th>과목코드</th>
										<td colspan="3">1210117</td>
										<th>과목명</th>
										<td colspan="3"><b>강원문화사</b></td>
									</tr>
									<tr>
										<th rowspan="2">운영대학</th>
										<td rowspan="2">강원대학교</td>
										<th rowspan="2">교과구분</th>
										<td rowspan="2">균형교양</td>
										<th rowspan="4">담당교수</th>
										<th class="">성명</th>
										<td colspan="2">유재춘</td>
									</tr>
									<tr>
										<th class="">소속</th>
										<td colspan="2">사학전공</td>
									</tr>
									<tr>
										<th rowspan="2">학점</th>
										<td rowspan="2">3</td>
										<th rowspan="2">개설년도/학기</th>
										<td rowspan="2">2023년 2학기</td>
										<th class="">연락처</th>
										<td colspan="2">033-250-8220</td>
									</tr>
									<tr id="yui_3_17_2_1_1700533472124_55">
										<th class="">이메일</th>
										<td colspan="2">yjc5293@kangwon.ac.kr</td>
									</tr>
									<tr id="yui_3_17_2_1_1700533472124_57">
										<th>교과목표 및 개요</th>
										<td colspan="7" class="tl">
											본 교과의 학습 목표는 다음과 같다. 강원지역의 문화가 다른 지역이나 국가의 문화와 어떻게 다른지 그 특징점을 비교-분석할 수 있고, 문화 다양성
												존중 및 조화를 추구하는 태도를 갖출 수 있다
										</td>
									</tr>
									<tr>
										<th>수업운영방식</th>
										<td colspan="7" class="tl">
											수업은 기본적으로 정해진 강의 콘텐츠를 웹사이트를 통해 수강하며, 기타 운영
										</td>
									</tr>
									<tr>
										<th>교재 및 참고문헌</th>
										<td colspan="7" class="tl">
											별도 주교재 없음
												<br>참고문헌 : "강원도사"(강원도사편찬위원회 간행) 참조
										</td>
									</tr>
									<tr>
										<th rowspan="7">성적 평가</th>
										<th class="">출석</th>
										<td colspan="6">10</td>
									</tr>
									<tr >
										<th class="">중간고사</th>
										<td colspan="6">30</td>
									</tr>
									<tr>
										<th class="">기말고사</th>
										<td colspan="6">30</td>
									</tr>
									<tr>
										<th class="">과제</th>
										<td colspan="6">20</td>
									</tr>
									<tr>
										<th class="">토론</th>
										<td colspan="6">0</td>
									</tr>
									<tr>
										<th class="">퀴즈</th>
										<td colspan="6">10</td>
									</tr>
									<tr>
										<th class="">기타</th>
										<td colspan="6">0</td>
									</tr>
									<tr>
										<th>기타 안내사항</th>
										<td colspan="7" class="tl">
											
										</td>
									</tr>
									<tr>
										<th>주차</th>
										<th colspan="4">수업내용</th>
										<th colspan="2">교재범위 및 과제물</th>
										<th>비고</th>
									</tr>
									<tr>
										<th>1</th>
										<td colspan="4" class="tl">
											강원도의 역사
										</td>
										<td colspan="2">1차 과제물 부여</td>
										<td>원격수업 콘텐츠 활용(이하 동일함)</td>
									</tr>
									<tr>
										<th>2</th>
										<td colspan="4" class="tl">
											신사임당의 예술 세계
										</td>
										<td colspan="2">1차 과제물 작성</td>
										<td></td>
									</tr>
									<tr>
										<th>3</th>
										<td colspan="4" class="tl">
											강원의 지리
										</td>
										<td colspan="2">1차 과제물 작성</td>
										<td></td>
									</tr>
									<tr>
										<th>4</th>
										<td colspan="4" class="tl">
											강원의 사상
										</td>
										<td colspan="2">1차 과제물 작성</td>
										<td></td>
									</tr>
									<tr>
										<th>5</th>
										<td colspan="4" class="tl">
											강원의 문학
										</td>
										<td colspan="2">1차 과제물 작성</td>
										<td></td>
									</tr>
									<tr>
										<th>6</th>
										<td colspan="4" class="tl">
											강원의 예술
										</td>
										<td colspan="2">1차 과제물 작성</td>
										<td></td>
									</tr>
									<tr>
										<th>7</th>
										<td colspan="4" class="tl">
											강원의 민요
										</td>
										<td colspan="2">1차 과제물 마감</td>
										<td></td>
									</tr>
									<tr>
										<th>8</th>
										<td colspan="4" class="tl">
											중간 시험
										</td>
										<td colspan="2">시험 평가</td>
										<td></td>
									</tr>
									<tr>
										<th>9</th>
										<td colspan="4" class="tl">
											강원의 의식주
										</td>
										<td colspan="2">2차 과제물 부여</td>
										<td></td>
									</tr>
									<tr>
										<th>10</th>
										<td colspan="4" class="tl">
											강원의 설화
										</td>
										<td colspan="2">2차 과제물 부여</td>
										<td></td>
									</tr>
									<tr>
										<th>11</th>
										<td colspan="4" class="tl">
											강원인의 일생 의례
										</td>
										<td colspan="2">2차 과제물 부여</td>
										<td></td>
									</tr>
									<tr>
										<th>12</th>
										<td colspan="4" class="tl">
											강원인의 민속 신앙
										</td>
										<td colspan="2">2차 과제물 부여</td>
										<td></td>
									</tr>
									<tr>
										<th>13</th>
										<td colspan="4" class="tl">
											강원인의 축제 문화
										</td>
										<td colspan="2">2차 과제물 부여</td>
										<td></td>
									</tr>
									<tr>
										<th>14</th>
										<td colspan="4" class="tl">
											강원의 문화유산
										</td>
										<td colspan="2">2차 과제물 마감</td>
										<td></td>
									</tr>
									<tr>
										<th>15</th>
										<td colspan="4" class="tl">
											기말 시험
										</td>
										<td colspan="2">시험 평가</td>
										<td></td>
									</tr>
								</tbody>
							</table>
						</div>
						<!--  -->
					</div>
				</div>
			</div>
		</div>
		<!-- //팝업 --> 






	</body>
</html>
