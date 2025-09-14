import { Inject, Injectable } from "@nestjs/common";
import { USER_READER_REPOSITORY, UserReaderRepositoryInterface } from "@/domain/user/repositories/userReaderRepositoryInterface";
import { User } from "@/domain/common/models/User";

@Injectable()
export class GetUserByEmailUseCase {
	constructor(
		@Inject(USER_READER_REPOSITORY)
		private readonly userReaderRepository: UserReaderRepositoryInterface,
	) {
		//
	}

	public async execute(email: string): Promise<User | null> {
		const user = await this.userReaderRepository.findOneByEmail(email);

		return user;
	}
}
