<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html lang="ko">
	<%@ include file="../inc/home_common.jsp" %>
	<link rel="stylesheet" href="../css/sub.css" /><!-- sub 페이지에서 사용 -->
	<body>
		<div id="wrap">
			<%@ include file="../inc/hrd_header.jsp" %>

			<main class="main">
				<div id="contentWrap" class="container">
					<!-- content -->
					<div id="content" class="content">
						<div class="h1_area">
							<div class="location_bar">
								<nav class="location">
									<ul>
										<li><i class="xi-home-o" aria-hidden="true"></i><span class="sr-only">Home</span></li>
										<li>교육안내</li>
										<li><span class="current">공통법정의무교육 안내</span></li>
									</ul>
								</nav>
							</div>
							<h4 class="title_h1">교육안내</h4>
						</div>
						<!-- //h1_area -->

						<div class="subMenu">
							<ul class="menu">
								<li><a href="#">사업주훈련안내</a></li>
								<li><a href="#">산업안전보건교육안내</a></li>
								<li class="active"><a href="#">공통법정의무교육안내</a></li>
								<li><a href="#">기업직업훈련카드 안내</a></li>
							</ul>
						</div>
						<!-- //2depth-->


						<div class="training_area ">

							<div class="infotitle">공통법정의무교육 안내</div>
							<p class="txt-center mt20">
								법정의무교육은국가에서 근로자들의 안전과 인권을 위해 매년 1회 이상 실시하도록 만든 법령으로 사업주라면 누구나 근로자에 의무적으로 실시해야하는 교육입니다.
							</p>


							<dl class="guide_info com111 mt50">
								<div class="gray_box">
									<dt>성희롱 예방 교육</dt>
									<dd>
										<p class="dataTitle fcRed">교육 미이수시 과태료<br>
											<b>최대 300만원</b>
										</p>
										<p class="dataContent">[남녀고용평등법] 제13조에 따라<br>
											<span>연간 1회(60분) 이상의 교육 실시</span>
										</p>
										<p>교육대상자: 사업주 및 근로자 전직원</p>
									</dd>
									<dd class="bgimg" aria-hidden="true"><img src="../img/contents/guide_test_01.jpg" aria-hidden="true"></dd>
								</div>
								<div class="gray_box">
									<dt>개인정보 보호 교육</dt>
									<dd>
										<p class="dataTitle fcRed">보안 사고 발생 시<br>
											<b>최대 5억원</b>
										</p>
										<p class="dataContent">[개인정보보호법] 제28조에 따라<br>
											<span>연간 1회(60분) 이상의 교육 실시</span>
										</p>
										<p>교육대상자: 개인정보 취급자 또는<br>
											업무에 따라 개인정보에 접근하여 처리하는 자</p>
									</dd>
									<dd class="bgimg" aria-hidden="true"><img src="../img/contents/guide_test_02.jpg" aria-hidden="true"></dd>
								</div>
								<div class="gray_box">
									<dt>직장내 장애인 인식개선 교육</dt>
									<dd>
										<p class="dataTitle fcRed">교육 미이수시 과태료<br>
											<b>최대 300만원</b>
										</p>
										<p class="dataContent">[장애인고용촉진 및 직업재활법] 제5조의 2에 따라<br>
											<span>연간 1회(60분) 이상의 교육 실시</span>
										</p>
										<p>교육대상자: 사업주 및 근로자 전직원</p>
									</dd>
									<dd class="bgimg" aria-hidden="true"><img src="../img/contents/guide_test_03.jpg" aria-hidden="true"></dd>
								</div>
								<div class="gray_box">
									<dt>직장내 괴롭힘 예방 교육</dt>
									<dd>
										<p class="dataTitle fcRed">교육 미이수시 과태료<br>
											<b>권고조치</b>
										</p>
										<p class="dataContent">[근로기준법] 제76조의 2에 따라<br>
											<b>연간 1회 이상의 교육 실시</b>
										</p>
										<p>교육대상자: 사업주 및 근로자 전직원</p>
									</dd>
									<dd class="bgimg" aria-hidden="true"><img src="../img/contents/guide_test_04.jpg" aria-hidden="true"></dd>
								</div>
								<div class="gray_box">
									<dt>퇴직연금 교육</dt>
									<dd>
										<p class="dataTitle fcRed">교육 미이수시 과태료<br>
											<b>최대 1,000만원</b>
										</p>
										<p class="dataContent">[근로자퇴직급여 보장법] 제32조에 따라<br>
											<span>연간 1회(60분) 이상의 교육 실시</span>
										</p>
										<p>교육대상자: 사업주 및 근로자 전직원<br>(개인형퇴직연금제도를 제외한 퇴직연금제도를 설정한 기업)</p>
									</dd>
									<dd class="bgimg" aria-hidden="true"><img src="../img/contents/guide_test_05.jpg" aria-hidden="true"></dd>
								</div>
								<div class="gray_box">
									<dt>산업안전 보건 교육</dt>
									<dd>
										<p class="dataTitle fcRed">교육 미이수시 과태료<br>
											<b>최대 500만원</b>
										</p>
										<p class="dataContent">[산업안전보건법] 제31조에 따라<br>
											<span>매분기 1회(3~6시간) 이상의 교육 실시</span>
										</p>
										<p>교육대상자: 5인 이상 사업장 사업주 및 근로자 전직원</p>
									</dd>
									<dd class="bgimg" aria-hidden="true"><img src="../img/contents/guide_test_06.jpg" aria-hidden="true"></dd>
								</div>
							</dl>



							<!-- <div class="btns mt50">
								<a class="btn type4" href="../lecture/?sort01=lecture10">법정의무교육 과정 신청</a>
								<a class="btn type5" href="../support/newedu.php">법정의무교육 수강신청 문의</a>
							</div> -->
												
						</div>	
						
					</div>
					<!-- //content -->
				</div>
				<!-- //contentWrap -->
			</main>

			<%@ include file="../inc/hrd_footer.jsp" %>
		</div>
	</body>
</html>
