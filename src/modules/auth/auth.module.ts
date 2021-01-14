import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../../modules/users/users.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';
import { OrmModule } from '../orm/orm.module';
import { IsEmailAvailableConstraint } from './validation/pipes/isEmailAvailable';
import { IsLangAvailableConstraint } from './validation/pipes/isLangAvailable';
import { IsValidRefreshTokenConstraint } from './validation/pipes/isValidRefreshToken';

@Module({
	imports: [
		OrmModule,
		UsersModule,
		PassportModule,
	],
	controllers: [AuthController],
	providers: [
		AuthService,
		LocalStrategy,
		JwtStrategy,
		IsEmailAvailableConstraint,
		IsLangAvailableConstraint,
		IsValidRefreshTokenConstraint,
	],
	exports: [AuthService],
})
export class AuthModule {}
