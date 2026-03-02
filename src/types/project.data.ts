export interface CategoryItemType {
	name: string;
	type: string;
	label: "main" | "sub";
}

export interface ExtraInfoItemType {
	id: string;
	label: string;
	value: string;
}

export interface ExternalLinkType {
	id: string;
	type: string;
	label: string;
	url: string;
}

export interface DefaultFileType {
	alt: string;
	name: string;
	size: number;
	type: string;
	lastModified: number;
	url: string;
}

export interface MockupFileType {
	label: string;
	alt: string;
	name: string;
	size: number | null;
	type: string;
	lastModified: number | null;
	url: string;
}

// overview의 summary 내부 아이템 타입
export interface OverviewSummaryType {
	id: string;
	title: string;
	description: string;
}

export interface OverviewType {
	synopsis: string;
	summary: OverviewSummaryType[];
}


export interface ImageComparisonType {
	use: boolean;
	before: DefaultFileType[];
	after: DefaultFileType[];
}


export interface ProjectDataType {
	id: string | '';
	mainOpen: boolean;
	category: CategoryItemType[];
	hash: string[];
	title: string;
	description: string;
	overview: OverviewType;
	imageComparison: ImageComparisonType;
	tools: string[];
	extraInfo: ExtraInfoItemType[];
	titleImage: DefaultFileType[];
	subimage: DefaultFileType[];
	mockup: MockupFileType[];
	externalLink: ExternalLinkType[];
	projectNum: number;
	currentState: string;
	startDate: string;
	endDate: string;
	member: any[];
	registerDate: number;
	modifyDate: number[];
}

export const DEFAULT_PROJECT_DATA: ProjectDataType = {
	id: '',
	mainOpen: false,
	category: [
		{ type: "6", name: "알 수 없음", label: "main" },
		{ type: "6", name: "알 수 없음", label: "sub" }
	],
	hash: [],
	title: "",
	description: "",
	overview: { synopsis: "", summary: [] },
	imageComparison: { use: false, before: [], after: [] },
	tools: [],
	extraInfo: [],
	titleImage: [],
	subimage: [],
	mockup: [],
	externalLink: [],
	projectNum: 0,
	currentState: "unknown",
	startDate: "",
	endDate: "",
	member: [],
	registerDate: 0,
	modifyDate: []
};