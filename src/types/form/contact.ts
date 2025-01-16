/** @format */

export interface FormData {
	firstName: string;
	lastName: string;
	email: string;
	phone?: string;
	company?: string;
	subject: string;
	message: string;
	gdprConsent: boolean;
	honeypot?: string;
	date?: string;
	heure?: string;
	lang?: string;
}

export interface ContactProps {
	dictionary: ContactDictionary;
	lang: string;
}

export interface ContactDictionary {
	title: string;
	subtitle: string;
	form: FormDictionary;
	social: {
		linkedin: string;
		twitter: string;
	};
}

export interface FormDictionary {
	firstName: string;
	lastName: string;
	optional: string;
	phone: string;
	company: string;
	email: string;
	emailFormat: string;
	phoneFormat: {
		line1: string;
		line2: string;
	};
	subject: string;
	message: string;
	submit: string;
	sending: string;
	success: string;
	error: string;
	recaptcha: {
		error: {
			title: string;
			cause: string;
			reasons: string[];
			solutions: {
				title: string;
				items: string[];
			};
		};
	};
	errors: {
		firstName: string;
		lastName: string;
		email: string;
		subject: string;
		message: string;
		gdpr: string;
	};
	gdpr: {
		text: string;
		privacyLink: string;
		checkbox: string;
	};
}
