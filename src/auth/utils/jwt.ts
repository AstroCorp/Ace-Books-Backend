import type { Payload } from "@/auth/types/payload";

const extractJwtPayload = (token: string) => {
	const [ header, payload, signature ] = token.split('.');
	const payloadData = JSON.parse(atob(payload));

	return payloadData;
}

export const extractTokenData = (token: string): Payload => {
	return extractJwtPayload(token);
}

