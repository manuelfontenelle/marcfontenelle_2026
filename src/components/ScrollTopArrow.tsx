"use client";

export default function ScrollTopArrow() {
	const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

	return (
		<img
			className="footer-arrowtop"
			id="scrollTop"
			src="/images/arrow-down.svg"
			alt=""
			onClick={scrollToTop}
			onKeyDown={(e) => e.key === "Enter" && scrollToTop()}
			role="button"
			tabIndex={0}
		/>
	);
}
