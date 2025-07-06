

export const NO_ITEM_CONFIG = {
	member : "/assets/img/common/icon-svg-no-user.svg",
	image : "/assets/img/common/icon-svg-no-image1.svg",
	sample : "/assets/img/common/icon-svg-double-paper.svg",
	FolderEmpthImg : "/assets/img/common/icon-svg-folder-empth-image.svg",
	FolderEmpthMember : "/assets/img/common/icon-svg-folder-empth-member.svg",
	FolderEmpthItem : "/assets/img/common/icon-svg-folder-empth-item.svg"
};

export const MAIN_CATEGORY = [
	{
		type : 1,
		name : "웹",
		icon : `icon-svg2-web`
	},
	{
		type : 2,
		name : "인쇄",
		icon : `icon-svg2-print`
	},
	{
		type : 3,
		name : "콘텐츠",
		icon : `icon-svg2-contents`
	},
	{
		type : 4,
		name : "브랜딩",
		icon : `icon-svg2-branding`
	},
	{
		type : 5,
		name : "UI",
		icon : `icon-svg2-me`
	}
];
export const SUB_CATEGORY = [
	{
		type : 1,
		name : "제작"
	},
	{
		type : 2,
		name : "구축"
	},
	{
		type : 3,
		name : "리뉴얼"
	},
	{
		type : 4,
		name : "유지보수"
	},
	{
		type : 5,
		name : "sample"
	} 
];

export const STATE_STEP =  [
	{
		key : "before",
		text : "진행전",
		icon : `<i class="icon-svg-warning-circle-line" aria-hidden="true"></i>`
	},
	{
		key : "ongoing",
		text : "진행중",
		icon : `<i class="icon-svg-state-ongoing" aria-hidden="true"></i>`
	},
	{
		key : "complete",
		text : "완료",
		icon : `<i class="icon-svg-check-circle-fill" aria-hidden="true"></i>`
	},
	{
		key : "unknown",
		text : "알수없음",
		icon : `<i class="icon-svg2-question-mark" aria-hidden="true"></i>`
	}
]

export const HASH_LIST = ["디자인",
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
	];

export const ORIGIN = location.origin; 
