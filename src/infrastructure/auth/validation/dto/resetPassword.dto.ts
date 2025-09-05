import { IsEmail, MaxLength, IsStrongPassword, IsJWT } from 'class-validator';

export class ResetPasswordDTO {
	@IsJWT({ message: 'invalid token' })
	token: string;

	@IsEmail(undefined, { message: 'invalid email' })
	@MaxLength(255)
	email: string;

	@IsStrongPassword({
		minLength: 8,
		minLowercase: 1,
		minUppercase: 1,
		minNumbers: 1,
		minSymbols: 1,
	})
	password: string;
}
