import { Get, Controller, Post, Req } from "@nestjs/common";
import { EntityRepository } from "mikro-orm";
import { InjectRepository } from "nestjs-mikro-orm";
import { User } from "../../entities";

@Controller("user")
export class UserController {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: EntityRepository<User>,
	) {}

	@Get() // index
	async find() {
		return await this.userRepository.findAll();
	}

	@Post('/register')
	async register(@Req() req: any) {
		if(!req.body.email || !req.body.password) {
			return 'fail';
		}

		const { email, password } = req.body;
		req.session.user = { email, password };

		return "register + login";
	}

	@Get('/logout')
	async logout(@Req() req: any) {
		delete req.session.user;

		return "logout";
	}

	@Get('/test')
	async test(@Req() req: any) {
		return req.session.user;
	}
}
