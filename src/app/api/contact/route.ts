import { Resend } from "resend";
import { NextResponse } from "next/server";

const RESEND_FROM_EMAIL = "Contact Marc Fontenelle <contact@marcfontenelle.com>";

export async function POST(request: Request) {
	const { email, message } = await request.json();

	if (!email || !message) {
		return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
	}

	if (!process.env.RESEND_API_KEY) {
		return NextResponse.json(
			{ error: "Email service not configured" },
			{ status: 500 },
		);
	}

	const contactEmail =
		process.env.CONTACT_EMAIL?.trim() || "marc.fontenelle.pro@gmail.com";

	const resend = new Resend(process.env.RESEND_API_KEY);

	try {
		const { data, error } = await resend.emails.send({
			from: RESEND_FROM_EMAIL,
			to: contactEmail,
			replyTo: email,
			subject: `Message de ${email} - Marc Fontenelle`,
			text: message,
		});

		if (error) {
			console.error("Resend error:", error);
			return NextResponse.json(
				{ error: "Send failed", details: error.message },
				{ status: 500 },
			);
		}

		console.info("Resend email sent:", data?.id, "to:", contactEmail);
		return NextResponse.json({ success: true, id: data?.id });
	} catch (sendError) {
		console.error("Resend exception:", sendError);
		return NextResponse.json({ error: "Send failed" }, { status: 500 });
	}
}
