    'use strict';

    let timeCheck; 

    function openPopup(e, obj, mainbody)
    {
        console.log(`obj.className :  ${obj.className}, mainbody.classname : ${mainbody.className} ` );

        set_popup(true); // black bg 깔고  

        // 팝업 안에 있는 내용들 설정하기 =======================       
        set_input(obj, mainbody);



        // ===============================================

        obj.style.display = "block";  //팝업 열고
        obj.style.top = (window.innerHeight - obj.clientHeight)/2 + "px"; // 팝업 위치 정하고
        obj.style.left = (window.innerWidth - obj.clientWidth)/2 + "px";

        //popbg 뒤에 있는 본문들 위치 고정하기
        const popX = check_element_positionX();
        const scroll_top_holder = check_element_positionY(); //스크롤 위치 확인
        mainbody.style.position = "fixed"; 
        mainbody.style.top = -scroll_top_holder + "px";

        console.log(`111 scrollTop  : ${scroll_top_holder},,,`);

        timeCheck = -1; 
        checkOverlapExecute(e, obj);
        obj.querySelector(".closePopup").addEventListener("click", function(e){ closePopup(e, obj, mainbody); });
        // 위처럼... 익명함수나 화살표를 사용해서 인자를 넘기는 식으로 쓰면 클릭할 때마다 +1 씩 늘어나면서 함수를 호출해요. 왜이러는거야... 
        //obj.querySelector(".closePopup").addEventListener("click", temp);

    }

    function temp(e){
        const mainbody = document.querySelector(".wrap");

        const obj = document.getElementById("nameCard"); 
        closePopup(obj, mainbody);
    }


    function set_popup(noBg){

        if( noBg )
        {
            console.log(`set_popup  background color`);
            let popBg = document.createElement("div");
            popBg.classList.add("popupBg");
            document.body.appendChild(popBg);
        }
        else if( noBg === false && document.querySelector(".popupBg") !== null )
        {
            let popBg = document.querySelector(".popupBg");
            let pp = popBg.parentNode;
            pp.removeChild(popBg);
        }
        
    }


    function enableInputFromGuide(e, obj){ console.log("   enableInputFromGuide : ");
  
        const nowTag = e.currentTarget;// input 태그 확인하고
        const nowGuide = nowTag.previousElementSibling; //옆에 있는 가이드 태그 확인하고

        const allguide = obj.querySelectorAll(nowGuide.nodeName);// guide 개수 확인

        //입력폼들의 안내글을 모두 보이게, 입력폼에 내용이 있을 때는 안내글 안보이게
        for( let i=0; i<allguide.length; i++ )
        {            
            let input = allguide[i].nextElementSibling;

            if( input.value !== "" )
                allguide[i].classList.add("off");
            else
                allguide[i].classList.remove("off");            
        }

        nowGuide.classList.add("off");        
        nowTag.focus();

    }


    function previewCheck(obj){ //, color

        const allguide = obj.querySelectorAll(".guide");// guide 개수 확인

        //입력폼 확인하기
        for( let i=0; i<allguide.length; i++ )
        {            
            let input = allguide[i].nextElementSibling;

            if( input.value === "" )
            {
                allguide[i].classList.remove("off");
                
                let cn = allguide[i].className.split(" ");
                for( let j=0; j<cn.length; j++)
                {
                    if( cn[j] === "warning")
                        allguide[i].classList.remove("warning"); 
                    else
                        allguide[i].classList.add("warning");                    
                }
            }
            //console.log("previewCheck " + i);
        }
    }


    //동의 박스 체킹 여부 확인
    function boxChecking(e, obj){
        
        if( e.timeStamp !== timeCheck ) //두 번 실행되서 timeStamp 값을 확인한 후 한 번만 실행되게
        {

            let t = e.currentTarget;
            let cn = t.className.split(" ");
            let x=-1;

            for( let i=0; i<cn.length; i++)
            {
                if( cn[i] === "on")
                    x=i;
            } 

            if( x >= 0)
                t.classList.remove("on");
            else
                t.classList.add("on");

            previewCheck(obj);

            timeCheck = e.timeStamp;
        }
        
    }

    //두번..실행되는 함수 확인해보기
    function checkOverlapExecute(e, obj){

        if( obj.getAttribute("data-overlap") === null )//중복실행 데이터 초기 설정하고
        {
            console.log(`checkOverlapExecute`);
            obj.setAttribute("data-overlap", e.timeStamp); //팝업이열렸던 시간 저장
            return;
        }
        else // 처음 클릭했을때는 팝업열렸던 시간에서 조금 뒤니까 넘어온 타임스템프를 넣고 
        {
            console.log(typeof parseFloat(obj.getAttribute("data-overlap")));
            console.log(typeof e.timeStamp);
            console.log("********************");
            if( parseFloat(obj.getAttribute("data-overlap")) !== e.timeStamp ) //
            {
                console.log(`11 -- data-overlap : ${parseFloat(obj.getAttribute("data-overlap"))}`);
                console.log(`11 -- data-overlap : ${obj.getAttribute("data-overlap")}`);
                console.log(`      e.timeStamp : ${e.timeStamp}`);
                obj.setAttribute("data-overlap", e.timeStamp);
                console.log(`22 -- data-overlap : ${obj.getAttribute("data-overlap")}`);
                return false;
            }
            else// if( obj.getAttribute("data-overlap") === e.timeStamp )
            {
                console.log(`33 -- data-overlap : ${obj.getAttribute("data-overlap")}...${e.timeStamp}`);
                return true;
            }
        }

    }


    
    //팝업 닫기 버튼 설정
    function closePopup(e, obj, mainbody){   

        if( checkOverlapExecute(e, obj) )
        {
            console.log(`--------overlap closePopup---------`);
            return;
        } 

        obj.style.display = "none";

        set_popup(false);

        //popbg 뒤에 있는 본문들 위치 초기값으로 변경
        mainbody.style.position = "relative";
        let scroll_top_holder = parseInt(mainbody.style.top)*(-1); //mainbody.style.top.replace(/[^0-9]/g, "")

        //document.body.scrollTop = scroll_top_holder;
        // document.documentElement.scrollTop = scroll_top_holder;
        mainbody.style.top = "auto";

        window.scrollTo(0, scroll_top_holder);


        console.log(obj);


        // //입력폼 초기화
        let input = obj.querySelectorAll("input");
        for( let i=0; i<input.length; i++ )
            input[i].value = ""; 

        let txtarea = obj.querySelectorAll("textarea");
        for( let i=0; i<txtarea.length; i++ )
            txtarea[i].value = "";

        let guide = obj.querySelectorAll(".guide");
        for( let i=0; i<guide.length; i++ )
        {
            guide[i].classList.remove("off");
            guide[i].classList.remove("warning");
        }

        //document.getElementById("agreeBox").classList.remove("on");
           
    }


