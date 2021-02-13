import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';
import { OrmModule } from '../orm/orm.module';
import { IsEmailAvailableConstraint } from './validation/pipes/isEmailAvailable';
import { IsLangAvailableConstraint } from './validation/pipes/isLangAvailable';
import { IsValidRefreshTokenConstraint } from './validation/pipes/isValidRefreshToken';
import { MailsService } from '../mails/mails.service';

@Module({
	imports: [
		OrmModule,
		UsersModule,
		PassportModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
  			useFactory: async (configService: ConfigService) => ({
				secret: configService.get<string>('JWT_SECRET') || 'secret',
				signOptions: { 
					expiresIn: configService.get<string>('JWT_TIMEOUT') || '900s',
				},
			}),
			inject: [ConfigService],
		}),
	],
	controllers: [AuthController],
	providers: [
		AuthService,
		MailsService,
		LocalStrategy,
		JwtStrategy,
		IsEmailAvailableConstraint,
		IsLangAvailableConstraint,
		IsValidRefreshTokenConstraint,
	],
	exports: [AuthService],
})
export class AuthModule {}
