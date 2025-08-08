import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { FastifyRequest } from 'fastify';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
	constructor(
		private authService: AuthService,
		private userService: UsersService,
	) {
		super({
			passReqToCallback: true,
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: process.env.JWT_REFRESH_SECRET,
		});
	}

	async validate(req: FastifyRequest, payload: Payload) {
		const token = req.headers['authorization'].split(' ')[1];
		const isValid = await this.authService.checkIfRefreshTokenIsValid(token);

		if (!isValid) {
			throw new UnauthorizedException();
		}

		const user = await this.userService.findOneById(payload.userId);

		if (!user) {
			throw new UnauthorizedException();
		}

		return user;
	}
}
