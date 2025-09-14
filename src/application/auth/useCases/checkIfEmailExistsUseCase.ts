import { Inject, Injectable } from "@nestjs/common";
import { USER_READER_REPOSITORY, UserReaderRepositoryInterface } from "@/domain/user/repositories/userReaderRepositoryInterface";

@Injectable()
export class CheckIfEmailExistsUseCase {
	constructor(
		@Inject(USER_READER_REPOSITORY)
		private readonly userReaderRepository: UserReaderRepositoryInterface,
	) {}

	async execute(email: string): Promise<boolean> {
		const user = await this.userReaderRepository.findOneByEmail(email);

		return user !== null;
	}
}
