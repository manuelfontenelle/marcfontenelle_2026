import type { Metadata } from "next";
import "@/styles/reset.css";
import "@/styles/style.css";

export const metadata: Metadata = {
	title: {
		default: "Marc Fontenelle",
		template: "%s | Marc Fontenelle",
	},
	description: "Marc Fontenelle - Artiste, Sculpteur",
	authors: [{ name: "MF" }],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="fr">
			<body>{children}</body>
		</html>
	);
}
