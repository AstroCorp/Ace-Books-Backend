import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../../modules/users/users.module';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';
import { OrmModule } from '../../orm/orm.module';
import { IsEmailAvailableConstraint } from './validation/pipes/isEmailAvailable';
import { IsLangAvailableConstraint } from './validation/pipes/isLangAvailable';
import { IsValidTokenConstraint } from './validation/pipes/isValidToken';

@Module({
	imports: [
		OrmModule,
		UsersModule,
		PassportModule,
		JwtModule.register({
			secret: jwtConstants.secret,
			signOptions: { expiresIn: jwtConstants.access_expiresIn },
		}),
	],
	controllers: [AuthController],
	providers: [
		AuthService,
		LocalStrategy,
		JwtStrategy,
		IsEmailAvailableConstraint,
		IsLangAvailableConstraint,
		IsValidTokenConstraint,
	],
	exports: [AuthService],
})
export class AuthModule {}
