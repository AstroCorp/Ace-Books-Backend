import { InjectionToken } from "@nestjs/common";

export const UUID_PORT: InjectionToken = 'UUID_PORT';

export interface UuidPort {
	get(): string;
}
