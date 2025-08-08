export interface JwtSignOptions {
	secret: string;
	expiresIn: string;
}

export interface Payload {
	userId: number;
	isAdmin: boolean;
	isVerified: boolean;
	iat: number;
	exp: number;
}
