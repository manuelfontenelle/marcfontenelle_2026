"use client";

import Link from "next/link";
import {
	createContext,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from "react";
import type { Project } from "@/types/project";
import { formatSlugAsTitle, getProjectPath } from "@/lib/projects";
import { pickNextUnvisitedProject } from "@/lib/projectNavigation";
import ArrowIcon from "@/components/ArrowIcon";

const NextProjectContext = createContext<Project | null>(null);

export function ProjectNextProvider({
	currentSlug,
	children,
}: {
	currentSlug: string;
	children: ReactNode;
}) {
	const [nextProject, setNextProject] = useState<Project | null>(null);

	useEffect(() => {
		setNextProject(pickNextUnvisitedProject(currentSlug));
	}, [currentSlug]);

	return (
		<NextProjectContext.Provider value={nextProject}>
			{children}
		</NextProjectContext.Provider>
	);
}

export function NextProjectBackLink() {
	const nextProject = useContext(NextProjectContext);

	if (!nextProject) {
		return null;
	}

	return (
		<Link href={getProjectPath(nextProject.slug)} className="right-txt">
			<ArrowIcon direction="right" />
			Projet Suivant
		</Link>
	);
}

export default function RandomProject() {
	const nextProject = useContext(NextProjectContext);

	if (!nextProject) {
		return <div className="random-work" aria-hidden="true" />;
	}

	return (
		<div className="random-work">
			<Link href={getProjectPath(nextProject.slug)} className="right-txt">
				<ArrowIcon direction="right" />
				Projet Suivant
			</Link>
			<Link href={getProjectPath(nextProject.slug)} className="left-txt">
				{nextProject.title || formatSlugAsTitle(nextProject.slug)}
			</Link>
		</div>
	);
}
