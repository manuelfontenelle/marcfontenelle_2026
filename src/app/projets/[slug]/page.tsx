import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteLayout from "@/components/SiteLayout";
import RandomProject, {
	NextProjectBackLink,
	ProjectNextProvider,
} from "@/components/RandomProject";
import { getAllProjectSlugs, getProjectBySlug, normalizeDescription } from "@/lib/projects";
import { renderDescriptionParagraph } from "@/components/ProjectDescription";

interface ProjectPageProps {
	params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
	return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
	params,
}: ProjectPageProps): Promise<Metadata> {
	const { slug } = await params;
	const project = getProjectBySlug(slug);
	if (!project) return { title: "Projet" };

	return {
		title: project.title,
		description: `Marc Fontenelle - Artiste, Sculpteur - ${project.title}`,
	};
}

function renderGallery(images: string[], title: string) {
	if (images.length === 0) return null;

	const rows: Array<{ left?: string; right?: string; secondary?: boolean }> = [];

	if (images.length === 1) {
		rows.push({ right: images[0] });
	} else {
		for (let i = 0; i < images.length; i += 2) {
			rows.push({
				left: images[i],
				right: images[i + 1],
				secondary: i > 0,
			});
		}
	}

	return rows.map((row, index) => (
		<div
			key={`${row.left}-${row.right}-${index}`}
			className={`imagesProjectContainer${row.secondary ? " secondary" : ""}`}
		>
			<div className="imagesProjectContainer__left">
				{row.left && <img src={row.left} alt={`${title} ${index * 2 + 2}`} />}
			</div>
			<div
				className={`imagesProjectContainer__right${row.secondary ? " second" : " first"}`}
			>
				{row.right && (
					<img src={row.right} alt={`${title} ${index * 2 + 3}`} />
				)}
			</div>
		</div>
	));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
	const { slug } = await params;
	const project = getProjectBySlug(slug);

	if (!project) {
		notFound();
	}

	const titleHasMargin = project.title.length > 20 ? " mb" : "";

	return (
		<SiteLayout prefooterVariant="works">
			<ProjectNextProvider currentSlug={slug}>
				<div className="works-container work-single">
				<div className="bloc-pre-detail">
					<div className={`title-project${titleHasMargin}`} id="title-project">
						{project.title}
					</div>

					<div className="bloc-pre-detail__bloc2">
						<div className="desc-project">
							{normalizeDescription(project.description).map(
								(paragraph, index, paragraphs) => (
									<span key={index}>
										{renderDescriptionParagraph(paragraph)}
										{index < paragraphs.length - 1 && (
											<>
												<br />
												<br />
											</>
										)}
									</span>
								),
							)}
						</div>
						<NextProjectBackLink />
					</div>
				</div>

				{project.mainImage && (
					<div className="img-project">
						<img
							className="img-contain"
							src={project.mainImage}
							alt={project.title}
						/>
					</div>
				)}

				{renderGallery(project.galleryImages, project.title)}
				</div>

				<RandomProject />
			</ProjectNextProvider>
		</SiteLayout>
	);
}
