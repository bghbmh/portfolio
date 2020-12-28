
    console.log(checkMobile());

    //메인페이지, 이벤트 등록을 위한 변수
    

    function topleftSlides(){  //console.log("111");
        working = document.getElementById("work");
        workingChild = working.querySelectorAll("li");
        workingChild[0].style.marginTop = "0";

        working.onclick = function(){

            if( workingID != null )
            {
                clearInterval(workingID);
                workingID = null;
            }
            else
            {
                workingID = setInterval("leftkeepGoing()", 3000);
            }
        }

        workingID = setInterval("leftkeepGoing()", 3000);

    }

    function leftkeepGoing(){

        if( popBg != null )
        {   //console.log("popBg != null...." + workingID);
            clearInterval(workingID);
            workingID = null;
        }
        else
        {

            var mtop = parseInt(workingChild[0].style.marginTop);
            mtop -= working.clientHeight;

            if(  mtop <= -(working.clientHeight * workingChild.length)  )
            {
                workingChild[0].style.marginTop = 0;
                //console.log("11mtop.."+mtop);
            }
            else
            {            
                workingChild[0].style.marginTop = mtop + "px";
                //console.log("22mtop.."+mtop);
            }
        }

    }

    function toprightSlides(){
        job = document.getElementById("myJob");
        jobChild = job.querySelectorAll("li");
        jobChild[0].style.marginTop = "0";

        job.onclick = function(){

            if( jobID != null )
            {
                clearInterval(jobID);
                jobID = null;
            }
            else
            {
                jobID = setInterval("rightkeepGoing()", 12000);
            }
        }

        jobID = setInterval("rightkeepGoing()", 12000);

    }

    function rightkeepGoing(){
        if( popBg != null )
        {
            clearInterval(jobID);
            jobID = null;
        }
        else
        {

            var mtop = parseInt(jobChild[0].style.marginTop);
            mtop -= job.clientHeight;

            if(  mtop <= -(job.clientHeight * jobChild.length)  )
            {
                jobChild[0].style.marginTop = 0;
                //console.log("11mtop.."+mtop);
            }
            else
            {            
                jobChild[0].style.marginTop = mtop + "px";
                //console.log("22mtop.."+mtop);
            }
        }

    }

// =======================================================================






