
export let ct = {
	main : ["웹", "인쇄", "콘텐츠", "브랜딩", "react"],
	sub :  ["제작", "구축","리뉴얼" ,"유지보수", "sample" ],
	hash : ["디자인",
		"마크업",
		"모바일",
		"데스크탑",
		"반응형",
		"마케팅",
		"웹",
		"콘텐츠",
		"인쇄",
		"브랜딩",
		"ui-test"
	]
};

export let tempDB = "myList.json"; // testList.json

export let origin = location.origin; //https://bghbmh.github.io/main

export let filedburl = origin +location.pathname+'data/' + tempDB; 

export let imgfileurl = origin +location.pathname+'data/files/'; 

export let sampleurl = origin  +location.pathname +'data/sample/'; 
