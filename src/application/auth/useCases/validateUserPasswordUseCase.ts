import { Inject, Injectable } from "@nestjs/common";
import { USER_READER_REPOSITORY, UserReaderRepositoryInterface } from "@/domain/user/repositories/userReaderRepositoryInterface";
import { HASH_PORT, HashPort } from "@/domain/auth/ports/hash.port";
import { User } from "@/domain/common/models/User";

@Injectable()
export class ValidateUserPasswordUseCase {
	constructor(
		@Inject(USER_READER_REPOSITORY)
		private readonly userReaderRepository: UserReaderRepositoryInterface,
		@Inject(HASH_PORT)
		private readonly hashService: HashPort,
	) {
		//
	}

	public async execute(email: string, password: string): Promise<User | null> {
		const user = await this.userReaderRepository.findOneByEmail(email);

		if (user && this.hashService.check(password, user.password)) {
			return user;
		}

		return null;
	}
}
