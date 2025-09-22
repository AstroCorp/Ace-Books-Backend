import { IsEmail, IsJWT, IsStrongPassword, MaxLength } from "class-validator";
import Jwt from "@/domain/common/valueObjects/jwt";
import Email from "@/domain/common/valueObjects/email";
import Password from "@/domain/common/valueObjects/password";

export class ResetPasswordDTO {
	@IsJWT({ message: Jwt.RULES.ERROR_MESSAGE })
	token: string;

	@IsEmail(undefined, { message: Email.RULES.ERROR_MESSAGE })
	@MaxLength(Email.RULES.MAX_LENGTH)
	email: string;

	@IsStrongPassword({
		minLength: Password.RULES.MIN_LENGTH,
		minLowercase: Password.RULES.MIN_LOWERCASE,
		minUppercase: Password.RULES.MIN_UPPERCASE,
		minNumbers: Password.RULES.MIN_NUMBERS,
		minSymbols: Password.RULES.MIN_SYMBOLS,
	})
	@MaxLength(Password.RULES.MAX_LENGTH)
	password: string;
}
