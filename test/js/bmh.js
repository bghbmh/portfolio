
    console.log(checkMobile());

    //메인페이지, 이벤트 등록을 위한 변수
    var working;
    var workingID = null;
    var workingChild;
    var job;
    var jobID = null;
    var jobChild;

    var wrap = null; // 메인페이지 wrap
    var btn_openSubPage; //서브페이지 여는 버튼
    var btn_write; // 글남기기 버튼
    var btn_calltxt; // 전화하기 버튼
    

    //서브페이지, 이벤트 등록을 위한 변수
    var subwrap = null;
    var btn_closeSubPage;
    var headerHeight;
    var subpage_cnt;
    var goShow;
    var mct; //mainContent
    var btn_backPage;
    var btn_closeDetail;
    var cntList;
    var input;
    var txtarea;
    var btn_agreeBox;
    var btn_allItemSubPage;
    var btn_mainSelectedItemSubPage;
    var selectedItem = null;

    //필요해보이는 상수들이나... 변수..숫자로 쓸.. 
    var scroll_top_holder = null;
    var resize_start; 
    var scrollY = check_element_positionY();

    var timerID = null;
    var inClass = null;
    var higher = -1;

    window.addEventListener("load", loadWindow);
    //window.addEventListener("scroll", resizeImgFromScroll);//상단 인물 이미지 스크롤_리사이징 설정

    function loadWindow(){

        wrap = document.querySelector(".wrap");
        subwrap = document.querySelector(".subwrap");

        if( wrap != null ) 
        {  
            console.log("mainwrap");
            loadmain();
        }
        else if( subwrap != null )
        {
            console.log("subwrap");
            loadsub();

        }
    }
    



    function loadmain(){

        // 상단, 하는 일 수직 슬라이드 설정
        topleftSlides();
        toprightSlides();

        btn_write = document.getElementsByClassName("write"); // 글남기기 버튼
        btn_calltxt = document.getElementsByClassName("calltxt");
        for( var i=0; i<btn_write.length; i++ )
            btn_write[i].addEventListener("click", openWritePopup);
       
        for( var i=0; i<btn_calltxt.length; i++ )
            btn_calltxt[i].addEventListener("click", openCalltxtPopup);
       

        //서브페이지 연결
        headerHeight = document.querySelector("header");
        subpage_cnt = document.getElementById("subpage_cnt");
        //input = document.querySelectorAll(".guide");
        input = document.querySelectorAll("input");
        for( var i=0; i<input.length; i++ )
        {
            input[i].value = "";
            input[i].addEventListener("click", enableInputFromGuide);
        }

        txtarea = document.querySelectorAll("textarea");
        for( var i=0; i<txtarea.length; i++ )
        {
            txtarea[i].value = "";
            txtarea[i].addEventListener("click", enableInputFromGuide);
        }
        

        //버튼 연결
        btn_openSubPage = document.getElementById("openSubPage");
        btn_openSubPage.addEventListener("click", openPage);

        btn_closeSubPage = document.getElementById("closeSubPage");
        closeSubPage.addEventListener("click", closePage);

        btn_agreeBox = document.getElementById("agreeBox");
        btn_agreeBox.addEventListener("click", boxChecking);

        btn_allItemSubPage = document.getElementById("allItemSubPage");
        btn_allItemSubPage.addEventListener("click", openLink);

        
        
    }

    function loadsub(){

        btn_write = document.getElementsByClassName("write"); // 글남기기 버튼
        btn_calltxt = document.getElementsByClassName("calltxt");
        btn_backPage = document.getElementsByClassName("backPage");
        btn_backPage[0].addEventListener('click', () => { window.history.back(); });

        for( var i=0; i<btn_write.length; i++ )
            btn_write[i].addEventListener("click", openWritePopup);
       
        for( var i=0; i<btn_calltxt.length; i++ )
            btn_calltxt[i].addEventListener("click", openCalltxtPopup);
       

        input = document.querySelectorAll("input");
        for( var i=0; i<input.length; i++ )
        {
            input[i].value = "";
            input[i].addEventListener("click", enableInputFromGuide);
        }

        txtarea = document.querySelectorAll("textarea");
        for( var i=0; i<txtarea.length; i++ )
        {
            txtarea[i].value = "";
            txtarea[i].addEventListener("click", enableInputFromGuide);
        }
               

        //버튼 연결

        btn_agreeBox = document.getElementById("agreeBox");
        btn_agreeBox.addEventListener("click", boxChecking);

        if( jobID != null )
        {   
            clearInterval(jobID);
            jobID = null;
        }
            
        if( workingID != null )
        {   
            clearInterval(workingID);
            workingID = null;
        }

        

        var subItems = document.querySelectorAll("#workResult div ul");          
        var t = decodeURIComponent(location.hash);
        var selectedItem = t.split("#");
        selectedItem.splice(0, 1);
        var gather = [];

 

        for( i=0; i<selectedItem.length; i++ ) 
        {
            console.log(" selectedItem[i] : " + selectedItem[i] ); 
            for(var j=0; j<subItems.length; j++ )
            {
                var ck = subItems[j].childNodes;
                var noThere = true;

                for( var k=0; k<ck.length; k++ )
                {  //console.log("------ same :  " + selectedItem[i]  );
                    if( selectedItem[i] == ck[k].innerHTML ) noThere = false;
                }

                if( i==0)
                {
                    if( noThere ) gather[gather.length] = j;
                }
                else
                {
                    if( !noThere )
                    { //console.log("----- There is subItems :  " + j  );
                        var nope = false;
                        for( var y=0; y<gather.length; y++ )
                        {                            
                            if( gather[y] == j )
                            {
                                nope = true;
                                break;
                            }
                        }

                        if( nope ) gather.splice(j, 1);
                    }
                        
                }

            }

            console.log(" gather.length : " + gather.length );  
        } 

        for( var x=0; x<gather.length; x++ )
        {
            var parent = subItems[gather[x]].parentNode;
            parent.style.display = "none"; 
        } 

    }



    function openWritePopup(){ 
        var writePopup = document.querySelector(".writePopup");

        if( wrap != null ) 
        {  
            console.log("mainwrap");
            openPopup(writePopup, wrap);
        }
        else if( subwrap != null )
        {
            console.log("subwrap");
            openPopup(writePopup, subwrap);

        }
        
    }

    function openCalltxtPopup(){
        var calltxtPopup = document.querySelector(".calltxtPopup");

        if( wrap != null ) 
        {  
            console.log("mainwrap");
            openPopup(calltxtPopup, wrap);
        }
        else if( subwrap != null )
        {
            console.log("subwrap");
            openPopup(calltxtPopup, subwrap);

        }

    }



    function openPage(){ 

        subpage_cnt.classList.add("on");

        // 클릭하면 일단...세로가 길어지고, 나중에 아래쪽 가로길이가 채워지고  
        higher = 5;   
        inClass = true;   
        timerID = setTimeout("spreadXY(higher--, inClass)", 300);

        goShow = document.querySelectorAll(".goShow li");
        mct = document.getElementsByClassName("mainContents");
        btn_backPage = document.getElementsByClassName("backPage");
        btn_closeDetail = document.getElementsByClassName("closeDetail");
        cntList = document.querySelectorAll(".cntList > div");



        for( var i=0; i<goShow.length; i++ )
        {
            // console.log(i);
            goShow[i].addEventListener("click", openMainContent); 
            btn_backPage[i].addEventListener("click", closeMainContent);  
        }

        for( var j=0; j<btn_closeDetail.length; j++ )
        {
            btn_closeDetail[j].addEventListener("click", closeMainBody); 
        }

        for( var k=0; k<cntList.length; k++ )
        {
            console.log("cntList.length : " + cntList.length);
            cntList[k].addEventListener("click", openDetail); 
        }

    }

    function closePage(){

        higher = 1;
        timerID = setTimeout("spreadXY(higher++)", 300);
    }

    function openDetail(e) {

        var tag = e.currentTarget.nodeName;
        var parent = e.currentTarget.parentNode; //cntList 노드 찾아오기
        var child = parent.querySelectorAll(tag);
        
        var grandparent = parent.parentNode; // mainContent 노드 찾아오기
        var subDetail = grandparent.querySelectorAll(".subDetail");
        var idx = -1;

        //console.log("openDetail tag : " + tag);

        // 일단 on 우선 삭제
        for( var i=0; i<parent.childElementCount; i++ ) //cntList의 목록 개수
        {
            var cn = child[i].className.split(" ");
            for( var j=0; j<cn.length; j++ )
            {
                if( cn[j] == "on" ) // on이 있으면
                    child[i].classList.remove("on"); // on 삭제
            }            
        }


        e.currentTarget.classList.add("on");        
        for( var i=0; i<parent.childElementCount; i++ ) //cntList의 목록 개수
        {
            var cn = child[i].className.split(" ");
            for( var j=0; j<cn.length; j++ )
            {
                if( cn[j] == "on" ) // on이 있으면
                {
                    idx = i; //몇 번째에 있는지 확인
                }
            }            
        }

        if( idx != -1 )
        {
            subDetail[idx].classList.add("on");     
            var hashtag = subDetail[idx].querySelector(".hashtag");
            var tag = hashtag.children; 
            var ht = "";

            for( i=0; i<tag.length; i++ )
            {               

                if( i == tag.length-1 )
                {
                    ht = ht + tag[i].innerHTML;
                }
                else
                {
                    ht = ht + tag[i].innerHTML + "#";
                }
            }

            var ss = subDetail[idx].querySelector(".selectedItemSubPage");
            ss.addEventListener("click",  event => openSubLink(ht));  
                      
     
            console.log("ht : " + ht ); 
        }

    }

    function openMainContent(e) { //ul, li를 사용함

        var tag = e.currentTarget.nodeName; // li 를 받고
        var parent = e.currentTarget.parentNode; // 부모노드 찾고
        var child = parent.querySelectorAll(tag); // 부모노드에 들어있는 li들 찾고

        // 클릭한 li 에  on 붙이기
        e.currentTarget.classList.add("on");
        for( var i=0; i<parent.childElementCount; i++ )
        {
            var cn = child[i].className.split(" ");
            for( var j=0; j<cn.length; j++ )
            {
                if( cn[j] == "on" )
                {                        
                    //mct[i].style.display = "block";
                    mct[i].classList.add("on");
                    var ss = mct[i].querySelector(".selectedItemSubPage");  
                    var ttt = ss.getAttribute("data-mainSelected"); 
                    ss.addEventListener("click", event => openSubLink(ttt)); 
                    
    
                    console.log(" ttt  : " + ttt);
                }
            }
            
        }


    }

    function closeMainContent(e) {

        closeMainBody(e);

        for( var i=0; i<mct.length; i++ )
        {
            goShow[i].classList.remove("on"); 
            mct[i].classList.remove("on"); 
        } 
    }

    

    //snowID = setInterval("gogo(zzz++)", 1000);

    function spreadXY(n, ic)
    {

        var h = subpage_cnt.clientHeight;

        if( ic )
        {   
            if( n == 0 ) 
            {
                clearTimeout(timerID);
                inClass = null;
                subpage_cnt.style.top = ( headerHeight.clientHeight + 20) + "px";

            }
            else if( n < 6 )
            {                
                subpage_cnt.style.top = (h/5 * n) + "px";
                snowID = setTimeout("spreadXY(higher--, inClass)", 30);
            }

        }
        else
        { 
            //console.log(" 22 inClass : " + ic); 

            if( n == 6 ) 
            {
                clearTimeout(timerID);
                inClass = null;                
                subpage_cnt.style.top = ( headerHeight.clientHeight + h + 20) + "px";
                subpage_cnt.classList.remove("on");
            }
            else if( n > 0 )
            {                

                subpage_cnt.style.top = (h/5 * n) + "px";
                snowID = setTimeout("spreadXY(higher++, inClass)", 30);
            }                 

        }

    }




    function closeMainBody(e){
        var parent = e.currentTarget.parentNode;
        
        var cn = parent.className.split(" ");
        for( var j=0; j<cn.length; j++ )
        {
            if( cn[j] == "on" )
            {
                //console.log("closeMainBody  : " + j);
                parent.classList.remove("on");
            }
        }   
    }


    function enableInputFromGuide(e){

        var parent, next, guide;        

        //입력폼들의 안내글을 모두 보이게, 입력폼에 내용이 있을 때는 안내글 안보이게
        
        checkingGuide("INPUT");
        checkingGuide("TEXTAREA");
       
        console.log("11 : " + this.nodeName);

        //클릭한 입력폼의 안내글은 안보이게 하고
        parent = this.parentNode;
        next = this.nextElementSibling;
        guide = parent.querySelector(next.nodeName);
        guide.style.display = "none";

        this.focus();
    }


    function checkingGuide(tag){

        var parent, next, guide;        

        //입력폼들의 안내글을 모두 보이게, 입력폼에 내용이 있을 때는 안내글 안보이게
        var ipt = document.getElementsByTagName(tag);

        //console.log("11 : " + ipt.length);

        for( var j=0; j<ipt.length; j++ )
        {            
            parent = ipt[j].parentNode;
            next = ipt[j].nextElementSibling;
            guide = parent.querySelector(next.nodeName);

            //console.log("22 : " + next.nodeName);
            
            var cn = guide.className.split(" ");

            //console.log("33 : " + cn.length);

            for( var k=0; k<cn.length; k++ )
            {
                if( cn[k] == "guide" )
                {
                    console.log("44 : " + cn[k]);

                    if( ipt[j].value != "" )
                        guide.style.display = "none";
                    else
                        guide.style.display = "block";
                }
            }
            
        }        

    }

    //박스 체킹 여부 확인
    function boxChecking(e){

        var cn = this.className.split(" ");

        for( var i=0; i<cn.length; i++)
        {
            if( cn[i] == "on")
            {
                this.classList.remove("on"); 
            }
            else
            {
                this.classList.add("on"); 
            }
        }

    }

    function openLink(){

        location.href = "workResult.html";
    }

    function openSubLink(ht){

        //선택된 항목만 골라 보기==========================

        // =========================

        location.href = "workResult.html" +"#"+ ht ;

        //location.href = "workResult.html" +"#"+ this.getAttribute("data-mainSelected") ;






    }















