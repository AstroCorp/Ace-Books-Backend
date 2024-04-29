import type { Payload } from "@/auth/types/payload";
import type { SignPayload } from "@/auth/types/signPayload";

const extractJwtPayload = (token: string) => {
	const [ header, payload, signature ] = token.split('.');
	const payloadData = JSON.parse(atob(payload));

	return payloadData;
}

export const extractTokenData = (token: string): Payload => {
	return extractJwtPayload(token);
}

export const extractSignData = (token: string): SignPayload => {
	return extractJwtPayload(token);
}
