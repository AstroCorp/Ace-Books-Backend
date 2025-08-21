import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from '@/infrastructure/auth/validation/dto/createUser.dto';
import { CreateUserUseCase } from '@/application/auth/useCases/createUserUseCase';
import { GenerateUserAccessTokensUseCase } from '@/application/auth/useCases/generateUserAccessTokensUseCase';
import { GenerateUserRefreshTokenUseCase } from '@/application/auth/useCases/generateUserRefreshTokenUseCase';
import { SendVerificationEmailUseCase } from '@/application/emails/useCases/sendVerificationEmailUseCase';

@Controller('auth')
export class RegisterController {
	constructor(
		private readonly createUserUseCase: CreateUserUseCase,
		private readonly generateUserAccessTokensUseCase: GenerateUserAccessTokensUseCase,
		private readonly generateUserRefreshTokenUseCase: GenerateUserRefreshTokenUseCase,
		private readonly sendVerificationEmailUseCase: SendVerificationEmailUseCase,
	) {
		//
	}

	@Post('register')
	async __invoke(@Body() body: CreateUserDTO) {
		const user = await this.createUserUseCase.execute(body.email, body.password);
		const accessToken = this.generateUserAccessTokensUseCase.execute(user);
		const refreshToken = await this.generateUserRefreshTokenUseCase.execute(user);

		await this.sendVerificationEmailUseCase.execute(user);

		return {
			access_token: accessToken,
			refresh_token: refreshToken,
		};
	}
}
