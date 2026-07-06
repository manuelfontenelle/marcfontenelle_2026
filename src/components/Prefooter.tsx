"use client";

import Link from "next/link";

interface PrefooterProps {
	variant?: "works" | "default";
}

export default function Prefooter({ variant = "default" }: PrefooterProps) {
	return (
		<div className={`block-prefooter ${variant === "works" ? "works" : ""}`}>
			<div className="first-block">
				<div className="first-block__block-top">
					<div className="first-block__block-top__first">
						Vous avez un projet ?<span>Parlons-en</span>
					</div>
					<Link href="/contact" className="first-block__block-top__second">
						Envoyez-moi<span>Un message</span>
					</Link>
				</div>
			</div>
			<img
				className="prefooter-arrowtop"
				id="scrollTop"
				src="/images/arrow-down.svg"
				alt=""
				onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
				onKeyDown={(e) =>
					e.key === "Enter" && window.scrollTo({ top: 0, behavior: "smooth" })
				}
				role="button"
				tabIndex={0}
			/>
		</div>
	);
}
