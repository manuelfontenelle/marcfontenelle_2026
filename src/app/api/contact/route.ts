import { Resend } from "resend";
import { NextResponse } from "next/server";

const RESEND_FROM_EMAIL = "Contact Marc Fontenelle <onboarding@resend.dev>";

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

	const resend = new Resend(process.env.RESEND_API_KEY);

	try {
		await resend.emails.send({
			from: RESEND_FROM_EMAIL,
			to: process.env.CONTACT_EMAIL || "marc.fontenelle.pro@gmail.com",
			replyTo: email,
			subject: `Message de ${email} - Marc Fontenelle`,
			text: message,
		});

		return NextResponse.json({ success: true });
	} catch {
		return NextResponse.json({ error: "Send failed" }, { status: 500 });
	}
}
