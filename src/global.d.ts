declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: Environment;
			NODE_PORT: number;

			FRONTEND_URL: string;

			DEFAULT_RATE_LIMIT_TTL: number;
			DEFAULT_RATE_LIMIT_MAX: number;
			EMAILS_RATE_LIMIT_TTL: number;
			EMAILS_RATE_LIMIT_MAX: number;

			COOKIE_SECRET: string;

			JWT_SECRET: string;
			JWT_SECRET_EXPIRES: string;
			JWT_REFRESH_SECRET: string;
			JWT_REFRESH_SECRET_EXPIRES: string;

			GENERIC_JWT_SECRET: string;
			GENERIC_JWT_SECRET_EXPIRES: string;

			URL_SIGNED_SECRET: string;

			DATABASE_HOST: string;
			DATABASE_PORT: number;
			DATABASE_USER: string;
			DATABASE_NAME: string;
			DATABASE_PASSWORD: string;

			MAIL_HOST: string;
			MAIL_PORT: number;
			MAIL_USERNAME: string;
			MAIL_PASSWORD: string;
		}

		const enum Environment {
			Development = 'development',
			Production = 'production',
		}
	}
}

export {};
