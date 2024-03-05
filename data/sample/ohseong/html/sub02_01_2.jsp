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
										<li><span class="current">사업주훈련 안내</span></li>
									</ul>
								</nav>
							</div>
							<h4 class="title_h1">교육안내</h4>
						</div>
						<!-- //h1_area -->

						<div class="subMenu">
							<ul class="menu">
								<li class="active"><a href="#">사업주훈련안내</a></li>
								<li><a href="#">산업안전보건교육안내</a></li>
								<li><a href="#">공통법정의무교육안내</a></li>
								<li><a href="#">기업직업훈련카드 안내</a></li>
							</ul>
						</div>
						<!-- //2depth-->

						<h3 class="subMenu_title">사업주훈련 안내</h3>
						<ul class="tabs mb20 four_list" >
							<li ><a href="#" title="선택된 탭메뉴">고용보험 환급과정</a></li>
							<li class="active"><a href="#" title="비활성 탭메뉴">과정개발</a></li>
						</ul>

						<div class="training_area box">

							<div class="infotitle">과정개발</div>
							<dl class="guide_info">
								<div>
									<dt>
										과정개발
									</dt>
									<dd>
										교육과정 개발은 교과내용, 교과평가 등의 구분과 그에 따른 심사 항목에 적정한 심사가 되어야 등록될 수 있습니다.<br>
실무에 도움이 되고 현실성 있는 교육과정들을 끊임없이 개발하고 제공해드릴 수 있도록 노력하고 있습니다.<br>
무한경쟁의 기업경영 환경에서 자기주동형 학습에 적합한 과정개발을 통하여 학습자의 역량 개발 및 미래가치 창출을 도모하고 나아가 우리 산업게에 필요한 교육과정을 개발, 보급할 수 있도록 하겠습니다.
									</dd>
								</div>
								<div>
									<dt>
										과정개발 전략
									</dt>
									<dd>
										BL(Blended Learning), 실무중심, 고객니즈, 학습자 특성을 고려하여 과정을 개발하고 있습니다.			
										<dl class="learning_card mt10">
											<dt class="txt-center mb50"><span class="lg">교육기관</span></dt>
											<dd>
												<ol class="curriculum type3">
													<li class="step">
														<div class="circle type1">
															<b>01</b>
															<span class="cnt">
																<p><strong>BL(Blending Learning) 과정 개발지향</strong></p>
																<span>인터넷 원격교육_집체교육</span>
															</span>
														</div>
													</li>
													<li class="step">
														<div class="circle type2">
															<b>02</b>
															<span class="cnt">
																<p>
																	<strong> 실무중심의<br class="desktop-elem"> 과정개발</strong>
																</p>
																<span>병원, 제조, 공기업 등 업종의 특성에 맞는 실무자 중심의 과정개발</span>
															</span>
														</div>
													</li>
													<li class="step">
														<div class="circle type3">
															<b>03</b>			
															<span class="cnt">
																<p>
																	<strong>고객니즈에 의한 <br class="desktop-elem">과정개발</strong>
																</p>
																<span>수요조사를 통한 사전니즈 파악, 컨설턴트를 통한 현장의견 직접수령</span>
															</span>
														</div>
													</li>
													<li class="step">
														<div class="circle type4">
															<b>04</b>
															<span class="cnt">
																<p>
																	<strong>학습자 특성을 <br class="desktop-elem">고려한 과정개발</strong>
																</p>
																
																<span>학습자 특성을 고려하고 동기부여를 제공할만한 과정개발</span>
															</span>
														</div>
													</li>
												</ol>
											</dd>											
											
										</dl>
										
									</dd>
								</div>								
							</dl>
												
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
