   console.log(checkMobile());

    var scroll_top_holder = null;

    var wrap;
    var btn_apply;
    var btn_listTelNum;

    var btn_sendCard;//명함 전달 클릭
    var btn_gotoTxt;// 문자로 명함 보내기
    var btn_gotoKakao;//카카오로 
    var input_enable;//문자로 보낼 때 번호 입력란 활성화하기
    var btn_sendTxt;//
    var btn_closePopUp;



    //상단 인물 이미지 스크롤_리사이징 설정
    var worker;
    var personal;
    var photo;
    var ini_photo_w; // 초기값_이미지 가로 길이
    var ini_personal_h; // 이미지가 포함된 요소 세로 길이 초기값
    var photo_w_rate;
    var photo_h_rate;
    var mini_h = 100;
    var mini_w = 13;
    var resize_start; 
    var scrollY = check_element_positionY();


    window.addEventListener("load", loadWindow);
    window.addEventListener("scroll", resizeImgFromScroll);//상단 인물 이미지 스크롤_리사이징 설정
    



    function loadWindow(){

        wrap = document.querySelector(".wrap");

        btn_closePopUp = document.querySelectorAll(".closePopUp");
        closePopUp();

        btn_apply = document.getElementById("apply");
        btn_listTelNum = document.getElementById("listTelNum");

        btn_sendCard = document.getElementById("sendCard");//명함 전달 클릭
        btn_gotoTxt = document.getElementById("gotoTxt");// 문자로 명함 보내기
        btn_gotoKakao = document.getElementById("gotoKakao");//카카오로 
        input_enable = document.querySelector(".tabcontent .tcnt .guide");//문자로 보낼 때 번호 입력란 활성화하기
        btn_sendTxt = document.getElementById("sendTxt");//

        
        btn_apply.addEventListener("click", apply);
        btn_listTelNum.addEventListener("click", listTelNum);
        btn_sendCard.addEventListener("click", sendCard);
        btn_gotoTxt.addEventListener("click", gotoTxt);
        btn_gotoKakao.addEventListener("click", gotoKakao);
        input_enable.addEventListener("click", enterPhone);
        btn_sendTxt.addEventListener("click", sendTxt);

        //상단 인물 이미지 스크롤_리사이징 설정
        worker = document.getElementById("worker");
        personal = document.querySelector(".personal");
        photo = document.querySelector(".personal .photo");
        ini_photo_w = photo.clientWidth; // 초기값_이미지 가로 길이
        ini_personal_h = personal.clientHeight; // 이미지가 포함된 요소 세로 길이 초기값
        photo_w_rate = photo.clientWidth / personal.clientWidth;
        photo_h_rate = photo.clientHeight / personal.clientHeight;
        resize_start = personal.querySelector(".companyLogo").offsetTop + personal.querySelector(".companyLogo").clientHeight; 


        //인물사진 가져와서 메인 상단이랑 팝업에 넣어두기
        var mainFace = photo.getElementsByTagName("img")[0].src;
        photo.style.backgroundImage = "url('" + mainFace + "')";
        //photo.style.backgroundPosition = "center";

        var popFace = document.querySelector("#nameCard .sampleCard");
        popFace.style.backgroundImage = "url('" + mainFace + "')";
        //popFace.style.backgroundPosition = "center";


        console.log(mainFace);
        
    }

    //상담신청 클릭    
    function apply(e){
        var talkTo = document.getElementById("talkTo");
        set_popup_position(talkTo);
    };

    //고객센터 클릭, 전화 번호 모음, 팝업으로 띄움    
    function listTelNum(){
        var connectList = document.getElementById("connectList");
        set_popup_position(connectList);
    };

    
    //명함 전달 클릭
    function sendCard(){
        
        var nameCard = document.getElementById("nameCard");     
        
        //팝업 안에 메뉴들 활성화 하기
        //탭메뉴 초기 설정        
        var i, tab, tabcontent, tablinks;
        
        tab = nameCard.querySelectorAll(".tab button");
        for( i=0; i<tab.length; i++ )
        {
            tab[i].classList.remove("on");
            tab[i].addEventListener("click", tabMenu);
        }

        //첫번째 메뉴 열기
        tab[0].classList.add("on");

        //탭메뉴에 들어있는 콘텐츠 보이기
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) 
        {            
            if( i == 0 ) 
                tabcontent[i].style.display = "block";
            else
                tabcontent[i].style.display = "none";
        }

        //팝업 띄우기
        set_popup_position(nameCard);
        
    }

    

    //click the 'sendTxt' button
    function sendTxt(){

        var enterNum = document.getElementById("enterNum");

        var regPhone = /^((01[1|6|7|8|9])[1-9]+[0-9]{6,7})|(010[1-9][0-9]{7})$/;

        //var regExp = /^\d{3}-\d{3,4}-\d{4}$/;

        // 01로 시작하는 핸드폰 및 지역번호와 050, 070 검증함. 그리고 -(하이픈)은 넣어도 되고 생략해도 되나 넣을 때에는 정확한 위치에 넣어야 함.
        var regExp = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/;

        var x = enterNum.value;
        if (x == "") {
            alert("Name must be filled out");
            return false;
        }
        else if( !regExp.test(x) )
        {
            alert('잘못된 번호 : ' + x);
        }
        else if( regExp.test(x) )
        {
            alert('맞는 번호 : ' + x);

            var link = location.href;
            location.href = 'sms:' + x + ( checkMobile() == 'ios' ? '&' : '?' ) + 'body='+ link;
        }


    }


    //문자로 명함 보내기 방법 선택하기
    function gotoTxt(){

        var inClass = false;
        var cn = -1;
        var tcnt = document.querySelectorAll(".tabcontent .tcnt");
        

        //버튼 활성화 확인하기
        var cn = btn_gotoTxt.className.split(" ");
        for( var i=0; i<cn.length; i++ )
        {
            if( cn[i] == "on" ) inClass = true;
            else inClass = false;
        }

        if( inClass )
        {   
            var enterNum = document.getElementById("enterNum");

            this.classList.remove("on"); 
            enterNum.value = "";
            input_enable.classList.remove("on"); 
            console.log(" true" );
             
            tcnt[0].classList.remove("on");
            btn_sendTxt.classList.remove("on");
        }
        else
        {
            this.classList.add("on");  

            //카카오버튼 활성화 버튼 확인하기
            var cx = btn_gotoKakao.className.split(" ");
            for( var i=0; i<cx.length; i++ )
            {
                if( cx[i] == "on" )//톡으로보내기가 선택되어 있는 경우
                {
                    btn_gotoKakao.classList.remove("on"); 
                }
               
            }            
            tcnt[0].classList.add("on"); //콘텐츠 보이기
            input_enable.classList.add("on");
            
        }   

    }

    //카카오톡으로 명함 보내기 방법 선택하기
    function gotoKakao(){

        var inClass = false;
        var cn = -1;

        //버튼 활성화 확인하기
        var cn = btn_gotoKakao.className.split(" ");
        for( var i=0; i<cn.length; i++ )
        {
            if( cn[i] == "on" ) inClass = true;
            else inClass = false;
        }

        if( inClass )
        {   
            this.classList.remove("on");             
        }
        else
        {
            this.classList.add("on");  
            console.log(" gotoKakao : " + inClass );  
            //sendLink();  
            //chatChannel()      
        }   

    }




    function resizeImgFromScroll() {
        
        scrollY = check_element_positionY();
        //var scrollpercent = ( scrollY / (document.documentElement.scrollHeight - document.documentElement.clientHeight)) * 100;
        
        var popBg = document.getElementById("popBg");
        if( popBg.style.display != "block")
        {
            if( scrollY > resize_start )
            {
                personal.style.top = scrollY + "px";

                if( ini_personal_h/3 > scrollY )
                {
                    personal.classList.add("noneLogo");
                    personal.classList.remove("stickyTop");
                    
                    photo.style.width = photo_w_rate*100 + "%";
                    personal.style.height = (ini_personal_h + resize_start - scrollY ) + "px";

                }
                else if( 2 * ini_personal_h/3 > scrollY && scrollY >= ini_personal_h/3 )
                {
                    
                    personal.classList.remove("reInfo");
                    personal.classList.add("stickyTop");
                    personal.style.height = (ini_personal_h + resize_start - scrollY ) + "px";
                }
                else if( ini_personal_h > scrollY && scrollY >= 2 * ini_personal_h/3 )
                {
                    personal.classList.add("reInfo");
                    personal.style.height = (ini_personal_h + resize_start - scrollY ) + "px";

                    var zeroOffset = 2 * ini_personal_h/3 // 사진 높이 기준, 전체 높이와 2/3 지점 사이에 스크롤이 올 때, 스크롤 위치를 상대적으로 표시
                    var upN = scrollY - zeroOffset ;
                    var downN = ini_personal_h - (2 * ini_personal_h/3);
                    var rate = 1 - (upN / downN);//scrollY - zeroOffset;

                    console.log(' rate < 0.15 : ' + scrollY +'\n' );
                    photo.style.height = photo_h_rate*100 + "%";
                    photo.style.width = (ini_photo_w * rate ) + "px";


                    if( (ini_photo_w * rate) < (personal.clientWidth * mini_w/100)  )
                    {
                        console.log(' 최소 가로길이 : ' + (personal.clientWidth * mini_w/100) +'\n' );
                        photo.style.width = mini_w + "%";
                    }
      

                }
                else if( scrollY > ini_personal_h )
                {
                    personal.classList.add("reInfo");
                    console.log('personal.clientHeight : ' + personal.clientWidth +'\n' );

                    var hh = personal.clientWidth * mini_w/100;
                    photo.style.width = mini_w + "%";
                    photo.style.height = hh + "px";  

                    personal.style.height = hh +15 + "px";
                }
        
            }
            else
            {      
                if( !personal )
                {
                    console.log("sss");
                    personal = document.querySelector(".personal");
                }

                personal.classList.remove("reInfo");
                personal.classList.remove("noneLogo");
                personal.classList.remove("stickyTop");
                personal.style.top = 0 + "px";
                personal.style.height = ini_personal_h + "px";
               
            }
        }    

    }


        //문자로 명함 보내기_ 번호 입력하기
    function enterPhone(){

        this.classList.remove("on"); 

        var enterNum = document.getElementById("enterNum");

        enterNum.focus();
        btn_sendTxt.classList.add("on");
        //this
    }


    //팝업 열렸을 때 초기 탭메뉴 설정
    function tabMenu(e){

        var tag = e.currentTarget.nodeName;
        var parent = e.currentTarget.parentNode;            
        var child = parent.querySelectorAll(tag);

        for( var i=0; i<parent.childElementCount; i++ )
        {
            var cn = child[i].className.split(" ");
            for( var j=0; j<cn.length; j++ )
            {
                if( cn[j] == "on" )
                {
                    child[i].classList.remove("on");
                    document.getElementsByClassName("tabcontent")[i].style.display = "none";
                }
            }            
        }

        e.currentTarget.classList.add("on");
        for( var i=0; i<parent.childElementCount; i++ )
        {
            var cn = child[i].className.split(" ");
            for( var j=0; j<cn.length; j++ )
            {
                if( cn[j] == "on" )
                {                        
                    document.getElementsByClassName("tabcontent")[i].style.display = "block";

                    console.log(" cn : " + cn[j]);
                }
            }
            
        }

        var enterNum = document.getElementById("enterNum");
        enterNum.value = "";

    }

        // 팝업 위치 설정
    function set_popup_position(obj)
    {
        var popBg = document.getElementById("popBg");
        popBg.style.display = "block";
        obj.style.display = "block";  

        var popX= check_element_positionX();
        var popY= check_element_positionY();

        scroll_top_holder = popY;

        obj.style.top = (window.innerHeight - obj.clientHeight)/2 + "px";
        obj.style.left = (window.innerWidth - obj.clientWidth)/2 + "px";

        wrap.style.position = "fixed";
        wrap.style.top = -popY + "px";
        
    }

    //팝업 닫기 버튼 설정
    function closePopUp(){

        // var btn_closePopUp = document.querySelectorAll(".closePopUp");
        for( var i=0; i<btn_closePopUp.length; i++)
        {
            btn_closePopUp[i].onclick = function() {
                var pNode = this.parentNode;
                pNode.style.display = "none";

                var popBg = document.getElementById("popBg");
                popBg.style.display = "none";

                wrap.style.position = "relative";
                wrap.style.top = "initial";
                document.body.scrollTop = scroll_top_holder;
                document.documentElement.scrollTop = scroll_top_holder;

                console.log('top : '+ document.body.scrollTop + ' \n popY : ' + document.documentElement.scrollTop );
            };
        }
    }

    //요소 위치 확인
    function check_element_positionX()
    {
        if (window.pageXOffset !== undefined) 
        { // All browsers, except IE9 and earlier
            return window.pageXOffset;
        } 
        else 
        { // IE9 and earlier
            return document.documentElement.scrollLeft;
        }
    }
    
    function check_element_positionY()
    {
        if (window.pageYOffset !== undefined)
        { // All browsers, except IE9 and earlier
            return window.pageYOffset;
        }
        else
        { // IE9 and earlier
            return document.documentElement.scrollTop;
        }
    }

    //모바일 종류 확인
    function checkMobile(){
     
        var varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기
     
        if ( varUA.indexOf('android') > -1)
        {
            //안드로이드
            return "android";
        }
        else if ( varUA.indexOf("iphone") > -1 || varUA.indexOf("ipad") > -1 || varUA.indexOf("ipod") > -1 )
        {
            //IOS
            return "ios";
        }
        else
        {
            //아이폰, 안드로이드 외
            return "other";
        }
        
    }
