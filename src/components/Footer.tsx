import Link from "next/link";
import { navLinks } from "./BurgerMenu";
import ScrollTopArrow from "./ScrollTopArrow";

export default function Footer() {
	return (
		<footer>
			<div className="footer__top">
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
					<ul className="nav-droite">
						{navLinks.map((link) => (
							<li key={link.href}>
								<Link href={link.href}>{link.label}</Link>
							</li>
						))}
					</ul>
				</nav>
				<ScrollTopArrow />
			</div>
			<p className="copyright">
				©{new Date().getFullYear()} – All rights reserved – MARC FONTENELLE
			</p>
		</footer>
	);
}
