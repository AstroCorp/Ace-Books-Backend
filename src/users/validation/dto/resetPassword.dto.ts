import { IsEmail, Length, MinLength, MaxLength } from 'class-validator';

export class ResetPasswordDto
{
	@IsEmail()
	email: string;

	@Length(23, 23, {
		message: 'the code is not valid',
	})
	code: string;

	@MinLength(6)
	@MaxLength(25)
	newPassword: string;
}
