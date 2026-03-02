// /constants/config.ts

export const NO_ITEM_CONFIG = {
	member: { src: "/img/common/icon-svg-no-user.svg", alt: "사용자 사진이 없음" },
	image: { src: "/img/common/icon-svg-no-image1.svg", alt: "이미지 없음" },
	sample: { src: "/img/common/icon-svg-no-sample.svg", alt: "샘플 없음" },
	EmpthImg: { src: "/img/common/icon-svg-folder-empth-image.svg", alt: "이미지 폴더가 비어있음" },
	EmpthMember: { src: "/img/common/icon-svg-folder-empth-member.svg", alt: "멤버 폴더가 비어있음" },
	EmpthItem: { src: "/img/common/icon-svg-folder-empth-item.svg", alt: "아이템 폴더가 비어있음" }
};

export const MAIN_CATEGORY = [
	{
		type: 6,
		name: "알 수 없음",
		icon: ''
	},
	{
		type: 1,
		name: "웹",
		icon: `icon-svg2-web`
	},
	{
		type: 2,
		name: "인쇄",
		icon: `icon-svg2-print`
	},
	{
		type: 3,
		name: "콘텐츠",
		icon: `icon-svg2-contents`
	},
	{
		type: 4,
		name: "브랜딩",
		icon: `icon-svg2-branding`
	},
	{
		type: 5,
		name: "UI",
		icon: `icon-svg2-me`
	}
];
export const SUB_CATEGORY = [
	{
		type: 6,
		name: "알 수 없음",
		icon: ''
	},
	{
		type: 1,
		name: "제작",
		icon: ''
	},
	{
		type: 2,
		name: "구축",
		icon: ''
	},
	{
		type: 3,
		name: "리뉴얼",
		icon: ''
	},
	{
		type: 4,
		name: "유지보수",
		icon: ''
	},
	{
		type: 5,
		name: "sample",
		icon: ''
	}
];

export const STATE_STEP = [
	{
		type: "unknown",
		name: "알수없음",
		icon: `icon-svg2-question-mark`
	},
	{
		type: "before",
		name: "진행전",
		icon: `icon-svg-warning-circle-line`
	},
	{
		type: "ongoing",
		name: "진행중",
		icon: `icon-svg-state-ongoing`
	},
	{
		type: "complete",
		name: "완료",
		icon: `icon-svg-check-circle-fill`
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
