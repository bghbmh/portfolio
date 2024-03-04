<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<header>
    <div class="header_inner clearfix">
        <h1 class="logo">
            <a href="#">
                <img class="d" src="../data/intro_img/logo.png" alt="혁신공유대학 로고">
            </a>
        </h1>
        <ul class="main_menu">
            <!-- 230302 수정 -->
            <li><a href="#">소개</a></li>
            <!-- //230302 수정 -->
            <li><a href="#">에너지신산업</a>
                <ul class="sub_menu">
                    <li><a href="#0">정규 과목</a></li>
                    <li><a href="#0">비교과 과목</a></li>
                </ul>
            </li>
            <li><a href="#">인공지능</a>
                <ul class="sub_menu">
                    <li><a href="#0">정규 과목</a></li>
                    <li><a href="#0">비교과 과목</a></li>
                </ul>
            </li>
            <li><a href="#">빅데이터</a>
                <ul class="sub_menu">
                    <li><a href="#0">정규 과목</a></li>
                    <li><a href="#0">비교과 과목</a></li>
                </ul>
            </li>
            <li><a href="#">차세대반도체</a>
                <ul class="sub_menu">
                    <li><a href="#0">정규 과목</a></li>
                    <li><a href="#0">비교과 과목</a></li>
                </ul>
            </li>
            <!-- 230302 추가 -->
            <li><a href="#">실감미디어</a>
                <ul class="sub_menu">
                    <li><a href="#0">정규 과목</a></li>
                    <li><a href="#0">비교과 과목</a></li>
                </ul>
            </li>
            <!-- //230302 추가 -->
        </ul>
        <div class="hr_cont">
            <a href="#" class="roundBlue_btn">로그인</a>
            <div class="mo-menu ml15"><i class="bars large icon"></i></div>
        </div>
    </div>
    <script>
        $(function() {
            $('.main_menu > li').mouseover(function() {
                $(this).find('.sub_menu').fadeIn(200);

            })
            $('.main_menu > li').mouseleave(function() {
                $(this).find('.sub_menu').fadeOut(200);
            })
        });
    </script>
</header>