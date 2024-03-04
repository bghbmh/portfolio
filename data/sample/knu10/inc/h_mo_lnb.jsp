<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!-- mobile menu  slidebar -->
<div class="ui right sidebar menu-inbox">
	<button class="close" title="닫기">닫기</button>
	<nav>
		<ul class="navList">
			<li>
				<a href="#0"><span>사업소개</span></a>
				<div class="twoDep">
					<ul>
						<li><a href="#0">인사말</a></li>
						<li><a href="#0">학점교류 소개</a></li>
						<li><a href="#0">참여대학 안내</a></li>
					</ul>
				</div>
			</li>
			<li>
				<a href="#0"><span>학점교류 안내</span></a>
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
				<a href="#0"><span>커뮤니티</span></a>
				<div class="twoDep">
					<ul>
						<li><a href="#0">공지사항</a></li>
						<li><a href="#0">자료실</a></li>
					</ul>
				</div>
			</li>
			<li>
				<a href="#0"><span>고객센터</span></a>
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
	</nav>
	<script>
		/********** NAV 메뉴 **********/
		$(".navList li")
			.unbind("click")
			.bind("click", function () {
				if ($(this).hasClass("on") != true) {
					$(".navList li").removeClass("on");
					$(this).addClass("on");
				} else {
					$(".navList li").removeClass("on");
				}
			});
	</script>
</div>
<!-- mobile menu slidebar -->
