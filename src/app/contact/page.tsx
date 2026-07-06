import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
	title: "Contact",
	description: "Marc Fontenelle - Artiste, Sculpteur - Contact",
};

export default function ContactPage() {
	return (
		<SiteLayout prefooterVariant="works">
			<div className="works-container work-single">
				<div className="title-cat no-margin contact">Contact</div>
				<ContactForm />
			</div>
		</SiteLayout>
	);
}
