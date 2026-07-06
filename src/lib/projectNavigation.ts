import type { Project } from "@/types/project";
import { normalizeProjectSlug, projects } from "@/lib/projects";

const VISITED_KEY = "marc-fontenelle:visited-projects";

function readVisitedSlugs(): string[] {
	try {
		const stored = sessionStorage.getItem(VISITED_KEY);
		if (!stored) return [];
		const parsed = JSON.parse(stored);
		return Array.isArray(parsed)
			? parsed
					.filter((s) => typeof s === "string")
					.map((s) => normalizeProjectSlug(s))
			: [];
	} catch {
		return [];
	}
}

function writeVisitedSlugs(slugs: string[]): void {
	sessionStorage.setItem(
		VISITED_KEY,
		JSON.stringify(slugs.map((s) => normalizeProjectSlug(s))),
	);
}

export function markProjectVisited(slug: string): void {
	const normalized = normalizeProjectSlug(slug);
	const visited = readVisitedSlugs();
	if (visited.includes(normalized)) return;
	writeVisitedSlugs([...visited, normalized]);
}

function pickRandomProject(candidates: Project[]): Project | null {
	if (candidates.length === 0) return null;
	return candidates[Math.floor(Math.random() * candidates.length)];
}

export function pickNextUnvisitedProject(currentSlug: string): Project {
	const current = normalizeProjectSlug(currentSlug);
	markProjectVisited(current);

	const visited = new Set(readVisitedSlugs());
	const remaining = projects.filter(
		(project) => project.slug !== current && !visited.has(project.slug),
	);

	const next = pickRandomProject(remaining);
	if (next) return next;

	// Tous les projets ont été vus : on recommence un nouveau cycle.
	writeVisitedSlugs([current]);
	const others = projects.filter((project) => project.slug !== current);
	const recycled = pickRandomProject(others);
	if (recycled) return recycled;

	// Un seul projet dans le catalogue.
	return projects.find((project) => project.slug === current) ?? projects[0];
}
