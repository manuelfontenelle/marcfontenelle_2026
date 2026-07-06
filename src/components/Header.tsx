"use client";

import Link from "next/link";
import { navLinks } from "./BurgerMenu";

export default function Header() {
	return (
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
	);
}
