import { Body, Controller, HttpCode, Inject, Post } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { SendResetPasswordEmailUseCase } from '@/application/auth/useCases/sendResetPasswordEmailUseCase';
import { SendResetPasswordDTO } from '../validation/dto/sendResetPassword.dto';
import { USER_READER_REPOSITORY, UserReaderRepositoryInterface } from '@/domain/user/repositories/userReaderRepositoryInterface';

@Throttle({
	default: {
		ttl: process.env.EMAILS_RATE_LIMIT_TTL,
		limit: process.env.EMAILS_RATE_LIMIT_MAX,
	},
})
@Controller('auth')
export class ResendResetPasswordEmailController {
	constructor(
		@Inject(USER_READER_REPOSITORY)
		private readonly userRepository: UserReaderRepositoryInterface,

		private readonly sendResetPasswordEmailUseCase: SendResetPasswordEmailUseCase,
	) {
		//
	}

	@Post('resend-reset-password-email')
	@HttpCode(200)
	async __invoke(@Body() body: SendResetPasswordDTO) {
		const user = await this.userRepository.findOneByEmail(body.email);

		// Si el usuario no existe, no se envía el email, no devolvemos
		// error para no revelar si hay una cuenta con ese email
		if (!user) return;

		await this.sendResetPasswordEmailUseCase.execute(user);
	}
}
