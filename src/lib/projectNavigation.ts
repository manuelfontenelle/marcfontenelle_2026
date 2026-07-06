import type { Project } from "@/types/project";
import { projects } from "@/lib/projects";

const VISITED_KEY = "marc-fontenelle:visited-projects";

function readVisitedSlugs(): string[] {
	try {
		const stored = sessionStorage.getItem(VISITED_KEY);
		if (!stored) return [];
		const parsed = JSON.parse(stored);
		return Array.isArray(parsed) ? parsed.filter((s) => typeof s === "string") : [];
	} catch {
		return [];
	}
}

function writeVisitedSlugs(slugs: string[]): void {
	sessionStorage.setItem(VISITED_KEY, JSON.stringify(slugs));
}

export function markProjectVisited(slug: string): void {
	const visited = readVisitedSlugs();
	if (visited.includes(slug)) return;
	writeVisitedSlugs([...visited, slug]);
}

export function pickNextUnvisitedProject(currentSlug: string): Project {
	markProjectVisited(currentSlug);

	const visited = new Set(readVisitedSlugs());
	const remaining = projects.filter((project) => !visited.has(project.slug));

	if (remaining.length > 0) {
		return remaining[Math.floor(Math.random() * remaining.length)];
	}

	// Tous les projets ont été vus : on recommence un nouveau cycle.
	writeVisitedSlugs([currentSlug]);
	const others = projects.filter((project) => project.slug !== currentSlug);
	return others[Math.floor(Math.random() * others.length)];
}
