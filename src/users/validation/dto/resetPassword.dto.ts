import { IsEmail, Length, MinLength, MaxLength } from 'class-validator';

export class ResetPasswordDto
{
	@IsEmail({}, {
		message: 'isEmail',
	})
	email: string;

	@Length(23, 23, {
		message: 'length',
	})
	code: string;

	@MinLength(6, {
		message: 'minLength',
	})
	@MaxLength(25, {
		message: 'maxLength',
	})
	newPassword: string;
}
