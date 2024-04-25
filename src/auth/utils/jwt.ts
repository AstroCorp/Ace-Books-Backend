import type { Payload } from "@/auth/types/payload";

export const extractTokenData = (token: string): Payload => {
	const [ header, payload, signature ] = token.split('.');
	const payloadData = JSON.parse(atob(payload));

	return payloadData;
}
