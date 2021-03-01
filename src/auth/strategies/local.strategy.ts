import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UsersService } from '../../users/users.service';
import { Strategy } from 'passport-local';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy)
{
	constructor(private readonly usersService: UsersService) {
		super({
			usernameField: 'email',
			passwordField: 'password',
		});
	}

	async validate(email: string, password: string): Promise<string> {
		const user = await this.usersService.findOne(email);
		const isValidUser = user && (await bcrypt.compare(password, user.password));

		if (!isValidUser) {
			throw new UnauthorizedException();
		}

		return email;
	}
}
