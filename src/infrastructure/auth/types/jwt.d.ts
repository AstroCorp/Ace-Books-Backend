import * as jwt from 'jsonwebtoken';

export interface JwtSignOptions extends Omit<JwtSignOptions, keyof jwt.SignOptions> {
	//
}

export interface Payload {
	userId: number;
	isAdmin: boolean;
	isVerified: boolean;
	iat: number;
	exp: number;
}
