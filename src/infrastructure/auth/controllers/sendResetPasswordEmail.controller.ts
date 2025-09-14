import { Body, Controller, HttpCode, HttpStatus, Post, UseFilters } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { GetUserByEmailUseCase } from '@/application/auth/useCases/getUserByEmailUseCase';
import { SendResetPasswordEmailUseCase } from '@/application/emails/useCases/sendResetPasswordEmailUseCase';
import { SendResetPasswordDTO } from '@/infrastructure/auth/validation/dto/sendResetPassword.dto';
import EmailSendFailedException from '@/domain/emails/exceptions/emailSendFailed.exception';
import { ExceptionFilter } from '@/infrastructure/common/filters/exception.filter';
import { GenerateResetPasswordUrlUseCase } from '@/application/auth/useCases/generateResetPasswordUrlUseCase';
import ValidationException from '@/domain/common/exceptions/validationException';

@Throttle({
	default: {
		ttl: process.env.EMAILS_RATE_LIMIT_TTL,
		limit: process.env.EMAILS_RATE_LIMIT_MAX,
	},
})
@Controller('auth')
export class SendResetPasswordEmailController {
	constructor(
		private readonly getUserByEmailUseCase: GetUserByEmailUseCase,
		private readonly generateResetPasswordUrlUseCase: GenerateResetPasswordUrlUseCase,
		private readonly sendResetPasswordEmailUseCase: SendResetPasswordEmailUseCase,
	) {
		//
	}

	@Post('send-reset-password-email')
	@HttpCode(HttpStatus.OK)
	@UseFilters(new ExceptionFilter([
		{
			exception: ValidationException,
			status: HttpStatus.BAD_REQUEST,
		},
		{
			exception: EmailSendFailedException,
			status: HttpStatus.INTERNAL_SERVER_ERROR,
		}
	]))
	async __invoke(@Body() body: SendResetPasswordDTO) {
		const user = await this.getUserByEmailUseCase.execute(body.email.value);

		// Si el usuario no existe, no se envía el email, no devolvemos
		// error para no revelar si hay una cuenta con ese email
		if (!user) return;

		const resetPasswordUrl = await this.generateResetPasswordUrlUseCase.execute(user);

		await this.sendResetPasswordEmailUseCase.execute(user, resetPasswordUrl);

		return {
			message: 'if an account with that email exists, a reset password email has been sent',
		};
	}
}
