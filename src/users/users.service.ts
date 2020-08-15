import { Injectable } from "@nestjs/common";
import { EntityRepository } from "mikro-orm";
import { InjectRepository } from "nestjs-mikro-orm";
import { User } from "orm/entities";

@Injectable()
export class UsersService {
	constructor(@InjectRepository(User) private readonly userRepository: EntityRepository<User>) {
		//
	}

	async findOne(email: string) {
		return await this.userRepository.findOne({
			email,
		});
	}
}
