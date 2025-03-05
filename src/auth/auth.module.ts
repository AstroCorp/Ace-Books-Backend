import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from '@/auth/auth.service';
import { AuthController } from '@/auth/auth.controller';
import { OrmModule } from '@/orm/orm.module';
import { UsersModule } from '@/users/users.module';
import { EmailsModule } from '@/emails/emails.module';
import { LocalStrategy } from '@/auth/strategies/local.strategy';
import { JwtStrategy } from '@/auth/strategies/jwt.strategy';
import { JwtRefreshStrategy } from '@/auth/strategies/jwt-refresh.strategy';
import { IsEmailAvailableConstraint } from '@/auth/validation/pipes/isEmailAvalible.pipe';

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
	],
	controllers: [AuthController],
})
export class AuthModule { }
