<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html lang="ko" data-title="혁신적 교수법"> <!-- data-title="" 이 속성은 화면확인을 위해 넣어둔 것입니다 개발시 필요없음 -->
<%@ include file="../inc/head-common.jsp" %>

<body>
    <div id="wrap" class="pusher">
		<!-- header-common -->
        <%@ include file="../inc/header-common.jsp" %>
		<!-- //header-common -->

        <!-- container -->
        <div id="container" class="common">
            
			<!-- 서브 메뉴 -->
			<%@ include file="../inc/lnb-common.jsp" %>
			<!-- //서브 메뉴 -->

			<!-- 본문 -->
			<main class="common">
				<!-- 페이지 위치 -->
				<div class="option-content">
					<nav class="pageInfo ml-auto" aria-label="breadcrumb">
						<ol class="breadcrumb type2">
							<li class="breadcrumb-item home"><a href="/" class="xi-home">메인페이지</a></li>
							<li class="breadcrumb-item"><a href="#0">교수지원</a></li>
							<li class="breadcrumb-item active" aria-current="page"><a href="#0">혁신적 교수법</a></li>
						</ol>
					</nav>
				</div>
				<!-- //페이지 위치 -->

				<!-- 페이지 제목 -->
				<h4 class="pageTitle">혁신적 교수법</h4>
				<!-- //페이지 제목 -->

				<!-- 문장, 본문 내용 -->
				<p class="ctxt">
					혁신적인 교수학습 모형을 개발하고 실제 수업에 적용하도록 지원합니다.
				</p>
				<!-- //문장, 본문 내용 -->


				<!-- 단락 제목 -->
				<h6 class="subTitle">혁신적 수업운영 방법</h6>
				<!-- //단락 제목 -->
				<p class="ctxt">
					계명문화대학교 혁신적 교수법은 Flipoped Learning 교수방법을 중심으로 운영합니다.
				</p>

				<!-- 문장, 본문 내용 -->	
				<div class="com22 mt-3">
					<div>
						<div class="header">
							<span class="step bcGrullo">수업단계</span>
							<p class=" f130">
								사전<small>Pre-class</small>
							</p>
						</div>
						<div class="contents f080">
							<dl class="titleSet">
								<dt>교수방법</dt>
								<dd>
									Flipped Learning<br>
									(사전학습 콘텐츠 제공)
								</dd>
							</dl>
							<dl class="titleSet">
								<dt>평가방법</dt>
								<dd>
									수행내용 평가 반영
								</dd>
							</dl>
							<dl class="titleSet">
								<dt>운영기간</dt>
								<dd>
									3주 이상
								</dd>
							</dl>
						</div>
				
					</div>
					<div>
						<div class="header">
							<span class="step bcDarkGrullo">수업단계</span>
							<p class=" f130">
								수업 중<small>In-class</small>
							</p>
						</div>
						<div class="contents f080">
							<dl class="titleSet">
								<dt>교수방법</dt>
								<dd>
									PBL, TBL, 문제풀이, 심화학습, 실습 등
								</dd>
							</dl>
							<dl class="titleSet">
								<dt>평가방법</dt>
								<dd>
									수행내용 평가 반영
								</dd>
							</dl>
							<dl class="titleSet">
								<dt>운영기간</dt>
								<dd>
									3주 이상
								</dd>
							</dl>
						</div>
					</div>
				
					<div>
						<div class="header">
							<span class="step bcDarkGrullo2">수업단계</span>
							<p class=" f130">
								사후(선택운영)<small>After-class</small>
							</p>
						</div>
						<div class="contents f080">
							<dl class="titleSet">
								<dt>교수방법</dt>
								<dd>과제 수행, 팀별 발표 및 공유 등</dd>
							</dl>
							<dl class="titleSet">
								<dt>평가방법</dt>
								<dd>(선택운영)</dd>
							</dl>
							<dl class="titleSet">
								<dt>운영기간</dt>
								<dd>3주 이상</dd>
							</dl>
				
						</div>
					</div>
				
				</div>
				<!-- //문장, 본문 내용 -->




				<!-- 단락 제목 -->
				<h6 class="subTitle">프로그램 운영 절차</h6>
				<!-- //단락 제목 -->

				<!-- 절차, 단계 -->
				<ol class="stepType" data-step="5">
					<li class="step">
						<span class="txt">신청접수</span>
					</li>
					<li class="step">
						<span class="txt">대상자 선정</span>
					</li>
					<li class="step">
						<span class="txt fcRed">교수법 개발</span>
					</li>
					<li class="step">
						<span class="txt">수업 적용</span>
					</li>					
					<li class="step">
						<span class="txt">평가회</span>
					</li>
				</ol>
				<!-- //절차, 단계 -->




				<!-- 단락 제목 -->
				<h6 class="subTitle">운영내용</h6>
				<!-- //단락 제목 -->

				<!-- 운영? -->
				<div class="com11">
					<div>
						<span class="img"><img src="../assets/img/subImg001.png" alt="이미지1" aria-hidden="true"></span>
						<b class="title">대상</b>
						<p>
							전임교원, 비전임교원 및 강사 중 희망자
						</p>
					</div>
					<div>
						<span class="img"><img src="../assets/img/subImg002.png" alt="이미지2" aria-hidden="true"></span>
						<b class="title">운영시기</b>
						<p>
							학기중<br>
							3월 ~ 6월  /  9 ~ 12월
						</p>
					</div>
				</div>
				<!-- //운영? -->


				
				<!-- 단락 제목 -->
				<h6 class="subTitle">신청</h6>
				<!-- //단락 제목 -->

				<!-- 서브페이지 내 표_개발들어가는 표 -->
				<div class="subCon wide">					
					<div class="global_tab tab-view">
						<a href="#tab_sub1" class="on w_50p">신청하기</a>
						<a href="#tab_sub2" class="w_50p">나의참여이력보기</a>
					</div>
					<div id="tab_sub1" class="tab_content_view" style="display:block;">
						<table class="table" data-sorting="true" data-paging="false" data-empty="등록된 내용이 없습니다.">
							<caption>학습상담 & 코칭 신청표</caption>
							<thead>
								<tr>
									<th scope="col" data-type="number" class="num">연번</th>
									<th scope="col" class="p_w10" data-breakpoints="xs sm">연도(ex.2023-1)</th>
									<th scope="col">프로그램명</th>
									<th scope="col" data-breakpoints="xs sm">운영일자</th>
									<th scope="col" data-breakpoints="xs sm">강사</th>
									<!-- <th scope="col" data-sortable="false">상태</th> -->
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>5</td>
									<td>2023</td>
									<td class="tl">
										<a href="#0" class="link">
											ChatGPT 소개 및 효과적 활용법과 사례</a>
									</td>
									<td>
										2023.07.05 ~
										<br>
										2023.07.05
									</td>
									<td>
										울산대학교 교수학습개발센터 <br>허정필 연구교수
									</td>
									<!-- <td>
										<div class="manage_buttons">
											<a href="#0" class="ui small blue button" title="신청하기" data-toggle="modal" data-target="#m_program_apply">신청하기</a>
										</div>
									</td> -->
								</tr>
								<tr>
									<td>5</td>
									<td>2023</td>
									<td class="tl">
										<a href="#0" class="link">
											ChatGPT 소개 및 효과적 활용법과 사례
										</a>
									</td>
									<td>
										2023.07.05 ~
										<br>
										2023.07.05
									</td>
									<td>
										울산대학교 교수학습개발센터 <br>허정필 연구교수
									</td>
									<!-- <td class="fcGrey">
										종료
									</td> -->
								</tr>
								<tr>
									<td>1</td>
									<td>2023</td>
									<td class="tl">
										<a href="#0" class="link" data-toggle="modal" data-target="#m_program_info">
											제목입니다. 제목입니다.
										</a>
									</td>
									<td>
										2022.10.01
									</td>
									<td>
										울산대학교 교수학습개발센터 <br>허정필 연구교수
									</td>
									<!-- <td class="fcGrey">
										종료
									</td> -->
								</tr>
							</tbody>
						</table>
						<div class="paging">
							<button type="button" class="pg_first disable" onclick="">첫 페이지로 가기</button>
							<button type="button" class="pg_prev disable" onclick="">이전 페이지로 가기</button>
							<a title="현재페이지" href="#" class="current">1</a>
							<a href="#" onclick="">2</a>
							<a href="#" onclick="">3</a>
							<a href="#" onclick="">4</a>
							<a href="#" onclick="">5</a>
							<button type="button" class="pg_next" onclick="">다음 페이지로 가기</button> <button type="button" class="pg_last" onclick="">마지막 페이지로 가기</button>
						</div>
					</div>
					<div id="tab_sub2" class="tab_content_view">
						<table class="table" data-sorting="true" data-paging="false" data-empty="등록된 내용이 없습니다.">
							<caption>학습상담 & 코칭 참여이력표</caption>
							<thead>
								<tr>
									<th scope="col" data-type="number" class="num">No.</th>
									<th scope="col" data-breakpoints="xs sm">서비스명</th>
									<th scope="col">제목</th>
									<th scope="col" data-breakpoints="xs sm">행사기간</th>
									<th scope="col" data-breakpoints="xs sm">제출정보</th>
									<th scope="col" data-sortable="false">상태</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>1</td>
									<td>자기관리프로그램</td>
									<td><a href="#0" class="link" data-toggle="modal" data-target="#m_program_info">제목입니다. 제목입니다.</a></td>
									<td>
										2022.10.01(01:00) ~
										<br>
										2022.11.10(23:59)
									</td>
									<td>
										-
									</td>
									<td class="fcBlue">완료</td>
								</tr>
							</tbody>
						</table>
						<div class="paging">
							<button type="button" class="pg_first disable" onclick="">첫 페이지로 가기</button>
							<button type="button" class="pg_prev disable" onclick="">이전 페이지로 가기</button>
							<a title="현재페이지" href="#" class="current">1</a>
							<a href="#" onclick="">2</a>
							<a href="#" onclick="">3</a>
							<a href="#" onclick="">4</a>
							<a href="#" onclick="">5</a>
							<button type="button" class="pg_next" onclick="">다음 페이지로 가기</button> <button type="button" class="pg_last" onclick="">마지막 페이지로 가기</button>
						</div>
					</div>						
				</div>
				<!-- //서브페이지 내 표_개발들어가는 표 -->
				

				


				<dl class="titleSet2 mt-5">
					<dt>문의처</dt>
					<dd>
						053-589-7892
					</dd>
				</dl>

				


				
			</main>
			<!-- //본문 -->



        </div>
        <!-- //container 부분 -->

        <!-- quick-menu / schedule_btn -->
        <dl class="quick-menu">
            <dt><span class="text">QUICK MENU</span></dt>
            <dd><a href="#0"><i class="xi-instagram"></i>instagram</a></dd>
            <dd><a href="#0"><i class="xi-youtube-play"></i>YouTube</a></dd>
            <dd><a href="#0"><i class="xi-png-support1"></i>원격지원</a></dd>
            <dd><a href="#0"><i class="xi-png-faq"></i>FAQ</a></dd>
        </dl>

    </div>

    <!-- footer -->
    <%@ include file="../inc/footer-common.jsp" %>
    <!-- //footer -->




<!-- 목업 확인을 위한 파일입니다 개발 시에는 무시해도 됩니다-->
<script type="text/javascript" src="mockup/test.js"></script> 
<!-- //목업 확인을 위한 파일입니다 개발 시에는 무시해도 됩니다 -->

</body>

</html>