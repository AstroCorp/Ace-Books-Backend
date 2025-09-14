export interface MailerOptions {
	template?: {
		dir?: string;
	};
}

export interface MailData {
	data: {
		template: string;
		context: Record<string, any>;
	};
}

export interface CompileCallback {
	(err?: any, body?: string): any;
}
