export interface Project {
	slug: string;
	title: string;
	description: string;
	mainImage: string;
	galleryImages: string[];
}

export interface WorksGridItem {
	slug: string;
	title: string;
	shortDesc: string;
	previewImage: string;
	special: boolean;
	side: "left" | "right";
	rowClass: string;
}

export interface WorksRow {
	rowClass: string;
	left: WorksGridItem;
	right?: WorksGridItem;
}
