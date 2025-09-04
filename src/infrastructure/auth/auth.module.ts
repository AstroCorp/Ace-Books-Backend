import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { OrmModule } from '@/infrastructure/orm/orm.module';
import { UsersModule } from '@/infrastructure/users/users.module';
import { LocalStrategy } from '@/infrastructure/auth/strategies/local.strategy';
import { JwtStrategy } from '@/infrastructure/auth/strategies/jwt.strategy';
import { JwtRefreshStrategy } from '@/infrastructure/auth/strategies/jwt-refresh.strategy';
import { PROVIDERS } from '@/infrastructure/auth/auth.providers';
import { PostgresUserReaderRepository } from '@/infrastructure/users/repositories/postgresUserReaderRepository';
import { PostgresTokenReaderRepository } from '@/infrastructure/auth/repositories/postgresTokenReaderRepository';
import { RegisterController } from '@/infrastructure/auth/controllers/register.controller';
import { LoginController } from '@/infrastructure/auth/controllers/login.controller';
import { CreateUserUseCase } from '@/application/auth/useCases/createUserUseCase';
import { GenerateUserAccessTokensUseCase } from '@/application/auth/useCases/generateUserAccessTokensUseCase';
import { GenerateUserRefreshTokenUseCase } from '@/application/auth/useCases/generateUserRefreshTokenUseCase';
import { ValidateUserPasswordUseCase } from '@/application/auth/useCases/validateUserPasswordUseCase';
import { GenerateVerificationAccountUrlUseCase } from '@/application/users/useCases/generateVerificationAccountUrlUseCase';
import { SendVerificationEmailUseCase } from '@/application/emails/useCases/sendVerificationEmailUseCase';
import { ValidateUserRefreshTokenUseCase } from '@/application/auth/useCases/validateUserRefreshTokenUseCase';
import { SendResetPasswordEmailUseCase } from '@/application/emails/useCases/sendResetPasswordEmailUseCase';
import { GenerateResetPasswordUrlUseCase } from '@/application/auth/useCases/generateResetPasswordUrlUseCase';
import { SendResetPasswordEmailController } from '@/infrastructure/auth/controllers/sendResetPasswordEmail.controller';
import { GetTokenUseCase } from '@/application/auth/useCases/getTokenUseCase';
import { GetUserByEmailUseCase } from '@/application/auth/useCases/getUserByEmailUseCase';
import JwtService from '@/infrastructure/auth/services/jwt.service';
import { RefreshController } from '@/infrastructure/auth/controllers/refresh.controller';
import SignService from '@/infrastructure/auth/services/sign.service';
import { ResetPasswordController } from '@/infrastructure/auth/controllers/resetPassword.controller';
import { UpdateUserPasswordUseCase } from '@/application/auth/useCases/updateUserPasswordUseCase';
import { RevokeTokenUseCase } from '@/application/auth/useCases/revokeTokenUseCase';
import { VerifyEmailAvailabilityUseCase } from '@/application/auth/useCases/verifyEmailAvailabilityUseCase';

@Module({
	imports: [
		JwtModule.register({
			global: true,
		}),
		PassportModule,
		OrmModule,
		UsersModule,
	],
	providers: [
		...PROVIDERS,
		LocalStrategy,
		JwtStrategy,
		JwtRefreshStrategy,
		JwtService,
		SignService,
		PostgresUserReaderRepository,
		PostgresTokenReaderRepository,
		CreateUserUseCase,
		GenerateUserAccessTokensUseCase,
		GenerateUserRefreshTokenUseCase,
		ValidateUserPasswordUseCase,
		GenerateVerificationAccountUrlUseCase,
		SendVerificationEmailUseCase,
		GenerateResetPasswordUrlUseCase,
		SendResetPasswordEmailUseCase,
		ValidateUserRefreshTokenUseCase,
		GetUserByEmailUseCase,
		GetTokenUseCase,
		UpdateUserPasswordUseCase,
		RevokeTokenUseCase,
		VerifyEmailAvailabilityUseCase,
	],
	controllers: [
		RegisterController,
		LoginController,
		SendResetPasswordEmailController,
		RefreshController,
		ResetPasswordController,
	],
})
export class AuthModule { }
