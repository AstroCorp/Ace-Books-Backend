import { Controller, Headers, Post, Request, UseGuards } from '@nestjs/common';
import { JwtRefreshAuthGuard } from '@/infrastructure/auth/guards/jwt-refresh.guard';
import { Session } from '@/infrastructure/auth/types/session';
import { GetUserRefreshTokenUseCase } from '@/application/auth/useCases/getUserRefreshTokenUseCase';
import { GenerateUserAccessTokensUseCase } from '@/application/auth/useCases/generateUserAccessTokensUseCase';
import { GenerateUserRefreshTokenUseCase } from '@/application/auth/useCases/generateUserRefreshTokenUseCase';

@Controller('auth')
export class RefreshController {
	constructor(
		private readonly getUserRefreshTokenUseCase: GetUserRefreshTokenUseCase,
		private readonly generateUserAccessTokensUseCase: GenerateUserAccessTokensUseCase,
		private readonly generateUserRefreshTokenUseCase: GenerateUserRefreshTokenUseCase,
	) {
		//
	}

	@UseGuards(JwtRefreshAuthGuard)
	@Post('refresh')
	async __invoke(@Request() req: Session, @Headers('authorization') authHeader: string) {
		const currentRefreshToken = authHeader.split(' ')[1];
		const currentRefreshTokenEntity = await this.getUserRefreshTokenUseCase.execute(currentRefreshToken);

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
