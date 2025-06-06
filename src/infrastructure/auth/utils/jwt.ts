import JwtPort from "@/application/auth/ports/jwt.port";
import type { Payload } from "@/infrastructure/auth/types/payload";

class Jwt implements JwtPort {
	getPayload(token: string): Payload {
		const [ header, payload, signature ] = token.split('.');
		const parsedPayload = JSON.parse(atob(payload));

		return parsedPayload;
	}
}

export default Jwt;
