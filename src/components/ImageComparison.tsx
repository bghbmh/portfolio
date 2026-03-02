"use client";

import React, { useState, ChangeEvent } from 'react';
import { DefaultFileType } from '@/types/project.data';

import './ImageComparison.scss';

interface Props {
	beforeImage: DefaultFileType[];
	afterImage: DefaultFileType[]
}

export default function ImageComparison({
	beforeImage,
	afterImage
}: Props) {
	// 1. 슬라이더 위치 상태 관리 (기본값 50%)
	const [position, setPosition] = useState(50);

	// 2. 인풋 핸들러
	const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
		setPosition(Number(e.target.value));
	};

	return (
		<div className="slider-before-after-container" style={{
			['--position' as any]: `${position}%`
		}} >
			<div className="slider-image-container">

				<div className="slider-image image-before">
					<img src={beforeImage[0]?.url} alt="Before" />
				</div>

				<div className="slider-image image-after">
					<img src={afterImage[0]?.url} alt="After" />
				</div>

			</div>

			{/* 슬라이더 컨트롤러 */}
			<input
				type="range"
				min="0"
				max="100"
				value={position}
				onChange={handleInput}
				className="slider-input"
				aria-label="이미지 비교 슬라이더"
			/>
			{/* 슬라이더 아이콘 (기본 핸들 디자인) */}
			<label className="slider-button-container">
				<input
					type="range"
					min="0"
					max="100"
					value={position}
					onChange={handleInput}
					className="slider-input"
					aria-label="이미지 비교 슬라이더"
				/>
				<div className="slider-button" aria-hidden="true">
					<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 256 256">
						<rect width="256" height="256" fill="none"></rect>
						<line x1="128" y1="40" x2="128" y2="216" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line>
						<line x1="96" y1="128" x2="16" y2="128" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line>
						<polyline points="48 160 16 128 48 96" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></polyline>
						<line x1="160" y1="128" x2="240" y2="128" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line>
						<polyline points="208 96 240 128 208 160" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></polyline>
					</svg>
				</div>
			</label>

		</div>
	);
}