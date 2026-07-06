"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from "react";
import type { Project } from "@/types/project";
import {
	formatSlugAsTitle,
	getProjectPath,
	normalizeProjectSlug,
	projects,
} from "@/lib/projects";
import {
	getPreviousProject,
	pickNextUnvisitedProject,
	recordProjectInHistory,
	storePreviousForProject,
} from "@/lib/projectNavigation";
import ArrowIcon from "@/components/ArrowIcon";

type ProjectNavContextValue = {
	next: Project | null;
	previous: Project | null;
	registerNextNavigation: (targetSlug: string) => void;
};

const ProjectNavContext = createContext<ProjectNavContextValue>({
	next: null,
	previous: null,
	registerNextNavigation: () => {},
});

export function ProjectNextProvider({
	currentSlug,
	children,
}: {
	currentSlug: string;
	children: ReactNode;
}) {
	const pathname = usePathname();
	const [next, setNext] = useState<Project | null>(null);
	const [previous, setPrevious] = useState<Project | null>(null);

	const registerNextNavigation = useCallback(
		(targetSlug: string) => {
			storePreviousForProject(targetSlug, currentSlug);
		},
		[currentSlug],
	);

	useEffect(() => {
		const current = normalizeProjectSlug(currentSlug);
		const previousProject = getPreviousProject(currentSlug);
		recordProjectInHistory(currentSlug);

		let nextProject = pickNextUnvisitedProject(currentSlug);

		if (
			nextProject.slug === current ||
			getProjectPath(nextProject.slug) === pathname
		) {
			const alternatives = projects.filter((project) => project.slug !== current);
			nextProject =
				alternatives[Math.floor(Math.random() * alternatives.length)] ??
				nextProject;
		}

		setPrevious(previousProject);
		setNext(nextProject);
	}, [currentSlug, pathname]);

	return (
		<ProjectNavContext.Provider
			value={{ next, previous, registerNextNavigation }}
		>
			{children}
		</ProjectNavContext.Provider>
	);
}

export function NextProjectBackLink() {
	const { next, registerNextNavigation } = useContext(ProjectNavContext);

	if (!next) {
		return null;
	}

	return (
		<Link
			href={getProjectPath(next.slug)}
			className="right-txt"
			onClick={() => registerNextNavigation(next.slug)}
		>
			<ArrowIcon direction="right" />
			Projet Suivant
		</Link>
	);
}

export default function RandomProject() {
	const { next, previous, registerNextNavigation } =
		useContext(ProjectNavContext);

	if (!next && !previous) {
		return <div className="random-work" aria-hidden="true" />;
	}

	return (
		<div className="random-work">
			{previous && (
				<Link href={getProjectPath(previous.slug)} className="prev-txt">
					<ArrowIcon direction="left" />
					Projet Précédent
				</Link>
			)}
			{next && (
				<>
					<Link
						href={getProjectPath(next.slug)}
						className="right-txt"
						onClick={() => registerNextNavigation(next.slug)}
					>
						<ArrowIcon direction="right" />
						Projet Suivant
					</Link>
					<Link
						href={getProjectPath(next.slug)}
						className="left-txt"
						onClick={() => registerNextNavigation(next.slug)}
					>
						{next.title || formatSlugAsTitle(next.slug)}
					</Link>
				</>
			)}
		</div>
	);
}
