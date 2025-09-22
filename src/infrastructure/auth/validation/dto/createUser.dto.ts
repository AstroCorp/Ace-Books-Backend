import { IsEmail, IsStrongPassword, MaxLength } from "class-validator";
import { EMAIL_RULES, PASSWORD_RULES } from "@/domain/user/constants/rules";

export class CreateUserDTO {
	@IsEmail(undefined, { message: 'invalid email' })
	@MaxLength(EMAIL_RULES.MAX_LENGTH)
	email: string;

	@IsStrongPassword({
		minLength: PASSWORD_RULES.MIN_LENGTH,
		minLowercase: PASSWORD_RULES.MIN_LOWERCASE,
		minUppercase: PASSWORD_RULES.MIN_UPPERCASE,
		minNumbers: PASSWORD_RULES.MIN_NUMBERS,
		minSymbols: PASSWORD_RULES.MIN_SYMBOLS,
	})
	@MaxLength(PASSWORD_RULES.MAX_LENGTH)
	password: string;
}
