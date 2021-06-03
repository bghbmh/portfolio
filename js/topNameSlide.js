    'use strict';

    let workTimeID = null;
    let jobTimeID = null;
    
    function topsmallSlides(popBg){  //console.log("111");

        const work = document.getElementById("work");
        const workingChild = work.querySelectorAll("li");

        const job = document.getElementById("job");
        const jobChild = job.querySelectorAll("li");        

        if( popBg )
        {  
            clearInterval(workTimeID);
            clearInterval(jobTimeID);
            
            workTimeID = null;
            jobTimeID = null;
            return;
        }

        work.addEventListener("click", () => { checkTimeID(work, workingChild); });
        job.addEventListener("click", () => { checkTimeID(job, jobChild); });

        workTimeID = setInterval(changeMarginTop, 3000, work, workingChild);
        jobTimeID = setInterval(changeMarginTop, 12000, job, jobChild);
    }


    function checkTimeID(obj, child){

        let id = obj.getAttribute("id") + "TimeID";  // console.log(`.${id}.. ${obj.getAttribute("id")}`);

        if( id === "workTimeID" )
        {
            if( workTimeID != null )
            {                
                clearInterval(workTimeID);
                workTimeID = null;  
            }
            else
            {  // console.log('22////' + workTimeID);
                workTimeID = setInterval(changeMarginTop, 3000, obj, child);
            }
        }
        
        if( id === "jobTimeID" )
        {
            if( jobTimeID != null )
            {                
                clearInterval(jobTimeID);
                jobTimeID = null;
            }
            else
            {  // console.log('44////' + jobTimeID);
                jobTimeID = setInterval(changeMarginTop, 12000, obj, child);
            }
        }
        
    }


    function changeMarginTop(obj, child){

        if( child[0].style.marginTop.length === 0 )
            child[0].style.marginTop = 0;

        let mtop = parseInt(child[0].style.marginTop);
        mtop -= obj.clientHeight;

        if(  mtop <= -(obj.clientHeight * child.length)  )
            child[0].style.marginTop = 0;
        else      
            child[0].style.marginTop = mtop + "px";

    }

// =======================================================================






