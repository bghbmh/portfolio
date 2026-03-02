"use client";

import React from 'react';
import { MAIN_CATEGORY } from '@/types/config'; // 데이터 경로에 맞게 수정
import './SelectNavList.scss';

interface Props {
	selectedCategories: string[]; // ['all'] 또는 ['웹', 'UI'] 형태
	onChange: (newList: string[]) => void;
}

export default function SelectNavList({ selectedCategories, onChange }: Props) {
	// 1. '알 수 없음' 제외한 목록 생성
	const categoryList = MAIN_CATEGORY.filter(cat => cat.type !== 6);

	// 현재 무엇이 선택되어 있는지 확인 (첫 번째 요소 기준)
	const currentCategory = selectedCategories[0] || "all";

	const handleToggle = (value: string) => {
		let newList = [...selectedCategories];

		if (value === "all") {
			// '모두보기' 클릭 시 초기화
			newList = ["all"];
		} else {
			// 기존에 'all'이 있었다면 제거
			newList = newList.filter(item => item !== "all");

			if (newList.includes(value)) {
				// 이미 선택된 경우 제거
				newList = newList.filter(item => item !== value);
			} else {
				// 선택되지 않은 경우 추가 (앞에 추가 - unshift와 동일)
				newList = [value, ...newList];
			}

			// 아무것도 선택 안 되면 다시 'all'로 복구
			if (newList.length === 0) newList = ["all"];
		}

		onChange(newList);
	};

	return (
		<nav className="select-nav-list">
			{/* 모두보기 버튼 */}
			<label className={`btn ${selectedCategories.includes('all') ? 'active' : ''}`}>
				<input
					type="checkbox"
					checked={selectedCategories.includes('all')}
					onChange={() => handleToggle('all')}
				/>
				모두보기
			</label>

			{/* 카테고리 반복 */}
			{categoryList.map((cat) => (
				<label
					key={cat.type}
					className={`btn ${selectedCategories.includes(cat.name) ? 'active' : ''}`}
				>
					<input
						type="checkbox"
						checked={selectedCategories.includes(cat.name)}
						onChange={() => handleToggle(cat.name)}
					/>
					{cat.name}
				</label>
			))}
		</nav>
	);
}