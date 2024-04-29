export interface SignPayload {
	user_id: number;
	type: string;
	iat: number;
	exp: number;
}

export const enum SignType {
	VerifyEmail = 'verify-email',
	ResetPassword = 'reset-password',
}
