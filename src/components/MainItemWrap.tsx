
import { ProjectDataType } from "@/types/project.data";
import MainItem from '@/components/MainItem';

import './mainItemWrap.scss';

interface props {
	projects: ProjectDataType[]
}

export default function MainItemWrap({ projects }: props) {
	return (
		<main className="main-item-wrap">
			{projects.map(item => (
				<MainItem key={item.id} item={item} />
			))}
		</main>
	);
}