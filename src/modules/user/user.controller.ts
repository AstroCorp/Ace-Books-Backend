import { Get, Controller } from "@nestjs/common";
import { EntityRepository } from "mikro-orm";
import { InjectRepository } from "nestjs-mikro-orm";
import { User } from "../../entities";

@Controller("user")
export class UserController {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: EntityRepository<User>,
	) {}

	@Get()
	async find() {
		return await this.userRepository.findAll();
	}
}
