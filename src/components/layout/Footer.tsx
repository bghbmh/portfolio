"use client";
import { sendGAEvent } from '@next/third-parties/google';
export default function Footer() {

	return (
		<footer className="common">
			<div className="contents-wrap">
				<div>
					<a
						className="btn btn-link"
						href="mailto:bghbmh@gmail.com"
						onClick={() => sendGAEvent({ event: 'contact_click', value: 'email' })}
					>bghbmh@gmail.com</a>

					<p><small>html + css + javascript + react = 박민희</small></p>
					<p><small>{"{ typescript, nodejs }"}  ⊂  beginner</small></p>
				</div>
				<span className="madein">ⓒ 2026 ㅂㅁㅎ</span>
			</div>
		</footer>
	);
};
