import Link from "next/link";
import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import WorksGrid from "@/components/WorksGrid";
import { getHomeFeaturedRows } from "@/lib/projects";

export const metadata: Metadata = {
	title: "Marc Fontenelle",
	description: "Marc Fontenelle - Artiste, Sculpteur",
};

export default function HomePage() {
	const featuredRows = getHomeFeaturedRows();

	return (
		<SiteLayout
			intro={
				<div className="intro">
					<div className="intro__bio">
						<h1 className="intro__bio__title">
							Artiste <span>Sculpteur</span>
						</h1>
						<img
							className="intro__bio__photo"
							src="/images/marc_fontenelle_armateur.jpg"
							alt="Photo Marc Fontenelle"
						/>
					</div>

					<div className="intro__bandeau-texte">
						<img
							className="intro__bandeau-texte__image"
							src="/images/arrow-down.svg"
							alt=""
						/>
						<div className="intro__bandeau-texte__bloc-texte">
							Son travail et son inspiration porte sur un processus de recherche
							approfondie sur des formes intuitives et sur le rôle & l&apos;action
							que porte une matière ou un matériau choisi sur ces formes,
							qu&apos;elles soient d&apos;ordre géométrique, organique ou marine.
							<span>Hendaye / Paris</span>
						</div>
						<div className="intro__bandeau-texte__bloc-titre">
							Marc <span>Fontenelle</span>
						</div>
					</div>
				</div>
			}
		>
			<WorksGrid rows={featuredRows} />
			<Link href="/projets">
				<button className="btn center mb" type="button">
					Voir plus
				</button>
			</Link>
		</SiteLayout>
	);
}
