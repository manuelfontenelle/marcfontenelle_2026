"use client";

import Link from "next/link";

export const navLinks = [
	{ href: "/about", label: "à propos" },
	{ href: "/projets", label: "Projets" },
	{ href: "/contact", label: "Contact" },
	{ href: "/archives", label: "Archives" },
];

interface BurgerMenuProps {
	isOpen: boolean;
	onToggle: () => void;
}

export default function BurgerMenu({ isOpen, onToggle }: BurgerMenuProps) {
	return (
		<div className="burger-container" id="burger-container" onClick={onToggle}>
			<span id="menu-open" className={isOpen ? "" : "active"} />
			<span id="menu-close" className={isOpen ? "active" : ""} />
			<div className={`burger2 menu ${isOpen ? "open" : ""}`} id="burger">
				<div className="icon" />
			</div>
		</div>
	);
}

export function MobileMenu({ isOpen }: { isOpen: boolean }) {
	return (
		<div className={`menu-left ${isOpen ? "slide-in" : ""}`} id="menu-left">
			<div className="container content">
				<header>
					<Link href="/" className="logo">
						<img src="/images/logo.svg" alt="Logo Marc Fontenelle" />
					</Link>
					<nav>
						<ul>
							{navLinks.map((link) => (
								<li key={link.href}>
									<Link href={link.href}>{link.label}</Link>
								</li>
							))}
						</ul>
					</nav>
				</header>

				<div className="container-foot-mobile">
					<div className="block-prefooter">
						<div className="first-block">
							<div className="first-block__block-top">
								<div className="first-block__block-top__first">
									Vous avez un projet ?<span>Parlons-en</span>
								</div>
							</div>
							<div className="first-block__block-mail">
								marc.fontenelle.pro@gmail.com
							</div>
						</div>
					</div>
					<footer>
						<nav>
							<ul className="nav-gauche">
								<li>
									<a
										target="_blank"
										href="https://www.instagram.com/marcfontenelle/"
										rel="noopener noreferrer"
									>
										Instagram
									</a>
								</li>
								<li>
									<a
										target="_blank"
										href="https://fr.linkedin.com/in/marc-fontenelle-15b6475a"
										rel="noopener noreferrer"
									>
										Linkedin
									</a>
								</li>
							</ul>
						</nav>
						<p className="copyright">
							©{new Date().getFullYear()} – All rights reserved – MARC FONTENELLE
						</p>
					</footer>
				</div>
			</div>
		</div>
	);
}
