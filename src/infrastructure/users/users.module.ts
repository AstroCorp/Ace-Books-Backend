import { Module } from "@nestjs/common";
import { OrmModule } from "@/infrastructure/orm/orm.module";
import { PROVIDERS } from "@/infrastructure/users/user.providers";
import { ProfileController } from "@/infrastructure/users/controllers/profile.controller";
import { GenerateVerificationAccountUrlUseCase } from "@/application/user/useCases/generateVerificationAccountUrlUseCase";
import { SendVerifyAccountEmailController } from "@/infrastructure/users/controllers/sendVerifyAccountEmail.controller";
import { SendVerificationEmailUseCase } from "@/application/emails/useCases/sendVerificationEmailUseCase";
import { VerifyUserAccountUseCase } from "@/application/user/useCases/verifyUserAccountUseCase";
import { VerifyAccountController } from "@/infrastructure/users/controllers/verifyAccount.controller";
import SignService from "@/infrastructure/auth/services/sign.service";
import { GetUserByEmailUseCase } from "@/application/auth/useCases/getUserByEmailUseCase";

@Module({
	imports: [OrmModule],
	providers: [
		...PROVIDERS,
		SignService,
		GenerateVerificationAccountUrlUseCase,
		SendVerificationEmailUseCase,
		VerifyUserAccountUseCase,
		GetUserByEmailUseCase,
	],
	controllers: [
		ProfileController,
		SendVerifyAccountEmailController,
		VerifyAccountController,
	],
})
export class UsersModule {}
