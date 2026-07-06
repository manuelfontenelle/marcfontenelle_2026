import Link from "next/link";
import type { WorksGridItem } from "@/types/project";
import { getProjectPath } from "@/lib/projects";

function WorkCard({ item }: { item: WorksGridItem }) {
	return (
		<>
			<div className={`wrapper ${item.special ? "special" : ""}`}>
				<Link href={getProjectPath(item.slug)}>
					<img src={item.previewImage} alt={item.title} />
				</Link>
			</div>
			<div className="works__title">{item.title}</div>
			{item.shortDesc && <div className="works__desc">{item.shortDesc}</div>}
		</>
	);
}

interface WorksGridProps {
	rows: Array<{
		rowClass: string;
		left: WorksGridItem;
		right?: WorksGridItem;
	}>;
	titleClassName?: string;
	showTitle?: boolean;
}

export default function WorksGrid({
	rows,
	titleClassName = "title-cat",
	showTitle = true,
}: WorksGridProps) {
	return (
		<div className="works-container">
			{showTitle && (
				<div className={titleClassName} id="works">
					Projets
				</div>
			)}
			{rows.map((row) => (
				<div key={row.left.slug} className={`works${row.rowClass}`}>
					<div className="works__left">
						<WorkCard item={row.left} />
					</div>
					{row.right && (
						<div className="works__right">
							<WorkCard item={row.right} />
						</div>
					)}
				</div>
			))}
		</div>
	);
}
