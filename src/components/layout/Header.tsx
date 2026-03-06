"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'; // Next.js 라우팅 훅
import Modal from '@/components/Modal';
import HelloEveryone from "@/components/HelloEveryone";

import { sendGAEvent } from '@next/third-parties/google';

interface props {
	gnb: any[]
}

export default function Header({ gnb }: props) {
	const router = useRouter();
	const searchParams = useSearchParams();

	// 모달 제어를 위한 상태
	const [modalType, setModalType] = useState<'profile' | 'contact' | null>(null);
	const [isScrolled, setIsScrolled] = useState(false);

	// 현재 선택된 메뉴 (URL 파라미터나 상태에 기반)
	const currentParam = searchParams.get('current') || 'home';
	const activeId = modalType || currentParam;

	useEffect(() => {
		const handleScroll = () => setIsScrolled(window.scrollY > 300);
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const handleMenuClick = (menu: any) => {
		sendGAEvent({
			event: 'menu_click',
			value: menu.name,
			menu_id: menu.id
		});
		if (menu.id === 'profile' || menu.id === 'contact') {
			// 1. 모달 띄우기
			setModalType(menu.id);
		} else if (menu.url) {
			// 2. 프로젝트 등 URL 파라미터 변경
			router.push(menu.url);
		} else if (menu.id === 'home') {
			router.push('/');
		}
	};

	return (
		<>
			<header className={`common-header ${isScrolled ? 'is-scrolled' : ''}`}>
				<div className="logo">
					<button
						onClick={() => {
							sendGAEvent({ event: 'logo_click', value: "로고클릭" });
							router.push('/');
						}}
						className={`btn ${activeId === 'home' ? 'current' : ''}`}
					>
						<span className='option'>[ </span><b>Port<br />folio</b><span className='option'> ]</span>
					</button>
				</div>
				<nav className="global-nav">
					{gnb.map((menu) => (
						<button
							key={menu.id}
							className={`btn ${activeId === menu.id ? 'current' : ''}`}
							onClick={() => handleMenuClick(menu)}
						>
							<span className='option'>[ </span>{menu.name}<span className='option'> ]</span>
						</button>
					))}
				</nav>
			</header>

			{/* 헤더 전용 모달들 */}
			{modalType === 'profile' && (
				<Modal isOpen={!!modalType} onClose={() => setModalType(null)} type="profile">
					<div className="modal-header" >
						<img src="/img/common/logo.svg" />
					</div>
					<div className="modal-body" >
						<img src="/img/common/me.png" className="me" />
						UX/UI 디자이너이자 웹 퍼블리셔로, 구조 설계와 반응형 UI, 접근성 개선에 강점을 갖고 있습니다. Figma, HTML/CSS, JavaScript를 주로 사용하며, 사용자 경험 중심의 문제 해결에 집중합니다.
					</div>
				</Modal>
			)}

			{modalType === 'contact' && (
				<Modal isOpen={!!modalType} onClose={() => setModalType(null)} type="contact">
					<div className="modal-header" slot="modal-header">
						<img src="/img/common/logo2.svg" />
					</div>
					<div className="modal-body" slot="modal-body">
						<div className="c">
							<a className="btn mailto" href="mailto:bghbmh@gmail.com">bghbmh@gmail.com</a>
							<p><small>html + css + javascript + react = 박민희</small></p>
							<p><small>{"{ typescript, nodejs }  ⊂  beginner"}</small></p>
							<img src="/img/common/me.png" className="me" />
						</div>
						<div className="d">
							<HelloEveryone />

						</div>
					</div>

				</Modal>
			)}
		</>
	);
};