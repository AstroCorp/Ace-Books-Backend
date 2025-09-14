import { Controller, Post, Body, HttpCode, HttpStatus, HttpException, UseFilters } from '@nestjs/common';
import { ResetPasswordDTO } from '@/infrastructure/auth/validation/dto/resetPassword.dto';
import { CheckIfEmailExistsUseCase } from '@/application/auth/useCases/checkIfEmailExistsUseCase';
import { GetTokenUseCase } from '@/application/auth/useCases/getTokenUseCase';
import { TokenType } from '@/domain/common/models/Token';
import { UpdateUserPasswordUseCase } from '@/application/auth/useCases/updateUserPasswordUseCase';
import { RevokeTokenUseCase } from '@/application/auth/useCases/revokeTokenUseCase';
import EmailNotAvailableException from '@/domain/auth/exceptions/emailNotAvailable.exception';
import { ExceptionFilter } from '@/infrastructure/common/filters/exception.filter';
import ValidationException from '@/domain/common/exceptions/validationException';

@Controller('auth')
export class ResetPasswordController
{
	constructor(
		private readonly checkIfEmailExistsUseCase: CheckIfEmailExistsUseCase,
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
			exception: ValidationException,
			status: HttpStatus.BAD_REQUEST,
		},
		{
			exception: EmailNotAvailableException,
			status: HttpStatus.BAD_REQUEST,
		}
	]))
	public async __invoke(@Body() body: ResetPasswordDTO) {
		const emailExists = await this.checkIfEmailExistsUseCase.execute(body.email.value);

		if (!emailExists) {
			throw new EmailNotAvailableException();
		}

		const resetToken = await this.getTokenUseCase.execute(body.token.value, TokenType.RESET);

		if (!resetToken || resetToken.isRevoked || resetToken.checkIfIsExpired()) {
			throw new HttpException('invalid token', HttpStatus.BAD_REQUEST);
		}

		await this.updateUserPasswordUseCase.execute(body.email.value, body.password.value);
		await this.revokeTokenUseCase.execute(body.token.value, TokenType.RESET);

		return {
			message: 'password reset successfully',
		};
	}
}
