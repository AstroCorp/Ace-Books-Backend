import { InjectionToken } from "@nestjs/common";
import type { JwtSignOptions, Payload } from "@/infrastructure/auth/types/jwt";

export const JWT_PORT: InjectionToken = 'JWT_PORT';

export interface JwtPort {
	sign(payload: object, options?: JwtSignOptions): string;
	getPayload(token: string): Payload;
}
