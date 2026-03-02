"use client";

import { useSearchParams, useRouter } from 'next/navigation'; // 1. 경로 수정
import projectData from "../../data/DB.json";
import { ProjectDataType } from "@/types/project.data";

import HelloEveryone from "@/components/HelloEveryone";
import MainItemWrap from "@/components/MainItemWrap";
import SelectNavList from '@/components/SelectNavList';
import ListItemWrap from '@/components/ListItemWrap';

export default function Home() {
	const router = useRouter();
	const searchParams = useSearchParams(); // 2. 훅을 통한 파라미터 참조

	// URL 정보 가져오기
	const currentView = searchParams.get('current');
	const categoryParam = searchParams.get('category');
	const selectedCats = categoryParam ? categoryParam.split(',') : ['all'];

	// 전체 데이터 가져오기
	const allProjects = projectData as ProjectDataType[];

	// 💡 탭 선택에 따른 필터링 로직
	const filteredProjects = allProjects.filter((item) => {
		// 1. 모두보기('all')인 경우 전체 반환
		if (selectedCats.includes('all')) return true;

		// 2. 프로젝트의 카테고리 중 하나라도 선택된 탭(selectedCats)에 포함되어 있는지 확인
		// item.category가 배열인 경우를 가정합니다.
		return item.category.some(cat => selectedCats.includes(cat.name));
	});

	// 홈 화면용 메인 프로젝트 (currentView가 없을 때 사용)
	const mainProjects = allProjects.filter(item => item.mainOpen);

	console.log("asdf================")

	const handleTabChange = (newList: string[]) => {
		const catString = newList.join(',');
		// 3. URL 업데이트
		router.push(`/?current=projects&category=${catString}`, { scroll: false });
	};

	return (
		<>
			{currentView === 'projects' ? (
				<>
					<SelectNavList
						selectedCategories={selectedCats}
						onChange={handleTabChange}
					/>
					{/* 필터링된 데이터를 넘겨줍니다 */}
					<ListItemWrap projects={filteredProjects} />
				</>
			) : (
				<>
					<HelloEveryone />
					<MainItemWrap projects={mainProjects} />
				</>
			)}
		</>
	);
}