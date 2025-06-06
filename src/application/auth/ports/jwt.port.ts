import { Payload } from "@/infrastructure/auth/types/payload";

interface JwtPort {
	getPayload(token: string): Payload;
}

export default JwtPort;
