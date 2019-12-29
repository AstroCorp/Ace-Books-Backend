import { Get, Controller, Post, Req, Res } from "@nestjs/common";
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
	async register(@Req() req: any, @Res() res: any) {
		if(!req.body.email || !req.body.email_repeat || !req.body.password) {
			return false;
		}

		const { email, password } = req.body;
		req.session.user = { email, password };

		return true;
	}

	@Get('/logout')
	async logout(@Req() req: any) {
		delete req.session.user;

		return true;
	}

	@Get('/test')
	async test(@Req() req: any) {
		return req.session.user;
	}
}
