import { Controller, Headers, Post, Request, UseGuards } from "@nestjs/common";
import { JwtRefreshAuthGuard } from "@/infrastructure/auth/guards/jwt-refresh.guard";
import { Session } from "@/infrastructure/auth/types/session";
import { GetTokenUseCase } from "@/application/auth/useCases/getTokenUseCase";
import { GenerateUserAccessTokensUseCase } from "@/application/auth/useCases/generateUserAccessTokensUseCase";
import { GenerateUserRefreshTokenUseCase } from "@/application/auth/useCases/generateUserRefreshTokenUseCase";
import { TokenType } from "@/domain/common/models/Token";

@Controller('auth')
export class RefreshController {
	constructor(
		private readonly getTokenUseCase: GetTokenUseCase,
		private readonly generateUserAccessTokensUseCase: GenerateUserAccessTokensUseCase,
		private readonly generateUserRefreshTokenUseCase: GenerateUserRefreshTokenUseCase,
	) {
		//
	}

	@UseGuards(JwtRefreshAuthGuard)
	@Post('refresh')
	async __invoke(@Request() req: Session, @Headers('authorization') authHeader: string) {
		const currentRefreshToken = authHeader.split(' ')[1];
		const currentRefreshTokenEntity = await this.getTokenUseCase.execute(currentRefreshToken, TokenType.REFRESH);

		const accessToken = this.generateUserAccessTokensUseCase.execute(req.user);
		const refreshToken = currentRefreshTokenEntity.checkIfNeedsRefresh()
			? await this.generateUserRefreshTokenUseCase.execute(req.user)
			: currentRefreshToken;

		return {
			access_token: accessToken,
			refresh_token: refreshToken,
		};
	}
}
