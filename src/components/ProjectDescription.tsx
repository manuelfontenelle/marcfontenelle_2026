import type { ReactNode } from "react";

const LINK_PATTERN = /\[([^\]]+)\]\(([^)]+)\)/g;

export function renderDescriptionWithLinks(text: string): ReactNode[] {
	const parts: ReactNode[] = [];
	let lastIndex = 0;

	for (const match of text.matchAll(LINK_PATTERN)) {
		const index = match.index ?? 0;
		if (index > lastIndex) {
			parts.push(text.slice(lastIndex, index));
		}
		parts.push(
			<a
				key={`${index}-${match[2]}`}
				href={match[2]}
				target="_blank"
				rel="noopener noreferrer"
			>
				{match[1]}
			</a>,
		);
		lastIndex = index + match[0].length;
	}

	if (lastIndex < text.length) {
		parts.push(text.slice(lastIndex));
	}

	return parts.length > 0 ? parts : [text];
}

export function renderDescriptionParagraph(text: string): ReactNode {
	const lines = text.split("\n");

	return lines.map((line, lineIndex) => (
		<span key={lineIndex}>
			{renderDescriptionWithLinks(line)}
			{lineIndex < lines.length - 1 && <br />}
		</span>
	));
}
