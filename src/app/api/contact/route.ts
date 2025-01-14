/** @format */

import { NextRequest, NextResponse } from "next/server";
import emailjs from "@emailjs/browser";

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;

const MINIMUM_SCORE = 0;

async function verifyRecaptcha(token: string) {
	try {
		// Log avant la vérification
		console.log(
			"Attempting reCAPTCHA verification with token:",
			token.substring(0, 20) + "..."
		);

		const response = await fetch(
			"https://www.google.com/recaptcha/api/siteverify",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: `secret=${RECAPTCHA_SECRET_KEY}&response=${token}`,
			}
		);

		if (!response.ok) {
			throw new Error(`reCAPTCHA verification failed: ${response.statusText}`);
		}

		const data = await response.json();
		// Log détaillé de la réponse
		console.log("reCAPTCHA API Response:", {
			success: data.success,
			score: data.score,
			action: data.action,
			challengeTs: data.challenge_ts,
			hostname: data.hostname,
			errorCodes: data["error-codes"], // Important pour le debug
		});

		return {
			success: data.success && data.score >= MINIMUM_SCORE,
			score: data.score,
			details: data, // Ajout des détails complets
		};
	} catch (error) {
		console.error("reCAPTCHA Verification Error:", {
			error,
			secretKeyPresent: !!RECAPTCHA_SECRET_KEY,
			secretKeyLength: RECAPTCHA_SECRET_KEY?.length,
		});
		return { success: false, score: 0, details: null };
	}
}

// Définir une interface pour les erreurs
interface ApiError extends Error {
	message: string;
	code?: string;
	status?: number;
}

export async function POST(request: NextRequest) {
	try {
		if (!RECAPTCHA_SECRET_KEY) {
			console.error("Missing RECAPTCHA_SECRET_KEY");
			return NextResponse.json(
				{ error: "Server configuration error" },
				{ status: 500 }
			);
		}

		const body = await request.json();

		if (!body) {
			console.error("Empty request body");
			return NextResponse.json({ error: "Invalid request" }, { status: 400 });
		}

		console.log("Request body:", body);

		const { "g-recaptcha-response": recaptchaToken, ...formData } = body;

		if (!recaptchaToken) {
			console.error("Missing reCAPTCHA token");
			return NextResponse.json(
				{ error: "Missing security token" },
				{ status: 400 }
			);
		}

		// Vérifier le reCAPTCHA
		const recaptchaResult = await verifyRecaptcha(recaptchaToken);
		console.log("reCAPTCHA verification result:", recaptchaResult);
		if (!recaptchaResult.success) {
			return NextResponse.json(
				{ error: "reCAPTCHA verification failed" },
				{ status: 400 }
			);
		}

		// Envoyer l'email avec EmailJS
		const emailjsResponse = await emailjs.send(
			process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!, // serviceID en premier
			process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!, // templateID en second
			formData, // données du formulaire
			process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY // public key en dernier
		);

		// Ajoutons plus de logs pour déboguer
		console.log("EmailJS Configuration:", {
			serviceID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
			templateID: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
			hasPublicKey: !!process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
			formData: formData,
		});

		console.log("EmailJS Response:", emailjsResponse);

		return NextResponse.json({
			message: "Email sent successfully",
			recaptchaScore: recaptchaResult.score,
		});
	} catch (error: unknown) {
		// Type guard pour l'erreur
		const apiError = error as ApiError;
		console.error("API Error:", {
			message: apiError.message,
			stack: apiError.stack,
			type: typeof error,
		});

		return NextResponse.json(
			{
				error: "Server error",
				details:
					process.env.NODE_ENV === "development"
						? apiError.message
						: "An unexpected error occurred",
			},
			{ status: 500 }
		);
	}
}
