declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: Environment;

			DATABASE_HOST: string;
			DATABASE_PORT: number;
			DATABASE_USER: string;
			DATABASE_NAME: string;
			DATABASE_PASSWORD: string;

			COOKIE_SECRET: string;
		}

		enum Environment {
			Development = 'development',
			Production = 'production',
		}
	}
}

export {};
