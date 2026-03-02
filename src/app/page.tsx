import fs from "fs/promises";
import { DB_PATH } from '@/constants/paths';
import { ProjectDataType } from "@/types/project.data";

import HelloEveryone from "@/components/HelloEveryone";
import MainItemWrap from "@/components/MainItemWrap";
import SelectNavList from '@/components/SelectNavList';
import ListItemWrap from '@/components/ListItemWrap';

/**
 * 캐시 무효화 
 * force-dynamic: 이 설정을 넣으면 Next.js가 빌드 시점에 페이지를 정적으로 고정하지 않고, 사용자가 접속할 때마다 매번 서버에서 새로 계산하게 만듭니다.

revalidate = 0: 캐시를 아예 보관하지 말라는 뜻입니다.
 */
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>; // 타입을 Promise로 감싸줍니다.;
}) {

	// 사용하기 전에 await로 기다려야 합니다.
	const resolvedSearchParams = await searchParams;

	// 서버에서 직접 최신 DB 파일 읽기
	const fileContent = await fs.readFile(DB_PATH, "utf-8");
	const allProjects: ProjectDataType[] = JSON.parse(fileContent);
	allProjects.sort((a, b) => (b.registerDate || 0) - (a.registerDate || 0));

	// URL 파라미터 읽기
	const currentView = resolvedSearchParams.current;
	const selectedCat = (resolvedSearchParams.category as string) || 'all';

	// 필터링 로직 수정 (단일 값 비교로 성능/가독성 향상)
	const filteredProjects = allProjects.filter((item) => {
		if (selectedCat === 'all') return true;
		return item.category.some(cat => cat.name === selectedCat);
	});

	// 홈 화면용 메인 프로젝트 (currentView가 없을 때 사용)
	const mainProjects = allProjects.filter(item => item.mainOpen);

	console.log("서버에서 데이터를 읽었습니다:", allProjects.length, "건");


	return (
		<>
			{currentView === 'projects' ? (
				<>
					<SelectNavList selectedCategory={selectedCat} />
					{/* 필터링된 데이터를 넘겨줍니다 */}
					<ListItemWrap projects={filteredProjects} />
				</>
			) : (
				<>

					<section className="hello">
						<HelloEveryone />
						<div className="contents-wrap">
							<div className="job">
								<p><small>UXUI</small> <strong>design</strong></p>
								<span>+</span>
								<p><small>UI</small> <strong>development</strong></p>
							</div>
							<div className="overview">
								UX/UI 디자이너이자 웹 퍼블리셔로, 구조 설계와 반응형 UI, 접근성 개선에 강점을 갖고 있습니다. Figma, HTML/CSS, JavaScript를 주로 사용하며, 사용자 경험 중심의 문제 해결에 집중합니다.
							</div>
						</div>

						<section className="bg text-animation">
							<div className="textLoop"></div>
						</section>

						<div className="mouse"></div>
					</section>
					<MainItemWrap projects={mainProjects} />
				</>
			)}
		</>
	);
}