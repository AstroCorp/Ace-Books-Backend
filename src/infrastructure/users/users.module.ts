import { Module } from "@nestjs/common";
import { OrmModule } from "@/infrastructure/orm/orm.module";
import { PROVIDERS } from "@/infrastructure/users/user.providers";
import { ProfileController } from "@/infrastructure/users/controllers/profile.controller";
import { SendVerifyAccountEmailController } from "@/infrastructure/users/controllers/sendVerifyAccountEmail.controller";
import { SendVerificationEmailUseCase } from "@/application/emails/useCases/sendVerificationEmailUseCase";

@Module({
	imports: [OrmModule],
	providers: [
		...PROVIDERS,
		SendVerificationEmailUseCase,
	],
	controllers: [
		ProfileController,
		SendVerifyAccountEmailController,
	],
})
export class UsersModule {}
