"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import './modal.scss';
import './modal-pagePreView.scss'

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
	type?: string;
}

// const Modal = (
// { isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }
// ) => {

export default function Modal({ isOpen, onClose, children, type }: ModalProps) {
	const [mounted, setMounted] = useState(false);
	useEffect(() => {
		setMounted(true);
		if (isOpen) document.body.style.overflow = 'hidden';
		else document.body.style.overflow = '';

		// 컴포넌트가 언마운트되거나 isOpen이 바뀔 때 클린업
		return () => {
			document.body.style.overflow = '';
		};
	}, [isOpen]); // isOpen을 의존성 배열에 추가!

	if (!mounted || !isOpen) return null;

	const modalRoot = document.getElementById("modal-root");
	if (!modalRoot) return null;



	return createPortal(
		<div className={`modal ${type !== '' ? type : ''} ${isOpen && 'show'}`} onClick={onClose}>
			<div className="modal-dialog" onClick={(e) => e.stopPropagation()}>

				<button type="button"
					className="btn-modal-close"
					aria-label="팝업 닫기 버튼"
					onClick={onClose}>
					<span part="btn-modal-close-icon"><svg viewBox="0 0 640 640"><path d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z" /></svg></span>
					<span className="btn-modal-close-text">닫기</span>
				</button>

				{children}
			</div>
		</div>, modalRoot);
};