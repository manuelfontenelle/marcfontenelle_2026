"use client";

import { useState } from "react";

type Feedback = {
	type: "success" | "error";
	text: string;
} | null;

export default function ContactForm() {
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [feedback, setFeedback] = useState<Feedback>(null);

	const clearFeedback = () => {
		if (feedback) setFeedback(null);
	};

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		setIsSubmitting(true);
		setFeedback(null);

		try {
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, message }),
			});

			if (response.ok) {
				setFeedback({
					type: "success",
					text: "Votre message a bien été envoyé.",
				});
				setEmail("");
				setMessage("");
			} else {
				const data = await response.json();
				if (data.error === "Missing parameters") {
					setFeedback({
						type: "error",
						text: "Veuillez remplir tous les champs du formulaire.",
					});
				} else {
					setFeedback({
						type: "error",
						text: "Une erreur est survenue. Veuillez réessayer.",
					});
				}
			}
		} catch {
			setFeedback({
				type: "error",
				text: "Une erreur est survenue. Veuillez réessayer.",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<form id="contact-form" onSubmit={handleSubmit}>
			<div className="message-block">
				<label className="message-block__label" htmlFor="message">
					Message :
				</label>
				<textarea
					placeholder="Votre message..."
					id="message"
					value={message}
					onChange={(e) => {
						setMessage(e.target.value);
						clearFeedback();
					}}
					required
				/>
			</div>

			<div className="email-block">
				<label htmlFor="email" className="email-block__label">
					Email :
				</label>
				<input
					type="email"
					placeholder="votre-email@exemple.com"
					id="email"
					value={email}
					onChange={(e) => {
						setEmail(e.target.value);
						clearFeedback();
					}}
					required
				/>
			</div>

			<button
				id="submit-btn"
				className={`btn contact ${isSubmitting ? "disabled-btn" : ""}`}
				type="submit"
				disabled={isSubmitting}
			>
				{isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
			</button>

			{feedback && (
				<p
					className={`form-feedback form-feedback--${feedback.type}`}
					role="status"
					aria-live="polite"
				>
					{feedback.text}
				</p>
			)}
		</form>
	);
}
