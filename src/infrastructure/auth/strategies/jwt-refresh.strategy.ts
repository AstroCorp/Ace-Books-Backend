import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { ValidateUserRefreshTokenUseCase } from '@/application/auth/useCases/validateUserRefreshTokenUseCase';
import { PostgresUserReaderRepository } from '@/infrastructure/users/repositories/postgresUserReaderRepository';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
	constructor(
		private readonly validateUserRefreshTokenUseCase: ValidateUserRefreshTokenUseCase,
		private readonly userReaderRepository: PostgresUserReaderRepository,
	) {
		super({
			passReqToCallback: true,
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: process.env.JWT_REFRESH_SECRET,
		});
	}

	async validate(req: FastifyRequest, payload: any) {
		const token = req.headers['authorization'].split(' ')[1];
		const isValid = await this.validateUserRefreshTokenUseCase.execute(token);

		if (!isValid) {
			throw new UnauthorizedException();
		}

		const user = await this.userReaderRepository.findOneById(payload.userId);

		if (!user) {
			throw new UnauthorizedException();
		}

		return user;
	}
}
