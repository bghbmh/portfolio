import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Suspense } from "react"; // 1. Suspense 임포트


import "@/styles/bootstrap.css";
import "@/styles/reset.css";
import "@/styles/layout.scss";
import "@/styles/common.css";

// 1. 공통 컴포넌트 임포트 (파일을 만드신 후 경로를 맞춰주세요)
import Header from "@/components/layout/Header";
import Container from "@/components/layout/Container";
import Footer from "@/components/layout/Footer";

import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/react'; // 👈 라이브러리 가져오기
import Script from "next/script"; // 👈 Script 컴포넌트 가져오기


const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "박민희 | Portfolio",
	description: "디자이너, 퍼블리셔, 프론트엔드 개발자 박민희의 포트폴리오입니다.",
};

const gnbList = [
	{ id: 'profile', name: '박민희', url: null },
	{ id: 'projects', name: '프로젝트', url: '?current=projects' },
	{ id: 'contact', name: '연락처', url: null }
];

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		// 한국어 사이트이므로 lang="ko"로 변경 권장
		<html lang="ko">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				{/* 2. 레이아웃 구조 설정 */}
				{/* 2. Header가 useSearchParams를 쓰므로 Suspense로 감싸줍니다 */}
				<Suspense fallback={<header>Loading...</header>}>
					<Header gnb={gnbList} />
				</Suspense>

				{/* 페이지 콘텐츠가 들어가는 영역 */}
				<Container>
					{children}
				</Container>

				<Footer />
				<div id="modal-root" />

				<Analytics /> {/* 👈 Analytics 컴포넌트 추가 */}
				<Script
					src={`https://www.googletagmanager.com/gtag/js?id=G-0Q3Q8N26W4`}
					strategy="afterInteractive"
				/>
				<Script id="google-analytics" strategy="afterInteractive">
					{`
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());

                      gtag('config', 'G-0Q3Q8N26W4', {
                        'transport_url': 'https://tgsvxtsk.jp.stape.io',
                        'first_party_collection': true
                      });
                    `}
				</Script>
			</body>
		</html>
	);
}