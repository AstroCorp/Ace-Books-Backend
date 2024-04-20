import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from '@/auth/auth.service';
import { AuthController } from '@/auth/auth.controller';
import { UsersModule } from '@/users/users.module';
import { LocalStrategy } from '@/auth/strategies/local.strategy';
import { JwtStrategy } from '@/auth/strategies/jwt.strategy';

@Module({
	imports: [
		JwtModule.register({
			global: true,
		}),
		PassportModule,
		UsersModule,
	],
	providers: [
		AuthService,
		LocalStrategy,
		JwtStrategy,
	],
	controllers: [AuthController],
})
export class AuthModule { }
