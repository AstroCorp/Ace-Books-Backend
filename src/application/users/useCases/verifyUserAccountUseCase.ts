import { Inject, Injectable } from "@nestjs/common";
import { USER_WRITER_REPOSITORY, UserWriterRepositoryInterface } from "@/domain/user/repositories/userWriterRepositoryInterface";
import { User } from "@/domain/common/models/User";

@Injectable()
export class VerifyUserAccountUseCase {
	constructor(
		@Inject(USER_WRITER_REPOSITORY)
		private readonly userWriterRepository: UserWriterRepositoryInterface,
	) {
		//
	}

	public async execute(user: User) {
		if (user.isVerified) return;

		await this.userWriterRepository.verifyEmail(user.email);
	}
}
