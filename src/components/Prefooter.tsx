"use client";

import { useState } from "react";

interface PrefooterProps {
	variant?: "works" | "default";
}

export default function Prefooter({ variant = "default" }: PrefooterProps) {
	const [tooltip, setTooltip] = useState("Copier l'email !");
	const email = "marc.fontenelle.pro@gmail.com";

	const copyEmail = async () => {
		try {
			await navigator.clipboard.writeText(email);
			setTooltip("Copié !");
		} catch {
			setTooltip("Copier l'email !");
		}
	};

	return (
		<div className={`block-prefooter ${variant === "works" ? "works" : ""}`}>
			<div className="first-block">
				<div className="first-block__block-top">
					<div className="first-block__block-top__first">
						Vous avez un projet ?<span>Parlons-en</span>
					</div>
					<div className="first-block__block-top__second">
						Envoyez-moi<span>Un message</span>
					</div>
				</div>
				<div
					className="first-block__block-mail"
					id="containerMailToCopy"
					onClick={copyEmail}
					onKeyDown={(e) => e.key === "Enter" && copyEmail()}
					role="button"
					tabIndex={0}
				>
					<span className="tooltiptext" id="tooltiptext">
						{tooltip}
					</span>
					<div id="mailToCopy">{email}</div>
				</div>
			</div>
		</div>
	);
}
