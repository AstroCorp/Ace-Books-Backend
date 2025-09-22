import { IsEmail, MaxLength } from "class-validator";
import Email from "@/domain/common/valueObjects/email";

export class SendResetPasswordDTO {
	@IsEmail(undefined, { message: Email.RULES.ERROR_MESSAGE })
	@MaxLength(Email.RULES.MAX_LENGTH)
	email: string;
}
