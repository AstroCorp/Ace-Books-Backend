import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthRoutes } from '@/infrastructure/auth/auth.routes';
import { OrmModule } from '@/infrastructure/orm/orm.module';
import { UsersModule } from '@/infrastructure/users/users.module';
import { EmailsModule } from '@/infrastructure/emails/emails.module';
import { LocalStrategy } from '@/infrastructure/auth/strategies/local.strategy';
import { JwtStrategy } from '@/infrastructure/auth/strategies/jwt.strategy';
import { JwtRefreshStrategy } from '@/infrastructure/auth/strategies/jwt-refresh.strategy';
import { IsEmailAvailableConstraint } from '@/infrastructure/auth/validation/pipes/isEmailAvalible.pipe';
import { NodemailerService } from '@/infrastructure/emails/nodemailer.service';
import { PROVIDERS } from '@/infrastructure/auth/auth.providers';


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
		...PROVIDERS,
		LocalStrategy,
		JwtStrategy,
		JwtRefreshStrategy,
		IsEmailAvailableConstraint,
		NodemailerService,
	],
	controllers: [AuthRoutes],
})
export class AuthModule { }
