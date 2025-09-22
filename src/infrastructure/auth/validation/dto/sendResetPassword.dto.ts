import { IsEmail, MaxLength } from "class-validator";
import { EMAIL_RULES } from "@/domain/user/constants/rules";

export class SendResetPasswordDTO {
	@IsEmail(undefined, { message: 'invalid email' })
	@MaxLength(EMAIL_RULES.MAX_LENGTH)
	email: string;
}
