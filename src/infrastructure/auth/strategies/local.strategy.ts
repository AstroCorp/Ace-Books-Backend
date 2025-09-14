
import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ValidateUserPasswordUseCase } from "@/application/auth/useCases/validateUserPasswordUseCase";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
	constructor(
		private readonly validateUserPasswordUseCase: ValidateUserPasswordUseCase,
	) {
		super({
			usernameField: 'email',
			passwordField: 'password',
		});
	}

	async validate(email: string, password: string) {
		const user = await this.validateUserPasswordUseCase.execute(email, password);

		if (!user) {
			throw new UnauthorizedException();
		}

		return user;
	}
}
