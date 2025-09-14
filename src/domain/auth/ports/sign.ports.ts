import { InjectionToken } from "@nestjs/common";

export const SIGN_PORT: InjectionToken = 'SIGN_PORT';

export interface SignPort {
	generate(url: URL, expiration?: Date): URL;
	check(url: URL): boolean;
}
