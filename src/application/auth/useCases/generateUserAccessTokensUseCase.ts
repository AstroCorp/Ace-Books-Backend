import { Injectable, Inject } from "@nestjs/common";
import { JwtPort, JWT_PORT } from "@/domain/auth/ports/jwt.port";
import { User } from "@/domain/common/models/User";

@Injectable()
export class GenerateUserAccessTokensUseCase {
	constructor(
		@Inject(JWT_PORT)
		private readonly jwtService: JwtPort,
	) {
		//
	}

	public execute(user: User) {
		const payload = user.getDataForToken();

		const token = this.jwtService.sign(payload, {
			secret: process.env.JWT_SECRET,
			expiresIn: process.env.JWT_SECRET_EXPIRES,
		});

		return token;
	}
}
