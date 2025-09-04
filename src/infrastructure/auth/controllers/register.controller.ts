import { Body, Controller, HttpStatus, Logger, Post, Req, UseFilters } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { CreateUserDTO } from '@/infrastructure/auth/validation/dto/createUser.dto';
import { CheckIfEmailExistsUseCase } from '@/application/auth/useCases/checkIfEmailExistsUseCase';
import { CreateUserUseCase } from '@/application/auth/useCases/createUserUseCase';
import { GenerateUserAccessTokensUseCase } from '@/application/auth/useCases/generateUserAccessTokensUseCase';
import { GenerateUserRefreshTokenUseCase } from '@/application/auth/useCases/generateUserRefreshTokenUseCase';
import { SendVerificationEmailUseCase } from '@/application/emails/useCases/sendVerificationEmailUseCase';
import { GenerateVerificationAccountUrlUseCase } from '@/application/users/useCases/generateVerificationAccountUrlUseCase';
import EmailSendFailedException from '@/domain/emails/exceptions/emailSendFailed.exception';
import EmailNotAvailableException from '@/domain/auth/exceptions/emailNotAvailable.exception';
import { ExceptionFilter } from '@/infrastructure/common/filters/exception.filter';

@Controller('auth')
export class RegisterController {
	private readonly logger = new Logger(RegisterController.name);

	constructor(
		private readonly checkIfEmailExistsUseCase: CheckIfEmailExistsUseCase,
		private readonly createUserUseCase: CreateUserUseCase,
		private readonly generateUserAccessTokensUseCase: GenerateUserAccessTokensUseCase,
		private readonly generateUserRefreshTokenUseCase: GenerateUserRefreshTokenUseCase,
		private readonly sendVerificationEmailUseCase: SendVerificationEmailUseCase,
		private readonly generateVerificationAccountUrlUseCase: GenerateVerificationAccountUrlUseCase,
	) {
		//
	}

	@Post('register')
	@UseFilters(new ExceptionFilter([
		{
			exception: EmailNotAvailableException,
			status: HttpStatus.BAD_REQUEST,
		}
	]))
	async __invoke(@Req() request: FastifyRequest, @Body() body: CreateUserDTO) {
		const emailExists = await this.checkIfEmailExistsUseCase.execute(body.email);

		if (emailExists) {
			throw new EmailNotAvailableException();
		}

		const user = await this.createUserUseCase.execute(body.email, body.password);
		const accessToken = this.generateUserAccessTokensUseCase.execute(user);
		const refreshToken = await this.generateUserRefreshTokenUseCase.execute(user);
		const verifyAccountUrl = this.generateVerificationAccountUrlUseCase.execute(user);

		try {
			await this.sendVerificationEmailUseCase.execute(user, verifyAccountUrl);
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
