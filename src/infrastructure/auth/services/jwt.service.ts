import { Injectable } from "@nestjs/common";
import { JwtService as NestJwtService } from "@nestjs/jwt";
import UuidService from "@/infrastructure/auth/services/uuid.service";
import { JwtPort } from "@/domain/auth/ports/jwt.port";
import type { JwtSignOptions, Payload } from "@/infrastructure/auth/types/jwt";

@Injectable()
class JwtService implements JwtPort {
	constructor(
		private readonly uuidService: UuidService,
		private readonly jwt: NestJwtService
	) {
		//
	}

	sign(payload: object, options?: JwtSignOptions): string {
		const jti = this.uuidService.get();

		return this.jwt.sign({ jti, ...payload }, options);
	}

	getPayload(token: string): Payload {
		const [ header, payload, signature ] = token.split('.');
		const parsedPayload = JSON.parse(atob(payload));

		return parsedPayload;
	}
}

export default JwtService;
