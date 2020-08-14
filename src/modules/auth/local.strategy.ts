import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { EntityRepository } from "mikro-orm";
import { InjectRepository } from "nestjs-mikro-orm";
import { User } from "../../entities";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(@InjectRepository(User) private readonly userRepository: EntityRepository<User>) {
		super({ 
			usernameField: 'email',
			passwordField: 'password' 
		});
	}

	async validate(email: string, password: string): Promise<any> {
		const user = await this.userRepository.findOne({
			email,
		});

		if (!user || user.password !== password) {
			throw new UnauthorizedException();
		}
		
		return user;
	}
}
