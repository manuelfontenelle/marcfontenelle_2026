import type { Project } from "@/types/project";
import { normalizeProjectSlug, projects } from "@/lib/projects";

const VISITED_KEY = "marc-fontenelle:visited-projects";
const HISTORY_KEY = "marc-fontenelle:project-history";
const PREVIOUS_FOR_PREFIX = "marc-fontenelle:previous-for:";

function findProjectBySlug(slug: string): Project | undefined {
	const normalized = normalizeProjectSlug(slug);
	return projects.find(
		(project) => normalizeProjectSlug(project.slug) === normalized,
	);
}

function readStoredPreviousFor(currentSlug: string): Project | null {
	try {
		const stored = sessionStorage.getItem(
			`${PREVIOUS_FOR_PREFIX}${normalizeProjectSlug(currentSlug)}`,
		);
		if (!stored) return null;
		return findProjectBySlug(stored) ?? null;
	} catch {
		return null;
	}
}

export function storePreviousForProject(
	targetSlug: string,
	previousSlug: string,
): void {
	try {
		sessionStorage.setItem(
			`${PREVIOUS_FOR_PREFIX}${normalizeProjectSlug(targetSlug)}`,
			normalizeProjectSlug(previousSlug),
		);
	} catch {
		// Ignore storage errors in private browsing.
	}
}

function readHistory(): string[] {
	try {
		const stored = sessionStorage.getItem(HISTORY_KEY);
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

function writeHistory(slugs: string[]): void {
	sessionStorage.setItem(
		HISTORY_KEY,
		JSON.stringify(slugs.map((s) => normalizeProjectSlug(s))),
	);
}

export function recordProjectInHistory(slug: string): void {
	const normalized = normalizeProjectSlug(slug);
	const history = readHistory();

	if (
		history.length > 0 &&
		normalizeProjectSlug(history[history.length - 1]) === normalized
	) {
		return;
	}

	const existingIndex = history.findIndex(
		(entry) => normalizeProjectSlug(entry) === normalized,
	);
	if (existingIndex >= 0) {
		writeHistory(history.slice(0, existingIndex + 1));
		return;
	}

	writeHistory([...history, normalized]);
}

export function getPreviousProject(currentSlug: string): Project | null {
	const storedPrevious = readStoredPreviousFor(currentSlug);
	if (storedPrevious) return storedPrevious;

	const current = normalizeProjectSlug(currentSlug);
	const history = readHistory();
	const index = history.findIndex(
		(slug) => normalizeProjectSlug(slug) === current,
	);

	if (index > 0) {
		return findProjectBySlug(history[index - 1]) ?? null;
	}

	if (history.length > 0) {
		const lastSlug = history[history.length - 1];
		if (normalizeProjectSlug(lastSlug) !== current) {
			return findProjectBySlug(lastSlug) ?? null;
		}
	}

	return null;
}

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
