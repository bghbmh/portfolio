


    //팝업
    var mainBody = null;
    var popBg = null;
    var btn_close; //서브페이지 여는 버튼
    var write; // 글남기기  

    
    var scroll_top_holder = null;



    var resize_start; 
    var scrollY = check_element_positionY();

    var timerID = null;
    var inClass = null;
    var higher = -1;

    function openPopup(obj, body)
    {
        //console.log('obj.className : ' + obj.className );

        set_popup(); // bg 깔고

        obj.style.display = "block";  //팝업 열고

        var popX= check_element_positionX();
        scroll_top_holder= check_element_positionY(); //스크롤 위치 확인

        obj.style.top = (window.innerHeight - obj.clientHeight)/2 + "px";
        obj.style.left = (window.innerWidth - obj.clientWidth)/2 + "px";

        mainBody = body;
        mainBody.style.position = "fixed"; //뒷배경 멈춤
        mainBody.style.top = -scroll_top_holder + "px";

        btn_close = obj.querySelector(".closePopup"); //닫힘 버튼 활성화
        btn_close.addEventListener("click", closePopup);

        //console.log('scroll_top_holder : '+ scroll_top_holder );
        
    }

    function set_popup(){

        if( popBg == null )
        {
            popBg = document.createElement("div");
            popBg.style.position = "fixed";
            popBg.style.zIndex = "99";
            popBg.style.display = "block";
            popBg.style.width = "100%";
            popBg.style.height = "100%";
            popBg.style.top = "0";
            popBg.style.left = "0";
            popBg.style.bottom = "0";
            popBg.style.right = "0";
            popBg.style.backgroundColor = "rgba(0,0,0,.6)";
            popBg.style.cursor = "default";

            document.body.appendChild(popBg);

        }
        else
        {
            document.body.removeChild(popBg);
            popBg = null;
        }

        
    }
    
    //팝업 닫기 버튼 설정
    function closePopup(){   // console.log('1111 : '+ scroll_top_holder );

        var parent = this.parentNode;
        parent.style.display = "none";

        set_popup();

        mainBody.style.position = "relative";
        mainBody.style.top = "initial";
        document.body.scrollTop = scroll_top_holder;
        document.documentElement.scrollTop = scroll_top_holder;

        mainBody = null;
        scroll_top_holder = null;

        //슬라이드 떄문에...
        if( subwrap == null && workingID == null )
        {  // console.log('workingID : '+ workingID );
            workingID = setInterval("leftkeepGoing()", 3000);
        }

        if( subwrap == null && jobID == null )
        {  // console.log('jobID : '+ jobID );
            jobID = setInterval("rightkeepGoing()", 12000);
        }

        //입력폼 초기화
        input = document.querySelectorAll("input");
        for( var i=0; i<input.length; i++ )
            input[i].value = "";

        txtarea = document.querySelectorAll("textarea");
        for( var i=0; i<txtarea.length; i++ )
            txtarea[i].value = "";

        checkingGuide("INPUT");
        checkingGuide("TEXTAREA");

        btn_agreeBox.classList.remove("on");
           
    }
























