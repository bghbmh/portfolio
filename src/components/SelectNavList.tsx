"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { MAIN_CATEGORY } from '@/types/config'; // 데이터 경로에 맞게 수정
import './SelectNavList.scss';

interface Props {
	selectedCategory: string; // ['all'] 또는 ['웹', 'UI'] 형태
	//onCategoryChange: (newList: string[]) => void;
}

export default function SelectNavList({ selectedCategory }: Props) {
	// '알 수 없음' 제외한 목록 생성
	const categoryList = [{ name: 'all', type: 0 }, ...MAIN_CATEGORY.filter(cat => cat.type !== 6)];
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => setIsScrolled(window.scrollY > 300);
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const [indicatorStyle, setIndicatorStyle] = useState({ left: 0 });
	// 각 탭 버튼들을 참조하기 위한 Ref
	const tabRefs = useRef<{ [key: string]: HTMLAnchorElement | null }>({});
	const navRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		const activeTab = tabRefs.current[selectedCategory];

		if (activeTab && navRef.current) {
			const { offsetLeft, offsetWidth } = activeTab;
			setIndicatorStyle({ left: offsetLeft + offsetWidth / 2 });

			// 2. 모바일 중앙 스크롤 로직
			const navContainer = navRef.current;
			const scrollLeft = offsetLeft - (navContainer.offsetWidth / 2) + (offsetWidth / 2);

			navContainer.scrollTo({
				left: scrollLeft,
				behavior: 'smooth' // 부드러운 스크롤 효과
			});
		}
	}, [selectedCategory]);

	return (
		<nav className={`select-nav-list ${isScrolled ? 'is-scrolled' : ''}`} ref={navRef}>
			{/* 움직이는 인디케이터 (붉은 점) */}
			<div
				className="moving-indicator"
				style={{ left: `${indicatorStyle.left}px` }}
			/>

			{/* 카테고리 반복 */}
			{categoryList.map((cat) => (
				<Link
					key={cat.name}
					ref={(el: HTMLAnchorElement | null) => {
						if (el) {
							tabRefs.current[cat.name] = el;
						}
					}}
					href={`/?current=projects&category=${cat.name}`}
					className={`btn ${selectedCategory === cat.name ? 'active' : ''}`}
					scroll={false}
				>
					{cat.name === 'all' ? '모두보기' : cat.name}
				</Link>
			))}
		</nav>
	);
}