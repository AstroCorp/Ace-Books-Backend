export interface EmailsPort {
	sendVerifyAccountEmail(email: string): Promise<void>;
	sendResetPasswordEmail(email: string): Promise<void>;
}
