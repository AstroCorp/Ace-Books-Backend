import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from '@/application/auth/auth.service';
import { AuthController } from '@/infrastructure/auth/auth.controller';
import { OrmModule } from '@/infrastructure/orm/orm.module';
import { UsersModule } from '@/infrastructure/users/users.module';
import { EmailsModule } from '@/emails/emails.module';
import { LocalStrategy } from '@/infrastructure/auth/strategies/local.strategy';
import { JwtStrategy } from '@/infrastructure/auth/strategies/jwt.strategy';
import { JwtRefreshStrategy } from '@/infrastructure/auth/strategies/jwt-refresh.strategy';
import { IsEmailAvailableConstraint } from '@/infrastructure/auth/validation/pipes/isEmailAvalible.pipe';
import Hash from '@/infrastructure/auth/utils/hash';
import Jwt from '@/infrastructure/auth/utils/jwt';
import Sign from '@/infrastructure/auth/utils/sign';
import { HASH_PORT, JWT_PORT, SIGN_PORT } from '@/application/auth/ports/tokens';

@Module({
	imports: [
		JwtModule.register({
			global: true,
		}),
		PassportModule,
		OrmModule,
		UsersModule,
		EmailsModule,
	],
	providers: [
		AuthService,
		LocalStrategy,
		JwtStrategy,
		JwtRefreshStrategy,
		IsEmailAvailableConstraint,
		{
			provide: HASH_PORT,
			useClass: Hash,
		},
		{
			provide: JWT_PORT,
			useClass: Jwt,
		},
		{
			provide: SIGN_PORT,
			useClass: Sign,
		},
	],
	controllers: [AuthController],
})
export class AuthModule { }
