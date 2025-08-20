import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { OrmModule } from '@/infrastructure/orm/orm.module';
import { UsersModule } from '@/infrastructure/users/users.module';
import { LocalStrategy } from '@/infrastructure/auth/strategies/local.strategy';
import { JwtStrategy } from '@/infrastructure/auth/strategies/jwt.strategy';
import { JwtRefreshStrategy } from '@/infrastructure/auth/strategies/jwt-refresh.strategy';
import { IsEmailAvailableConstraint } from '@/infrastructure/auth/validation/pipes/isEmailAvalible.pipe';
import { PROVIDERS } from '@/infrastructure/auth/auth.providers';
import { PostgresUserReaderRepository } from '@/infrastructure/users/repositories/postgresUserReaderRepository';
import { RegisterController } from '@/infrastructure/auth/controllers/register.controller';
import { LoginController } from '@/infrastructure/auth/controllers/login.controller';
import { CreateUserUseCase } from '@/application/auth/useCases/createUserUseCase';
import { GenerateUserAccessTokensUseCase } from '@/application/auth/useCases/generateUserAccessTokensUseCase';
import { GenerateUserRefreshTokenUseCase } from '@/application/auth/useCases/generateUserRefreshTokenUseCase';
import { ValidateUserPasswordUseCase } from '@/application/auth/useCases/validateUserPasswordUseCase';
import { SendVerificationEmailUseCase } from '@/application/auth/useCases/sendVerificationEmailUseCase';
import { ValidateUserRefreshTokenUseCase } from '@/application/auth/useCases/validateUserRefreshTokenUseCase';

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
		PostgresUserReaderRepository,
		IsEmailAvailableConstraint,
		CreateUserUseCase,
		GenerateUserAccessTokensUseCase,
		GenerateUserRefreshTokenUseCase,
		ValidateUserPasswordUseCase,
		SendVerificationEmailUseCase,
		ValidateUserRefreshTokenUseCase,
	],
	controllers: [
		RegisterController,
		LoginController,
	],
})
export class AuthModule { }