// 팝업 안에 있는 내용들 설정하기 =======================

    function set_input(obj, mainbody){

        //탭메뉴 초기 설정
        if( obj.getAttribute("id") === "nameCard" )
            sendCard(obj);

        //input 활성화
        const guide = obj.querySelectorAll(".guide");
        console.log(guide.length);
        if( guide.length !== 0 )
        {
            for( let i=0; i<guide.length; i++ ) //가이드 개수만큼 input 있음, input에 리스너 달기
            {
                let parent = guide[i].parentNode;                
                let tag = guide[i].nextElementSibling; 
                let input = parent.querySelector(tag.nodeName);   //   }  
                input.addEventListener("click", (e) => { enableInputFromGuide(e, obj); }, false ); 
                       
            }

            //obj.querySelector("#agreeBox").addEventListener("click", (e) => { boxChecking(e, obj); });
        }

        //버튼 활성화
        const submit = obj.querySelector(".submit");
        if( submit !== null )   
        {
            console.log("+++++++++++++++++");
            console.log(submit);
            submit.addEventListener("click", function(){alert("준비중"); });
        }     
            

    }


    //명함 전달 클릭
    function sendCard(obj){
        
        //팝업 안에 메뉴들 활성화 하기
        //탭메뉴 초기 설정        
        let i, tab, tabcontent, tablinks;
        
        tab = obj.querySelectorAll(".tab button");
        for( i=0; i<tab.length; i++ )
        {
            tab[i].classList.remove("on");
            tab[i].addEventListener("click", tabMenu);
        }

        //첫번째 메뉴 열기
        tab[0].classList.add("on");

        //탭메뉴에 들어있는 콘텐츠 보이기
        tabcontent = obj.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) 
        {            
            if( i == 0 ) 
                tabcontent[i].style.display = "block";
            else
                tabcontent[i].style.display = "none";
        }

        document.getElementById("gotoTxt").addEventListener("click", gotoTxt);// 문자로 명함 보내기
        document.getElementById("gotoKakao").addEventListener("click", gotoKakao);//카카오로 
        //
        document.getElementById("sendTxt").addEventListener("click", sendTxt);
        
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




    //문자로 명함 보내기 방법 선택하기
    function gotoTxt(e){

        // var inClass = false;
        // var cn = -1;
        const tcnt = document.querySelector(".tabcontent .tcnt");
        console.log(`${tcnt}`);

        //버튼 활성화 확인하기
        let hasClass = -1;
        let cn = e.currentTarget.className.split(" ");
        for( let i=0; i<cn.length; i++ )
        {
            if( cn[i] === "on" )
                hasClass = i;
        }

        if( hasClass !== -1 )
        {console.log("111yes on" );
            e.currentTarget.classList.remove("on");
        }
        else
        {console.log("222no on" );
            e.currentTarget.classList.add("on");
        }


        hasClass = -1;
        let cc = tcnt.className.split(" ");
        for( let i=0; i<cc.length; i++ )
        {
            if( cc[i] === "on" )
                hasClass = i;
        }

        if( hasClass !== -1 )
        {console.log("333yes on" );
            tcnt.classList.remove("on");
        }
        else
        {console.log("444no on" );
            tcnt.classList.add("on");
        }

        const gg = document.querySelector(".tabcontent .tcnt .guide");
        gg.addEventListener("click", enterPhone);
        gg.classList.add("on"); 



        // if( inClass )
        // {   
        //     var enterNum = document.getElementById("enterNum");

        //     this.classList.remove("on"); 
        //     enterNum.value = "";
        //     input_enable.classList.remove("on"); 
            
             
        //     tcnt[0].classList.remove("on");
        //     btn_sendTxt.classList.remove("on");
        // }
        // else
        // {
        //     this.classList.add("on");  

        //     //카카오버튼 활성화 버튼 확인하기
        //     var cx = btn_gotoKakao.className.split(" ");
        //     for( var i=0; i<cx.length; i++ )
        //     {
        //         if( cx[i] == "on" )//톡으로보내기가 선택되어 있는 경우
        //         {
        //             btn_gotoKakao.classList.remove("on"); 
        //         }
               
        //     }            
        //     tcnt[0].classList.add("on"); //콘텐츠 보이기
        //     input_enable.classList.add("on");
            
        // }   

    }

    //문자로 명함 보내기_ 번호 입력하기
    function enterPhone(e){

        console.log("guide" );

        e.currentTarget.classList.remove("on"); 

        const enterNum = document.getElementById("enterNum");

        enterNum.focus();
        document.getElementById("sendTxt").classList.add("on");
        //this
    }















