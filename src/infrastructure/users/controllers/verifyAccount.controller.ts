import { Controller, Post, UseGuards, Request, HttpCode, HttpStatus } from '@nestjs/common';
import { JwtAuthGuard } from '@/infrastructure/auth/guards/jwt.guard';
import { Session } from '@/infrastructure/auth/types/session';
import { SignGuard } from '@/infrastructure/auth/guards/sign.guard';
import { VerifyUserAccountUseCase } from '@/application/users/useCases/verifyUserAccountUseCase';

@Controller('users')
export class VerifyAccountController
{
	constructor(
		private readonly verifyUserAccountUseCase: VerifyUserAccountUseCase,
	) {
		//
	}

	@UseGuards(JwtAuthGuard, SignGuard)
	@Post('verify-account')
	@HttpCode(HttpStatus.OK)
	async __invoke(@Request() req: Session) {
		await this.verifyUserAccountUseCase.execute(req.user);

		return {
			message: 'account verified successfully',
		};
	}
}
