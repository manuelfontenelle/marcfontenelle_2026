import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";

export const metadata: Metadata = {
	title: "A propos",
	description: "Marc Fontenelle - Artiste, Sculpteur - A propos",
};

export default function AboutPage() {
	return (
		<SiteLayout
			prefooterVariant="works"
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
						<div className="intro__bandeau-texte__bloc-titre">
							Marc <span>Fontenelle</span>
						</div>
					</div>
				</div>
			}
		>
			<div className="block-content_about">
				<div className="desc-about">
					Marc Fontenelle, né le 2 Avril 1962 à Lille (France) est un artiste
					sculpteur. Son travail et son inspiration porte sur un processus de
					recherche approfondie sur des formes intuitives et sur le rôle &
					l&apos;action que porte une matière ou un matériau choisi sur ces formes,
					qu&apos;elles soient d&apos;ordre géométrique, organique ou marine.
					M.Fontenelle étudie la sculpture à l&apos;Ecole régionale de Lille, à
					l&apos;Ecole Nationale des Beaux Arts de Paris puis à l&apos;Université
					Sorbonne Paris 8. Il est diplômé d&apos;un Master d&apos;art, à finalité
					Recherche, mention arts plastiques, spécialité théorie et pratique de
					l&apos;art contemporain, avec mention très bien & avec les félicitations
					du Jury. Par la suite, M.Fontenelle rencontre des artistes paysagistes à
					l&apos;ENSP de Versailles, ou il intervient régulièrement comme Artiste
					invité sur des thématiques liées à la nature. Il est marqué par ces
					nouvelles rencontres et de l&apos;approche nomade de cette communauté et
					du travail artistique pratiqué au sein de la nature. Une nouvelle voie
					alternative pour approfondir sa recherche en sculpture dans un contexte
					en in-situ s&apos;ouvre à lui : la connaissance de la nature et du monde
					des esprits qui l&apos;entoure. Marc Fontenelle enseigne la sculpture à
					l&apos;Ecole supérieure d&apos;art de Biarritz, il est armateur, vit et
					pratique l&apos;art sur son voilier amarré au port d&apos;Hendaye (pays
					basque).
					<br />
					<br />
					<br />
					Marc Fontenelle, born April 2nd 1962, in Lille (France) is a sculptor.
					His work and his inspiration is based on a process of in-depth research
					on intuitive forms and on the role and action of a random material or a
					chosen material upon these forms, whether they be geometric, organic, or
					of marine origin. Marc Fontenelle studies sculpture at the Regional
					school of Fine Arts in Lille (North of France)), at the National school
					of Fine Arts in Paris and then at the Sorbonne Paris 8 University. He
					graduates with a Master of Art with Honors. His research is focused on
					Plastic arts, his special option being The Theory and Practice of
					Contemporary Art. Subsequently, Marc Fontenelle meets landscape artists
					at the ENSP of Versailles, where he regularly works as a guest artist on
					themes related to Nature. He is impacted by these new encounters and by
					the nomadic approach of this community and the art works developed in and
					about Nature. A new alternative way of expanding his research in
					sculpture in an &apos;in situ&apos; context, opens up to him : The
					knowledge of Nature and the Spirit world around him. Marc Fontenelle
					teaches sculpture at the Rocailles Art school in Biarritz. He lives,
					sails and works on his boat which is moored at the port of Hendaye (
					Basque Country).
				</div>
			</div>
		</SiteLayout>
	);
}
