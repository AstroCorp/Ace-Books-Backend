import { InjectionToken } from "@nestjs/common";

export const HASH_PORT: InjectionToken = 'HASH_PORT';

export interface HashPort {
	generate(value: string): string;
	check(value: string, hash: string): boolean;
}
