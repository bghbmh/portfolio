    //'use strict';
    console.log(checkMobile());

    class CheckTagwithClassName{
        constructor(e) {

            this.tag = e.currentTarget.nodeName;// li 를 받고
            this.parent = e.currentTarget.parentNode; // 부모노드 찾고
            this.child = this.parent.querySelectorAll(this.tag);// 부모노드에 들어있는 li들 찾고 
        }

        cleanClassName(str){ //이름이 str인 클래스는 모두 삭제 
            //목록 중 on 남아있으면 우선 삭제
            for( let i=0; i<this.parent.childElementCount; i++ ) //개수
            {
                let cn = this.child[i].className.split(" ");
                for( let j=0; j<cn.length; j++ )
                {
                    if( cn[j] == str ) // on이 있으면
                        this.child[i].classList.remove(str); // on 삭제
                }           
            }    
        }

        findClassNameList(str)
        {
            for( let i=0; i<this.parent.childElementCount; i++ ) 
            {
                let cn = this.child[i].className.split(" ");
                for( let j=0; j<cn.length; j++ )
                {
                    if( cn[j] == str ) // on이 있으면//몇 번째에 있는지 확인
                    {   console.log("ccc on이 있으면 : " + j);
                        return i;
                    }
                }            
            } 

            return -1; 
        }

    }   


    function loadmain(mainBody){

        const btn_write = document.getElementsByClassName("write"); // 글남기기 버튼
        const btn_calltxt = document.getElementsByClassName("calltxt");
        const writePopup = document.querySelector(".writePopup");
        const calltxtPopup = document.querySelector(".calltxtPopup");
        
        for( let i=0; i<btn_write.length; i++ )
            btn_write[i].addEventListener("click", () => { openPopup(writePopup, mainBody); });
       
        for( let i=0; i<btn_calltxt.length; i++ )
            btn_calltxt[i].addEventListener("click", () => { openPopup(calltxtPopup, mainBody); });
       

        //입력창 모두 빈칸으로 만들기
        const input = document.querySelectorAll("input");
        for( let i=0; i<input.length; i++ )
            input[i].value = "";

        const txtarea = document.querySelectorAll("textarea");
        for( let i=0; i<txtarea.length; i++ )
            txtarea[i].value = "";

        
        if( mainBody.className === "subwrap")
        {
            console.log(" btn_write.length : " + btn_write.length ); 
            loadsub(mainBody);
        } 
        else
        {
            //버튼 연결
            document.getElementById("openSubPage").addEventListener("click", openPage);
            document.getElementById("closeSubPage").addEventListener("click", closePage);        
            document.getElementById("allItemSubPage").addEventListener("click", () => { openOtherLink("");}); 

            // 상단, 하는 일 수직 슬라이드 설정
            topsmallSlides(false);
        }
    }


    function loadsub(mainBody){

        console.log("222 mainBody : " + mainBody.className ); 
        mainBody.getElementsByClassName("backPage")[0].addEventListener('click', () => { 
            window.history.back(); 
        });

        let subItems = document.querySelectorAll("#workResult div ul");          
        let t = decodeURIComponent(location.hash);
        let selectedItem = t.split("#");
        selectedItem.splice(0, 1);
        let gather = []; 

        if( selectedItem.length === 0 )//넘어온 해시태그가 없으면
        {
            for( let x=0; x<subItems.length; x++ )
            {
                let parent = subItems[x].parentNode;
                parent.classList.add("show"); 
            } 

            return;
        }


console.log(" subItems gather.length : " + gather.length ); 
            console.log(subItems ); 
        for( let i=0; i<selectedItem.length; i++ ) //이전페이지에서 넘어온 해시태그 수만큼 반복
        {
            console.log(" selectedItem[i] : " + selectedItem[i] ); 

            for(let j=0; j<subItems.length; j++ )
            {
                let ck = subItems[j].childNodes;
                let isThere = false;

                //해시태그 같은 내용이 있는지 찾고
                for( let k=0; k<ck.length; k++ )
                {  
                    if( selectedItem[i] === ck[k].innerHTML )
                    {
                        console.log(`${i}_1------ :  ${selectedItem[i]} ==> ${ck[k].innerHTML}` );
                        isThere = true; //같은 해시태그 있으면
                    }
                }

                if( isThere )
                {
                    if( i==0 )// 첫 번째 해시태그와 같은 내용이 있을경우 배열에넣어두고
                    {
                        let z = gather.length;
                        gather.push(j);// gather 배열에 하나씩 넣어두고

                    console.log(`${i}_2------ : ${z},,,  ${gather[gather.length-1]} ==> ${j}` );
                    }
                    else // 두 번째부터는 겹치는게 있는지 확인하고 넣기
                    {
                        let nope = true;
                        for( let y=0; y<gather.length; y++ )
                        {                            
                            if( gather[y] === j )
                            {
                                nope = false;
                                //break;
                            }
                        }

                        if( nope ) // 같은게 없다면 배열에 넣어두기
                        {
                            gather.push(j);
                            console.log(`${i}_2------ :  ${gather[gather.length-1]} == ${j}` );
                        } 
                    }
                }
            }
        } 

        for( let x=0; x<gather.length; x++ )
        {
            let ck = subItems[gather[x]].childNodes;
            console.log(`${gather[x]}_------ ` );

            for( let k=0; k<ck.length; k++ )
                console.log(`  ${k} : ${ck[k].innerHTML}` );

            //모아두 배열만 보이게 하기
            let parent = subItems[gather[x]].parentNode;
            parent.classList.add("show"); 
        } 

    }




    let timerID = null;

    function openPage(){ 

        //서브페이지 연결
        const topMargin = document.querySelector("header").clientHeight;
        const subpage_cnt = document.getElementById("subpage_cnt");

        subpage_cnt.classList.add("on");

        // 클릭하면 일단...세로가 길어지고, 나중에 아래쪽 가로길이가 채워지고 
        let inClass = true;
        let higher = 6;
        timerID = setTimeout(spreadXY, 300, higher, inClass, topMargin, subpage_cnt);

        //안에 있는 요소들 연결하기
        const goShow = document.querySelectorAll(".goShow li");
        //const mct = document.getElementsByClassName("mainContents");
        const btn_backPage = document.getElementsByClassName("backPage");
        const btn_closeDetail = document.getElementsByClassName("closeDetail");
        const cntList = document.querySelectorAll(".cntList > div");

        for( let i=0; i<goShow.length; i++ )
        { // console.log(i);
            goShow[i].addEventListener("click", openMainContent); 
            btn_backPage[i].addEventListener("click", closeMainBody);
        }

        for( let j=0; j<btn_closeDetail.length; j++ )
            btn_closeDetail[j].addEventListener("click", closeMainBody); 

        for( let k=0; k<cntList.length; k++ )
            cntList[k].addEventListener("click", openDetail); 

        console.log("cntList.length : " + cntList.length);
    }


    function closePage(){

        //서브페이지 연결
        const topMargin = document.querySelector("header").clientHeight;
        const subpage_cnt = document.getElementById("subpage_cnt");

        let inClass = false;
        let higher = 0;
        timerID = setTimeout(spreadXY, 30, higher, inClass, topMargin, subpage_cnt);
    }


    function spreadXY(higher, inClass, topMargin, subpage_cnt)
    {
        let h = subpage_cnt.clientHeight;
        let x;

        if( inClass )
        {   
            if( higher <= 6 )
            {  
                higher--;
                if( higher == 0 ) 
                {
                    clearTimeout(timerID);
                    inClass = null;
                    subpage_cnt.style.top = ( topMargin + 20) + "px";
                    return;
                }                
            }
        }
        else
        {             
            if( higher >= 0 )
            {                   
                higher++;  
                if( higher == 6 ) 
                {
                    clearTimeout(timerID);       
                    subpage_cnt.style.top = ( topMargin + h + 20) + "px";
                    subpage_cnt.classList.remove("on");
                    return;
                }                              
            }
        }

        subpage_cnt.style.top = (h/5 * higher) + "px";
        setTimeout(spreadXY, 30, higher, inClass, topMargin, subpage_cnt);

    }


    function openMainContent(e) { //ul, li를 사용함

        let t = new CheckTagwithClassName(e);
        t.cleanClassName("on");

        // 클릭한 li 에  on 붙이기   console.log(`tag : ${t.tag},,, parent : ${t.parent},,, child : ${t.child}`); 
        e.currentTarget.classList.add("on");
        let idx = t.findClassNameList("on"); 

        if( idx < 0 ) return; 

        document.getElementsByClassName("mainContents")[idx].classList.add("on");
        const ss = document.getElementsByClassName("mainContents")[idx].querySelector(".selectedItemSubPage");  
        const ttt = ss.getAttribute("data-mainSelected"); 
        ss.addEventListener("click", () => { openOtherLink(ttt); });         

        console.log(" ttt  : ");
        console.log(ttt);
    }


    function openDetail(e) {

        let t = new CheckTagwithClassName(e);
        t.cleanClassName("on");

        console.log(`tag : ${t.tag},,, parent : ${t.parent},,, child : ${t.child}`);        
        
        const grandparent = t.parent.parentNode; // mainContent 노드 찾아오기
        const subDetail = grandparent.querySelectorAll(".subDetail");        

        // 자세히 보려고 클릭한 콘텐츠 선택, 몇번째인지 순서 확인하기
        e.currentTarget.classList.add("on");   
        let idx = t.findClassNameList("on");     
        console.log("========== idx : " + idx ); 

        if( idx < 0 ) return; 

        subDetail[idx].classList.add("on");     
        const hashtag = subDetail[idx].querySelector(".hashtag");
        const tag = hashtag.children; 
        

        const ss = subDetail[idx].querySelector(".selectedItemSubPage");
        ss.addEventListener("click", () => { openOtherLink(tag); });                    
 
        console.log(" ttt  : ");
        console.log(tag);

    }



    function closeMainBody(e){
        let parent = e.currentTarget.parentNode;
        
        let cn = parent.className.split(" ");
        for( let j=0; j<cn.length; j++ )
        {
            if( cn[j] == "on" )
            {
                //console.log("closeMainBody  : " + j);
                parent.classList.remove("on");
            }
        }   
    }




    function openOtherLink(ht){

        let _type = typeof ht;
        let tag = "#";

        if( _type === "string" )
        {
            if( ht === "" ) tag = ht; 
            else tag += ht;
        }
        else if( _type === "object" ) //  && Array.isArray(ht)
        {
            for( let i=0; i<ht.length; i++ )
            {    
                tag += ht[i].innerHTML;
                if( i < ht.length-1 ) tag += "#"; //마지막 단어에는 # 안붙임
            }
        }

        console.log("555 _url  : " + "workResult.html" + tag );
        location.href = "workResult.html" + tag ;        
    }



    window.addEventListener("load", loadWindow);
    //window.addEventListener("scroll", resizeImgFromScroll);//상단 인물 이미지 스크롤_리사이징 설정

    function loadWindow(){

        const wrap = document.querySelector(".wrap");
        const subwrap = document.querySelector(".subwrap");

        console.log(`wrap : ${wrap}... subwrap : ${subwrap}`);

        if( wrap != null ) 
        {  
            
            loadmain(wrap);
        }
        else if( subwrap != null )
        {
            console.log("subwrap");
            loadmain(subwrap);

        }
    }











