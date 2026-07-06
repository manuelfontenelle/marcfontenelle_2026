import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import WorksGrid from "@/components/WorksGrid";
import { getWorksPageRows } from "@/lib/projects";

export const metadata: Metadata = {
	title: "Projets",
	description: "Marc Fontenelle - Artiste, Sculpteur - Projets",
};

export default function WorksPage() {
	return (
		<SiteLayout prefooterVariant="works">
			<WorksGrid
				rows={getWorksPageRows()}
				titleClassName="title-cat no-margin"
			/>
		</SiteLayout>
	);
}
