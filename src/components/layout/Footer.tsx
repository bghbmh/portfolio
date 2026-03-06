"use client";

export default function Footer() {

	return (
		<footer className="common">
			<div className="contents-wrap">
				<div>
					<a
						className="btn btn-link"
						href="mailto:bghbmh@gmail.com"
						onClick={() => {
							if (typeof window !== 'undefined' && (window as any).gtag) {
								(window as any).gtag('event', 'contact_click', {
									'event_label': 'email'
								});
							}
						}}
					>bghbmh@gmail.com</a>

					<p><small>html + css + javascript + react = 박민희</small></p>
					<p><small>{"{ typescript, nodejs }"}  ⊂  beginner</small></p>
				</div>
				<span className="madein">ⓒ 2026 ㅂㅁㅎ</span>
			</div>
		</footer>
	);
};
