	
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