import { Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from "@nestjs/common";
import { GenerateUserAccessTokensUseCase } from "@/application/auth/useCases/generateUserAccessTokensUseCase";
import { GenerateUserRefreshTokenUseCase } from "@/application/auth/useCases/generateUserRefreshTokenUseCase";
import { LocalAuthGuard } from "@/infrastructure/auth/guards/local.guard";
import { Session } from "@/infrastructure/auth/types/session";

@Controller('auth')
export class LoginController {
	constructor(
		private readonly generateUserAccessTokensUseCase: GenerateUserAccessTokensUseCase,
		private readonly generateUserRefreshTokenUseCase: GenerateUserRefreshTokenUseCase,
	) {
		//
	}

	@UseGuards(LocalAuthGuard)
	@Post('login')
	@HttpCode(HttpStatus.OK)
	async __invoke(@Request() req: Session) {
		const user = req.user;

		const accessToken = this.generateUserAccessTokensUseCase.execute(user);
		const refreshToken = await this.generateUserRefreshTokenUseCase.execute(user);

		return {
			access_token: accessToken,
			refresh_token: refreshToken,
		};
	}
}
