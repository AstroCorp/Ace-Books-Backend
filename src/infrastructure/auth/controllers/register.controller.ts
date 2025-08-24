import { Body, Controller, Logger, Post, Req } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { CreateUserDTO } from '@/infrastructure/auth/validation/dto/createUser.dto';
import { CreateUserUseCase } from '@/application/auth/useCases/createUserUseCase';
import { GenerateUserAccessTokensUseCase } from '@/application/auth/useCases/generateUserAccessTokensUseCase';
import { GenerateUserRefreshTokenUseCase } from '@/application/auth/useCases/generateUserRefreshTokenUseCase';
import { SendVerificationEmailUseCase } from '@/application/emails/useCases/sendVerificationEmailUseCase';
import EmailSendFailedException from '@/domain/emails/exceptions/emailSendFailed.exception';

@Controller('auth')
export class RegisterController {
	private readonly logger = new Logger(RegisterController.name);

	constructor(
		private readonly createUserUseCase: CreateUserUseCase,
		private readonly generateUserAccessTokensUseCase: GenerateUserAccessTokensUseCase,
		private readonly generateUserRefreshTokenUseCase: GenerateUserRefreshTokenUseCase,
		private readonly sendVerificationEmailUseCase: SendVerificationEmailUseCase,
	) {
		//
	}

	@Post('register')
	async __invoke(@Req() request: FastifyRequest, @Body() body: CreateUserDTO) {
		const user = await this.createUserUseCase.execute(body.email, body.password);
		const accessToken = this.generateUserAccessTokensUseCase.execute(user);
		const refreshToken = await this.generateUserRefreshTokenUseCase.execute(user);

		try {
			await this.sendVerificationEmailUseCase.execute(user);
		} catch (error) {
			// Seguir con la ejecución aunque falle el envío de email,
			// simplemente logueamos el error
			if (error instanceof EmailSendFailedException) {
				this.logger.error(`${error.code}: ${error.message}`, error.stack, {
					path: request.url,
					method: request.method,
					body: request.body,
				});
			}
		}

		return {
			access_token: accessToken,
			refresh_token: refreshToken,
		};
	}
}
