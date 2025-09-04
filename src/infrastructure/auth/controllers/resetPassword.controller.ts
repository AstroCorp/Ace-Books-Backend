import { Controller, Post, Body, HttpCode, HttpStatus, HttpException, UseFilters } from '@nestjs/common';
import { ResetPasswordDTO } from '@/infrastructure/auth/validation/dto/resetPassword.dto';
import { VerifyEmailAvailabilityUseCase } from '@/application/auth/useCases/verifyEmailAvailabilityUseCase';
import { GetTokenUseCase } from '@/application/auth/useCases/getTokenUseCase';
import { TokenType } from '@/domain/common/models/Token';
import { UpdateUserPasswordUseCase } from '@/application/auth/useCases/updateUserPasswordUseCase';
import { RevokeTokenUseCase } from '@/application/auth/useCases/revokeTokenUseCase';
import EmailNotAvailableException from '@/domain/auth/exceptions/emailNotAvailable.exception';
import { ExceptionFilter } from '@/infrastructure/common/filters/exception.filter';

@Controller('auth')
export class ResetPasswordController
{
	constructor(
		private readonly verifyEmailAvailabilityUseCase: VerifyEmailAvailabilityUseCase,
		private readonly getTokenUseCase: GetTokenUseCase,
		private readonly updateUserPasswordUseCase: UpdateUserPasswordUseCase,
		private readonly revokeTokenUseCase: RevokeTokenUseCase,
	) {
		//
	}

	@Post('reset-password')
	@HttpCode(HttpStatus.OK)
	@UseFilters(new ExceptionFilter([
		{
			exception: EmailNotAvailableException,
			status: HttpStatus.BAD_REQUEST,
		}
	]))
	public async __invoke(@Body() body: ResetPasswordDTO) {
		const isEmailInUse = await this.verifyEmailAvailabilityUseCase.execute(body.email);

		if (!isEmailInUse) {
			throw new EmailNotAvailableException();
		}

		const resetToken = await this.getTokenUseCase.execute(body.token, TokenType.RESET);

		if (!resetToken || resetToken.isRevoked || resetToken.checkIfIsExpired()) {
			throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
		}

		await this.updateUserPasswordUseCase.execute(body.email, body.password);
		await this.revokeTokenUseCase.execute(body.token, TokenType.RESET);
	}
}
