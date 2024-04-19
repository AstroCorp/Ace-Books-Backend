declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: Environment;
			NODE_PORT: number;

			RATE_LIMIT_TTL: number;
			RATE_LIMIT_MAX: number;

			COOKIE_SECRET: string;

			JWT_SECRET: string;
			JWT_REFRESH_SECRET: string;

			DATABASE_HOST: string;
			DATABASE_PORT: number;
			DATABASE_USER: string;
			DATABASE_NAME: string;
			DATABASE_PASSWORD: string;
		}

		const enum Environment {
			Development = 'development',
			Production = 'production',
		}
	}
}

export {};
