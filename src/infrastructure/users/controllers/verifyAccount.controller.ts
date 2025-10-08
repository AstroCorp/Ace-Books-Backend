import { Controller, Post, UseGuards, HttpCode, HttpStatus, Body, UseFilters } from "@nestjs/common";
import { SignGuard } from "@/infrastructure/auth/guards/sign.guard";
import { VerifyUserAccountUseCase } from "@/application/users/useCases/verifyUserAccountUseCase";
import { GetUserByEmailUseCase } from "@/application/auth/useCases/getUserByEmailUseCase";
import { VerifyAccountDTO } from "@/infrastructure/users/validation/verifyAccount.dto";
import UserNotAvailableException from "@/domain/user/exceptions/userNotAvailable.exception";
import { ExceptionFilter } from "@/infrastructure/common/filters/exception.filter";

@Controller('users')
export class VerifyAccountController
{
	constructor(
		private readonly getUserByEmailUseCase: GetUserByEmailUseCase,
		private readonly verifyUserAccountUseCase: VerifyUserAccountUseCase,
	) {
		//
	}

	@UseGuards(SignGuard)
	@Post('verify-account')
	@HttpCode(HttpStatus.OK)
	@UseFilters(new ExceptionFilter([
		{
			exception: UserNotAvailableException,
			status: HttpStatus.BAD_REQUEST,
		}
	]))
	async __invoke(@Body() body: VerifyAccountDTO) {
		const user = await this.getUserByEmailUseCase.execute(body.email);

		if (!user) {
			throw new UserNotAvailableException();
		}

		await this.verifyUserAccountUseCase.execute(user);

		return {
			message: 'account verified successfully',
		};
	}
}
