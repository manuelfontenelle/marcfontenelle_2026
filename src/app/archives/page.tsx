import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";

export const metadata: Metadata = {
	title: "Archives",
	description: "Marc Fontenelle - Artiste, Sculpteur - Archives",
};

const archiveImages = Array.from({ length: 8 }, (_, i) => ({
	src: `/images/archives/${i + 1}.jpg`,
	alt: `archive${i + 1}`,
}));

export default function ArchivesPage() {
	return (
		<SiteLayout prefooterVariant="works">
			<div className="works-container work-single">
				<div className="title-cat no-margin">Archives</div>

				<div className="imagesProjectContainer marginTop">
					<div className="imagesProjectContainer__left page-archive">
						<div className="imagesProjectContainer__left__container">
							<img src={archiveImages[0].src} alt={archiveImages[0].alt} />
							<div className="title-archives" />
						</div>
					</div>
					<div className="imagesProjectContainer__right first archives page-archive">
						<div className="imagesProjectContainer__right__container">
							<img src={archiveImages[1].src} alt={archiveImages[1].alt} />
							<div className="title-archives" />
						</div>
					</div>
				</div>

				<div className="imagesProjectContainer secondary-archives">
					<div className="imagesProjectContainer__left page-archive">
						<div className="imagesProjectContainer__left__container">
							<img src={archiveImages[2].src} alt={archiveImages[2].alt} />
							<div className="title-archives" />
						</div>
					</div>
					<div className="imagesProjectContainer__right archives2 page-archive">
						<div className="imagesProjectContainer__right__container archives2">
							<img src={archiveImages[3].src} alt={archiveImages[3].alt} />
							<div className="title-archives" />
						</div>
					</div>
				</div>

				<div className="imagesProjectContainer archives-nomargin">
					<div className="imagesProjectContainer__left page-archive">
						<div className="imagesProjectContainer__left__container">
							<img src={archiveImages[4].src} alt={archiveImages[4].alt} />
							<div className="title-archives" />
						</div>
					</div>
					<div className="imagesProjectContainer__right first archives page-archive">
						<div className="imagesProjectContainer__right__container">
							<img src={archiveImages[5].src} alt={archiveImages[5].alt} />
							<div className="title-archives" />
						</div>
					</div>
				</div>

				<div className="imagesProjectContainer secondary-archives">
					<div className="imagesProjectContainer__left page-archive">
						<div className="imagesProjectContainer__left__container">
							<img src={archiveImages[6].src} alt={archiveImages[6].alt} />
							<div className="title-archives" />
						</div>
					</div>
					<div className="imagesProjectContainer__right archives2 page-archive">
						<div className="imagesProjectContainer__right__container archives2">
							<img src={archiveImages[7].src} alt={archiveImages[7].alt} />
							<div className="title-archives" />
						</div>
					</div>
				</div>
			</div>
		</SiteLayout>
	);
}
