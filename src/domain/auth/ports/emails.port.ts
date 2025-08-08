import { InjectionToken } from "@nestjs/common";

export const EMAILS_PORT: InjectionToken = 'EMAILS_PORT';

export interface EmailsPort {
	sendVerifyAccountEmail(email: string): Promise<void>;
	sendResetPasswordEmail(email: string): Promise<void>;
}
