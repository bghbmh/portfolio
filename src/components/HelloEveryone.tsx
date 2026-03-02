"use client";

import React, { useEffect, useRef } from 'react';

import { NAME } from '@/types/icon.data';

export default function HelloEveryone() {
	const svgRef = useRef<HTMLHeadingElement>(null);

	useEffect(() => {
		const svgs = svgRef.current?.querySelectorAll('svg');

		svgs?.forEach((svg, index) => {
			// 1. 설정값 계산
			const rotationCount = (index % 2 === 0) ? 2 : 1;
			const duration = `${rotationCount / 3}s`;
			const delay = `${index * 0.25}s`;
			(svg as SVGElement).style.animation = `name-svg-rotate ${duration} linear ${rotationCount} forwards ${delay}`;
		});
	}, []);

	return (
		<header>

			<h2 aria-label="박민희" ref={svgRef}>
				<span className="h2g x">
					<NAME.ㅂ /><NAME.ㅏ /><NAME.ㄱ /><NAME.ㅁ /><NAME.ㅣ /><NAME.ㄴ /><NAME.ㅎ /><NAME.ㅢ />
				</span>
				<span className="h2g x"><NAME.ㅂ /><NAME.ㅏ /><NAME.ㄱ /><NAME.ㅁ /><NAME.ㅣ /><NAME.ㄴ /><NAME.ㅎ /><NAME.ㅢ /></span>
				<span className="h2g color"><NAME.ㅂ /><NAME.ㅏ /><NAME.ㄱ /><NAME.ㅁ /><NAME.ㅣ /><NAME.ㄴ /><NAME.ㅎ /><NAME.ㅢ /></span>
				<span className="h2g x"><NAME.ㅂ /><NAME.ㅏ /><NAME.ㄱ /><NAME.ㅁ /><NAME.ㅣ /><NAME.ㄴ /><NAME.ㅎ /><NAME.ㅢ /></span>
			</h2>

		</header>
	);
};