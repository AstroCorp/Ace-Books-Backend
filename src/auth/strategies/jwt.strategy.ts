import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import Payload from '../types/payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) 
{
	constructor(configService: ConfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: configService.get<string>('JWT_SECRET'),
		});
	}

	validate(payload: Payload): string {
		return payload.sub;
	}
}
