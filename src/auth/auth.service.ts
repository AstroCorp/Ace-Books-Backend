import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@/users/users.service';
import { passwordCompare } from '@/auth/utils/bcrypt';
import { User } from '@/orm/entities/User';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService,
	) {
		//
	}

	async validateUser(email: string, password: string) {
		const user = await this.usersService.findOneByEmail(email);

		if (user && passwordCompare(password, user.password)) {
			return user;
		}

		return null;
	}

	async login(user: User) {
		const tokens = await this.generateTokens(user);

		return {
			...tokens,
			user: user.getData(),
		};
	}

	private async generateTokens(user: User) {
		const payload = { user_id: user.id };

		return {
			access_token: await this.jwtService.signAsync(payload, {
				secret: process.env.JWT_SECRET,
				expiresIn: process.env.JWT_SECRET_EXPIRES,
			}),
			refresh_token: await this.jwtService.signAsync(payload, {
				secret: process.env.JWT_REFRESH_SECRET,
				expiresIn: process.env.JWT_REFRESH_SECRET_EXPIRES,
			}),
		};
	}
}
