import { Injectable, Inject } from '@nestjs/common';
import { UuidPort, UUID_PORT } from '@/domain/auth/ports/uuid.port';
import { JwtPort, JWT_PORT } from '@/domain/auth/ports/jwt.port';
import { User } from '@/domain/common/models/User';

@Injectable()
export class GenerateUserAccessTokensUseCase {
	constructor(
		@Inject(UUID_PORT)
		private readonly uuidService: UuidPort,

		@Inject(JWT_PORT)
		private readonly jwtService: JwtPort,
	) {
		//
	}

	public execute(user: User) {
		const jti = this.uuidService.get();
		const payload = user.getDataForToken(jti);

		const token = this.jwtService.sign(payload, {
			secret: process.env.JWT_SECRET,
			expiresIn: process.env.JWT_SECRET_EXPIRES,
		});

		return token;
	}
}
