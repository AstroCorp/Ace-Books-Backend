import { Injectable } from "@nestjs/common";
import { EntityManager } from "@mikro-orm/postgresql";
import { User } from "@/domain/models/User";
import { User as UserEntity } from "@/infrastructure/orm/entities/User";
import { UserReaderRepositoryInterface } from "@/domain/user/repositories/userReaderRepositoryInterface";

@Injectable()
export class PostgresUserReaderRepository implements UserReaderRepositoryInterface {
	constructor(private readonly em: EntityManager) {}

	async findOneByEmail(email: string): Promise<User | null> {
		const user = await this.em.findOne(UserEntity, { email });

		if (!user) {
			return null;
		}

		return user.toDomainModel();
	}
}
