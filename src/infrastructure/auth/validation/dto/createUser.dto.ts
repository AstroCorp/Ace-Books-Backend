import { IsEmail, IsStrongPassword, MaxLength } from 'class-validator';

export class CreateUserDTO {
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
	@MaxLength(32)
	password: string;
}
