    'use strict';

    let timeCheck; 

    function openPopup(obj, mainbody)
    {
        console.log(`obj.className :  ${obj.className}, mainbody.classname : ${mainbody.className} ` );

        set_popup(true); // black bg 깔고

        timeCheck = -1; 

        const popX = check_element_positionX();
        const scroll_top_holder = check_element_positionY(); //스크롤 위치 확인

        obj.style.display = "block";  //팝업 열고

        obj.style.top = (window.innerHeight - obj.clientHeight)/2 + "px"; // 팝업 위치 정하고
        obj.style.left = (window.innerWidth - obj.clientWidth)/2 + "px";

        //뒷배경 멈춤
        mainbody.style.position = "fixed"; 
        mainbody.style.top = -scroll_top_holder + "px";

        obj.querySelector(".closePopup").addEventListener("click", (e) => { closePopup(obj, mainbody); });

        set_input(obj, mainbody);

    }

    function set_input(obj, mainbody){
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

            obj.querySelector("#agreeBox").addEventListener("click", (e) => { boxChecking(e, obj); });
        }

        //버튼 활성화
        
        obj.querySelector(".submit").addEventListener("click", () => { 
            alert("준비중"); 
        });

        if( mainbody.className !== "subwrap")
            topsmallSlides(true);
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


    
    //팝업 닫기 버튼 설정
    function closePopup(obj, mainbody){   

        obj.style.display = "none";

        set_popup(false);

        mainbody.style.position = "relative";
        let scroll_top_holder = mainbody.style.top.replace(/[^0-9]/g, "");

        mainbody.style.top = "initial";
        document.body.scrollTop = scroll_top_holder;
        document.documentElement.scrollTop = scroll_top_holder;


        //슬라이드 start again
        if( mainbody.className !== "subwrap")
            topsmallSlides(false);

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

        document.getElementById("agreeBox").classList.remove("on");
           
    }
