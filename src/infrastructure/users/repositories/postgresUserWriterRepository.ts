import { Injectable } from "@nestjs/common";
import { EntityManager } from "@mikro-orm/postgresql";
import { User } from "@/domain/common/models/User";
import { User as UserEntity } from "@/infrastructure/orm/entities/User";
import { UserWriterRepositoryInterface } from "@/domain/user/repositories/userWriterRepositoryInterface";

@Injectable()
export class PostgresUserWriterRepository implements UserWriterRepositoryInterface {
	constructor(private readonly em: EntityManager) {}

	async create(email: string, password: string): Promise<User> {
		const newUser = new UserEntity({ email, password });

		await this.em.persist(newUser).flush();

		return newUser.toDomainModel();
	}
}
