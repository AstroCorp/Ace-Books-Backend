import { Module } from "@nestjs/common";
import { AuthController } from "../controllers/auth.controller";
import { PassportModule } from '@nestjs/passport';
import { OrmModule } from "./orm.module";
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from "./auth/local.strategy";
import { jwtConstants } from './auth/constants';
import { JwtStrategy } from "./auth/jwt.strategy";

@Module({
	imports: [
		OrmModule,
		PassportModule,
		JwtModule.register({
			secret: jwtConstants.secret,
			signOptions: { expiresIn: '2h' },
		}),
	],
	controllers: [
		AuthController,
	],
	providers: [
		LocalStrategy,
		JwtStrategy,
	],
})
export class AuthModule {}
