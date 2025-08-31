import { Controller, Post, Body, HttpCode, HttpStatus, HttpException } from '@nestjs/common';
import { ResetPasswordDTO } from '@/infrastructure/auth/validation/dto/resetPassword.dto';
import { GetTokenUseCase } from '@/application/auth/useCases/getTokenUseCase';
import { TokenType } from '@/domain/common/models/Token';
import { UpdateUserPasswordUseCase } from '@/application/auth/useCases/updateUserPasswordUseCase';
import { RevokeTokenUseCase } from '@/application/auth/useCases/revokeTokenUseCase';

@Controller('auth')
export class ResetPasswordController
{
	constructor(
		private readonly getTokenUseCase: GetTokenUseCase,
		private readonly updateUserPasswordUseCase: UpdateUserPasswordUseCase,
		private readonly revokeTokenUseCase: RevokeTokenUseCase,
	) {
		//
	}

	@Post('reset-password')
	@HttpCode(HttpStatus.OK)
	public async __invoke(@Body() body: ResetPasswordDTO) {
		const resetToken = await this.getTokenUseCase.execute(body.token, TokenType.RESET);

		if (!resetToken || resetToken.isRevoked) {
			throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
		}

		await this.updateUserPasswordUseCase.execute(body.email, body.password);
		await this.revokeTokenUseCase.execute(body.token, TokenType.RESET);
	}
}
