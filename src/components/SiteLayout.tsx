"use client";

import { useEffect, useState } from "react";
import BurgerMenu, { MobileMenu } from "./BurgerMenu";
import Header from "./Header";
import Footer from "./Footer";
import Prefooter from "./Prefooter";

interface SiteLayoutProps {
	children: React.ReactNode;
	intro?: React.ReactNode;
	prefooterVariant?: "works" | "default";
}

export default function SiteLayout({
	children,
	intro,
	prefooterVariant = "default",
}: SiteLayoutProps) {
	const [menuOpen, setMenuOpen] = useState(false);

	useEffect(() => {
		document.body.classList.toggle("slide-in", menuOpen);
		return () => document.body.classList.remove("slide-in");
	}, [menuOpen]);

	return (
		<>
			<MobileMenu isOpen={menuOpen} />
			<div className="container">
				<div className="intro-container">
					<Header />
					<BurgerMenu
						isOpen={menuOpen}
						onToggle={() => setMenuOpen((prev) => !prev)}
					/>
					{intro}
				</div>
				{children}
				<Prefooter variant={prefooterVariant} />
				<Footer />
			</div>
		</>
	);
}
