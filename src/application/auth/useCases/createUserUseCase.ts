import { Inject, Injectable } from "@nestjs/common";
import { USER_WRITER_REPOSITORY, UserWriterRepositoryInterface } from "@/domain/user/repositories/userWriterRepositoryInterface";
import { HASH_PORT, HashPort } from "@/domain/auth/ports/hash.port";

@Injectable()
export class CreateUserUseCase {
	constructor(
		@Inject(USER_WRITER_REPOSITORY)
		private readonly userWriterRepository: UserWriterRepositoryInterface,

		@Inject(HASH_PORT)
		private readonly hashService: HashPort,
	) {
		//
	}

	public async execute(email: string, password: string) {
		const hashedPassword = this.hashService.generate(password);
		const user = await this.userWriterRepository.create(email, hashedPassword);

		return user;
	}
}
