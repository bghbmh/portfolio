"use client";
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { ProjectDataType } from '@/types/project.data';
import ImageComparison from './ImageComparison'; // 다른 컴포넌트도 리액트로 변환 가정
import { ICONSET } from '@/types/icon.data';
import './MainItem.scss';

import Modal from '@/components/Modal';

interface Props {
	item: ProjectDataType;
}

const MainItem = ({ item }: Props) => {
	const [modalType, setModalType] = useState<'mockup' | 'zoomIn' | null>(null);
	const [expanded, setExpanded] = useState(true);
	const [iframeLink, setIframeLink] = useState<string>('');

	useEffect(() => {
		if (modalType === 'mockup' && item.mockup.length > 0) {
			setIframeLink(item.mockup[0].url);
		}
	}, [modalType, item.mockup]);

	return (
		<>
			<article className="main-item">
				<div className="image-wrap">
					{
						item.imageComparison.use && item.imageComparison.before ? <ImageComparison
							beforeImage={item.imageComparison.before}
							afterImage={item.imageComparison.after!}
						/> : <div className="image"><img src={item.titleImage[0]?.url} alt={item.titleImage[0]?.alt} /></div>
					}
				</div>

				<header className="item-header">
					<div className="option-label-wrap">
						<div className="title-label">
							<b data-type={item.category[0].type}>
								{item.category[0].name}
							</b>
							<span>{item.category[1].name}</span>
						</div>
						<div className="tool-name-list">
							{item.tools.map((t, idx) => <div key={idx} className="tool">{t}</div>)}
						</div>
					</div>
					<h3 className="item-title">{item.title}</h3>
				</header>

				<div className="info-container">
					<p className="synopsis">{item.overview.synopsis}</p>
					{item.overview.summary && (
						<ul className="summary">
							{item.overview.summary.map(s => (
								<li key={s.id}>
									{s.title && <b className="title">{s.title}</b>}
									{s.description}
								</li>
							))}

						</ul>
					)}

					<div className="btn-wrap">
						{item.externalLink.map((link) => <Link key={link.id} href={link.url} className='btn' target="_blank" rel="noopener noreferrer"><ICONSET type={link.type} />{link.label}</Link>)}

						{item.mockup.length > 0 && <button type="button" className="btn" onClick={() => setModalType('mockup')}><ICONSET type='mockup' />목업</button>}

						{(item.titleImage || item.subimage.length > 0) && <button type="button" className="btn" onClick={() => setModalType('zoomIn')}><ICONSET type='zoomIn' />크게보기</button>}
					</div>
				</div>
			</article >

			{
				modalType === 'mockup' && (
					<Modal
						isOpen={!!modalType}
						onClose={() => {
							setModalType(null);
							setExpanded(true);
						}}
						type="pagePreView">
						<div className="modal-header">
							<div className="d-flex">
								<h5 className="modal-title">
									<span>{item.title}</span>
								</h5>
								<button
									type="button"
									className="btn ttt"
									aria-label="접고펼치는버튼"
									data-on="접기"
									data-off="펼치기"
									onClick={() => setExpanded(prev => !prev)}
								></button>
							</div>

							<div className={`extraInfo ${expanded ? 'expanded' : ''}`}>
								<div className="labels">
									{item.category.map((c, idx) => <span key={idx} className="info main" data-type={c.type}>{c.name}</span>)}
								</div>
								{
									item.extraInfo.length > 0 && (
										<dl className="extraInfo-wrap">
											{
												item.extraInfo.map((ei, idx) => <dd key={idx} className="info" aria-label={ei.label}>{ei.value}</dd>)
											}
										</dl>
									)
								}
								<nav className="buttons ctrl-pagePreView">
									{item.mockup.map((m, idx) => <button
										key={idx}
										type="button"
										className="btn text-start"
										data-link={m.url}
										onClick={() => setIframeLink(m.url)}>{m.label}</button>)}
								</nav>
							</div>

						</div>
						<div className='modal-body' >
							<iframe src={iframeLink} title="Sample" />
						</div>
					</Modal>)
			}

			{
				modalType === 'zoomIn' && (
					<Modal isOpen={!!modalType}
						onClose={() => {
							setModalType(null);
							setExpanded(true);
						}}
						type="zoomIn">
						<div className="modal-header">
							<div className="d-flex">
								<h5 className="modal-title d-none">
									<span>이미지크게보기</span>
								</h5>
								<button
									type="button"
									className="btn ttt"
									aria-label="접고펼치는버튼"
									data-on="접기"
									data-off="펼치기"
									onClick={() => setExpanded(prev => !prev)}
								></button>
							</div>
						</div>
						<div className='modal-body' >
							{item.subimage
								.filter(Boolean).map((img, idx) => (
									<img key={idx} src={img.url} alt={img.alt} />
								))}

						</div>
					</Modal>)
			}
		</>
	);
};

export default MainItem;