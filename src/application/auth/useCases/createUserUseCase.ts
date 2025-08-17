import { Inject, Injectable } from '@nestjs/common';
import { USER_WRITER_REPOSITORY, UserWriterRepositoryInterface } from '@/domain/user/repositories/userWriterRepositoryInterface';

@Injectable()
export class CreateUserUseCase {
	constructor(
		@Inject(USER_WRITER_REPOSITORY)
		private readonly userWriterRepository: UserWriterRepositoryInterface,
	) {
		//
	}

	public async execute(email: string, password: string) {
		const user = await this.userWriterRepository.create(email, password);

		return user;
	}
}
