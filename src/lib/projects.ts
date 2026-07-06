import projectsData from "@/data/projects.json";
import worksGridData from "@/data/works-grid.json";
import type { Project, WorksGridItem, WorksRow } from "@/types/project";

export const projects = projectsData as Project[];
export const worksGrid = worksGridData as WorksGridItem[];

type HomeSlot = {
	slug: string;
	special?: boolean;
	shortDesc?: string;
};

const homeWorksLayout: Array<{
	rowClass: string;
	left: HomeSlot;
	right: HomeSlot;
}> = [
	{
		rowClass: "",
		left: { slug: "deluxe-rose-&-bleue" },
		right: { slug: "polyplac-&-velamen", special: true },
	},
	{
		rowClass: " decal mt",
		left: { slug: "phenemenon" },
		right: {
			slug: "fontaine-mairie-de-mauregard",
			shortDesc: "Maitrise d'oeuvre - 2007",
		},
	},
	{
		rowClass: " mt",
		left: {
			slug: "espaces-combinés-turbibulle-&-turbo-mollo",
			shortDesc: "2008",
		},
		right: {
			slug: "pense-bête",
			special: true,
			shortDesc: "Exposition de groupe - 2012",
		},
	},
	{
		rowClass: " decal mt",
		left: {
			slug: "sculpture-portable",
			shortDesc: "Faïence émaillée céladon - 2003",
		},
		right: { slug: "pet-&-troll" },
	},
];

function buildHomeGridItem(slot: HomeSlot): WorksGridItem {
	const base = getWorksGridItem(slot.slug);
	if (!base) {
		throw new Error(`Projet introuvable pour l'accueil : ${slot.slug}`);
	}

	return {
		...base,
		special: slot.special ?? false,
		shortDesc: slot.shortDesc ?? base.shortDesc,
	};
}

export function getProjectBySlug(slug: string): Project | undefined {
	const decoded = decodeURIComponent(slug);
	return projects.find((p) => p.slug === decoded);
}

export function getProjectPath(slug: string): string {
	return `/projets/${encodeURIComponent(slug)}`;
}

export function normalizeDescription(description: string): string[] {
	return description
		.split(/\n\s*\n+/)
		.map((paragraph) =>
			paragraph.replace(/\n\s*/g, " ").replace(/\s+/g, " ").trim(),
		)
		.filter(Boolean);
}

export function getAllProjectSlugs(): string[] {
	return projects.map((p) => p.slug);
}

export function getWorksGridItem(slug: string): WorksGridItem | undefined {
	return worksGrid.find((item) => item.slug === slug);
}

export function groupWorksIntoRows(items: WorksGridItem[]): WorksRow[] {
	const rows: WorksRow[] = [];
	for (let i = 0; i < items.length; i += 2) {
		rows.push({
			rowClass: items[i].rowClass,
			left: items[i],
			right: items[i + 1],
		});
	}
	return rows;
}

export function getHomeFeaturedRows(): WorksRow[] {
	return homeWorksLayout.map((row) => ({
		rowClass: row.rowClass,
		left: buildHomeGridItem(row.left),
		right: buildHomeGridItem(row.right),
	}));
}

export function getWorksPageRows(): WorksRow[] {
	return groupWorksIntoRows(worksGrid);
}

export function formatSlugAsTitle(slug: string): string {
	return slug.replaceAll("-", " ");
}
